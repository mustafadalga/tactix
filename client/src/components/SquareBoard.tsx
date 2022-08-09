import Stone from "./Stone"
import { useEffect } from "react";
import StoneInterface from "../types/StoneInterface";
import Tactix from "../classes/Tactix";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { removeSelectedStones, setSelectedStone } from "../store/tactix";



export default function Board() {
    const tactix = new Tactix();

    const moves = useSelector((state: RootState) => state.tactix.moves);
    const selectedStones = useSelector((state: RootState) => state.tactix.selectedStones);
    const dispatch = useDispatch();


    useEffect(() => {
        handleStone();
    }, [ selectedStones ]);

    const appendSelectedStone = (stone: StoneInterface) => {
        if (tactix.isSelectedStoneExist(moves, selectedStones, stone)) return;

        dispatch(setSelectedStone(stone));
    }

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
            className="grid grid-rows-4 grid-cols-4 w-60 h-60 2xs:w-64 2xs:h-64  xs:w-[25rem] xs:h-[25rem] sm:w-[30rem] sm:h-[30rem] md:w-[36rem] md:h-[36rem]  shadow-[0_0px_6px_-1px_rgba(0,0,0,0.3)]  shadow-white">

            {tactix.getStones().map((stone, stoneIndex) =>

                <Stone
                    key={stoneIndex}
                    stone={stone}
                    selectedStone={tactix.isSelectedStoneExist(moves, selectedStones, stone)}
                    appendSelectedStone={appendSelectedStone}/>
            )}
        </div>
    );
}
