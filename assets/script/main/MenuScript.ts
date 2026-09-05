import { _decorator, Component, Node,director } from 'cc';
import {ButtonClickEffect} from "db://assets/framework/button/ButtonClickEffect";
import {ScenceEnum} from "db://assets/script/scence/ScenceEnum";
const { ccclass, property } = _decorator;

@ccclass('MenuScript')
export class MenuScript extends Component {
    start() {
        const dialogPage = this.node.getChildByName('DialogPage');
        const dialogBtn = dialogPage.getComponent(ButtonClickEffect);
        dialogBtn.clickCallback = ()=>{
            console.log("Dialog clicked");
            director.loadScene(ScenceEnum.DialogDemo,()=>{
                console.log(dialogPage);
            })
        }
    }

    update(deltaTime: number) {
        
    }
}


