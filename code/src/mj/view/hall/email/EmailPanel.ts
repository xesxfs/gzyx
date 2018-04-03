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

        if (info["get_gold_num"] > 0 || info["get_diamonds_num"] > 0) {
            this.receiveBtn.enabled = info["if_get"] == 0 ? true : false;   //是否已经接受附件 0:没接收 1:接收了
            this.receiveBtn.visible = true;
        }
        this._focusMail = info;
        this.readMail();
    }

    private changeSelect() {
        // console.log(this.titleLst.selectedItem);
        
    }

    /**添加到场景中*/
    protected onEnable() {
        this.setCenter();
        App.EventManager.addEvent(EventConst.ShowMail, this.onShowMail, this);

        this.titleLst.itemRenderer = EmailItem;
        // this.receiveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);

        this.update();
    }

    private readMail() {
        var httpsend = new HttpSender();
        var request = ProtocolHttp.send_ReadMail;
        request.param.mail_id = this._focusMail["id"];
        httpsend.send(request, this.revReadMail, this);
        // this.receiveBtn.enabled = false;
    }

    private revReadMail(rev: any) {
        if (rev.data) {
            this._focusMail["if_get"] = 1;
            ProtocolHttp.rev_ReadMail.mail_list = rev.data;
            ProtocolHttp.rev_ReadMail.mail_list.forEach((mail) => {
                if (mail["gold"] > 0) {
                    App.EventManager.sendEvent(EventConst.UpdateGold, mail["gold"]);
                }

                if (mail["diamonds"] > 0) {
                    App.EventManager.sendEvent(EventConst.UpdateDiamond, mail["diamonds"]);
                }
            });
        }
    }

    /**从场景中移除*/
    protected onRemove() {

    }

    /**返回 */
    private back() {
        this.hide();
    }

}