import { _decorator, Component, Node,Graphics } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GraphicsTs')
export class GraphicsTs extends Component {
    start() {
        const graphics = this.node.getComponent(Graphics);
        graphics.moveTo(0, 0);
        graphics.lineTo(300, 900);

        graphics.stroke();
    }

    update(deltaTime: number) {
        
    }
}


