import { useEffect, useState } from "react";
import { BlocksComponent } from "../components/blocksComponent";
import { Block } from "../models/block";
import { IBlockService } from "../services/intefaces/iblockService";
import { BlockService } from "../services/implementation/blockService";
import { Difficulty } from "../enums/difficulty";
import { User } from "../models/user";
import { IBettingService } from "../services/intefaces/ibettingService";
import { BettingService } from "../services/implementation/bettingService";

export const Home = () => {
    /* Add Layer Count */
    const [tower, setTower] = useState<Block[][]>([]);

    const [user, setUser] = useState<User>(new User());


    /*Initialize block service*/
    const blockService: IBlockService     = new BlockService();
    const bettingService: IBettingService = new BettingService();

    const displayMultipliers = () => {
        let list: number[] = [];
        //Rig the display
        const isRiggedDisplay = user.currentLayer == user.noOfRows;
        if (isRiggedDisplay) {
            list = bettingService.getTop5RewardList(user.currentDifficulty ?? Difficulty.Easy, user.currentLayer ?? 0);
            list.splice(list.length - 1, 1);
        } else {
            list = bettingService.getTop5RewardList(user.currentDifficulty ?? Difficulty.Easy, (user.currentLayer ?? 0) + 1);
        }
        return <>
            <span className={`w3-tag w3-white w3-small w3-margin-bottom w3-margin-right ${isRiggedDisplay ? "" : "w3-hide"}`}>0.00x</span>
            {list.map(num => <span className="w3-tag w3-white w3-small w3-margin-bottom w3-margin-right">{num.toFixed(2)}x</span>)}
        </>;
    };

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
            return <span>{(user.balance! - user.bettingAmount!).toFixed(2)}</span>
        } else {
            return <span>{(user.balance)?.toFixed(2)}</span>
        }
    };
    
    const displayBettingMessage = () => {
        const haventPlayedYet = user.currentLayer == user.noOfRows;
        
        if (!user.isPlaying) {
            return <span>BET</span>;
        } else if (haventPlayedYet) {
            return <span>END GAME</span>;
        } else {
            const collectionAmount = bettingService.calculateCollectionAmount(user.currentDifficulty!, user.currentLayer!+1, user.bettingAmount!);
            return <span>Collect {collectionAmount.toFixed(2)}</span>
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

    return <>
        <div className="w3-container w3-padding-none" style={{ height: "100%" }}>
            {
                /* Game Controls*/
                <div className="w3-col l3 m6 w3-hide-small w3-blue" style={{ height: "100%" }}>
                    {
                        /* Number of Rows */
                        <>
                            <h3>Number of Rows</h3>
                            <div className="w3-bar">
                                <button className={`w3-bar-item w3-border ${user.noOfRows == 4 ? "w3-black" : ""}`}
                                    style={{ width: "20%" }}
                                    onClick={() => {
                                        if (!user.isPlaying) {
                                            setUser({ ...user, noOfRows: 4, currentLayer: 4 });
                                            setTower(blockService.generateTower(4));
                                        }
                                    }}>
                                    4
                                </button>
                                <button className={`w3-bar-item w3-border ${user.noOfRows == 5 ? "w3-black" : ""}`}
                                    style={{ width: "20%" }}
                                    onClick={() => {
                                        if (!user.isPlaying) {
                                            setUser({ ...user, noOfRows: 5, currentLayer: 5 });
                                            setTower(blockService.generateTower(5));
                                        }
                                    }}>
                                    5
                                </button>
                                <button className={`w3-bar-item w3-border ${user.noOfRows == 6 ? "w3-black" : ""}`}
                                    style={{ width: "20%" }}
                                    onClick={() => {
                                        if (!user.isPlaying) {
                                            setUser({ ...user, noOfRows: 6, currentLayer: 6 });
                                            setTower(blockService.generateTower(6));
                                        }
                                    }}>
                                    6
                                </button>
                                <button className={`w3-bar-item w3-border ${user.noOfRows == 7 ? "w3-black" : ""}`}
                                    style={{ width: "20%" }}
                                    onClick={() => {
                                        if (!user.isPlaying) {
                                            setUser({ ...user, noOfRows: 7, currentLayer: 7 });
                                            setTower(blockService.generateTower(7));
                                        }
                                        
                                    }}>
                                    7
                                </button>
                                <button className={`w3-bar-item w3-border ${user.noOfRows == 8 ? "w3-black" : ""}`}
                                    style={{ width: "20%" }}
                                    onClick={() => {
                                        if (!user.isPlaying) {
                                            setUser({ ...user, noOfRows: 8, currentLayer: 8 });
                                            setTower(blockService.generateTower(8));
                                        }
                                    }}>
                                    8
                                </button>
                            </div>
                        </>
                    }
                    {
                        /* Difficulty */
                        <>
                            <h3>Difficulty</h3>
                            <div className="w3-bar">
                                <button className={`w3-bar-item w3-border w3-col s4 ${user.currentDifficulty == Difficulty.Easy ? "w3-black" : ""}`}
                                    onClick={() => {
                                        if (!user.isPlaying) {
                                            setUser({ ...user, currentDifficulty: Difficulty.Easy });
                                        }
                                    }}>
                                    Easy
                                </button>
                                <button className={`w3-bar-item w3-border w3-col s4 ${user.currentDifficulty == Difficulty.Medium ? "w3-black" : ""}`}
                                    onClick={() => {
                                        if (!user.isPlaying) {
                                            setUser({ ...user, currentDifficulty: Difficulty.Medium });
                                        }
                                    }}>
                                    Medium
                                </button>
                                <button className={`w3-bar-item w3-border w3-col s4 ${user.currentDifficulty == Difficulty.Hard ? "w3-black" : ""}`}
                                    onClick={() => {
                                        if (!user.isPlaying) {
                                            setUser({ ...user, currentDifficulty: Difficulty.Hard });
                                        }
                                    }}>
                                    Hard
                                </button>
                            </div>
                        </>
                    }
                    {
                        /* Bet Amount */
                        <>
                            <h3>Bet Amount</h3>
                            <div className="w3-padding">
                                <div className="w3-border w3-white">
                                    <div className="w3-green" style={{ height: "10px", width: `${bettingService.getBetPercentageFrom(user.bettingAmount!)}%` }}></div>
                                </div>
                                <div className="w3-bar w3-margin-top">
                                    <button className="w3-col s2"
                                        onClick={() => {
                                            if (!user.isPlaying) {
                                                const decreasedBettingAmount = bettingService.decreaseBetFrom(user.bettingAmount!);
                                                setUser({ ...user, bettingAmount: decreasedBettingAmount });
                                            }
                                        } }>
                                        <img src="/src/assets/down-dummy.svg" width={20}/>
                                    </button>
                                    <button className="w3-col s8 w3-black w3-text-red">$ {user.bettingAmount?.toFixed(2)}</button>
                                    <button className="w3-col s2"
                                        onClick={() => {
                                            if (!user.isPlaying) {
                                                const increasedBettingAmount = bettingService.increaseBetFrom(user.bettingAmount!);
                                                setUser({ ...user, bettingAmount: increasedBettingAmount });
                                            }
                                        }}>
                                        <img src="/src/assets/up-dummy.svg" width={20} />
                                    </button>
                                </div>
                            </div>
                        </>
                    }
                    {
                        /* Bet */
                        <div className="w3-padding">
                            <button className="w3-btn w3-round-xlarge w3-col s12 w3-white"
                                onClick={() => {
                                    if (user.isPlaying) {
                                        collectMoney();
                                        setUser({ ...user, isPlaying: false, currentLayer: user.noOfRows });
                                    } else {
                                        blockService.substituteTowerValues(tower, user.currentDifficulty);
                                        setUser({ ...user, isPlaying: true, currentLayer: user.noOfRows });
                                        setTower(tower);
                                    }
                                    
                                }}>{displayBettingMessage()}</button>
                        </div>
                    }
                    {
                        /* Demo Balance */
                        <div className="w3-padding w3-margin-top">
                            <div className="w3-round-medium w3-white w3-center w3-container w3-margin-top">
                                <h4>Demo Balance</h4>
                                <h5>$ {displayBalance()}</h5>
                                <div className="w3-col s12">
                                    <p>
                                        {user.winnings?.map((w) => {
                                            return <span className="w3-tag w3-small w3-margin-bottom w3-margin-right">$ {w.toFixed(2)}</span>
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    }
                    {
                        /* Game Experience */
                        <div className="w3-padding">
                            <div className="w3-round-medium w3-white w3-center w3-container w3-margin-top w3-bar">
                                <button className="w3-bar-item w3-col s3">Sound</button>
                                <button className="w3-bar-item w3-col s3">Music</button>
                                <button className="w3-bar-item w3-col s3">Info</button>
                                <button className="w3-bar-item w3-col s3">Home</button>
                            </div>
                        </div>
                    }
                </div>
            }
            {
                /* Game Page */
                <div className="w3-col l9 m6 s12 w3-black" style={{ height: "100%" }}>
                    <div className="w3-display-container" style={{ position: "relative", top: "0", left: "0", width: "100%", height: "100%" }}>
                        <div className="w3-display-top">
                            {displayMultipliers()}
                        </div>
                        <div className="w3-display-middle">
                            <BlocksComponent Blocks={tower} PlayRow={user.currentLayer ?? -1} IsPlaying={user.isPlaying ?? false} Win={() => { win(); }} Lose={() => { lose(); }} />
                        </div>
                    </div>
                </div>
            }
        </div>
    </>;
}