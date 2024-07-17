import { Difficulty } from "../enums/difficulty";

export class User {
    balance?: number;
    bettingAmount?: number;
    winnings?: number[];
    noOfRows?: number;
    currentLayer?: number;
    currentDifficulty?: Difficulty;
    isPlaying?: boolean;

    constructor() {
        this.balance           = 1000;
        this.bettingAmount     = 20;
        this.winnings          = [];
        this.noOfRows          = 8;
        this.currentLayer      = 8;
        this.currentDifficulty = Difficulty.Easy;
        this.isPlaying         = false;
    }
}