import { _decorator, Component, Node,Button,tween, Vec3,Tween } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 按钮点击加响应
 */
@ccclass('ButtonClickEffect')
export class ButtonClickEffect extends Component {
    // 外部传入的点击回调
    public clickCallback: (() => void) | null = null;

    start() {
        const btnComponent = this.node.getComponent(Button)
        if (!btnComponent){
            this.node.addComponent(Button)
        }
        this.node.on(Button.EventType.CLICK,this.onTouchClick,this);
        this.node.on(Node.EventType.TOUCH_START, this.onTouchDown, this);
        this.node.on(Node.EventType.TOUCH_END, this.onTouchUp, this);
        this.node.on(Node.EventType.TOUCH_CANCEL, this.onTouchUp, this);
    }

    onTouchUp() {
        console.log('onTouchUp');
        Tween.stopAllByTarget(this.node);
        tween(this.node).to(
            0.2,
            {
                scale :new Vec3(1, 1,1),
            }
        ).start()
    }

    onTouchDown() {
        console.log('onTouchDown');
        Tween.stopAllByTarget(this.node);
        tween(this.node).to(
            0.2,
            {
                scale :new Vec3(0.8, 0.8,1),
            }
        ).start()
    }

    onDestroy(){
        this.node.off(Button.EventType.CLICK,this.onTouchClick,this);
        this.node.off(Node.EventType.TOUCH_START, this.onTouchDown, this);
        this.node.off(Node.EventType.TOUCH_END, this.onTouchUp, this);
        this.node.off(Node.EventType.TOUCH_CANCEL, this.onTouchUp, this);
    }

    onTouchClick() {
        console.log("click call back --->"+this.clickCallback)
        this.clickCallback?.();
    }
}


