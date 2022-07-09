
export default function JoinRoom() {
    return (
        <div className="grid gap-8 bg-white p-6 p-6 ">
            <h2 className="text-lg text-center">
                Join your room to begin the game
            </h2>

            <div className="grid grid-cols-4 gap-3">
                <span className="col-span-1 text-sm text-gray-600">Username</span>
                <input type="text"
                       className="col-span-3 border-b-2 border-gray-300 focus:border-purple-500  border-solid focus:outline-none bg-transparent"/>
            </div>

            <div className="grid grid-cols-4 gap-3">
                <span className="col-span-1 text-sm text-gray-600">Room ID</span>
                <input type="text"
                       className="col-span-3 border-b-2 border-gray-300 focus:border-purple-500  border-solid focus:outline-none bg-transparent"/>
            </div>

            <div className="grid place-items-center">
                <button className="bg-purple-700 text-white py-2.5 px-4 rounded-md shadow-md m-4">
                    Join Room
                </button>
            </div>
        </div>
    );
}