import { _decorator, Component, Node,SpriteFrame,Sprite,find } from 'cc';
import {ButtonClickEffect} from "db://assets/framework/button/ButtonClickEffect";
import {ResUtils} from "db://assets/framework/assetutils/ResUtils";
const { ccclass, property } = _decorator;

@ccclass('ResBtn')
export class ResBtn extends Component {
    @property({type: Sprite})
    protected spritex: Sprite;
    async start() {
        var loadAsyncBtn = this.node.getChildByName("loadAsyncBtn");
        var loadAsyncBtnEffect = loadAsyncBtn.getComponent(ButtonClickEffect);
        loadAsyncBtnEffect.clickCallback = async ()=> {
            console.log("loadAsyncBtnEffect start");
            var promise = await ResUtils.loadAsync("rank/profile/anniu/spriteFrame", SpriteFrame);
            this.spritex.getComponent(Sprite).spriteFrame = promise
            console.log("show ")
            console.log("loadAsyncBtnEffect end");
        }
        var loadSync = this.node.getChildByName("loadSync");
        var loadSyncBtnEffect = loadSync.getComponent(ButtonClickEffect);
        loadSyncBtnEffect.clickCallback = ()=>{
            console.log("loadAsyncBtnEffect start");
            ResUtils.loadSync("rank/profile/anniu/spriteFrame", SpriteFrame,(sprite)=>{
                console.log("show ")
                this.spritex.getComponent(Sprite).spriteFrame = sprite
            });

            console.log("loadAsyncBtnEffect end");
        }
    }

    update(deltaTime: number) {
        
    }
}


