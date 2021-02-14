import React, {useContext, useEffect, useState} from "react";
import {UnitContext} from "../contexts/unitContext";
import {MainContext} from "../contexts/mainContext";
import {motion} from "framer-motion";
import {fetchWeather} from "./fetchWeather";

const CardFavourite = ({weather}) => {
    const [temp, setTemp] = useState(0)
    const [country, setCountry] = useState("")
    const { unit } = useContext(UnitContext)
    const { changeMain } = useContext(MainContext)

    useEffect(() => {
        if (unit === "Metric") {
            setTemp(Math.ceil(weather.current.temp))
        } else {
            setTemp(Math.round(Math.ceil(weather.current.temp)*1.8)+32)
        }
        if (weather.country === "GB") {
            setCountry("UK")
        } else {
            setCountry(weather.country)
        }
    }, [unit, weather])

    const change = async () => {
        const data = await fetchWeather(weather.city, weather.country)
        changeMain(weather.city, weather.country, data.data.data.current, data.data.data.daily, data.data.data.hourly)
    }

    return (
        <>
            <motion.div className={"card cardLarge cardSmall"}
                        whileHover={{ scale: 1.01 }}
                        onClick={() => {change().then((Result) => {
                            console.log("Updated Main")
                        }).catch(e => console.log(e))}}>
                <p className={"cardCity"}>{weather.city}</p>
                <p className={"cardCountry cardCountryLarge cardCountrySmall"}>{country}</p>
                <img className={"weatherIcon"} src={`https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`} alt={"Weather Icon"} />
                <p className={"cardWeather"}>{weather.current.weather[0].main}</p>
                <p className={"cardTemperature cardTemperatureSmall cardTemperatureMedium cardTemperatureLarge"}>{temp}°</p>
            </motion.div>
        </>
    )
}

export default CardFavourite