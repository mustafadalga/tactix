import axios from "axios";

export const roomService = {
    createRoom(gameOwner: string) {
        return axios.post('/room/create', {gameOwner: gameOwner});
    },
    getRoom(roomID: string) {
        return axios.get(`/room/${roomID}`);
    },
}