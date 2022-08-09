import StoneInterface from "./StoneInterface";

export default interface IMovesResponse {
    status: boolean,
    message: string,
    moves: StoneInterface[]
}