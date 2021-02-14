import CardFavourite from "./cardFavourite";
import React, {useContext, useEffect, useState} from "react";
import {FavouriteContext} from "../contexts/favouriteContext";
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import { motion } from "framer-motion"

const Favourite = () => {
    const { favourite, removeFavourite } = useContext(FavouriteContext)
    const [empty, setEmpty] = useState(true)

    useEffect(() => {
        if (favourite.length === 0) {
            setEmpty(true)
        } else {
            setEmpty(false)
        }
    }, [favourite])

    const remove = (city) => {
        removeFavourite(city)
    }

    return (
        <>
            { empty ?
                <p className={"placeholder"}>Currently no favourites...</p>
                :
                <div className={"cardsContainer"}>
                    { favourite.map((location, i) => {
                        return (
                            <motion.div className={"cardContainer cardContainerSmall cardContainerMedium"}
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.2, delay: 0.15*(i*0.5) }}>
                                <CardFavourite weather={location} />
                                <RemoveCircleOutlineIcon className={"favouriteRemove"}
                                                         style={{ color: "#646464" }}
                                                         onClick={() => {remove(location.city)}}
                                />
                            </motion.div>
                        )
                    })}
                </div>
            }
        </>
    )
}

export default Favourite