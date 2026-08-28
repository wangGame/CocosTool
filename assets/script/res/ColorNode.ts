import { _decorator, Component,Sprite,UITransform,SpriteFrame,math } from 'cc';
import {ResUtils} from "db://assets/framework/assetutils/ResUtils";
const { ccclass, property } = _decorator;

@ccclass('ColorNode')
export class ColorNode extends Component {
    async start() {
        const nodeSprite= this.node.addComponent(Sprite);
        nodeSprite.sizeMode = Sprite.SizeMode.CUSTOM
        const promise = await ResUtils.loadAsync("common/white/spriteFrame",SpriteFrame);
        nodeSprite.spriteFrame = promise;
        nodeSprite.type = Sprite.Type.SLICED;
        const uiTransform = this.node.getComponent(UITransform);
        const spriteColor = new math.Color();
        spriteColor.set(245,245,245,255)
        nodeSprite.color = spriteColor;
    }

    update(deltaTime: number) {
        
    }
}


