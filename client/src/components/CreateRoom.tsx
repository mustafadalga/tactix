import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { roomService } from "@/services";
import { setGameOwnerStatus, setRoomInformation, setUsername } from "@/store/tactix";
import { RootState } from "@/store";
import IconClipBoard from "@/icons/IconClipBoard";
import { copy } from "@/utils";
import Alert from "./Alert";

type ErrorResponse = {
    message: string;
};

export default function CreateRoom() {
    const dispatch = useDispatch();
    const room = useSelector((state: RootState) => state.tactix.room);
    const username = useSelector((state: RootState) => state.tactix.localStorage.username);
    const roomID = room._id;
    const joinURL = `/join/${roomID}`;
    const fullJoinURL = `${window.location.origin}${joinURL}`;
    const [ message, setMessage ] = useState("");


    useEffect(() => {
        dispatch(setRoomInformation({}));
    }, []);

    const handleUsername = (event: React.FormEvent<HTMLInputElement>) => {
        const value = (event.target as HTMLInputElement).value;
        dispatch(setUsername(value))
    }

    const createRoom = async () => {
        setMessage("");

        if (!username || !username.length) {
            return setMessage('Game owner could not found. Please enter a game owner username!');
        }
        try {
            const response = await roomService.createRoom(username);
            dispatch(setRoomInformation(response.data));
            dispatch(setGameOwnerStatus(true))

        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return setMessage((error.response?.data as ErrorResponse).message);
            }

            setMessage("An error occurred during creating room information. Please try again later.");
        }
    }

    return (
        <div className="grid gap-8 bg-white p-6 pb-10">
            <h2 className="text-lg md:text-xl xl:text-2xl	2xl:text-3xl text-center text-dodger-blue">
                Create your room and join the room
            </h2>


            <div className="grid grid-cols-4 gap-3">
                <span className="col-span-1 form-label">Game Owner</span>
                <input type="text"
                       className="col-span-3 form-input"
                       value={username}
                       onChange={event => handleUsername(event)}/>
            </div>

            <div className="grid place-items-center">
                <button className="btn-secondary"
                        onClick={() => createRoom()}>
                    Create Game
                </button>
            </div>

            {roomID &&
                <>
                    <hr className="w-full"/>
                    <div className="grid grid-cols-12 gap-4">

                        <div className="col-span-2">
                            <span className="form-label">Room ID :</span>
                        </div>

                        <div className="col-span-10 flex items-center gap-4 text-xs	md:text-sm xl:text-base">
                            <span>{roomID}</span>
                            <span onClick={() => copy(roomID)}>
                                <IconClipBoard/>
                            </span>
                        </div>

                        <div className="col-span-2">
                            <span className="form-label whitespace-nowrap">Room URL :</span>
                        </div>

                        <div className="col-span-10 flex items-center gap-4 text-xs	md:text-sm xl:text-base">
                            <Link to={joinURL} className="w-10/12 text-blue-500 break-words">{fullJoinURL}</Link>
                            <span onClick={() => copy(fullJoinURL)}>
                                <IconClipBoard/>
                            </span>
                        </div>

                    </div>
                </>
            }

            <div className="w-full bg-white grid place-items-center gap-3">
                <span className="text-base">OR</span>
                <Link to="/join" className="text-gray-400 underline text-xs md:text-sm"> Join a Game </Link>
            </div>

            {message.length > 0 &&
                <div className="mb-4 mx-8">
                    <Alert type="error" message={message} className="mx-auto"/>
                </div>
            }
        </div>
    );

}