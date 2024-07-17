import { Difficulty } from "../../enums/difficulty";
import { Block } from "../../models/block";

export interface IBlockService {
    generateTower(layers: number): Block[][];
    displayRow(tower: Block[][], rowNumber: number): void;
    substituteTowerValues(tower: Block[][], difficulty?: Difficulty): void;
}