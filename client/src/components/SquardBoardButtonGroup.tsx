import IconHand from "../icons/IconHand";
import IconRefresh from "../icons/IconRefresh";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import Socket from "../classes/Socket";

interface Props {
    setMessage: (params: any) => any;
}

export default function SquardBoardButtonGroup({setMessage}: Props) {
    const selectedStones = useSelector((state: RootState) => state.tactix.selectedStones);
    const room = useSelector((state: RootState) => state.tactix.room);
    const roomID = room._id;
    const socket = new Socket();


    const handleGetStones = () => {
        setMessage("");

        if (!selectedStones.length) {
            return setMessage("Please select at least one stone!");
        }

        socket.createMove(roomID, selectedStones);
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
                className="flex items-center gap-4 bg-white text-black py-2.5 px-6 rounded-md shadow-md whitespace-nowrap">
                <IconRefresh className="h-6"/>
                <span>New Game</span>
            </button>
        </div>
    )
}