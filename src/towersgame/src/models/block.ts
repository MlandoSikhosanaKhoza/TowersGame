export class Block {
    isSelected?: boolean;
    isDisplayed?: boolean;

    constructor() {
        this.isSelected = false;
        this.isDisplayed = false;
    }

    getImageSource = () : string => {
        return "/src/assets/question-dummy.svg";
    };
}