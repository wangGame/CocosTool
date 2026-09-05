import { _decorator, Component, Node,director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UIPersist')
export class UIPersist extends Component {
    static back: Node = null;
    start() {
        //常驻
        if (!director.isPersistRootNode(this.node)) {
            director.addPersistRootNode(this.node);
        }
    }

    update(deltaTime: number) {
        
    }
}


