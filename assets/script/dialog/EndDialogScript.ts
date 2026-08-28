import { _decorator, Component, Node,Animation } from 'cc';
import { BaseDialog } from '../../framework/dialog/base/BaseDialog';
import {ButtonClickEffect} from "db://assets/framework/button/ButtonClickEffect";
const { ccclass, property } = _decorator;

@ccclass('EndDialogScript')
export class EndDialogScript extends BaseDialog {
    start() {
        super.start();
        var okBtn = this.node.getChildByName("okBtn");
        var okEffect = okBtn.addComponent(ButtonClickEffect)
        okEffect.clickCallback = ()=>{
            this.closeDialog();
        }
    }

    private closeDialog(){
        var animation = this.node.getComponent(Animation)
        animation.once(Animation.EventType.FINISHED, () => {
            this.node.destroy();
        }, this);
        animation?.play("dialogExitAnimation")
    }
}


