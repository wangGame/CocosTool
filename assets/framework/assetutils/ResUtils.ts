import {
    Constructor,
    Asset,
    resources
} from 'cc';

export class ResUtils {
    private assets: Map<string, Asset> = new Map();
    private assetsLoad: Set<string> = new Set();
    private finishCount = 0;
    private errorCount = 0;

    //同步加载
    public loadAsync<T extends Asset>(
        path: string,
        type: Constructor<T>
    ): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            resources.load(path, type, (err, asset) => {
                if (err) {
                    console.error(`资源加载失败: ${path}`, err);
                    reject(err);
                    return;
                }
                resolve(asset);
            });
        });
    }

    //异步加载
    public loadCallBack<T extends Asset>(
        path: string,
        type: Constructor<T>,
        callback: (asset:T) => void
    ) {
        resources.load(path, type, (err, asset) => {
            if (err) {
                console.error(`资源加载失败: ${path}`, err);
                return;
            }
            callback?.(asset)
        });
    }


    /**
     * 并行加载多个资源
     */
    public loadAll<T extends Asset>(
        paths: string[],
        type: Constructor<T>
    ): Promise<T[]> {

        return Promise.all(
            paths.map(path => {
                return this.loadAsync(path, type);
            })
        );
    }

    public load<T extends Asset>(
        path: string,
        type: Constructor<T>
    ) {
        if (this.assetsLoad.has(path)) {
            return;
        }
        console.log("===================")
        this.assetsLoad.add(path)
        resources.load(path, type, (err, asset) => {
            if (err) {
                console.error(`资源加载失败: ${path}`, err);

                this.errorCount++;
                this.finishCount++;

                return;
            }
            console.log("load success");
            this.assets.set(path, asset);
            this.finishCount++;
        });
    }

    public update(): boolean {
        if (this.assetsLoad.size === 0) {
            return true;
        }
        return this.finishCount >= this.assetsLoad.size;
    }

    /**
     * 0 ~ 1
     */
    public getProgress(): number {
        if (this.assetsLoad.size === 0) {
            return 1;
        }
        return this.finishCount / this.assetsLoad.size;
    }

    /**
     * 获取已经加载的资源
     */
    public get<T extends Asset>(path: string): T | null {
        return (this.assets.get(path) as T) ?? null;
    }

    private static resUtils: ResUtils;

    public static getInstane():ResUtils{
        if (this.resUtils == null){
            this.resUtils = new ResUtils();
        }
        return this.resUtils;
    }

    public preload(){

    }
}


