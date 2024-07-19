import { Block } from "./block";

export class BombBlock extends Block {
    getImageSource = (): string => {
        if (this.isDisplayed) {
            return "/src/assets/sprites/explosion.jpg";
        }
        return "/src/assets/sprites/box.png";
    };
}