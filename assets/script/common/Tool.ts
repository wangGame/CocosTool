import { _decorator, Component, Node,director,Label,gfx } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Tool')
export class Tool extends Component{
    @property({
        tooltip: '更新 FPS 显示的时间间隔（秒）',
    })
    updateInterval: number = 0.25;

    private _label: Label | null = null;
    private _frameCount: number = 0;
    private _elapsedTime: number = 0;
    private _fps: number = 0;

    onLoad() {
        this._label = this.getComponent(Label);
    }

    update(delta: number) {
        this._frameCount ++;
        this._elapsedTime += delta;
        // 达到更新间隔
        if (this._elapsedTime >= this.updateInterval) {
            this._fps = this._frameCount / this._elapsedTime;
            if (this._label) {
                const device = gfx.deviceManager.gfxDevice;
                console.log(this._fps);
                this._label.string = `FPS: ${this._fps.toFixed(1)}\nDC:${device.numDrawCalls}\nTRIS:${
                    device.numTris
                }\nRENDER:${
                    device.gfxAPI === gfx.API.WEBGL
                        ? 'WebGL'
                        : device.gfxAPI === gfx.API.WEBGL2
                            ? 'WebGL2'
                            : device.gfxAPI === gfx.API.GLES2
                                ? 'GLES2'
                                : device.gfxAPI === gfx.API.GLES3
                                    ? 'GLES3'
                                    : device.gfxAPI === gfx.API.VULKAN
                                        ? 'VULKAN'
                                        : device.gfxAPI === gfx.API.METAL
                                            ? 'METAL'
                                            : 'UNKNOWN/NOMATCH'
                }`;
            }

            this._frameCount = 0;
            this._elapsedTime -= this.updateInterval;

        }
    }
}
