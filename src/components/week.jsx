import React, {useContext, useEffect, useState} from "react";
import {MainContext} from "../contexts/mainContext";
import CardWeek from "./cardWeek";
import CardToday from "./cardToday";
import {motion} from "framer-motion";

const Week = () => {
    const main = useContext(MainContext)
    const [empty, setEmpty] = useState(true)

    useEffect(() => {
        if (main.main.week.length === 0) {
            setEmpty(true)
        } else {
            setEmpty(false)
        }
    }, [main.main.week])

    return (
        <>
            { empty ?
                <p className={"placeholder"}>No location chosen...</p>
                :
                <div className={"cardsContainer"}>
                    { main.main.week.map((location, i) => {
                        console.log(location)
                        return (
                            <motion.div className={"cardContainer cardContainerSmall cardContainerMedium"}
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.2, delay: 0.15*(i*0.5) }}>
                                <CardWeek weather={location} />
                            </motion.div>
                        )
                    })}
                </div>
            }
        </>
    )
}

export default Week