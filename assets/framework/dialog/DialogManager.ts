import {BaseDialog} from "./base/BaseDialog";
import {Node, Sprite, Tween,SpriteFrame,UITransform,math} from 'cc';
import {Type} from "db://assets/framework/dialog/Type";
import {ResUtils} from "db://assets/framework/assetutils/ResUtils";

export class DialogManager {
    private dialogBaseNode :Node
    private dialogs: BaseDialog[] =[]
    private shadowImg:Node
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

    public async showShadow(){
        if(this.hasShadow){
            return;
        }
        this.hasShadow = true;
        this.shadowImg = new Node();
        const nodeSprite= this.shadowImg.addComponent(Sprite);
        nodeSprite.sizeMode = Sprite.SizeMode.CUSTOM
        const promise = await ResUtils.loadAsync("common/white/spriteFrame",SpriteFrame);
        nodeSprite.spriteFrame = promise;
        nodeSprite.type = Sprite.Type.SLICED;
        const spriteColor = new math.Color();
        spriteColor.set(245,245,245,255)
        nodeSprite.color = spriteColor;

    }

    public closeDialog(baseDialog:BaseDialog){
        Tween.stopAllByTarget(baseDialog)
        baseDialog.closeDialog();
        const index = this.dialogs.indexOf(baseDialog);
        this.dialogs.splice(index, 1);
        if (baseDialog.dialogType == Type.NotHideShowCurrent) {

        }else {
            this.dialogs[this.dialogs.length - 1].show();
        }
    }
}