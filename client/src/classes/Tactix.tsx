import StoneInterface from "../types/StoneInterface";
import { Direction } from "../enums";

export default class Tactix {
    private rowLength: number
    private columnLength: number
    private stones: StoneInterface[]
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
            {"row": 1, "col": 3},
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

    isSelectedStoneExist(moves:StoneInterface[],selectedStones: StoneInterface[], selectedStone: StoneInterface) {

        if (moves.some(move => move.row == selectedStone.row && move.col == selectedStone.col)) {
            return true;
        }

        return selectedStones.some(stone => stone.row == selectedStone.row && stone.col == selectedStone.col);
    }

    isChainCheck(stones: StoneInterface[]) {
        return stones.length >= this.stonesControlLimit;
    }

    isChainCross(firstStone: StoneInterface, lastStone: StoneInterface) {
        return !((firstStone.row == lastStone.row) || (firstStone.col == lastStone.col));
    }

    getChainDirection(firstStone: StoneInterface, lastStone: StoneInterface) {
        if (firstStone.row == lastStone.row) {
            return Direction.Horizontal;

        } else if (firstStone.col == lastStone.col) {
            return Direction.Vertical;
        }
    }

    hasStoneChain(stones: StoneInterface[], direction: string) {
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