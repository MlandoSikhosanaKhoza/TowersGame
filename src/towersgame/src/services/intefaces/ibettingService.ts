import { Difficulty } from "../../enums/difficulty";

export interface IBettingService {
    getTop5RewardList(difficulty: Difficulty, rowNumber: number): number[];
    calculateCollectionAmount(difficulty: Difficulty, rowNumber: number, bettingAmount: number): number;
}