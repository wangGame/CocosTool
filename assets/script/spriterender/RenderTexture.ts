import { _decorator, Component, Node,SpriteRenderer,SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('RenderTexture')
export class RenderTexture extends Component {
    @property({type:SpriteFrame})
    private spriteFrame: SpriteFrame;
    start() {
        var spriteRender = this.node.getComponent(SpriteRenderer);
        spriteRender.spriteFrame = this.spriteFrame;
    }

    update(deltaTime: number) {
        
    }
}


