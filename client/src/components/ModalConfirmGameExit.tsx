import IconExclamationCircle from "@/icons/IconExclamationCircle";
import IconCloseCircle from "@/icons/IconCloseCircle";
import Socket from "@/classes/Socket";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
    changeModalVisibility,
    removeLocalStorageKey,
    removeSelectedStones,
    setGameExitStatus,
    setRemovedStones,
    setRoomInformation
} from "@/store/tactix";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "@/components/Alert";

export default function ModalConfirmGameExit() {
    const room = useSelector((state: RootState) => state.tactix.room);
    const gameExit = useSelector((state: RootState) => state.tactix.gameExit);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const modals = useSelector((state: RootState) => state.tactix.modals);
    const username = useSelector((state: RootState) => state.tactix.localStorage.username);


    useEffect(() => {
        if (gameExit) {
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
            return navigate("/");
        }
    }, [ gameExit ]);

    const handleCancelButton = () => {
        dispatch(changeModalVisibility({
            modal: "gameExitConfirm",
            status: false,
            data: {}
        }));
    }

    const handleGameExitButton = () => {
        Socket.exitGame(room._id, username);
    }

    return (
        <div
            className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 md:inset-0 h-full md:h-full justify-center items-center flex bg-black/[.75]">
            <div className="relative p-4 w-full max-w-md h-full md:h-auto">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                    <button type="button"
                            onClick={()=>handleCancelButton()}
                            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white">
                        <IconCloseCircle/>
                        <span className="sr-only">Close modal</span>
                    </button>

                    <div className="p-6 text-center">
                        <IconExclamationCircle className="w-14 h-14 mx-auto mb-4 text-gray-400 dark:text-gray-200"/>

                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure you want to exit this game?
                        </h3>

                        <button
                            onClick={()=>handleGameExitButton()}
                            className="text-dodger-blue border-2 border-dodger-blue hover:text-white  hover:bg-dodger-blue focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                            <span>Yes, I'm sure</span>
                        </button>

                        <button
                           onClick={()=>handleCancelButton()}
                            className="text-gray-500 bg-white hover:bg-gray-100 focus:outline-none rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                            <span>No, cancel</span>
                        </button>

                        { modals.gameExitConfirm.data.message &&
                            <Alert className="mt-4 bg-transparent" type="error" message={modals.gameExitConfirm.data.message}/>
                        }

                    </div>

                </div>
            </div>
        </div>

    )
}