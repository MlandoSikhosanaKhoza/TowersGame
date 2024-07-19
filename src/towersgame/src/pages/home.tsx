import { useCallback, useEffect, useMemo, useState } from "react";
import { BlocksComponent } from "../components/blocksComponent";
import { Block } from "../models/block";
import { IBlockService } from "../services/intefaces/iblockService";
import { BlockService } from "../services/implementation/blockService";
import { Difficulty } from "../enums/difficulty";
import { User } from "../models/user";
import { IBettingService } from "../services/intefaces/ibettingService";
import { BettingService } from "../services/implementation/bettingService";
import { Container, Sprite, Stage, Text } from "@pixi/react";
import { BlurFilter,  TextStyle } from "pixi.js";
import { TextButton } from "../components/textButtonComponent";
import { NumberOfRowsControl } from "../components/numberOfRowsControl";
import { DifficultyControl } from "../components/difficultyControl";
import { BettingControl } from "../components/bettingControl";
import { MultiplierControl } from "../components/multiplierControl";

export const Home = () => {
    /* Add Layer Count */
    const [tower, setTower] = useState<Block[][]>([]);

    const [user, setUser] = useState<User>(new User());

    

    /*Initialize block service*/
    const blockService: IBlockService     = new BlockService();
    const bettingService: IBettingService = new BettingService();

    const collectMoney = () => {
        if (user.isPlaying && user.currentLayer != user.noOfRows) {
            const collectionAmount = bettingService.calculateCollectionAmount(user.currentDifficulty!, user.currentLayer! + 1, user.bettingAmount!);
            user.winnings!.push(collectionAmount);
            user.balance = (user.balance! - user.bettingAmount! + collectionAmount);
            setUser(user);
        }
    };

    const displayBalance = () => {
        if (user.isPlaying) {
            return `${(user.balance! - user.bettingAmount!).toFixed(2)}`;
        } else {
            return `${(user.balance)?.toFixed(2)}`;
        }
    };
    
    const displayBettingMessage = () => {
        const haventPlayedYet = user.currentLayer == user.noOfRows;
        
        if (!user.isPlaying) {
            return "BET";
        } else if (haventPlayedYet) {
            return "END GAME";
        } else {
            const collectionAmount = bettingService.calculateCollectionAmount(user.currentDifficulty!, user.currentLayer!+1, user.bettingAmount!);
            return `Collect ${collectionAmount.toFixed(2)}`;
        }
    };
    
    const win = (): void => {

        blockService.displayRow(tower, user.currentLayer ?? 0);

        setTower([...tower]);
        setUser({ ...user, currentLayer: (user.currentLayer ?? 0) - 1 });

    };
    const lose = (): void => {
        user.winnings!.push(0);
        blockService.displayRow(tower, user.currentLayer ?? 0);
        user.balance = user.balance! - user.bettingAmount!;
        setTower([...tower]);
        setUser({ ...user, isPlaying: false, balance: user.balance });

    };
    /* On load Set up */
    useEffect(() => {
        setTower(blockService.generateTower(8));
    }, []);


    /**
     * PixiJS Code
     */

    return <>
        <div className="w3-container w3-padding-none" style={{ height: "100%" }}>
            <Stage width={window.innerWidth} height={window.innerHeight} options={{ background: 0x1099bb }}>
                {
                    /* Game Controls*/
                    <Container x={0} y={0}>
                        <NumberOfRowsControl selectedRowCount={user.noOfRows!}
                            rowFrom={4} rowTo={8} x={0} y={0}
                            handleRowSelection={(selectedRow) => {
                                if (!user.isPlaying) {
                                    setUser({ ...user, noOfRows: selectedRow, currentLayer: selectedRow });
                                    setTower(blockService.generateTower(4));
                                }
                            }} />

                        <DifficultyControl x={0} y={60}
                            selectedDifficulty={user.currentDifficulty!}
                            handleDifficultySelection={(difficulty) => {
                                setUser({ ...user, currentDifficulty: difficulty });
                            }} />
                        <BettingControl x={0} y={120}
                            width={window.innerWidth * 0.25} height={300}
                            bettingAmount={user.bettingAmount!}
                            percentage={bettingService.getBetPercentageFrom(user.bettingAmount!)}
                            increase={() => {
                                if (!user.isPlaying) {
                                    const increasedBettingAmount = bettingService.increaseBetFrom(user.bettingAmount!);
                                    setUser({ ...user, bettingAmount: increasedBettingAmount });
                                }
                            }}
                            decrease={() => {
                                if (!user.isPlaying) {
                                    const decreasedBettingAmount = bettingService.decreaseBetFrom(user.bettingAmount!);
                                    setUser({ ...user, bettingAmount: decreasedBettingAmount });
                                }
                            }}
                        />
                        <TextButton x={10} y={window.innerHeight - 200} height={60} width={(window.innerWidth * 0.25) - 10} text={displayBettingMessage()} handleClick={() => {
                            if (user.isPlaying) {
                                collectMoney();
                                setUser({ ...user, isPlaying: false, currentLayer: user.noOfRows });
                            } else {
                                blockService.substituteTowerValues(tower, user.currentDifficulty);
                                setUser({ ...user, isPlaying: true, currentLayer: user.noOfRows });
                                setTower(tower);
                            }
                        }} />
                        <Text
                            text={`Balance`}
                            x={10}
                            y={window.innerHeight - 130}
                            style={
                                new TextStyle({
                                    align: 'center',
                                    fill: '0xffffff',
                                    fontSize: 20,

                                })
                            }
                        />
                        <Text
                            text={`$ ${displayBalance()}`}
                            x={10}
                            y={window.innerHeight - 100} 
                            style={
                                new TextStyle({
                                    align: 'center',
                                    fill: '0xffffff',
                                    fontSize: 20,
                                    letterSpacing: 3,
                                    dropShadow: true,
                                    dropShadowColor: '#E72264',
                                    dropShadowDistance: 6,

                                })
                            }
                        />

                    </Container>
                }
                
                <Container x={window.innerWidth * 0.25} y={0}>
                    <MultiplierControl x={0} y={0} listOfMultipliers={bettingService.getTop5RewardList(user.currentDifficulty!, user.noOfRows!)}/>
                </Container>
            </Stage>
        </div>
    </>;
}