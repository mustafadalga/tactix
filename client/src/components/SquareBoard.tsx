import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Stone from "./Stone"
import IStoneInterface from "@/types/IStoneInterface";
import Tactix from "@/classes/Tactix";
import { RootState } from "@/store";
import { removeSelectedStones, setSelectedStone } from "@/store/tactix";

interface Props {
    setMessage: (params: any) => any;
}

export default function Board({ setMessage }: Props) {
    const tactix = new Tactix();
    const room = useSelector((state: RootState) => state.tactix.room);
    const username = useSelector((state: RootState) => state.tactix.localStorage.username);
    const removedStones = useSelector((state: RootState) => state.tactix.removedStones);
    const selectedStones = useSelector((state: RootState) => state.tactix.selectedStones);
    const dispatch = useDispatch();

    // Append stone
    const appendSelectedStone = (stone: IStoneInterface) => {
        if (room.isGameFinished) {
            return setMessage("Game over!");
        }

        if (!room.isGameStarted) {
            return setMessage("The game has not started yet!");
        }

        if (room.moveOrder != username) {
            return setMessage("Move order is on the opposite side!");
        }

        if (tactix.isSelectedStoneExist(removedStones, selectedStones, stone)) return;

        dispatch(setSelectedStone(stone));
    }

    // Handle stone situation
    useEffect(() => {
        handleStone();
    }, [ selectedStones ]);

    const handleStone = () => {
        if (!tactix.isChainCheck(selectedStones)) return;

        const firstStone = selectedStones[0];
        const lastStone = selectedStones[selectedStones.length - 1];


        if (tactix.isChainCross(firstStone, lastStone)) {
            return dispatch(removeSelectedStones());
        }

        const direction = tactix.getChainDirection(firstStone, lastStone);

        if (!direction) {
            return dispatch(removeSelectedStones());
        }

        const stoneChain = tactix.hasStoneChain(selectedStones, direction);

        if (!stoneChain) {
            return dispatch(removeSelectedStones());
        }
    }

    return (
        <div
            className="grid grid-rows-4 grid-cols-4 w-60 h-60 2xs:w-64 2xs:h-64  xs:w-[25rem] xs:h-[25rem] sm:w-[30rem] sm:h-[30rem] md:w-[36rem] md:h-[36rem]  border-white border-2 ">

            {tactix.getStones().map((stone, stoneIndex) =>

                <Stone
                    key={stoneIndex}
                    stone={stone}
                    selectedStone={tactix.isSelectedStoneExist(removedStones, selectedStones, stone)}
                    appendSelectedStone={appendSelectedStone}/>
            )}
        </div>
    );
}
