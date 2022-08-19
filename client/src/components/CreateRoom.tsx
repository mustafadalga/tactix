import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { roomService } from "@/services";
import { setGameOwnerStatus, setRoomInformation, setUsername } from "@/store/tactix";
import { RootState } from "@/store";
import ClipBoard from "@/icons/ClipBoard";
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
            <h2 className="text-lg text-center">
                Create your room and join the room
            </h2>


            <div className="grid grid-cols-4 gap-3">
                <span className="col-span-1 text-sm text-gray-600">Game Owner</span>
                <input type="text"
                       className="col-span-3 border-b-2 border-gray-300 focus:border-purple-500  border-solid focus:outline-none bg-transparent"
                       value={username}
                       onChange={event => handleUsername(event)}/>
            </div>

            <div className="grid place-items-center">
                <button className="bg-purple-700 text-white py-2.5 px-4 rounded-md shadow-md"
                        onClick={() => createRoom()}>
                    Create Game
                </button>
            </div>

            {roomID &&
                <>
                    <hr className="w-full"/>
                    <div className="grid grid-cols-12 gap-4">

                        <div className="col-span-2">
                            <span>Room ID :</span>
                        </div>

                        <div className="col-span-10 flex items-center gap-4">
                            <span>{roomID}</span>
                            <span onClick={() => copy(roomID)}>
                                <ClipBoard/>
                            </span>
                        </div>

                        <div className="col-span-2">
                            <span>Room URL :</span>
                        </div>

                        <div className="col-span-10 flex items-center gap-4">
                            <Link to={joinURL} className="text-blue-500">{fullJoinURL}</Link>
                            <span onClick={() => copy(fullJoinURL)}>
                                <ClipBoard/>
                            </span>
                        </div>

                    </div>
                </>
            }

            <div className="w-full bg-white grid place-items-center gap-3">
                <span className="text-base">OR</span>
                <Link to="/join" className="text-gray-400 underline text-sm"> Join a Game </Link>
            </div>

            {message.length > 0 &&
                <div className="mb-4 mx-8">
                    <Alert type="error" message={message} className="mx-auto"/>
                </div>
            }
        </div>
    );

}