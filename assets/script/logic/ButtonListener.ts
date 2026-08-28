import { _decorator, Button, Component, Node } from 'cc';
import { OpenDialogManager } from './OpenDialogManager';
const { ccclass, property } = _decorator;

@ccclass('ButtonListener')
export class ButtonListener extends Component {
    @property(OpenDialogManager)
    uiManager:OpenDialogManager

    start() {
        console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
        this.node.on(Node.EventType.TOUCH_START, this.onRestartClick, this);
    }

    onRestartClick(){
        console.log("xxxxxxxxxxxxxxxxxxx")
        this.uiManager.showDialog("prefab/RankEndDialog")
    }

    update(deltaTime: number) {
        
    }
}


