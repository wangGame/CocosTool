import { BaseDialog } from "./base/BaseDialog";
import { Node } from 'cc';

export class DialogManager {
    private dialogBaseNode :Node
    private dialogs=[]

    public constructor(node: Node) {
        this.dialogBaseNode = node;
    }

    public showDialog(baseDialog:BaseDialog){
        if(baseDialog != null){
            baseDialog.dialogManager = this;
        }
        if(this.dialogs.length>0){

        }else{
            baseDialog.node.parent = this.dialogBaseNode
        }
    }
}