import React, {useContext, useEffect, useState} from "react";
import {UnitContext} from "../contexts/unitContext";

const CardToday = ({weather}) => {
    const [temp, setTemp] = useState(0)
    const [time, setTime] = useState("")
    const { unit } = useContext(UnitContext)

    useEffect(() => {
        if (unit === "Metric") {
            setTemp(Math.ceil(weather.temp))
        } else {
            setTemp(Math.round(Math.ceil(weather.temp)*1.8)+32)
        }
        let tempTime = new Date(weather.dt*1000).toLocaleString("en-GB", {hour: "numeric"})
        setTime(tempTime)
    }, [unit, weather])

    return (
        <div className={"card cardLarge cardSmall"} style={{ pointerEvents: "none" }}>
            <p className={"cardDate"}>{time}:00</p>
            <img className={"weatherIcon"} src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={"Weather Icon"} />
            <p className={"cardWeather"}>{weather.weather[0].main}</p>
            <p className={"cardTemperature cardTemperatureSmall cardTemperatureMedium cardTemperatureLarge"}>{temp}°</p>
        </div>
    )
}

export default CardToday