import { Difficulty } from "../../enums/difficulty";
import { ScoreSystemHelper } from "../../helper/scoreSystemHelper";
import { IBettingService } from "../intefaces/ibettingService";

export class BettingService implements IBettingService {
    /**
     * Displays potential multiplication of winning amount
     * Uses actual row number from 1
     */
    getTop5RewardList = (difficulty: Difficulty, rowNumber: number): number[] => {
        const rowIndex = rowNumber - 1;
        const deduction = (rowIndex - 5);
        const toValue = deduction < 0 ? 0 : deduction;
        console.log(toValue);
        const rewardList = [];
        for (let i = rowIndex; toValue < i; i--) {
            rewardList.push(ScoreSystemHelper.getRewardMultiplierFor(difficulty, i));
        }
        return rewardList;
    }

    /**
     * Calculate how much the user will get
     *  Uses actual row number from 1 to the number of rows
    */
    calculateCollectionAmount = (difficulty: Difficulty, rowNumber: number,bettingAmount: number) : number => {
        const rowIndex = rowNumber - 1;

        return ScoreSystemHelper.getRewardMultiplierFor(difficulty, rowIndex) * bettingAmount;
    }
}