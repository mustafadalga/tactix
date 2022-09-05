import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import SquareBoard from "@/components/SquareBoard";
import Gamer from "@/components/Gamer";
import Score from "@/components/Score";
import Alert from "@/components/Alert";
import { RootState } from "@/store";
import Socket from "@/classes/Socket";
import SquardBoardButtonGroup from "@/components/SquardBoardButtonGroup";
import { removeLocalStorageKey } from "@/store/tactix";
const ModalWarningGameExit = lazy(() => import("@/components/ModalWarningGameExit"));
const ModalConfirmGameExit = lazy(() => import("@/components/ModalConfirmGameExit"));



export default function Room() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {roomID} = useParams<{}>() as { roomID: string };
    const [ message, setMessage ] = useState("");
    const [ playerClasses, updatePlayerClasses ] = useState({
        playerLeft: "",
        playerRight: ""
    });
    const username = useSelector((state: RootState) => state.tactix.localStorage.username);
    const room = useSelector((state: RootState) => state.tactix.room);
    const modals = useSelector((state: RootState) => state.tactix.modals);


    const handleRoom = async () => {

        if (!username) {
            return navigate(`/?message=Please enter a username.`)
        }

        Socket.joinRoom(roomID, username);
        Socket.setRoomInformation(navigate, dispatch);
        Socket.setMessage(setMessage);
        Socket.setRemovedStones(dispatch, setMessage);
        Socket.setRemovedStone(dispatch, setMessage);
        Socket.setGameExitStatus(dispatch);
        Socket.showGameExitWarning(dispatch, username);
    }

    // Handle room information
    useEffect(() => {
        handleRoom();
    }, []);

    // Delete moveOrder localStorage value when game starts
    useEffect(() => {
        if (room.isGameStarted) {
            dispatch(removeLocalStorageKey('gameOwner'));
        }
    }, [ room.isGameStarted ]);

    // Destroy Messages
    useEffect(() => {
        const interval = setInterval(() => {
            setMessage("");
        }, 2500);

        return () => clearInterval(interval);
    }, [ message ]);


    // Add box-shadow effect to Player component for active player(moveOrder)
    useEffect(() => {
        if (room.moveOrder) {
            if (room.moveOrder == room.playerLeft.username) {
                return updatePlayerClasses({
                    playerLeft: "shadow-[0_0px_24px_0px_rgba(0,0,0,0.3)] shadow-white border-2 border-white border-l-0 !h-4/5",
                    playerRight: "",
                });
            }

            if (room.moveOrder == room.playerRight.username) {
                return updatePlayerClasses({
                    playerLeft: "",
                    playerRight: "shadow-[0_0px_24px_0px_rgba(0,0,0,0.3)] shadow-white border-2 border-white border-r-0 !h-4/5"
                });
            }
        }


    }, [ room.moveOrder ]);


    // Delete player box-shadow effect when game over and add animate for winner.
    useEffect(() => {
        if (room.isGameFinished) {

            if (room.winnerPlayer == room.playerLeft.username) {
                return updatePlayerClasses({
                    playerLeft: "animate-player",
                    playerRight: "",
                });
            }

            if (room.winnerPlayer == room.playerRight.username) {
                return updatePlayerClasses({
                    playerLeft: "",
                    playerRight: "animate-player"
                });
            }
        }

    }, [ room.isGameFinished ])

    return (
        <div
            className="w-full h-full min-h-screen grid grid-rows-[1.5fr_8.5fr]">

            <section className="w-full flex items-center justify-center p-4">
                {room.playerLeft && room.playerRight &&
                    <Score playerLeft={room.playerLeft.score} playerRight={room.playerRight.score}/>
                }
            </section>

            <section className="grid grid-cols-12">

                <div className="col-span-1 grid">
                    {room.playerLeft &&
                        <Gamer gamer={room.playerLeft.username}
                               className={`rounded-tr-3xl rounded-br-3xl ${playerClasses.playerLeft}`}/>
                    }
                </div>

                <div className="col-span-10 flex justify-center flex-col items-center gap-4 md:gap-6 2xl:gap-8">
                    <SquareBoard setMessage={setMessage}/>
                    <SquardBoardButtonGroup setMessage={setMessage}/>
                </div>

                <div className="col-span-1 grid">
                    {room.playerRight &&
                        <Gamer gamer={room.playerRight.username}
                               className={`rounded-tl-3xl rounded-bl-3xl ml-auto ${playerClasses.playerRight}`}/>
                    }
                </div>

            </section>

            {message.length > 0 &&
                <div className="absolute top-4 right-4 w-48 md:w-60	lg:w-80">
                    <Alert type="error" message={message}/>
                </div>
            }


            <Suspense fallback={<div>loading</div>}>
                {modals.gameExitConfirm.status && <ModalConfirmGameExit/>}
                {modals.gameExitWarning.status && <ModalWarningGameExit/>}
            </Suspense>

        </div>
    );
}
