import { Difficulty } from "../enums/difficulty";
import { ScoreSystem } from "../models/scoreSystem";

export class ScoreSystemHelper {
    /* The first parameter is the number of bombs and second is the reward for clicking a diamond */
    private static easyScoreSystem = [
        new ScoreSystem(1, 39.51),
        new ScoreSystem(1, 19.75),
        new ScoreSystem(1, 13.17),
        new ScoreSystem(2, 9.87),
        new ScoreSystem(2, 5.92),
        new ScoreSystem(2, 3.95),
        new ScoreSystem(3, 2.82),
        new ScoreSystem(4, 1.76)
    ];
    private static mediumScoreSystem = [
        new ScoreSystem(1, 154.35),
        new ScoreSystem(1, 77.17),
        new ScoreSystem(2, 51.42),
        new ScoreSystem(2, 25.72),
        new ScoreSystem(3, 15.43),
        new ScoreSystem(3, 7.71),
        new ScoreSystem(4, 4.41),
        new ScoreSystem(5, 2.20),
    ];
    private static hardScoreSystem = [
        new ScoreSystem(1, 548.80),
        new ScoreSystem(1, 274.40),
        new ScoreSystem(2, 182.93),
        new ScoreSystem(3, 91.46),
        new ScoreSystem(3, 36.58),
        new ScoreSystem(4, 18.29),
        new ScoreSystem(5, 7.84),
        new ScoreSystem(6, 2.94)
    ];


    static getNumberOfBombsFor(difficulty: Difficulty, layerIndex: number): number {
        switch (difficulty) {
            case Difficulty.Easy:
                return this.easyScoreSystem[layerIndex].numberOfBombs??0;
            case Difficulty.Medium:
                return this.mediumScoreSystem[layerIndex].numberOfBombs??0;
            case Difficulty.Hard:
                return this.hardScoreSystem[layerIndex].numberOfBombs??0;
        }
        throw new DOMException("A difficulty is required", "Difficulty missing");
    }

    static getRewardMultiplierFor(difficulty: Difficulty, currentRow: number, noOfRows: number): number {
        let selectedIndex;
        if (currentRow == noOfRows) {
            return 0;
        }
        switch (difficulty) {
            case Difficulty.Easy:
                selectedIndex = this.easyScoreSystem.length - (noOfRows - currentRow) ;
                return this.easyScoreSystem[selectedIndex].rewardMultiplier??0;
            case Difficulty.Medium:
                selectedIndex = this.mediumScoreSystem.length - (noOfRows - currentRow) ;
                return this.mediumScoreSystem[selectedIndex].rewardMultiplier??0;
            case Difficulty.Hard:
                selectedIndex = this.hardScoreSystem.length - (noOfRows - currentRow) ;
                return this.hardScoreSystem[selectedIndex].rewardMultiplier??0;
        }
        throw new DOMException("A difficulty is required", "Difficulty missing");
    }
}