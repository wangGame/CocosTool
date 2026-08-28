import {BaseDialog} from "./base/BaseDialog";
import {
    BlockInputEvents,
    Color,
    Graphics,
    Node,
    Tween,
    UITransform,
    tween,
    view,
} from 'cc';
import {Type} from "db://assets/framework/dialog/Type";

export class DialogManager {
    private dialogBaseNode :Node
    private dialogs: BaseDialog[] =[]
    private shadowImg:Node = null;
    private shadowTweenState:{alpha:number} = null;
    private hasShadow:boolean = false;
    public constructor(node: Node) {
        this.dialogBaseNode = node;
    }

    public showDialog(baseDialog:BaseDialog){
        if (baseDialog == null) {
            return;
        }

        if(baseDialog != null){
            baseDialog.dialogManager = this;
        }
        // 只有弹窗栈从 0 变为 1 时才创建全局遮罩。
        if (this.dialogs.length === 0 && baseDialog.isShadowEnabled) {
            this.showShadow(baseDialog.dialogShadowDuration, baseDialog.dialogShadowOpacity);
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

    public showShadow(duration:number = 0.1667, opacity:number = 0.85){
        if(this.hasShadow){
            return;
        }
        this.hasShadow = true;
        this.shadowImg = new Node("DialogShadow");

        const parentTransform = this.dialogBaseNode.getComponent(UITransform);
        const visibleSize = view.getVisibleSize();
        const width = parentTransform?.width || visibleSize.width;
        const height = parentTransform?.height || visibleSize.height;

        const transform = this.shadowImg.addComponent(UITransform);
        transform.setContentSize(width, height);

        const graphics = this.shadowImg.addComponent(Graphics);
        this.drawShadow(graphics, width, height, 0);

        // 遮罩不仅显示颜色，还会阻止触摸穿透到后面的界面。
        this.shadowImg.addComponent(BlockInputEvents);

        this.shadowImg.parent = this.dialogBaseNode;
        // 此时遮罩在最上面，随后加入的第一个弹窗会自然位于遮罩之上。
        this.shadowImg.setSiblingIndex(this.dialogBaseNode.children.length - 1);

        const state = {alpha: 0};
        this.shadowTweenState = state;
        tween(state)
            .to(Math.max(0, duration), {
                alpha: Math.round(Math.min(1, Math.max(0, opacity)) * 255),
            }, {
                onUpdate: () => {
                    if (this.shadowImg?.isValid) {
                        this.drawShadow(graphics, width, height, state.alpha);
                    }
                },
            })
            .start();

    }

    private hideShadow(){
        if (!this.hasShadow) {
            return;
        }

        const shadow = this.shadowImg;
        this.hasShadow = false;
        this.shadowImg = null;

        if (!shadow || !shadow.isValid) {
            return;
        }

        const graphics = shadow.getComponent(Graphics);
        if (!graphics) {
            shadow.destroy();
            return;
        }

        const transform = shadow.getComponent(UITransform);
        const width = transform?.width ?? 0;
        const height = transform?.height ?? 0;
        const state = this.shadowTweenState ?? {alpha: 255};
        Tween.stopAllByTarget(state);
        tween(state)
            .to(0.1667, { alpha: 0 }, {
                onUpdate: () => {
                    if (shadow.isValid) {
                        this.drawShadow(graphics, width, height, state.alpha);
                    }
                },
            })
            .call(() => {
                if (shadow.isValid) {
                    shadow.destroy();
                }
                if (this.shadowTweenState === state) {
                    this.shadowTweenState = null;
                }
            })
            .start();
    }

    private drawShadow(graphics:Graphics, width:number, height:number, alpha:number){
        graphics.clear();
        graphics.fillColor = new Color(
            0,
            0,
            0,
            Math.round(Math.min(255, Math.max(0, alpha))),
        );
        graphics.rect(-width / 2, -height / 2, width, height);
        graphics.fill();
    }

    public closeDialog(baseDialog:BaseDialog){
        Tween.stopAllByTarget(baseDialog)
        baseDialog.closeDialog();
        const index = this.dialogs.indexOf(baseDialog);
        if (index >= 0) {
            this.dialogs.splice(index, 1);
        }

        // 最后一个弹窗关闭后，淡出并销毁全局遮罩。
        if (this.dialogs.length === 0) {
            this.hideShadow();
        } else if (baseDialog.dialogType == Type.NotHideShowCurrent) {

        }else {
            this.dialogs[this.dialogs.length - 1].show();
        }
    }
}
