import { useCallback } from "react";
import { ICoordinates } from "./interfaces/icoordinates";
import { IDimensions } from "./interfaces/idimensions";
import { Graphics } from "@pixi/react";

interface IProgressBarProps extends ICoordinates, IDimensions {
    percentage: number,
    handleClick?: () => void;
}

export const ProgressBar = (props: IProgressBarProps) => {
    const draw = useCallback(
        (g) => {
            g.clear();
            g.beginFill('#FFF');
            g.drawRoundedRect(props.x, props.y, props.width, props.height, 10);
            g.endFill();
            g.beginFill('#000');
            g.drawRoundedRect(props.x, props.y, props.width * (props.percentage / 100), props.height, 10);
            g.endFill();
        },
        [props],
    );

    return <Graphics draw={draw} onclick={props.handleClick} />;
}