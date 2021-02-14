import Favourite from "./favourite";
import React, {useContext, useState} from "react";
import {FavouriteContext} from "../contexts/favouriteContext";
import Today from "./today";
import Week from "./week";
import RefreshIcon from "@material-ui/icons/Refresh";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import withStyles from "@material-ui/core/styles/withStyles";
import {MainContext} from "../contexts/mainContext";
import {UpdateContext} from "../contexts/updateContext";

const Toggle = withStyles({
    root: {
        height: 30,
        fontFamily: '"Quicksand", sans-serif',
        border: "1px #c2c2c2 solid"
    },
})(ToggleButton);

const MidSectionLower = () => {
    const {favourite, updateFavourite} = useContext(FavouriteContext)
    const {main, updateMain} = useContext(MainContext)
    const {timer} = useContext(UpdateContext)
    const [displayToday, setDisplayToday] = useState(true)
    const [displayWeek, setDisplayWeek] = useState(false)
    const [displayFavourite, setDisplayFavourite] = useState(false)
    const [option, setOption] = useState('left');

    const today = () => {
        setDisplayToday(true)
        setDisplayWeek(false)
        setDisplayFavourite(false)
    }

    const week = () => {
        setDisplayToday(false)
        setDisplayWeek(true)
        setDisplayFavourite(false)
    }

    const favourites = () => {
        setDisplayToday(false)
        setDisplayWeek(false)
        setDisplayFavourite(true)
    }

    const handleOption = (event, newOption) => {
        setOption(newOption);
    };

    const refresh = () => {
        updateMain(main.city, main.country)
        updateFavourite(favourite)
    }

    return (
        <>
            <div className={"midSectionLower"}>
                <ToggleButtonGroup className={"navLower"}
                                   value={option}
                                   onChange={handleOption}
                                   exclusive>
                    <Toggle className={"toggleSmall"} value="left" aria-label="left aligned" style={{ borderRadius: "15px 0 0 15px" }}>
                        <p className={"lowerText"} onClick={() => {today()}}>Today</p>
                    </Toggle>
                    <Toggle className={"toggleSmall"} value="center" aria-label="centered">
                        <p className={"lowerText"} onClick={() => {week()}}>Week</p>
                    </Toggle>
                    <Toggle className={"toggleBig"} value="right" aria-label="right aligned" style={{ borderRadius: "0 15px 15px 0" }}>
                        <p className={"lowerText"} onClick={() => {favourites()}}>Favourites</p>
                    </Toggle>
                </ToggleButtonGroup>
                <div className={"displayCards"}>
                    { displayToday && <Today /> }
                    { displayWeek && <Week /> }
                    { displayFavourite && <Favourite /> }
                </div>
                <div className={"optionExtra"}>
                    <p className={"updated"}>Last updated {timer} minute(s) ago</p>
                    <RefreshIcon className={"updateButton"} onClick={() => {refresh()}} />
                </div>
            </div>
        </>
    )
}

export default MidSectionLower