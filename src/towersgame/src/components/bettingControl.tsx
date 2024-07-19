import { Container, Sprite, Text } from "@pixi/react";
import { TextButton } from "./textButtonComponent";
import { ICoordinates } from "./interfaces/icoordinates";
import { TextStyle } from "pixi.js";
import { ProgressBar } from "./progressBarComponent";
import { IDimensions } from "./interfaces/idimensions";

interface IBettingProps extends ICoordinates, IDimensions {
    bettingAmount: number;
    percentage: number;
    increase: () => void;
    decrease: () => void;
}
export const BettingControl = (props: IBettingProps) => {
    return <Container x={props.x} y={props.y}>
        <Text
            text="Bet Amount"
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
        <ProgressBar x={10} y={26} width={props.width - 20} height={15} percentage={props.percentage} />
        
        <TextButton text={`$ ${props.bettingAmount.toFixed(2)}`} x={10} y={55} width={props.width-10} height={25} />
        <Sprite
            image="/src/assets/sprites/down-arrow.png"
            x={10}
            y={55}
            height={25}
            width={25}
            eventMode="static"
            onclick={props.decrease}
        />
        <Sprite
            image="/src/assets/sprites/up-arrow.png"
            x={props.width-25}
            y={55}
            height={25}
            width={25}
            eventMode="static"
            onclick={props.increase}
        />
    </Container>;
}