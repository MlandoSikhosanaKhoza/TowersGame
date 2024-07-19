import { Container, Text } from "@pixi/react";
import { TextButton } from "./textButtonComponent";
import { ICoordinates } from "./interfaces/icoordinates";
import { TextStyle } from "pixi.js";
import { Difficulty } from "../enums/difficulty";

interface IDifficultyProps extends ICoordinates {
    selectedDifficulty: Difficulty;
    handleDifficultySelection: (selectedDifficulty: number) => void;
}
export const DifficultyControl = (props: IDifficultyProps) => {
    const difficultyList = [Difficulty.Easy, Difficulty.Medium, Difficulty.Hard];
    return <Container x={props.x} y={props.y}>
        <Text
            text="Difficulty"
            x={10}
            y={0}
            style={
                new TextStyle({
                    align: 'center',
                    fill: '0xffffff',
                    fontSize: 24,

                })
            }
        />
        {difficultyList.map((val, index) => {
            const buttonPositionX = 85 * index + 10;
            const isSelected = val == props.selectedDifficulty;
            return <TextButton key={`${val}-${index}`} x={buttonPositionX} y={35} text={`${Difficulty[val]}`}
                width={80} height={20} colour={isSelected ? "#999" : undefined}
                handleClick={() => {
                    props.handleDifficultySelection(val);
                }} />
        })}
    </Container>;
}