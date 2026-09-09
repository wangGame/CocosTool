import { _decorator, Component, Node, UITransform,Sprite,resources,SpriteFrame,UIOpacity,view } from 'cc';
import {ResUtils} from "db://assets/framework/assetutils/ResUtils";
import {GameViewport} from "db://assets/script/cocosfit/GameViewport";
const { ccclass, property } = _decorator;

@ccclass('Jump')
export class Jump extends Component {
    start() {
        const touchNode = new Node("Touch");
        this.node.addChild(touchNode);
        const touchTransform = touchNode.addComponent(UITransform);
        var spriteTouch = touchTransform.getComponent(Sprite)??touchNode.addComponent(Sprite);
        ResUtils.getInstane().loadCallBack("common/white/spriteFrame",SpriteFrame,(sprite)=>{
            spriteTouch.spriteFrame =  sprite;
            // touchTransform.setContentSize(screen.height, screen.width);
            GameViewport.getWorldSize()
            touchTransform.setContentSize(GameViewport.worldSize.width, GameViewport.worldSize.height);
        })
        var uiOpacity = touchNode.addComponent(UIOpacity);
        uiOpacity.opacity = 70;

    }

    update(deltaTime: number) {
        
    }
}


