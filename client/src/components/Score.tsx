import ScoreNumber from "./ScoreNumber";
import ScoreTitle from "./ScoreTitle";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useEffect, useState } from "react";

interface Props {
    playerLeft: number,
    playerRight: number
}

export default function Score(props: Props) {
    const room = useSelector((state: RootState) => state.tactix.room);
    const [ playerClasses, updatePlayerClasses ] = useState({
        playerLeft: "animate-bounceInDown",
        playerRight: "animate-bounceInDown"
    });


    // Remove bounceInDown animation
    useEffect(() => {
        const interval = setInterval(() => {
            updatePlayerClasses({
                playerLeft: "",
                playerRight: "",
            });

        }, 2000);

        return () => clearInterval(interval);
    }, []);


    //add animate for winner.
    useEffect(() => {
        if (room.isGameFinished) {

            if (room.winnerPlayer == room.playerLeft.username) {
                return updatePlayerClasses({
                    playerLeft: "animate-flip",
                    playerRight: "",
                });
            }

            if (room.winnerPlayer == room.playerRight.username) {
                return updatePlayerClasses({
                    playerLeft: "",
                    playerRight: "animate-flip"
                });
            }
        }

    }, [ room.isGameFinished ])

    return (
        <div className="flex items-center justify-center gap-8 sm:gap-10 w-full">
            <ScoreNumber number={props.playerLeft} className={playerClasses.playerLeft}/>
            <ScoreTitle title="Score"/>
            <ScoreNumber number={props.playerRight} className={playerClasses.playerRight}/>
        </div>
    );
}
