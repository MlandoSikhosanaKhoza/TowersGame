import { Container, Text } from "@pixi/react";
import { TextButton } from "./textButtonComponent";
import { ICoordinates } from "./interfaces/icoordinates";
import { TextStyle } from "pixi.js";
import { User } from "../models/user";

interface IMultiplierProps extends ICoordinates {
    user: User;
    listOfMultipliers: number[];
}
/**
 * Displays multiplier - I know I can do better and cleaner code. I am sorry in advance
 * @param props
 * @returns
 */
export const MultiplierControl = (props: IMultiplierProps) => {
    
    return <Container x={props.x} y={props.y}>
        <Text
            text="Tower Game"
            x={10}
            y={0}
            style={
                new TextStyle({
                    align: 'center',
                    fill: '0xffffff',
                    fontSize: 28,

                })
            }
        />
        {props.listOfMultipliers.map((val, index) => {
            const buttonPositionX = 65 * (index);
            return <TextButton key={`${val}-${index}`} x={buttonPositionX} y={40} text={`${val.toFixed(2)}x`}
                width={60} height={20} />
        })}
    </Container>;
}