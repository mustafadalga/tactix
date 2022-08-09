import StoneInterface from "./StoneInterface";

export default interface IMoveResponse {
    status: boolean,
    message: string,
    move: StoneInterface
}