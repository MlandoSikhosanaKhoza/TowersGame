import { Block } from "./block";

export class DiamondBlock extends Block {
    getImageSource = (): string => {
        if (this.isDisplayed) {
            return "/src/assets/sprites/diamond.jpg";
        }
        return "/src/assets/sprites/box.png";
    };
}