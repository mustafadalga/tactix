import IStoneInterface from "./IStoneInterface";

export default interface IRemovedStonesResponse {
    status: boolean,
    message: string,
    removedStones: IStoneInterface[]
}