/**
 * 个人信息界面
 * @author chen
 * 2017-030-20
 * 
 * 不是玩家自己需要传递参数
 */

class UserInfoPanel extends BasePanel {
    public uid: eui.Label;
    public nickName: eui.Label;
    public dia: eui.Label;
    public gold: eui.Label;
    public score: eui.Label;
    public duanwei: eui.Label;
    public headUrl: eui.Image;
    public changeBtn: eui.Button;
    public headBtn:how.Button;

    public constructor() {
        super();
        this.skinName = "gameUserSkin"
    }

    protected childrenCreated() {
        this.update();
    }

    private update() {
        let user = App.DataCenter.UserInfo.selfUser;
        this.uid.text = "ID:" + user.userID.toString();
        this.nickName.text = user.nickName;
        this.dia.text = user.coin.toString();
        this.gold.text = user.gold.toString();
        this.headUrl.source = user.headUrl;
        this.score.text = "战绩：" + user.win_board + "胜/" + user.lose_board + "负/" + user.pin_board + "平";
        this.duanwei.text = "段位：" + user.paiwei_rank_name;
    }

    /** 添加到场景*/
    protected onEnable() {
        this.setCenter();
        this.changeBtn.addEventListener("touchTap", this.onChangTap, this);
        // this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    }

    private onTouch(evt: egret.TouchEvent) {
        switch (evt.target) {
            case this.headBtn:
                Tips.info("敬请期待...");
                break;
            default:
                break;
        }

    }

    /** 从场景中移除*/
    protected onRemove() {

    }

    private onChangTap(e: egret.TouchEvent) {
        App.PanelManager.open(PanelConst.ProfilePhotoPanel);
    }

    /**关闭*/
    private onCloseBtn(e: egret.Event) {
        this.hide()
    }
}