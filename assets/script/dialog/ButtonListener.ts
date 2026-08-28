import { _decorator, Button, Component, Node } from 'cc';
import { OpenDialogManager } from './OpenDialogManager';
import {ButtonClickEffect} from "db://assets/framework/button/ButtonClickEffect";
const { ccclass, property } = _decorator;

@ccclass('ButtonListener')
export class ButtonListener extends Component {
    @property(OpenDialogManager)
    uiManager:OpenDialogManager

    start() {
        var btnEffect = this.node.getComponent(ButtonClickEffect);
        if (!btnEffect) {
            btnEffect = this.node.addComponent(ButtonClickEffect);
        }
        btnEffect.clickCallback = ()=>{
            this.uiManager.showDialog("prefab/RankEndDialog")
        }
    }
}


