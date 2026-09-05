import { view,_decorator,UITransform,Sprite, Component, Node,math } from 'cc';
import {GameViewport} from "db://assets/script/cocosfit/GameViewport";
const { ccclass, property } = _decorator;

/**
 * 线看一下那个方法会执行
 */
@ccclass('FitMiddleView')
export class FitMiddleView extends Component {

    @property({type:Sprite})
    private bg:Sprite

    start() {
    }

    onResize() {
        var worldSize = GameViewport.getWorldSize();
        var component = this.bg.getComponent(UITransform);
        component.setContentSize(worldSize.width,worldSize.height)


        // 尺寸发生变化
        const size = view.getVisibleSize();
        console.log("width :"+size.width+"   height"+ size.height);

        const contentWidth = size.width - (180.0 * 2.0);

        console.log("contentWidth:"+contentWidth);

        const contentHeight = size.height - (320.0 * 2.0);

        console.log("height :"+contentHeight);

        const rateWidth = contentWidth / (720.0);
        const rateHeight = contentHeight / (1080.0);

        console.log("rateHeight:"+rateHeight);
        console.log("rateWidth:"+rateWidth);

        const scale = Math.min(rateWidth, rateHeight);
        let scaleX = math.v3(scale,scale,1)
        this.node.setScale(scaleX);

        console.log("scaleX:"+scaleX);

        console.log('设置后:', this.node.scale);
        console.log('localScale:', this.node.getScale());

    }

    update(deltaTime: number) {
        
    }

    onEnable() {
        view.on('canvas-resize', this.onResize, this);
        view.emit('canvas-resize')
    }

    onDisable(){
        view.off('canvas-resize', this.onResize, this);
    }
}


