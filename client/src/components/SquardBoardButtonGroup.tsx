import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import Socket from "@/classes/Socket";
import {
    changeModalVisibility,
    removeSelectedStones,
} from "@/store/tactix";
import IconExit from "@/icons/IconExit";
import IconHand from "@/icons/IconHand";
import IconRefresh from "@/icons/IconRefresh";

interface Props {
    setMessage: (params: any) => any;
}


export default function SquardBoardButtonGroup({setMessage}: Props) {
    const selectedStones = useSelector((state: RootState) => state.tactix.selectedStones);
    const room = useSelector((state: RootState) => state.tactix.room);
    const roomID = room._id;
    const dispatch = useDispatch();


    const handleGetStones = () => {
        setMessage("");

        if (!room.isGameStarted) return;

        if (!selectedStones.length) {
            return setMessage("Please select at least one stone!");
        }

        Socket.createMove(roomID, selectedStones);
        dispatch(removeSelectedStones());
    }

    const handleNewGameButton = () => {
        Socket.startNewGame(roomID);

        // Destroy  selected stones when new game start
        dispatch(removeSelectedStones());
    }

    const handleExitGameButton = () => {
        dispatch(changeModalVisibility({
            modal: "gameExitConfirm",
            status: true,
            data: {}
        }));
    }

    return (
        <div className="flex justify-center items-center gap-6 flex-col sm:flex-row">
            <button
                onClick={() => handleGetStones()}
                className="flex items-center justify-center gap-4 bg-white text-dodger-blue py-1.5 md:py-2  px-3 lg:px-4 xl:px-5 2xl:px-6  w-40 xs:w-auto text-xs md:text-sm lg:text-base rounded-md whitespace-nowrap border-dodger-blue border-[1.5px]">
                <IconHand className="h-4 lg:h-5 xl:h-6 fill-dodger-blue"/>
                <span>Get Stones</span>
            </button>
            <button
                onClick={() => handleNewGameButton()}
                className="flex items-center justify-center gap-4 bg-white text-dodger-blue py-1.5 md:py-2 px-3 lg:px-4 xl:px-5 2xl:px-6  w-40 xs:w-auto text-xs md:text-sm lg:text-base rounded-md whitespace-nowrap border-dodger-blue border-[1.5px]">
                <IconRefresh className="h-4 lg:h-5 xl:h-6 fill-dodger-blue"/>
                <span>Start New Game</span>
            </button>
            <button
                onClick={() => handleExitGameButton()}
                className="flex items-center justify-center gap-4 bg-white text-dodger-blue py-1.5 md:py-2 px-3 lg:px-4 xl:px-5 2xl:px-6  w-40 xs:w-auto text-xs md:text-sm lg:text-base rounded-md whitespace-nowrap border-dodger-blue border-[1.5px]">
                <IconExit className="h-4 lg:h-5 xl:h-6 fill-dodger-blue"/>
            </button>
        </div>
    )
}