import { Container, Sprite, Text } from "@pixi/react";
import { TextButton } from "./textButtonComponent";
import { ICoordinates } from "./interfaces/icoordinates";
import { TextStyle } from "pixi.js";
import { Block } from "../models/block";
import { DiamondBlock } from "../models/diamondBlock";
import { BombBlock } from "../models/bombBlock";
import { IDimensions } from "./interfaces/idimensions";

interface ITowerProps extends ICoordinates, IDimensions {
    Blocks: Block[][]
    PlayRow: number
    IsPlaying: boolean,
    Win: () => void,
    Lose: () => void
}
/**
 * Displays multiplier - I know I can do better and cleaner code. I am sorry in advance
 * @param props
 * @returns
 */
export const TowerControl = (props: ITowerProps) => {
    const printIndividualBlocks = (blocks: Block[], isCurrentRow: boolean) => {
        return blocks.map((bi,index) => {
            return <Sprite width={40} height={40}
                eventMode="static"
                onclick={() => {
                    if (isCurrentRow) {
                        if (props.IsPlaying) {
                            switch (bi.constructor.name) {
                                case DiamondBlock.name:
                                    props.Win();
                                    break;
                                case BombBlock.name:
                                    props.Lose();
                                    break;
                            }
                        }
                    }
                }}
                x={50 * index}
                y={0}
                key={`ib-${index}`}
                image={bi.getImageSource()}
                />
        });
    };
    //y = mx + c
    const calculateX = (y): number => {
        return (y + 8) / -1.95;
    };

    const printRowOfBlocks = () => {
        return props.Blocks.map((b, index) => {
            /* Since index starts from zero */
            const selectedIndex: number = props.PlayRow - 1;
            const isCurrentRow = index == selectedIndex && props.IsPlaying;
            return <Container key={`b-${index}`} x={calculateX(index * 50)} y={index * 50}>
                {printIndividualBlocks(b, isCurrentRow)}
            </Container>
        })
    };
    return <Container x={props.width/2} y={props.y}>
        {printRowOfBlocks()}
    </Container>;
}