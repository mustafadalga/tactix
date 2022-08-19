import IStoneInterface from "@/types/IStoneInterface";
import { Direction } from "@/enums";

export default class Tactix {
    private rowLength: number
    private columnLength: number
    private stones: IStoneInterface[]
    private stonesControlLimit: number
    private rowDiffLimit: number
    private columnDiffLimit: number

    constructor() {
        this.rowLength = 4;
        this.columnLength = 4;
        this.stonesControlLimit = 2
        this.rowDiffLimit = 1
        this.columnDiffLimit = 1
        this.stones = [
            {"row": 1, "col": 1},
            {"row": 1, "col": 2},
            {"row": 1, "col": 3},
            {"row": 1, "col": 4},
            {"row": 2, "col": 1},
            {"row": 2, "col": 2},
            {"row": 2, "col": 3},
            {"row": 2, "col": 4},
            {"row": 3, "col": 1},
            {"row": 3, "col": 2},
            {"row": 3, "col": 3},
            {"row": 3, "col": 4},
            {"row": 4, "col": 1},
            {"row": 4, "col": 2},
            {"row": 4, "col": 3},
            {"row": 4, "col": 4}
        ]
    }

    getStones() {
        return this.stones;
    }

    isSelectedStoneExist(removedStones:IStoneInterface[], selectedStones: IStoneInterface[], selectedStone: IStoneInterface) {

        if (removedStones.some(stone => stone.row == selectedStone.row && stone.col == selectedStone.col)) {
            return true;
        }

        return selectedStones.some(stone => stone.row == selectedStone.row && stone.col == selectedStone.col);
    }

    isChainCheck(stones: IStoneInterface[]) {
        return stones.length >= this.stonesControlLimit;
    }

    isChainCross(firstStone: IStoneInterface, lastStone: IStoneInterface) {
        return !((firstStone.row == lastStone.row) || (firstStone.col == lastStone.col));
    }

    getChainDirection(firstStone: IStoneInterface, lastStone: IStoneInterface) {
        if (firstStone.row == lastStone.row) {
            return Direction.Horizontal;

        } else if (firstStone.col == lastStone.col) {
            return Direction.Vertical;
        }
    }

    hasStoneChain(stones: IStoneInterface[], direction: string) {
        let status = true;

        for (let index = 0; index < stones.length - 1; index++) {

            if (direction == Direction.Horizontal) {

                if (Math.abs(stones[index].col - stones[index + 1].col) != this.columnDiffLimit) {
                    status = false;
                    break;
                }
            } else if (direction == Direction.Vertical) {
                if (Math.abs(stones[index].row - stones[index + 1].row) != this.rowDiffLimit) {
                    status = false;
                    break;
                }
            }
        }

        return status;
    }
}