import { _decorator, Component, UITransform,profiler,Node,EventTouch } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Profiler')
export class Profiler extends Component {
    start() {
        //显示和隐藏
        profiler.showStats()
        // profiler.hideStats()
        let uiTransform = this.node.getComponent(UITransform)?? this.node.addComponent(UITransform);
        this.node.on(Node.EventType.TOUCH_START,this.ts,this)
        this.node.on(Node.EventType.TOUCH_END,this.ts,this)
    }

    update(deltaTime: number) {
        
    }

    private ts(event:EventTouch) {

    }
}


