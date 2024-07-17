import { Block } from "./block";

export class DiamondBlock extends Block {
    getImageSource = (): string => {
        if (this.isDisplayed) {
            return "/src/assets/diamond-dummy.svg";
        }
        return "/src/assets/question-dummy.svg";
    };
}