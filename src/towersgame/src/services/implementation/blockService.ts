import { Difficulty } from "../../enums/difficulty";
import { BlockCalculationHelper } from "../../helper/blockCalculationHelper";
import { ScoreSystemHelper } from "../../helper/scoreSystemHelper";
import { Block } from "../../models/block";
import { BombBlock } from "../../models/bombBlock";
import { DiamondBlock } from "../../models/diamondBlock";
import { IBlockService } from "../intefaces/iblockService";

export class BlockService implements IBlockService {
    
    generateTower = (layers: number): Block[][] => {
        //Initialize Tower
        const tower: Block[][] = [];

        //Initialise the number of blocks for each row
        let numOfBlocks;

        for (let i = 0; i < layers; i++) {
            //Calculate the blocks for each row
            numOfBlocks = BlockCalculationHelper.getNumberOfBlocks(i);
            //Initialise the blocks for each row
            const blocks: Block[] = [];

            for (let j = 0; j < numOfBlocks; j++) {
                blocks.push(new Block());
            }
            tower.push(blocks);
        }
        return tower;
    }

    substituteTowerValues(tower: Block[][], difficulty?: Difficulty) {
        let numOfBombs = -1;
        let listOfBombPositions: number[] = [];
        for (let layerIndex = 0; layerIndex < tower.length; layerIndex++) {
            const rowOfBlocks = tower[layerIndex];
            numOfBombs = ScoreSystemHelper.getNumberOfBombsFor(difficulty!, layerIndex);
            listOfBombPositions = this.generateUniqueRandoms(numOfBombs ?? 0, 0, rowOfBlocks.length - 1);
            //Add bombs to Blocks
            for (let i = 0; i < rowOfBlocks.length; i++) {
                const bombPosition = listOfBombPositions.find(val => val == i);
                if (bombPosition != undefined) {
                    rowOfBlocks[i] = new BombBlock();
                } else {
                    rowOfBlocks[i] = new DiamondBlock();
                }
            }
        }
    }
    /**
     * Displays the current row for the tower
     * The number starts from 1 to the number of rows
     * @param rowNumber
     */
    displayRow(tower: Block[][], rowNumber: number) {
        const index = (rowNumber) - 1;
        tower[index].map(block => { block.isDisplayed = true; return block });
    }

    private generateUniqueRandoms(count: number, min: number, max: number): number[] {
        const uniqueRandoms = new Set<number>();

        while (uniqueRandoms.size < count) {
            const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
            uniqueRandoms.add(randomNum);
        }

        return Array.from(uniqueRandoms);
    }
}