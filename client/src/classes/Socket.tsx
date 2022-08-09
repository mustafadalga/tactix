import { io } from "socket.io-client"
import { setMove, setMoves, setRoomInformation } from "../store/tactix";
import ISocket from "../types/ISocket";
import IRoomInformationResponse from "../types/IRoomInformationResponse";
import IMoveResponse from "../types/IMoveResponse";
import IMovesResponse from "../types/IMovesResponse";

export default class Socket {
    private serverURL: string
    private socket: ISocket

    constructor() {
        this.serverURL = process.env.REACT_APP_SERVER_URL || ""
        this.socket = io(this.serverURL)
    }

    joinRoom(roomID: string, username: string) {
        this.socket.emit("joinRoom", {
            roomID: roomID,
            username: username
        });
    }

    setRoomInformation(navigate: any, dispatch: any) {

        this.socket.on('roomInformation', (response: IRoomInformationResponse) => {
            if (response.status) {
                return dispatch(setRoomInformation(response.room));
            }

            return navigate(`/?message=${response.message}`)
        });

    }

    setMoves(dispatch: any, setMessage: any) {
        this.socket.on('moves', (response: IMovesResponse) => {
            if (response.status) {
                return dispatch(setMoves(response.moves));
            }

            setMessage(response.message);
        });
    }


    createMove(roomID: string, move: object) {
        this.socket.emit("createMove", {
            roomID: roomID,
            move: move
        });
    }


    setMove(dispatch: any, setMessage: any) {
        this.socket.on('move', (response: IMoveResponse) => {
            if (response.status) {
                console.log(response.move)
                return dispatch(setMove(response.move));
            }

            setMessage(response.message);
        });
    }

    setMessage(setMessage: any) {
        this.socket.on('message', (message: string) => {
            setMessage(message)
        });
    }

}