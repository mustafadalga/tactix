import axios from "axios";

export const roomService = {
    createRoom() {
        return axios.post('/create-room');
    },
    getRoom(roomID: string) {
        return axios.get(`/room/${roomID}`);
    },
    updateRoom(roomID: string, data: Object) {
        return axios.patch(`/room/${roomID}`, data);
    },
    deleteRoom(roomID: string) {
        return axios.delete(`/room/${roomID}`);
    }
}