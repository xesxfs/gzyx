/**
 *	邮箱界面
 * @author chen
 *	2017/2/23
 */
class EmailPanel extends BasePanel {
    public mailTab: eui.TabBar;
    public titleLst: eui.TabBar;
    public contentLab: eui.Label;
    public receiveBtn: eui.Button;
    public titleLab: eui.Label;

    public constructor() {
        super();
        this.skinName = "EmailSkin";
    }

    private update() {
        let mails = ProtocolHttp.rev_MailList.mail_list;
        this.titleLst.dataProvider = new eui.ArrayCollection(mails);
    }

    private _focusMail: Object;
    public onShowMail(info: any) {
        this.contentLab.text = info["content"];
        this.titleLab.text = info["head"];

        if (info["type"] == 2) {
            this.receiveBtn.enabled = info["if_get"] == 0 ? true : false;   //是否已经接受附件 0:没接收 1:接收了
            this.receiveBtn.visible = true;
        } else {
            this.receiveBtn.visible = false;
        }

        this._focusMail = info;

        this.changeSelect();
    }

    private _focusTitle: EmailItem;
    private changeSelect() {
        // console.log(this.titleLst.selectedItem);

        if (this._focusTitle) this._focusTitle.titleBtn.selected = false;
        this._focusTitle = this.titleLst.getChildAt(this.titleLst.selectedIndex) as EmailItem;
        this._focusTitle.titleBtn.selected = true;
    }

    /**添加到场景中*/
    protected onEnable() {
        this.setCenter();
        App.EventManager.addEvent(EventConst.ShowMail, this.onShowMail, this);

        this.titleLst.itemRenderer = EmailItem;
        this.receiveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.readMail, this);

        this.update();
    }

    private readMail() {
        (App.getController(HallController.NAME) as HallController).sendReadAccessoryMail(this._focusMail["id"]);
        this.receiveBtn.enabled = false;
    }

    public revReadMail() {
        if (this._focusMail) {
            this._focusMail["if_get"] = 1;

            let data = this._focusMail["icon_list"];
            data.forEach((prop) => {
                Tips.info("恭喜您获得 " + prop["name"] + "x" + prop["num"])
            });
        }
    }

    /**从场景中移除*/
    protected onRemove() {
        this.receiveBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.readMail, this);
        this.receiveBtn.visible = false;
        this.contentLab.text = "";
        this.titleLab.text =  "";
    }

    /**返回 */
    private back() {
        this.hide();
    }

}