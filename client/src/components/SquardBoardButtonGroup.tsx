import { useDispatch, useSelector } from "react-redux";
import IconHand from "@/icons/IconHand";
import IconRefresh from "@/icons/IconRefresh";
import { RootState } from "@/store";
import Socket from "@/classes/Socket";
import { removeSelectedStones } from "@/store/tactix";

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

    return (
        <div className="flex justify-center items-center gap-6 flex-col sm:flex-row">
            <button
                onClick={()=>handleGetStones()}
                className="flex items-center gap-4 bg-white text-black py-2.5 px-6 rounded-md shadow-md whitespace-nowrap">
                <IconHand className="h-6"/>
                <span>Get Stones</span>
            </button>
            <button
                onClick={() => handleNewGameButton()}
                className="flex items-center gap-4 bg-white text-black py-2.5 px-6 rounded-md shadow-md whitespace-nowrap">
                <IconRefresh className="h-6"/>
                <span>Start New Game</span>
            </button>
        </div>
    )
}