import React from "react";
import { Block } from "../models/block";
import { BombBlock } from "../models/bombBlock";
import { DiamondBlock } from "../models/diamondBlock";

interface IBlocksProps {
    Blocks: Block[][]
    PlayRow: number
    IsPlaying: boolean,
    Win: CallableFunction,
    Lose: CallableFunction
}

export class BlocksComponent extends React.Component<IBlocksProps> {


    printIndividualBlocks(blocks: Block[], isCurrentRow: boolean) {
        return blocks.map((bi) => {
            const className: string = (isCurrentRow) ? "" : "w3-opacity"; 
            return <img
                onClick={() => {
                    if (isCurrentRow) {
                        if (this.props.IsPlaying) {
                            switch (bi.constructor.name) {
                                case DiamondBlock.name:
                                    this.props.Win();
                                    break;
                                case BombBlock.name:
                                    this.props.Lose();
                                    break;
                            }
                        }
                    }
                }}
                className={className}
                key={`${Math.random()}`.replace('.', '-')}
                src={bi.getImageSource()}
                style={{ maxWidth: "10%", maxHeight: `${(window.innerHeight / 8)}px` }}></img>
        });
    }

    printRowOfBlocks() {
        return this.props.Blocks.map((b, index) => {
            /* Since index starts from zero */
            const selectedIndex: number = this.props.PlayRow - 1;
            const isCurrentRow = index == selectedIndex && this.props.IsPlaying;
            return <div key={`${Math.random()}`.replace('.', '-')} className="w3-row w3-center w3-padding-none">
                {this.printIndividualBlocks(b, isCurrentRow)}
                    </div>
        })
    }

    render() {
        return this.printRowOfBlocks();
    }

}