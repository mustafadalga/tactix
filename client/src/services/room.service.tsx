import axios from "axios";

export const roomService = {
    createRoom(gameOwner: string) {
        return axios.post('/api/room/create', {gameOwner: gameOwner});
    },
    getRoom(roomID: string) {
        return axios.get(`/api/room/${roomID}`);
    },
}