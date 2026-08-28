import { _decorator, Component, Node,Animation } from 'cc';
import { BaseDialog } from '../../framework/dialog/base/BaseDialog';
import {ButtonClickEffect} from "db://assets/framework/button/ButtonClickEffect";
const { ccclass, property } = _decorator;

@ccclass('EndDialogScript')
export class EndDialogScript extends BaseDialog {
    onLoad(){

    }

    start() {
        super.start();
        const rootNode = this.node.getChildByName("rootNode");
        console.log(rootNode);
        this.dialogGroup = rootNode;
        const okBtn = this.dialogGroup.getChildByName("okBtn");
        const okEffect = okBtn.addComponent(ButtonClickEffect)
        okEffect.clickCallback = ()=>{
            this._dialogManager.closeDialog(this)
        }
    }

    public closeDialog(){
        let animation = this.dialogGroup.getComponent(Animation)
        animation.once(Animation.EventType.FINISHED, () => {
            this.node.destroy();
        }, this);
        animation?.play("dialogExitAnimation")
    }
}


