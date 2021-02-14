import React, {createContext, useEffect, useState} from 'react'
import {fetchWeather} from "../components/fetchWeather";

export const MainContext = createContext({})

const MainContextProvider = (props) => {
    const [first, setFirst] = useState(false)
    const [main, setMain] = useState
    ({
        city: "",
        country: "",
        current: [],
        week: [],
        today: []
    })

    useEffect(() => {
        const localData = localStorage.getItem('main')
        if (localData) {
            const tempMain = JSON.parse(localData)
            updateMain(tempMain.city, tempMain.country).then(() => console.log("Updated Main")).catch(e => console.log(e))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('main', JSON.stringify(main))
    }, [main])

    const updateMain = async (city, country) => {
        const data = await fetchWeather(city, country)
        let tempTime = new Date(data.data.data.hourly[0].dt*1000).toLocaleString("en-GB", {hour: "numeric"})
        if (data.data.data.daily.length > 7) {
            data.data.data.daily.length = 8
            data.data.data.daily.shift()
        }
        data.data.data.hourly.length = (24-tempTime)
        data.data.data.hourly.shift()
        setMain({
            city: city,
            country: country,
            current: data.data.data.current,
            week: data.data.data.daily,
            today: data.data.data.hourly
        })
        setFirst(true)
    }
    const changeMain = (city, country, current, week, today) => {
        let tempTime = new Date(today[0].dt*1000).toLocaleString("en-GB", {hour: "numeric"})
        if (week.length > 7) {
            week.length = 8
            week.shift()
        }
        today.length = (24-tempTime)
        today.shift()
        setMain({
            city: city,
            country: country,
            current: current,
            week: week,
            today: today
        })
    }
    const changeFirst = () => {
        setFirst(true)
    }

    return (
        <MainContext.Provider value={{main, first, updateMain, changeMain, changeFirst}}>
            {props.children}
        </MainContext.Provider>
    )
}

export default MainContextProvider