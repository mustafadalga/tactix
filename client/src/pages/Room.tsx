import SquareBoard from "../components/SquareBoard";
import Gamer from "../components/Gamer";
import Score from "../components/Score";
import IconHand from "../icons/IconHand";
import IconRefresh from "../icons/IconRefresh";
import { useNavigate, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../components/Alert";
import { RootState } from "../store";
import Socket from "../classes/Socket";
import SquardBoardButtonGroup from "../components/SquardBoardButtonGroup";

export default function Room() {
    const socket = new Socket();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {roomID} = useParams<{}>() as { roomID: string };
    const room = useSelector((state: RootState) => state.tactix.room);
    const [ message, setMessage ] = useState("");
    const username = useSelector((state: RootState) => state.tactix.username);

    const handleRoom = async () => {
        if (!username) {
            return navigate(`/?message=Please enter a username.`)
        }

        socket.joinRoom(roomID, username);
        socket.setRoomInformation(navigate, dispatch);
        socket.setMessage(setMessage);
        socket.setRemovedStones(dispatch,setMessage);
        socket.setRemovedStone(dispatch,setMessage);
    }

    useEffect(() => {
        handleRoom();

    }, []);


    return (
        <div className="relative w-full h-full grid grid-rows-[15%_85%] bg-indigo-900">

            <section className="w-full flex items-center justify-center p-4">
                <Score playerLeft={room.playerLeftScore} playerRight={room.playerRightScore}/>
            </section>

            <section className="grid grid-cols-12">

                <div className="col-span-1 grid">
                    <Gamer gamer={room.playerLeft} className="rounded-tr-3xl rounded-br-3xl bg-light-blue text-white"/>
                </div>

                <div className="col-span-10 flex justify-center flex-col items-center gap-4 md:gap-6 2xl:gap-8">
                    <SquareBoard/>
                    <SquardBoardButtonGroup setMessage={setMessage}/>
                </div>

                <div className="col-span-1 grid">
                    <Gamer gamer={room.playerRight}
                           className="rounded-tl-3xl rounded-bl-3xl ml-auto bg-cyber-yellow text-black shadow-[0_0px_15px_0px_rgba(0,0,0,0.3)] shadow-white"/>
                </div>

            </section>

            {message.length > 0 &&
                <div className="absolute top-4 right-4 w-48 md:w-60	lg:w-80">
                    <Alert type="error" message={message}/>
                </div>
            }
        </div>
    );
}
