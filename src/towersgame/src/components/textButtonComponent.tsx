import { useCallback } from 'react';
import { Graphics } from '@pixi/react';
import { Text } from "pixi.js";
import { ICoordinates } from './interfaces/icoordinates';
import { IDimensions } from './interfaces/idimensions';
interface ITextButtonProps extends ICoordinates, IDimensions {
    text: string,
    colour?: string,
    fontSize?: number,
    handleClick?: () => void;
}

export const TextButton = (props: ITextButtonProps) => {
    const draw = useCallback(
        (g) => {
            g.clear();
            g.beginFill(props.colour ?? '#FFF');

            const textChildren = g.children.filter(child => child instanceof Text);
            textChildren.forEach(text => g.removeChild(text));
            g.drawRoundedRect(props.x, props.y, props.width, props.height,10);
            g.endFill();

            const buttonText = new Text(props.text,{
                fontFamily: 'Arial',
                fill: '#000',
                fontSize: props.fontSize??16
            });
            g.interactive = true;
            g.buttonMode = true;
            g
            buttonText.anchor.set(0.5);
            buttonText.x = (props.x + g.width / 2);
            buttonText.y = (props.y + g.height / 2);

            g.addChild(buttonText);
        },
        [props],
    );
    

    return <Graphics draw={draw} onclick={props.handleClick} />;
}