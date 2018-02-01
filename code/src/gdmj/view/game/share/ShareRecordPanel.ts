/**
 * 分享好友房战绩
 * @author huanglong
 * @date 2017/05/09
 */
class ShareRecordPanel extends BasePanel{
	public shareGro:eui.Group;
    public shareList:eui.List;
    public backBtn:eui.Button;
    public pengjiBtn:eui.Button;
    public qqBtn:eui.Button;
    public wxBtn:eui.Button;
    public wxfriendBtn:eui.Button;
    public overTimeLab:eui.Label;
    public qrCodeImg:eui.Image;

	public constructor() {
		super();
		this.skinName = "ShareRecordPanelSkin";
	}

	protected onEnable() {
        this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
        this.pengjiBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchShare, this);
        this.qqBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchShare, this);
        this.wxBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchShare, this);
        this.wxfriendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchShare, this);

        if (this.recData) {
            this.setData();
        }
        else {
            this.setTotalData();
        }
        this.qrCodeImg.source = App.DataCenter.qrCodeUrl;
    }

    protected onRemove() {
        this.backBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
        this.pengjiBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchShare, this);
        this.qqBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchShare, this);
        this.wxBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchShare, this);
        this.wxfriendBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchShare, this);

        this.recData = null;
    }

	public setData(){
        console.log("+++++++++++",this.recData);

		let ac = new eui.ArrayCollection();
        let arr = [];
        var list = this.recData.survey;
        for(var i = 0; i < list.length; i++) {
			let dataObj = new Object();
            dataObj["name"] = list[i].name;
            dataObj["point"] = list[i].point;
            dataObj["bigwin"] = false;
            dataObj["wincount"] = list[i].wincount;
            dataObj["headurl"] = list[i].pic;
            if (this.recData.ownerid == list[i].playerID) {
                dataObj["ower"] = true;
            }
            else {
                dataObj["ower"] = false;
            }
            if (list[i].playerID == App.DataCenter.UserInfo.getMyUserVo().userID) {
                dataObj["self"] = true;
            }
            else {
                dataObj["self"] = false;
            }
            arr.push(dataObj);
        }
        arr.sort((a,b)=>{
            return Number(b.point) - Number(a.point);
        })

        var bigwin = 0;
        var big = 0;
        for(var i = 0;i < arr.length;i ++) {
            arr[i]["rank"] = i+1;
            if (Number(arr[i].point) > bigwin) {
                big = Number(arr[i].point);
                bigwin = i;
            }
        }
        arr[0].bigwin = true;

        ac.source = arr;
        this.shareList.dataProvider = ac;
        this.shareList.itemRenderer = ShareRecordItem;

        this.overTimeLab.text = ArrayTool.formatDate1(this.recData.LastGameDate)+" "+ArrayTool.formatDate2(this.recData.LastGameDate)+" 结束";
	}

    public setTotalData() {
        let ac = new eui.ArrayCollection();
        let arr = [];
        this.recData = ProtocolData.Rev100818.info;
        console.log("+++++++++++",this.recData);
        var list = this.recData.RecordList;
        for(var i = 0; i < list.length; i++) {
			let dataObj = new Object();
            dataObj["name"] = list[i].name;
            dataObj["point"] = list[i].lossWinPoint;
            dataObj["ziMoNum"] = list[i].ziMoNum;
            dataObj["huPaiNum"] = list[i].huPaiNum;
            dataObj["zhongNiaoNum"] = list[i].zhongNiaoNum;
            dataObj["avatar"] = list[i].avatar;
            if (App.DataCenter.deskInfo.ownerID == list[i].userID) {
                dataObj["ower"] = true;
            }
            else {
                dataObj["ower"] = false;
            }
            if (list[i].userID == App.DataCenter.UserInfo.getMyUserVo().userID) {
                dataObj["self"] = true;
            }
            else {
                dataObj["self"] = false;
            }
            arr.push(dataObj);
        }
        arr.sort((a,b)=>{
            return Number(b.point) - Number(a.point);
        })

        for(var i = 0;i < arr.length;i ++) {
            arr[i]["rank"] = i+1;
        }

        ac.source = arr;
        this.shareList.dataProvider = ac;
        this.shareList.itemRenderer = ShareTotalItem;

        if (this.recData.roundEndTime) {
            this.overTimeLab.text = ArrayTool.formatDate1(this.recData.roundEndTime)+" "+ArrayTool.formatDate2(this.recData.roundEndTime)+" 结束";
        }
        else {
            var date = (new Date().getTime())/1000;
            this.overTimeLab.text = ArrayTool.formatDate1(date)+" "+ArrayTool.formatDate2(date)+" 结束";
        }
        
    }

    private onTouchShare(e: egret.Event) {
        var shareType = 0;
        switch(e.target) {
            case this.pengjiBtn:
                shareType = 0;
                break;
            case this.qqBtn:
                shareType = 1;
                break;
            case this.wxBtn:
                shareType = 2;
                break;
            case this.wxfriendBtn:
                shareType = 3;
                break;
            default:
                break;
        }
        TipsLog.hallInfo("分享请求已发送");
        this.shareTo(shareType.toString());
        this.hide();
    }

    /**分享逻辑 */
    private shareTo(shareType: string) {
        var renderTexture:egret.RenderTexture = new egret.RenderTexture();
        renderTexture.drawToTexture(this.shareGro);
        var base64Data = renderTexture.toDataURL("image/png");

        var data = {
            gameId:"10004",
            share:shareType,
            imageB64:base64Data,
            gameName:"长沙麻将"
        }
        App.NativeBridge.sendImageShare(data);
    }

	/**返回 */
	protected back(){
		this.hide();
	}

}