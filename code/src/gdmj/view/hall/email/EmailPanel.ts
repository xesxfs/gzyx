/**
 *	邮箱界面
 * @author eyanlong
 *	2017/2/23
 */
class EmailPanel extends BasePanel {
	private emailList: eui.List;		//list
	private email_back:eui.Button; // 返回
    public nilLabHall:eui.Label;

	public constructor() {
		super();
        this.skinName = "EmailSkin";
	}

	/**添加到场景中*/
    protected onEnable() {
		this.email_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
    }

    /**从场景中移除*/
    protected onRemove() {
		this.email_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
    }

	/**设置数据 */
    public setData(data:any) {
        if (data.length > 0) {
            let ac = new eui.ArrayCollection();
            let arr = [];
            for(var i = 0; i < data.length; i++) {
                let dataObj = new Object();
                dataObj["data"] = data[i];
                arr.push(dataObj);
            }
            ac.source = arr;
            this.emailList.dataProvider = ac;
            this.emailList.itemRenderer = EmailItem;
            this.nilLabHall.visible = false;
        }
        else {
            this.nilLabHall.visible = true;
        }
    }

	 /*刷新邮件列表*/
    public sendGetEmail() {
        // var http: HttpSender = new HttpSender();
        // var qr = ProtocolHttp.send_z_emailList;
        // http.send(qr, this.revGetEmail, this);
    }
    /**邮件返回 */
    private revGetEmail(data) {
        if (!data.ret) {
            this.setData(data.data);
        } else {
            TipsLog.hallInfo(data.desc)
        }
    }

	/**返回 */
	private back(){
		this.hide();
	}
	
}