import { _decorator, Component, Node,view,Canvas,ResolutionPolicy } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 使用的时候继承一下，
 */
@ccclass('CanvasView')
export class CanvasView extends Component {
    start() {
        const canvas = this.node.getComponent(Canvas);
    }

    public onResize(){
        const screenRatio =
            screen.width / screen.height;
        const designSize =
            view.getDesignResolutionSize();
        const designRatio =
            designSize.width / designSize.height;
        if (screenRatio > designRatio) {
            // 屏幕更宽
            // 固定高度，宽度扩展
            view.setResolutionPolicy(
                ResolutionPolicy.FIXED_HEIGHT
            );
        } else {
            // 屏幕更长
            // 固定宽度，高度扩展
            view.setResolutionPolicy(
                ResolutionPolicy.FIXED_WIDTH
            );
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