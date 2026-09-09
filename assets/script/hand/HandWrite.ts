import { _decorator, Component, Node,Widget,Canvas,Camera,Layers,Color,Sprite,SpriteFrame,Graphics,screen } from 'cc';
import {Constant} from "db://assets/framework/constant/Constant";
import {ResUtils} from "db://assets/framework/assetutils/ResUtils";
const { ccclass, property } = _decorator;

@ccclass('HandWrite')
export class HandWrite extends Component {
    async start() {
        const rootWidget:Widget = this.node.addComponent(Widget);
        rootWidget.isAlignLeft = true;
        rootWidget.left = 10;
        rootWidget.isAlignRight = true;
        rootWidget.right = 10;
        rootWidget.isAlignBottom = true;
        rootWidget.bottom = 10;
        rootWidget.isAlignTop = true;
        rootWidget.top = 10;

        const cameraNode = new Node();
        cameraNode.setPosition(0,0,1000);
        const camera = cameraNode.addComponent(Camera);
        camera.projection = Camera.ProjectionType.ORTHO;
        camera.orthoHeight = Constant.designHeight;
        camera.visibility = Layers.BitMask.UI_2D;
        camera.clearColor = new Color(255, 255, 255);
        this.node.addChild(cameraNode);

        const canvas = this.node.addComponent(Canvas);
        canvas.cameraComponent = camera;

        const spriteTest = new Node("spriteTest");
        spriteTest.layer = Layers.BitMask.UI_2D;
        this.node.addChild(spriteTest);
        const sprite = spriteTest.addComponent(Sprite);

        const sp1 = await ResUtils.getInstane().loadAsync("pic/1/spriteFrame",SpriteFrame);
        sprite.spriteFrame = sp1;

        const fillNode = new Node();
        fillNode.layer = Layers.BitMask.UI_2D;
        this.node.addChild(fillNode);
        var graphics = fillNode.addComponent(Graphics);
        graphics.fillColor = new Color(55, 255, 255);
        graphics.roundRect(-this.visibleDesignWidth() / 2, -667, this.visibleDesignWidth(), 1334, 0);
        graphics.fill()
    }

    update(deltaTime: number) {
        
    }

    private visibleDesignWidth(): number {
        const frame = screen.windowSize;
        if (frame.width <= 0 || frame.height <= 0) return Constant.designWidth;
        // FIXED_HEIGHT 下可视宽度随设备纵横比变化；全屏遮罩和底图必须使用真实宽度，不能沿用 750。
        return Constant.designHeight * frame.width / frame.height;
    }

}


