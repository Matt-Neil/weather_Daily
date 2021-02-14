import React, {createContext, useEffect, useState} from 'react'

export const UnitContext = createContext("Metric")

const UnitContextProvider = (props) => {
    const [unit, setUnit] = useState(() => {
        const localData = localStorage.getItem('unit');
        return localData ? localData : "Metric"
    })
    const changeUnit = (unit) => {
        setUnit(unit)
    }

    useEffect(() => {
        localStorage.setItem('unit', unit)
    }, [unit])

    return (
        <UnitContext.Provider value={{unit, changeUnit}}>
            {props.children}
        </UnitContext.Provider>
    )
}

export default UnitContextProvider