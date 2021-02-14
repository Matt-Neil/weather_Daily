import React, {useContext, useEffect, useState} from "react";
import {UnitContext} from "../contexts/unitContext";

const CardWeek = ({weather}) => {
    const [temp, setTemp] = useState(0)
    const [date, setDate] = useState("")
    const { unit } = useContext(UnitContext)

    useEffect(() => {
        if (unit === "Metric") {
            setTemp(Math.ceil(weather.temp.day))
        } else {
            setTemp(Math.round(Math.ceil(weather.temp.day)*1.8)+32)
        }
        let tempDate = new Date(weather.dt*1000).toLocaleString("en-GB", {weekday: "short", day: "numeric"})
        setDate(tempDate)
    }, [unit, weather])

    return (
        <div className={"card cardLarge cardSmall"} style={{ pointerEvents: "none" }}>
            <p className={"cardDate"}>{date}</p>
            <img className={"weatherIcon"} src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={"Weather Icon"} />
            <p className={"cardWeather"}>{weather.weather[0].main}</p>
            <p className={"cardTemperature cardTemperatureSmall cardTemperatureMedium cardTemperatureLarge"}>{temp}°</p>
        </div>
    )
}

export default CardWeek