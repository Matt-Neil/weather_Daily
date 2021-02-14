import React, {useContext, useEffect, useState} from "react";
import {RecentContext} from "../contexts/recentContext";
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import {MainContext} from "../contexts/mainContext";
import {motion} from "framer-motion";
import {fetchWeather} from "./fetchWeather";

const Recent = () => {
    const { getName } = require('country-list');
    const { recent, removeRecent } = useContext(RecentContext)
    const [country, setCountry] = useState([])
    const { changeMain } = useContext(MainContext)
    const [empty, setEmpty] = useState(true)

    useEffect(() => {
        let temp = []
        { recent.map((location) => {
            if (location.country === "GB") {
                return temp.push("United Kingdom")
            } else {
                return temp.push(getName(location.country))
            }
        })}
        setCountry(temp)
    }, [recent])

    useEffect(() => {
        if (recent.length === 0) {
            setEmpty(true)
        } else {
            setEmpty(false)
        }
    }, [recent])

    const remove = (city) => {
        removeRecent(city)
    }

    const change = async (location) => {
        const data = await fetchWeather(location.city, location.country)
        changeMain(location.city, location.country, data.data.data.current, data.data.data.daily, data.data.data.hourly)
    }

    return (
        <>
            { empty ?
                <div className={"recentBox recentBoxLarge recentBoxSmall"}>
                    <p className={"placeholder"} style={{ marginLeft: 20, marginTop: 20 }}>Recent searches...</p>
                </div>
                :
                <div className={"recentBox recentBoxLarge recentBoxSmall"}>
                    { recent.map((location, i) => {
                        return (
                            <div className={"recentRow"} key={i}>
                                <RemoveCircleOutlineIcon className={"recentRemove"}
                                                         style={{ color: "#646464" }}
                                                         onClick={() => {remove(location.city)}}
                                />
                                <motion.p className={"recentText"}
                                          whileHover={{ scale: 1.01 }}
                                          onClick={() => {change(location).then((Result) => {
                                              console.log("Updated Main")
                                          }).catch(e => console.log(e))}}>{location.city} - {country[i]}</motion.p>
                            </div>
                        )
                    })}
                </div>
            }
        </>
    )
}

export default Recent