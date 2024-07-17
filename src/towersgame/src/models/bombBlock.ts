import { Block } from "./block";

export class BombBlock extends Block {
    getImageSource = (): string => {
        if (this.isDisplayed) {
            return "/src/assets/bomb-dummy.svg";
        }
        return "/src/assets/question-dummy.svg";
    };
}