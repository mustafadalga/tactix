import IconExclamationCircle from "@/icons/IconExclamationCircle";
import {
    changeModalVisibility,
    removeLocalStorageKey,
    removeSelectedStones,
    setGameExitStatus,
    setRemovedStones,
    setRoomInformation
} from "@/store/tactix";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ModalWarningGameExit() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGameExitButton = () => {
        dispatch(setGameExitStatus(false));
        dispatch(setRoomInformation({}));
        dispatch(setRemovedStones([]));
        dispatch(removeSelectedStones());
        dispatch(removeLocalStorageKey('gameOwner'));
        dispatch(changeModalVisibility({
            modal: "gameExitConfirm",
            status: false,
            data: {}
        }));
        dispatch(changeModalVisibility({
            modal: "gameExitWarning",
            status: false,
            data: {}
        }));
        return navigate("/");
    }

    return (
        <div
            className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-modal md:h-full justify-center items-center flex bg-black/[.75]">
            <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                    <div className="p-6 text-center">
                        <IconExclamationCircle className="w-14 h-14 mx-auto mb-4 text-gray-400 dark:text-gray-200"/>

                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Your opponent is out of the game. The game has ended!
                        </h3>

                        <button
                            onClick={()=>handleGameExitButton()}
                            className="text-dodger-blue border-2 border-dodger-blue hover:text-white  hover:bg-dodger-blue focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                            <span>Exit Game</span>
                        </button>

                    </div>
                </div>
            </div>
        </div>

    )
}