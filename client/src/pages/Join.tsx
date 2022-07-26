import JoinRoom from "../components/JoinRoom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { setRoomInformation } from "../store/tactix";
import { useDispatch } from "react-redux";


export default function Join() {
    const { roomID } = useParams<{}>() as { roomID: string };
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setRoomInformation({
            _id: roomID
        }))
    }, []);

    return (
        <div className="w-full h-full px-4 pt-12 bg-indigo-900">
            <div className="max-w-2xl mx-auto grid bg-white rounded-lg shadow-lg">
                <JoinRoom/>
            </div>
        </div>
    )
}