import { screen, Size } from 'cc';

export class GameViewport {

    static readonly DESIGN_WIDTH = 1080;
    static readonly DESIGN_HEIGHT = 1920;

    static getWorldSize(): Size {

        const screenSize = screen.windowSize;

        const screenRatio =
            screenSize.width / screenSize.height;

        const designRatio =
            this.DESIGN_WIDTH / this.DESIGN_HEIGHT;

        let width: number;
        let height: number;

        if (screenRatio > designRatio) {

            // 屏幕更宽
            height = this.DESIGN_HEIGHT;
            width = height * screenRatio;

        } else {

            // 屏幕更窄
            width = this.DESIGN_WIDTH;
            height = width / screenRatio;
        }

        return new Size(width, height);
    }
}
