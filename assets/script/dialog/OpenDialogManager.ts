import { _decorator, Component, instantiate, Node,resources,Prefab,Animation } from 'cc';
import { DialogManager } from '../../framework/dialog/DialogManager';
import {BaseDialog} from "db://assets/framework/dialog/base/BaseDialog";
import {ResUtils} from "db://assets/framework/assetutils/ResUtils";
const { ccclass, property } = _decorator;

@ccclass('OpenDialogManager')
export class OpenDialogManager extends Component {
    private dialogManager:DialogManager
    start() {
        this.dialogManager = new DialogManager(this.node);
    }

    public async showDialog(path:string){
        let prefabPromise = await ResUtils.loadAsync(path,Prefab);
        let nodePrefab = instantiate(prefabPromise);
        this.dialogManager.showDialog(nodePrefab.getComponent(BaseDialog))
    }
}


