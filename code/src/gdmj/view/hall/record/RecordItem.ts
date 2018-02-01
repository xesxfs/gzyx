/**
 * 记录item
 * @author huanglong
 * 2017/03/17
 */

class RecordItem extends eui.ItemRenderer {
    private roomLab:eui.Label;
    private dateLab:eui.Label;
    private timeLab:eui.Label;
    private roundLab:eui.Label;
    private shareBtn:eui.Button;
    private detailBtn:eui.Button;
    private listGro:eui.Group;
    private myselfGro:eui.Group;
    private shareGro:eui.Group;
    private pengjiBtn:eui.Button;
    private qqBtn:eui.Button;
    private wxBtn:eui.Button;
    private wxfriendBtn:eui.Button;

    protected itemData:any;

    public constructor() {
		super();
		this.skinName = "RecordItemSkin";
        this.shareGro.visible = false;
	}

    public dataChanged():void{
        var itemData = this.data;
        this.roomLab.text = "房号:"+itemData.deskCode;
        this.dateLab.text = ArrayTool.formatDate1(itemData.deskBuildDate);
        this.timeLab.text = ArrayTool.formatDate2(itemData.deskBuildDate);
        
        for(var i = 0;i < itemData.userinfo.length;i ++) {
            var point = "";
            var nameColor = 0x696969;
            var pointColor = 0x696969;
            if( Number(itemData.userinfo[i].point)>0 ) {
                point = "+"+itemData.userinfo[i].point;
                nameColor = 0x7e5a3d;
                pointColor = 0xb33318;
            }
            else {
                point = itemData.userinfo[i].point;
            }
            (<eui.Label>this.listGro.getChildAt(4+i*2)).text = StringTool.formatNickName(itemData.userinfo[i].name);
            (<eui.Label>this.listGro.getChildAt(4+i*2)).textColor = nameColor;
            (<eui.Label>this.listGro.getChildAt(4+i*2+1)).text = point;
            (<eui.Label>this.listGro.getChildAt(4+i*2+1)).textColor = pointColor;
        }

        var selfId = App.DataCenter.UserInfo.httpUserInfo.userID;
        for(var i = 0;i < itemData.userinfo.length;i ++) {
            if (selfId == Number(itemData.userinfo[i].playerID)) {
                this.myselfGro.getChildAt(i).visible = true;
            }
            else {
                this.myselfGro.getChildAt(i).visible = false;
            }
        }

        var totalStr = "";
        if (itemData.pattern == "9999") {
            totalStr = "-";
        }
        else {
            totalStr = itemData.pattern;
        }
        this.roundLab.text = itemData.playtotal + "/" + totalStr;
    }

    protected childrenCreated() {
        this.shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShare, this);
        this.detailBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDetail, this);
        this.addLis();
    }

    /**分享平台选择按钮事件 */
    private addLis() {
        this.pengjiBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShareChoose, this);
        this.qqBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShareChoose, this);
        this.wxBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShareChoose, this);
        this.wxfriendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShareChoose, this);
    }

    private onShareChoose(e: egret.TouchEvent) {
        switch (e.target) {
            case this.pengjiBtn:
                break;
            case this.qqBtn:
                break;
            case this.wxBtn:
                break;
            case this.wxfriendBtn:
                break;
            default:
                return;
        }
        egret.Tween.removeTweens(this.shareGro);
        this.shareGro.visible = false;
    }

    /** 分享*/
    private onShare() {
        // this.shareGro.visible = !this.shareGro.visible;
        // egret.Tween.removeTweens(this.shareGro);
        // if (this.shareGro.visible) {
        //     egret.Tween.get(this.shareGro).wait(3000).set({visible:false})
        //     .call(()=>{
        //         egret.Tween.removeTweens(this.shareGro);
        //     })
        // }
        
        var http = new HttpSender();
        let data = ProtocolHttp.getShareRecord;
        data.param.deskBuildDate = this.data.deskBuildDate;
        data.param.deskCode = this.data.deskCode;
        http.send(data, this.revShare, this);
    }

    private revShare(data) {
        if (data.ret == 0) {
            App.PanelManager.open(PanelConst.ShareRecordPanel, null, null, true, true, data.data);
        }
        else {
            TipsLog.hallInfo("获取分享信息失败");
        }
    }

    /** 详情*/
    private onDetail() {
        this.sendRecordDetail();
    }

    /**记录详情请求 */
    public sendRecordDetail() {
        var http = new HttpSender();
        let data = ProtocolHttp.GetScoreDetailList;
        data.param.deskBuildDate = this.data.deskBuildDate;
        data.param.deskCode = this.data.deskCode;
        http.send(data, this.recRecordDetail, this);
    }

    /**记录详情接收 */
    public recRecordDetail(data) {
        console.log("详情："+data);
        if (!data.ret) {
            App.PanelManager.open(PanelConst.RecordDetailPanel,null,this,true,true,data.data);
        } else {
            TipsLog.hallInfo(data.desc);
        }
    }
}