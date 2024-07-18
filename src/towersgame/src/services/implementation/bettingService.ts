import { Difficulty } from "../../enums/difficulty";
import { ScoreSystemHelper } from "../../helper/scoreSystemHelper";
import { IBettingService } from "../intefaces/ibettingService";

export class BettingService implements IBettingService {

    private bettingAmounts: number[] = [0.2, 0.4, 0.6, 0.8, 1, 1.2, 1.4, 1.6, 1.8, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 50, 75, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000];

    /**
     * Displays potential multiplication of winning amount
     * Uses actual row number from 1
     */
    getTop5RewardList = (difficulty: Difficulty, rowNumber: number) : number[] => {
        const rowIndex = rowNumber - 1;
        const deduction = (rowIndex - 4);
        const toValue = deduction < 0 ? 0 : deduction;
        console.log(toValue);
        const rewardList = [];
        for (let i = rowIndex; toValue <= i; i--) {
            rewardList.push(ScoreSystemHelper.getRewardMultiplierFor(difficulty, i));
        }
        return rewardList;
    }

    /**
     * Calculate how much the user will get
     * Uses actual row number from 1 to the number of rows
    */
    calculateCollectionAmount = (difficulty: Difficulty, rowNumber: number,bettingAmount: number) : number => {
        const rowIndex = rowNumber - 1;

        return ScoreSystemHelper.getRewardMultiplierFor(difficulty, rowIndex) * bettingAmount;
    }

    /**
     * 
     * @param bettingAmount
     * @returns
     */
    increaseBetFrom = (bettingAmount: number) : number => {
        //find higher betting index
        let index: number = this.bettingAmounts.findIndex(num => num == bettingAmount);
        if (index < (this.bettingAmounts.length - 1)) {
            index++;
        }
        return this.bettingAmounts[index];
    }

    /**
     * 
     * @param bettingAmount
     * @returns
     */
    decreaseBetFrom = (bettingAmount: number): number => {
        //find lower betting index
        let index: number = this.bettingAmounts.findIndex(num => num == bettingAmount);
        if (index > 0) {
            index--;
        }
        return this.bettingAmounts[index];
    }
    /**
    * Display betting percentage
    * @param bettingAmount
    * @returns
    */
    getBetPercentageFrom = (bettingAmount: number) : number => {

        const bettingIndex    = this.bettingAmounts.findIndex(num => num == bettingAmount);
        const betAmountLength = this.bettingAmounts.length - 1;
        const percentage      = (bettingIndex / betAmountLength) * 100;

        return Math.round(percentage);
    }
}