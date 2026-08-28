import { _decorator, 
    Component, 
    Node,
    Enum, 
    instantiate,
    Prefab
} from 'cc';
import { DialogManager } from '../DialogManager';
import { Type } from '../Type';
import { ResUtils } from '../../assetutils/ResUtils';
const { ccclass, property } = _decorator;


/**
 * 遮罩目前是全局只使用一个，因为方便Dialogmanager方便管理，如果弹窗叠在一起，但是又需要多个遮罩的时候，需要自己判断，对弹窗单独加
 * 
 * 所以对于弹窗来说，存在一个内容的dialogGroup,这样也方便管理内容，
 */
@ccclass('BaseDialog')
export class BaseDialog extends Component {
    @property({type:Node,tooltip:"基类Node"})
    protected dialogGroup:Node;
    @property({type:Enum(Type)})
    protected _dialogType:Type = Type.HideOldShowCurrent
    @property
    protected shadowEnable = true;
    @property({range:[0,1,0.01]})
    protected shadowOpacity = 0.85;
    @property
    protected shadowDuration = 0.1667;
    //返回键是否可以关闭该弹窗
    @property
    protected backCloseDisabled = false;
    @property
    protected timeScale = 0.7;
    @property
    protected entered = false;
    @property 
    protected closeFlag = false;
    @property
    protected close = false;
    //感觉用不到这两个
    @property
    protected offsetX;
    protected offsetY;
    protected _dialogManager:DialogManager
    start() {

    }

    public set dialogManager(dialogManager:DialogManager){
        this._dialogManager = dialogManager
    }

    public get dialogType(){
        return this._dialogType;
    }

    public closeDialog(){

    }

    hideDialog() {


    }

    show() {

    }
}


