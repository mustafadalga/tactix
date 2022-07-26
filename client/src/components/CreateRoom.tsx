import { Link } from "react-router-dom";
import { roomService } from "../services";
import { useDispatch, useSelector } from "react-redux";
import { setRoomInformation } from "../store/tactix";
import { RootState } from "../store";
import ClipBoard from "../icons/ClipBoard";
import { copy } from "../utils";
import axios from "axios";
import { useState } from "react";
import Alert from "./Alert";

type ErrorResponse = {
    message: string;
};

export default function CreateRoom() {
    const dispatch = useDispatch();
    const room = useSelector((state: RootState) => state.tactix.room);
    const roomID = room._id;
    const joinURL = `/join/${roomID}`;
    const fullJoinURL = `${window.location.origin}${joinURL}`;
    let [ message, setMessage ] = useState("");

    const createRoom = async () => {
        setMessage("");

        try{
            const response = await roomService.createRoom();
            dispatch(setRoomInformation(response.data))

        }catch (error){
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

            <div className="grid place-items-center">
                <button className="bg-purple-700 text-white py-2.5 px-4 rounded-md shadow-md"
                        onClick={() => createRoom()}>
                    Create Room
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

            {message.length > 0 &&
                <div className="mb-4 mx-8">
                    <Alert type="error" message={message} className="mx-auto"/>
                </div>
            }
        </div>
    );

}