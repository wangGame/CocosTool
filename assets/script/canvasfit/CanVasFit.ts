import { _decorator, Component, Node,view,Canvas,ResolutionPolicy } from 'cc';
import {CanvasView} from "db://assets/framework/canvas/CanvasView";
const { ccclass, property } = _decorator;

@ccclass('CanVasFit')
export class CanVasFit extends CanvasView {

    start() {
        window.addEventListener('resize', this.onBrowserResize);

        console.log("window:", window);
        console.log("inner:", window.innerWidth, window.innerHeight);

        window.addEventListener('resize', () => {
            console.log("！！！window resize");
        });
    }

    onDestroy() {
        window.removeEventListener('resize', this.onBrowserResize);
    }


    private onBrowserResize = () => {
        console.log('浏览器 resize');
        console.log(window.innerWidth, window.innerHeight);
        super.onResize();
    };
}


