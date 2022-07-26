import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setRoomInformation, setUsername } from "../store/tactix";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { roomService } from "../services";
import axios from "axios";
import Alert from "./Alert";

type ErrorResponse = {
    message: string;
};


export default function JoinRoom() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const room = useSelector((state: RootState) => state.tactix.room);
    const username = useSelector((state: RootState) => state.tactix.username);
    const roomID = room._id;
    let [ message, setMessage ] = useState("");


    const handleUsername = (event: React.FormEvent<HTMLInputElement>) => {
        const value = (event.target as HTMLInputElement).value;
        dispatch(setUsername(value))
    }

    const handleJoinButton = async () => {
        setMessage("");

        if (!username.length){
            return setMessage("Please enter a username.");
        }
        if (!roomID){
            return setMessage("Please enter a username.");
        }

        try {

            const response = await roomService.getRoom(roomID);
            dispatch(setRoomInformation(response.data));
            navigate(`/room/${roomID}`);

        } catch (error) {

            if (axios.isAxiosError(error) && error.response) {
                return setMessage((error.response?.data as ErrorResponse).message);
            }

            setMessage("An error occurred during fetching room information. Please try again later.");
        }
    };


    return (
        <div className="grid gap-8 bg-white p-6 p-6 ">
            <h2 className="text-lg text-center">
                Join your room to begin the game
            </h2>

            <div className="grid grid-cols-4 gap-3">
                <span className="col-span-1 text-sm text-gray-600">Username</span>
                <input type="text"
                       className="col-span-3 border-b-2 border-gray-300 focus:border-purple-500  border-solid focus:outline-none bg-transparent"
                       value={username}
                       onChange={event => handleUsername(event)}/>
            </div>

            <div className="grid grid-cols-4 gap-3">
                <span className="col-span-1 text-sm text-gray-600">Room ID</span>
                <input type="text"
                       className="col-span-3 border-b-2 border-gray-300 focus:border-purple-500  border-solid focus:outline-none bg-transparent"
                       defaultValue={roomID}/>
            </div>

            <div className="grid place-items-center">
                <button className="bg-purple-700 text-white py-2.5 px-4 rounded-md shadow-md m-4"
                   onClick={()=>handleJoinButton()}>
                    Join Room
                </button>
            </div>

            {message.length > 0 &&
                <div className="grid place-items-center">
                    <Alert type="error" message={message}/>
                </div>
            }

        </div>
    );
}