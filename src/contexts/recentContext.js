import React, {createContext, useEffect, useState} from 'react'

export const RecentContext = createContext([])

const RecentContextProvider = (props) => {
    const [recent, setRecent] = useState(() => {
        const localData = localStorage.getItem('recent');
        return localData ? JSON.parse(localData) : []
    })

    useEffect(() => {
        localStorage.setItem('recent', JSON.stringify(recent))
    }, [recent])

    const addRecent = (city, country) => {
        if (recent.filter(location => location.city.match(city)).length === 0) {
            if (recent.length === 4) {
                recent.length = 3
            }
            setRecent([{
                city: city,
                country: country
            }, ...recent])
        } else {
            setRecent([{
                city: city,
                country: country
            }, ...recent.filter(location => location.city !== city)])
        }
    }
    const removeRecent = (city) => {
        setRecent(recent.filter(location => location.city !== city))
    }

    return (
        <RecentContext.Provider value={{recent, addRecent, removeRecent}}>
            {props.children}
        </RecentContext.Provider>
    )
}

export default RecentContextProvider