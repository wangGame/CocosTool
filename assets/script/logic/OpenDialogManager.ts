import { _decorator, Component, instantiate, Node,resources,Prefab,Animation } from 'cc';
import { DialogManager } from '../../framework/dialog/DialogManager';
import {BaseDialog} from "db://assets/framework/dialog/base/BaseDialog";
const { ccclass, property } = _decorator;

@ccclass('OpenDialogManager')
export class OpenDialogManager extends Component {
    private dialogManager:DialogManager
    start() {
        this.dialogManager = new DialogManager(this.node);
    }

    public showDialog(path:string){
        resources.load(
            path,
            Prefab,
            (err, prefab) => {

                if (err) {
                    console.error('加载预制体失败:', err);
                    return;
                }

                const node = instantiate(prefab);
                // let animation = node.getComponent(Animation)
                // node.parent = this.node;
                this.dialogManager.showDialog(node.getComponent(BaseDialog))
            }
        );
    }
}


