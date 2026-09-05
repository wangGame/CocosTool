import { _decorator, Constructor,Asset,resources} from 'cc';

export class ResUtils {
    //同步加载
    public static loadAsync<T extends Asset>(
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
    public static loadSync<T extends Asset>(
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
}


