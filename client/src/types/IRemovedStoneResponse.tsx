import IStoneInterface from "./IStoneInterface";

export default interface IRemovedStoneResponse {
    status: boolean,
    message: string,
    lastMove: IStoneInterface[]
}