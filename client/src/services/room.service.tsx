import axios from "axios";
axios.defaults.baseURL = import.meta.env.VITE__REACT_APP_SERVER_URL + "/api/"

export const roomService = {
    createRoom(gameOwner: string) {
        return axios.post('/room/create', {gameOwner: gameOwner});
    },
    getRoom(roomID: string) {
        return axios.get(`/room/${roomID}`);
    },
}