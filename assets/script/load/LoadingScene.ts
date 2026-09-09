// import { _decorator,ProgressBar, Component, Node, SpriteFrame,director,tween,Tween } from 'cc';
// import {ResUtils} from "db://assets/framework/assetutils/ResUtils";
// const { ccclass, property } = _decorator;
//
// @ccclass('LoadingScene')
// export class LoadingScene extends Component {
//     @property({
//         type: ProgressBar
//     })
//     private processBar:ProgressBar;
//     private showProgress = 0;
//     start() {
//         for (var i = 1;i<=115;i++){
//             ResUtils.getInstane().load("pic/"+i+"/spriteFrame",SpriteFrame)
//         }
//     }
//
//     private loadFinish = false;
//     update(deltaTime: number) {
//         if (this.loadFinish) {
//             return;
//         }
//
//         const res = ResUtils.getInstane();
//
//         // 真实加载进度
//         const realProgress = res.getProgress();
//
//         // 显示进度慢慢追赶真实进度
//         this.showProgress +=
//             (realProgress - this.showProgress)
//             * Math.min(deltaTime * 8, 1);
//
//         // 显示进度不能超过真实进度
//         this.showProgress =
//             Math.min(this.showProgress, realProgress);
//
//         this.processBar.progress = this.showProgress;
//         console.log(this.processBar.progress);
//         // 资源已经真正加载完
//         if (realProgress >= 1) {
//
//             // UI也接近100%
//             if (this.showProgress >= 0.995) {
//
//                 this.showProgress = 1;
//                 this.processBar.progress = 1;
//
//                 this.loadFinish = true;
//
//                 director.loadScene("UiDemo");
//             }
//         }
//     }
// }
//
//

import {
    _decorator,
    Component,
    ProgressBar,
    SpriteFrame,
    resources,
    director
} from 'cc';

const { ccclass, property } = _decorator;

@ccclass('LoadingScene')
export class LoadingScene extends Component {

    @property({
        type: ProgressBar
    })
    private processBar: ProgressBar = null!;

    // 总资源数量
    private totalCount: number = 0;

    // 已经完成数量
    private finishCount: number = 0;

    private loadFinish: boolean = false;


    start() {

        this.processBar.progress = 0;

        this.loadResources();
    }


    private loadResources() {

        // 获取 resources/pic 下面所有 SpriteFrame
        const list = resources.getDirWithPath(
            "pic",
            SpriteFrame
        );

        this.totalCount = list.length;

        console.log("资源总数量 = " + this.totalCount);

        if (this.totalCount <= 0) {
            this.onLoadFinish();
            return;
        }


        for (let i = 0; i < list.length; i++) {

            const info = list[i];

            console.log("开始加载：" + info.path);

            resources.preload(
                info.path,
                SpriteFrame,
                (err) => {

                    if (err) {

                        console.error(
                            "加载失败：" + info.path,
                            err
                        );

                    } else {

                        console.log(
                            "加载成功：" + info.path
                        );
                    }

                    // 不管成功还是失败
                    // 当前任务都算执行结束
                    this.finishCount++;

                    // 更新进度
                    this.updateProgress();

                    // 全部结束
                    if (
                        this.finishCount >=
                        this.totalCount
                    ) {
                        this.onLoadFinish();
                    }
                }
            );
        }
    }


    private updateProgress() {

        const progress =
            this.finishCount /
            this.totalCount;

        this.processBar.progress = progress;

        console.log(
            "进度：" +
            this.finishCount +
            "/" +
            this.totalCount +
            " = " +
            progress
        );
    }


    private onLoadFinish() {

        if (this.loadFinish) {
            return;
        }

        this.loadFinish = true;

        this.processBar.progress = 1;

        console.log("============= 全部加载完成 =============");

        director.loadScene("UiDemo");
    }
}