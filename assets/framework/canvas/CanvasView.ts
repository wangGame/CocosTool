import { _decorator, Component, Node,view,Canvas,ResolutionPolicy } from 'cc';
import {Constant} from "db://assets/framework/constant/Constant";
import {GameViewport} from "db://assets/script/cocosfit/GameViewport";
const { ccclass, property } = _decorator;

/**
 * 使用的时候继承一下，
 *
 * 使用宽或者高适配的时候，  自己会算出整体的尺寸      如果使用宽和高  就会和libgdx一样
 */
@ccclass('CanvasView')
export class CanvasView extends Component {
    start() {

    }

    public onResize(){
        GameViewport.getWorldSize();

        const screenRatio = screen.width / screen.height;
        const designSize = view.getDesignResolutionSize();
        const designRatio = designSize.width / designSize.height;

        console.log(screen.width+" ====== "+screen.height);

        if (screenRatio > designRatio) {
            // 屏幕更宽
            // 固定高度，宽度扩展   宽就以高适配
            // view.setDesignResolutionSize(Constant.designWidth,Constant.designHeight, ResolutionPolicy.FIXED_HEIGHT);
            view.setResolutionPolicy(ResolutionPolicy.FIXED_HEIGHT);
        } else {
            // 屏幕更长
            // 固定宽度，高度扩展   高就以宽适配
            // view.setDesignResolutionSize(Constant.designWidth,Constant.designHeight,ResolutionPolicy.FIXED_WIDTH);
            view.setResolutionPolicy(ResolutionPolicy.FIXED_WIDTH);
        }
    }


    onEnable() {
        view.on('canvas-resize', this.onResize, this);
        view.emit('canvas-resize')
    }

    onDisable(){
        view.off('canvas-resize', this.onResize, this);
    }

    update(deltaTime: number) {

    }
}