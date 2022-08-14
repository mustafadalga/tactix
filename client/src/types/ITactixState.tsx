import IStoneInterface from "./IStoneInterface";

export default interface TactixState {
    room: {
        [key: string]: any;
    },
    removedStones: IStoneInterface[],
    selectedStones: IStoneInterface[],
    localStorage: {
        [key: string]: any
    }
}