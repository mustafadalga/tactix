import { Link } from "react-router-dom";

export default function CreateRoom() {
    return (
        <div className="grid gap-8 bg-white p-6 border-purple-500 border-solid border-b-2">
            <h2 className="text-lg text-center">
                Create your room and join the room
            </h2>


        <div className="grid place-items-center">
            <button className="bg-purple-700 text-white py-2.5 px-4 rounded-md shadow-md">
                Create Room
            </button>
        </div>

            <hr className="w-full"/>

            <div>
                <h5>Room ID : 34534565</h5>
                <h5>Room URL :

                    <Link to="http://localhost:3000/" className="text-blue-500">https://dortleme.firebaseapp.com/signup</Link>
                </h5>
            </div>
        </div>
    );

}