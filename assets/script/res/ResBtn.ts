import { _decorator, Component, Node,SpriteFrame,Sprite,find } from 'cc';
import {ButtonClickEffect} from "db://assets/framework/button/ButtonClickEffect";
import {ResUtils} from "db://assets/framework/assetutils/ResUtils";
const { ccclass, property } = _decorator;

@ccclass('ResBtn')
export class ResBtn extends Component {
    @property({type: Sprite})
    protected spritex: Sprite;
    async start() {
        const loadAsyncBtn = this.node.getChildByName("loadAsyncBtn");
        const loadAsyncBtnEffect = loadAsyncBtn.getComponent(ButtonClickEffect);
        loadAsyncBtnEffect.clickCallback = async ()=> {
            console.log("loadAsyncBtnEffect start");
            var promise = await ResUtils.getInstane().loadAsync("rank/profile/anniu/spriteFrame", SpriteFrame);
            this.spritex.getComponent(Sprite).spriteFrame = promise
            console.log("show ")
            console.log("loadAsyncBtnEffect end");
        }
        const loadSync = this.node.getChildByName("loadSync");
        const loadSyncBtnEffect = loadSync.getComponent(ButtonClickEffect);
        loadSyncBtnEffect.clickCallback = ()=>{
            console.log("loadAsyncBtnEffect start");
            ResUtils.getInstane().loadCallBack("rank/profile/anniu/spriteFrame", SpriteFrame,(sprite)=>{
                console.log("show ")
                this.spritex.getComponent(Sprite).spriteFrame = sprite
            });
            console.log("loadAsyncBtnEffect end");
        }
        var loadAllBtnEffect = this.node.getChildByName("loadAll").getComponent(ButtonClickEffect);
        loadAllBtnEffect.clickCallback = ()=>{


        }
    }

    update(deltaTime: number) {
        
    }
}


