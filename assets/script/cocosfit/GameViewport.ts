import { screen, Size } from 'cc';

export class GameViewport {

    static readonly DESIGN_WIDTH = 1080;
    static readonly DESIGN_HEIGHT = 1920;
    static worldSize = new Size(GameViewport.DESIGN_WIDTH, GameViewport.DESIGN_HEIGHT);

    static getWorldSize() {
        const screenSize = screen.windowSize;
        const screenRatio= screenSize.width / screenSize.height;
        const designRatio= this.DESIGN_WIDTH / this.DESIGN_HEIGHT;

        if (screenRatio > designRatio) {
            this.worldSize.height = this.DESIGN_HEIGHT;
            this.worldSize.width = this.worldSize.height * screenRatio;
        } else {
            this.worldSize.width = this.DESIGN_WIDTH;
            this.worldSize.height = this.worldSize.width / screenRatio;
        }
    }
}
