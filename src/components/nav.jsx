import React, {useContext} from "react";
import Switch from '@material-ui/core/Switch';
import {UnitContext} from "../contexts/unitContext";

const Nav = () => {
    const { unit, changeUnit } = useContext(UnitContext)
    const date = new Date()
    const options = { weekday: "long", year: "numeric", month: "long", day: "numeric"}

    const handleUnit = () => {
        if (unit === "Metric") {
            changeUnit("Imperial")
        } else {
            changeUnit("Metric")
        }
    }

    return (
        <div className={"navBar"}>
            <div className={"navUpper"}>
                <h1 className={"title titleLarge titleSmall"}>weatherDaily</h1>
                <div className={"navTemp navTempSmall navTempLarge"}>
                    <Switch style={{ color: "white" }} color={"default"} onChange={handleUnit} />
                    <p className={"switch switchLarge switchSmall"}>{unit}</p>
                </div>
            </div>
            <p className={"date dateLarge dateSmall"}>{new Intl.DateTimeFormat("en-GB", options).format(date)}</p>
        </div>
    )
}

export default Nav