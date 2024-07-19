import { Difficulty } from "../../enums/difficulty";

export interface IBettingService {
    getTop5RewardList(difficulty: Difficulty, rowNumber: number, noOfRows: number) : number[];
    calculateCollectionAmount(difficulty: Difficulty, bettingAmount: number, rowNumber: number, noOfRows: number) : number;
    increaseBetFrom(bettingAmount: number) : number;
    decreaseBetFrom(bettingAmount: number) : number;
    getBetPercentageFrom(bettingAmount: number) : number;
}