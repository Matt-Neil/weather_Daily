import axios from "axios";
const { getCode } = require('country-list');

export const fetchWeather = async (queryCity, queryCountry) => {
    if (queryCountry === "") {
        const latlon = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
            params: {
                q: queryCity,
                units: 'metric',
                APPID: process.env.REACT_APP_API_KEY_OPENWEATHER
            }
        })
        const city = latlon.data.name
        const country = latlon.data.sys.country
        const data = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latlon.data.coord.lat}&lon=${latlon.data.coord.lon}&units=metric&exclude=minutely,alerts&appid=${process.env.REACT_APP_API_KEY_OPENWEATHER}`)
        return {data, city, country}
    } else {
        if ((queryCountry).toLowerCase() === "united kingdom" || (queryCountry).toLowerCase() === "great britain"
            || (queryCountry).toLowerCase() === "england" || (queryCountry).toLowerCase() === "scotland" ||
            (queryCountry).toLowerCase() === "wales" || (queryCountry).toLowerCase() === "northern ireland"
            || (queryCountry).toLowerCase() === "uk" || (queryCountry).toLowerCase() === "britain"
            || (queryCountry).toLowerCase() === "gb" || (queryCountry).toLowerCase() === "scottish highlands"
            || (queryCountry).toLowerCase() === "channel islands" || (queryCountry).toLowerCase() === "isle of man"
            || (queryCountry).toLowerCase() === "isle of white" || (queryCountry).toLowerCase() === "britain"
            || (queryCountry).toLowerCase() === "isles of scilly") {
            queryCountry = getCode("United Kingdom of Great Britain and Northern Ireland")
        } else if ((queryCountry).toLowerCase() === "united states" || (queryCountry).toLowerCase() === "us"
            || (queryCountry).toLowerCase() === "the united states of america" || (queryCountry).toLowerCase() === "usa"
            || (queryCountry).toLowerCase() === "america") {
            queryCountry = getCode("United States of America")
        } else {
            queryCountry = getCode(queryCountry)
        }
        const latlon = await axios.get(`https://api.weatherbit.io/v2.0/current?city=${queryCity}&country=${queryCountry}&key=${process.env.REACT_APP_API_KEY_WEATHERBIT}`)
        let city
        if (latlon.data.data[0].city_name === "City of London") {
            city = "London"
        } else {
            city = latlon.data.data[0].city_name
        }
        console.log(city)
        const country = latlon.data.data[0].country_code
        const data = await axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latlon.data.data[0].lat}&lon=${latlon.data.data[0].lon}&units=metric&exclude=minutely,alerts&appid=${process.env.REACT_APP_API_KEY_OPENWEATHER}`)
        return {data, city, country}
    }
}