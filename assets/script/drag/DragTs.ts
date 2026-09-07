import { _decorator, Component, Node,EventTouch,UITransform,Vec3,tween,Sprite,SpriteFrame } from 'cc';
import {ResUtils} from "db://assets/framework/assetutils/ResUtils";
const { ccclass, property } = _decorator;

@ccclass('DragTs')
export class DragTs extends Component {
    private moveBar:Node
    async start() {
        this.node.on(Node.EventType.TOUCH_START,this.touchStart,this);
        this.node.on(Node.EventType.TOUCH_MOVE,this.touchDrag,this);
        this.node.on(Node.EventType.TOUCH_END,this.touchEnd,this);
        this.node.on(Node.EventType.TOUCH_CANCEL,this.touchCanCel,this);
        this.moveBar = this.node.getChildByName("moveBar");

        {
            //同步加载
            const delayTest = new Node();
            var spriteNode = delayTest.addComponent(Sprite)
            var newVar = await ResUtils.loadAsync("rank/profile/gift1/spriteFrame",SpriteFrame);
            spriteNode.spriteFrame = newVar
            delayTest.parent = this.node

            tween(delayTest)
                .delay(4)
                .call(()=>{
                    console.log("call back!")
                })
                .parallel(
                    tween().to(0.5, {
                        position: new Vec3(300, 100, 0)
                    }),
                    tween().to(0.5, {
                        scale: new Vec3(2, 2, 2)
                    })
                ).start()
        }
    }

    private touchStart(event: EventTouch) {
        this.moveBarPosition(event);
    }

    private moveBarPosition(event:EventTouch){
        var pos  = event.getUILocation();
        var posV3 = new Vec3(pos.x,pos.y,0)
        var uiTransform = this.node.getComponent(UITransform);
        const endV3 = uiTransform.convertToNodeSpaceAR(posV3)

        console.log("touchStart"+event.getUILocation())
        tween(this.moveBar).to(
            0.2,
            {
                position: new Vec3(endV3.x, endV3.y),
            }
        ).start()


    }

    touchDrag(event: EventTouch) {
        console.log("touchDarg"+event.getUILocation())
        this.moveBarPosition(event);
    }

    touchEnd(event: EventTouch) {
        console.log("touchEnd"+event.getUILocation())
        this.moveBarPosition(event);
    }

    touchCanCel(event: EventTouch) {
        console.log("touchCanCel"+event.getUILocation())
        this.moveBarPosition(event);
    }

    update(deltaTime: number) {
        
    }

    onTouchEnd() {
        this.node.off(Node.EventType.TOUCH_START,this.touchStart,this);
        this.node.off(Node.EventType.TOUCH_MOVE,this.touchDrag,this);
        this.node.off(Node.EventType.TOUCH_END,this.touchEnd,this);
        this.node.off(Node.EventType.TOUCH_CANCEL,this.touchCanCel,this);
    }
}


