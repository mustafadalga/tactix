export default interface IRoomInformationResponse {
    status: boolean,
    message: string,
    room: {
        [key: string]: any
    },
}