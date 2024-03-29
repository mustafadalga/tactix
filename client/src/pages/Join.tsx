import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import JoinRoom from "@/components/JoinRoom";
import Alert from "@/components/Alert";
import { setRoomInformation } from "@/store/tactix";


export default function Join() {
    const { roomID } = useParams<{}>() as { roomID: string };
    const dispatch = useDispatch();
    let [ searchParams, setSearchParams ] = useSearchParams();
    const [ message, setMessage ] = useState("");
    const queryMessage: string = searchParams.get("message") || "";

    useEffect(() => {
        if (roomID){
            dispatch(setRoomInformation({
                _id: roomID
            }));
        }

        if (queryMessage) {
            searchParams.delete("message");
            setSearchParams(searchParams);
            setMessage(queryMessage)
        }

    }, []);

    return (
        <div className="w-full h-full px-4 pt-12 ">
            <div className="max-w-2xl mx-auto grid bg-white border-2 border-dodger-blue shadow-[0_0px_20px_0px_rgba(0,0,0,0.3)] shadow-dodger-blue">
                <JoinRoom/>

                {message.length > 0 &&
                    <div className="w-full bg-white flex items-center py-4">
                        <Alert type="error" message={message} className="mx-auto"/>
                    </div>
                }
            </div>
        </div>
    )
}