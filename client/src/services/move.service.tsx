import axios from "axios";

export const moveService = {
    createMove(data: Object) {
        return axios.post('/move/create', data);
    },
    getRoom(roomID: string) {
        const config = {params: {roomID: roomID}};
        return axios.get(`/move/list`, config);
    },
    deleteMovesByRoomID(roomID: string) {
        const config = {params: {roomID: roomID}};
        return axios.delete(`/move/delete`, config);
    }
}