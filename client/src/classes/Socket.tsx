import { io } from "socket.io-client"
import {
    changeModalVisibility,
    setGameExitStatus,
    setRemovedStone,
    setRemovedStones,
    setRoomInformation
} from "@/store/tactix";
import ISocket from "@/types/ISocket";
import IRoomInformationResponse from "@/types/IRoomInformationResponse";
import IRemovedStoneResponse from "@/types/IRemovedStoneResponse";
import IRemovedStonesResponse from "@/types/IRemovedStonesResponse";
import IStoneInterface from "@/types/IStoneInterface";
import IExitGameReponse from "@/types/IExitGameReponse";

class Socket {
    private serverURL: string
    private socket: ISocket

    constructor() {
        this.serverURL = import.meta.env.VITE__REACT_APP_SERVER_URL || ""
        this.socket = io(this.serverURL);
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

    setRemovedStones(dispatch: any, setMessage: any) {
        this.socket.on('removedStones', (response: IRemovedStonesResponse) => {

            if (response.status) {
                return dispatch(setRemovedStones(response.removedStones));
            }

            setMessage(response.message);
        });
    }

    setRemovedStone(dispatch: any, setMessage: any) {
        this.socket.on('lastMove', (response: IRemovedStoneResponse) => {

            if (response.status) {
                return response.lastMove.map(stone => dispatch(setRemovedStone(stone)))
            }

            setMessage(response.message);
        });
    }

    setMessage(setMessage: any) {
        this.socket.on('message', (message: string) => {
            setMessage(message)
        });
    }

    setGameExitStatus(dispatch: any) {
        this.socket.on('gameExit', (response: IExitGameReponse) => {

            dispatch(setGameExitStatus(response.status));

            if(response.message){
                dispatch(changeModalVisibility({
                    modal: "gameExitConfirm",
                    status: true,
                    data: {
                        message:response.message
                    }
                }));
            }
        });
    }

    showGameExitWarning(dispatch: any, username: string) {
        this.socket.on('showGameExitWarning', (response: IExitGameReponse) => {

            if (username == response.username) return;

            dispatch(changeModalVisibility({
                modal: "gameExitWarning",
                status: true,
                data: {
                    message: response.message
                }
            }));
        });
    }

    createMove(roomID: string, move: IStoneInterface[]) {
        this.socket.emit("createMove", {
            roomID: roomID,
            move: move
        });
    }

    startNewGame(roomID: string) {
        this.socket.emit("startNewGame", {
            roomID
        });
    }

    exitGame(roomID: string, username: string) {
        this.socket.emit("exitGame", {
            roomID,
            username
        });
    }
}

const socketInstance = new Socket();

export default socketInstance;
