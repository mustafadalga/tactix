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
                className="btn-primary group">
                <IconHand className="h-4 lg:h-5 xl:h-6 fill-dodger-blue group-hover:fill-white"/>
                <span>Get Stones</span>
            </button>
            <button
                onClick={() => handleNewGameButton()}
                className="btn-primary group">
                <IconRefresh className="h-4 lg:h-5 xl:h-6 fill-dodger-blue group-hover:fill-white"/>
                <span>Start New Game</span>
            </button>
            <button
                onClick={() => handleExitGameButton()}
                className="btn-primary group">
                <IconExit className="h-4 lg:h-5 xl:h-6 fill-dodger-blue group-hover:fill-white"/>
            </button>
        </div>
    )
}