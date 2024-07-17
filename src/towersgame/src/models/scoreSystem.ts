export class ScoreSystem {
    numberOfBombs?: number;
    rewardMultiplier?: number;
    constructor(numberOfBombs?: number, rewardMultiplier?: number) {
        this.numberOfBombs = numberOfBombs;
        this.rewardMultiplier = rewardMultiplier;
    }
}