import React, {useContext, useEffect, useState} from "react";
import {MainContext} from "../contexts/mainContext";
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import withStyles from "@material-ui/core/styles/withStyles";
import {UnitContext} from "../contexts/unitContext";
import {FavouriteContext} from "../contexts/favouriteContext";
import {motion} from "framer-motion";

const ThemeButton = withStyles({
    root: {
        width: 120,
        height: 35,
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        fontWeight: 400,
        fontFamily: '"Quicksand", sans-serif',
        borderRadius: 10,
        color: 'white',
        backgroundColor: "#F66A3A",
        marginTop: 20,
        marginRight: 20,
        marginLeft: 20,
        '&:hover': {
            backgroundColor: '#F66A3A',
            color: 'white',
        },
    },
})(Button);

const MainInfo = () => {
    const { getName } = require('country-list');
    const weather = useContext(MainContext)
    const { first } = useContext(MainContext)
    const { unit } = useContext(UnitContext)
    const { favourite, addFavourite } = useContext(FavouriteContext)
    const [wind, setWind] = useState("")
    const [country, setCountry] = useState("")
    const [temp, setTemp] = useState(0)
    const [full, setFull] = useState(false)

    useEffect(() => {
        if (unit === "Metric") {
            setWind(Math.ceil(weather.main.current.wind_speed) + "kph")
            setTemp(Math.ceil(weather.main.current.temp))
        } else {
            setWind(Math.round(1.60934*Math.ceil(weather.main.current.wind_speed)).toString() + "mph")
            setTemp(Math.round(Math.ceil(weather.main.current.temp)*1.8)+32)
        }
        if (weather.main.country === "GB") {
            setCountry("United Kingdom")
        } else {
            setCountry(getName(weather.main.country))
        }
        if (favourite.length >= 7) {
            setFull(true)
        } else {
            setFull(false)
        }
    }, [unit, weather, favourite])

    const add = (location) => {
        addFavourite(location.city, location.country, location.current, location.week, location.today)
    }

    return (
        <motion.div className={"mainInfo mainInfoVerySmall mainInfoSmall mainInfoMedium mainInfoLarge"}
                    initial={{ opacity: 1, scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.15 }}
                    key={weather.main.city}>
            {first &&
                <>
                    <div className={"mainInfoUpper mainInfoUpperSmall"}>
                        <div className={"mainInfoLocation"}>
                            <p className={"mainInfoCity"}>{weather.main.city}</p>
                            <p className={"mainInfoCountry"}>{country}</p>
                        </div>
                        <img src={`https://openweathermap.org/img/wn/${weather.main.current.weather[0].icon}@2x.png`}
                             alt={"Weather Icon"} />
                        { full ?
                            <div>
                                <ThemeButton>Full</ThemeButton>
                            </div>
                            :
                            <motion.div whileHover={{ scale: 1.02 }}>
                                <ThemeButton startIcon={<AddIcon style={{ color: "white" }} />}
                                             onClick={() => {add(weather.main)}}>Favourite</ThemeButton>
                            </motion.div>
                        }
                    </div>
                    <p className={"mainTime mainTimeLarge mainTimeSmall"}>Now -</p>
                    <div className={"mainInfoLower mainInfoLowerSmall"}>
                        <p className={"currentTemperature currentTemperatureSmall currentTemperatureMedium currentTemperatureLarge"}>{temp}°</p>
                        <div>
                            <p className={"currentWeather currentWeatherSmall currentWeatherLarge"}>{weather.main.current.weather[0].main}</p>
                            <div className={"mainInfoLowerExtra mainInfoLowerExtraSmall"}>
                                <p className={"currentWind currentWindVerySmall currentWindSmall currentWindMedium currentWindLarge"}>Wind | {wind}</p>
                                <p className={"currentHumidity currentHumiditySmall currentHumidityMedium currentHumidityLarge"}>Humidity | {weather.main.current.humidity}%</p>
                            </div>
                        </div>
                    </div>
                </>}
        </motion.div>
    )
}

export default MainInfo