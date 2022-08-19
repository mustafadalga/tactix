import CreateRoom from "@/components/CreateRoom";
import Alert from "@/components/Alert";
import  { useEffect, useState } from "react";
import {  useSearchParams } from "react-router-dom";


const Home = () => {
    let [ searchParams, setSearchParams ] = useSearchParams();
    const [ message, setMessage ] = useState("");
    const queryMessage: string = searchParams.get("message") || "";


    useEffect(() => {
        if (queryMessage) {
            searchParams.delete("message");
            setSearchParams(searchParams);
            setMessage(queryMessage)
        }
    }, []);


    return (
        <div className="w-full h-full px-4 pt-12 bg-indigo-900">
            <div className="max-w-2xl mx-auto rounded-lg shadow-lg">
                <CreateRoom/>

                {message.length > 0 &&
                    <div className="w-full bg-white flex items-center py-4">
                        <Alert type="error" message={message} className="mx-auto"/>
                    </div>
                }
            </div>
        </div>
    );
}

export default Home;