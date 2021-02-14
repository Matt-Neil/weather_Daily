import React, {createContext, useContext, useEffect, useRef, useState} from 'react'
import {MainContext} from "./mainContext";

export const UpdateContext = createContext(0)

const UpdateContextProvider = (props) => {
    const {main} = useContext(MainContext)
    const timeoutID = useRef(0)
    const [timer, setTimer] = useState(0)

    useEffect(() => {
        if (main.city !== "") {
            timeoutID.current = setTimeout(() => {
                setTimer(prev => prev + 1)
            }, 60000)
            return () => {clearTimeout(timeoutID.current)}
        }
    })

    useEffect(() => {
        setTimer(0)
        clearInterval(timeoutID.current)
    }, [main])

    return (
        <UpdateContext.Provider value={{timer}}>
            {props.children}
        </UpdateContext.Provider>
    )
}

export default UpdateContextProvider