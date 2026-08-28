import {BaseDialog} from "./base/BaseDialog";
import {Node,Sprite} from 'cc';
import {Type} from "db://assets/framework/dialog/Type";

export class DialogManager {
    private dialogBaseNode :Node
    private dialogs: BaseDialog[] =[]
    private shadowImg:Sprite
    private hasShadow:boolean = false;
    public constructor(node: Node) {
        this.dialogBaseNode = node;
    }

    public showDialog(baseDialog:BaseDialog){
        if(baseDialog != null){
            baseDialog.dialogManager = this;
        }
        if(this.dialogs.length>0){
            if (baseDialog.dialogType == Type.closeOldShowCurrent){
                const pop = this.dialogs.pop();
                pop.closeDialog();
            }else if (baseDialog.dialogType == Type.HideOldShowCurrent){
                const pop = this.dialogs[this.dialogs.length - 1];
                pop.hideDialog();
            }
        }else {

        }
        baseDialog.node.parent = this.dialogBaseNode
        baseDialog.show();
        this.dialogs.push(baseDialog);
    }

    public showShadow(){
        if(this.hasShadow){
            return;
        }
        this.hasShadow = true;
        this.shadowImg = new Sprite();
    }
}