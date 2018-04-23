/**
 * socket 关闭弹窗
 */
class SocketClosePanel extends BasePanel {

    public constructor() {
        super();
        this.skinName = "socketClosePanelSkin";
    }

    public okBtn: eui.Button;

    /**添加到场景中*/
    protected onEnable() {
        this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.okTouch, this);
    }

    /**从场景中移除*/
    protected onRemove() {
        this.okBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.okTouch, this);
    }

    //重启游戏
    private okTouch() {
        this.hide();

        if (App.SceneManager.getCurScene() == App.SceneManager.getScene(SceneConst.GameScene)) {
            App.SceneManager.getScene(SceneConst.GameScene) && App.SceneManager.getScene(SceneConst.GameScene).resetScene();
        }
        (<LoginController>App.getController(LoginController.NAME)).unRegister();
        App.SceneManager.sceneList[SceneConst.GameScene] = null;
        App.SceneManager.sceneList[SceneConst.HallScene] = null;
        App.PanelManager.closeAllPanel();
        App.DataCenter.socketClose = true;
        egret.Tween.removeAllTweens();
        App.getInstance().startUp();
    }
}