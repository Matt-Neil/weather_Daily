import CardToday from "./cardToday";
import React, {useContext, useEffect, useState} from "react";
import {MainContext} from "../contexts/mainContext";
import {motion} from "framer-motion";

const Today = () => {
    const main = useContext(MainContext)
    const [empty, setEmpty] = useState(true)

    useEffect(() => {
        if (main.main.today.length === 0 && main.main.city === "") {
            setEmpty(true)
        } else {
            setEmpty(false)
        }
    }, [main.main.today])

    return (
        <>
            { empty ?
                <p className={"placeholder"}>No location chosen...</p>
                :
                <div className={"cardsContainer"}>
                    { main.main.today.map((location, i) => {
                        return (
                            <motion.div className={"cardContainer cardContainerSmall cardContainerMedium"}
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.2, delay: 0.15*(i*0.5) }}>
                                <CardToday weather={location} />
                            </motion.div>
                        )
                    })}
                </div>
            }
        </>
    )
}

export default Today