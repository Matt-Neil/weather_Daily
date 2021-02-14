import React, {useContext, useState} from "react";
import {fetchWeather} from "./fetchWeather"
import {MainContext} from "../contexts/mainContext";
import {RecentContext} from "../contexts/recentContext";
import SearchIcon from '@material-ui/icons/Search';

const SearchBox = () => {
    const [queryCity, setQueryCity] = useState("")
    const [queryCountry, setQueryCountry] = useState("")
    const { changeMain, changeFirst } = useContext(MainContext)
    const { addRecent } = useContext(RecentContext)

    const searchType = async (e) => {
        if (e.key === "Enter") {
            console.log("hi")
            const data = await fetchWeather(queryCity, queryCountry)
            changeMain(data.city, data.country, data.data.data.current, data.data.data.daily, data.data.data.hourly)
            changeFirst(true)
            addRecent(data.city, data.country)
            setQueryCity("")
            setQueryCountry("")
        }
    }

    const searchButton = async () => {
        const data = await fetchWeather(queryCity, queryCountry)
        changeMain(data.city, data.country, data.data.data.current, data.data.data.daily, data.data.data.hourly)
        changeFirst(true)
        addRecent(data.city, data.country)
        setQueryCity("")
        setQueryCountry("")
    }

    return (
        <div style={{ display: "flex", alignItems: "center" }}>
            <input placeholder={"City"}
                   className={"searchBox searchBoxCity searchBoxSmall searchBoxLarge"}
                   value={queryCity}
                   onChange={(e) => setQueryCity(e.target.value)}
                   onKeyPress={searchType}
            />
            <input placeholder={"Country"}
                   className={"searchBox searchBoxCountry searchBoxSmall searchBoxLarge"}
                   value={queryCountry}
                   onChange={(e) => setQueryCountry(e.target.value)}
                   onKeyPress={searchType}
            />
            <SearchIcon onClick={searchButton} className={"searchIcon"} style={{ fontSize: 24 }} />
        </div>
    )
}

export default SearchBox