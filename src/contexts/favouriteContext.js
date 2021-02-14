import React, {createContext, useEffect, useState} from 'react'
import {fetchWeather} from "../components/fetchWeather";

export const FavouriteContext = createContext([])

const FavouriteContextProvider = (props) => {
    const [favourite, setFavourite] = useState([])
    const updateFavourite = async (favourite) => {
        let tempFavourite = []
        for (const location of favourite) {
            const data = await fetchWeather(location.city, location.country)
            tempFavourite.push({
                city: location.city,
                country: location.country,
                current: data.data.data.current
            })
        }
        setFavourite(tempFavourite)
    }

    useEffect(() => {
        const localData = localStorage.getItem('favourite');
        if (localData) {
            updateFavourite(JSON.parse(localData)).then(() => console.log("Updated Favourites")).catch(e => console.log(e))
        }
    },[])

    useEffect(() => {
        localStorage.setItem('favourite', JSON.stringify(favourite))
    }, [favourite])

    const addFavourite = (city, country, current) => {
        if (favourite.length < 7) {
            if (favourite.filter(location => location.city.match(city)).length === 0) {
                setFavourite([{
                    city: city,
                    country: country,
                    current: current
                }, ...favourite])
            }
        }
    }
    const removeFavourite = (city) => {
        setFavourite(favourite.filter(location => location.city !== city))
    }

    return (
        <FavouriteContext.Provider value={{favourite, updateFavourite, addFavourite, removeFavourite}}>
            {props.children}
        </FavouriteContext.Provider>
    )
}

export default FavouriteContextProvider