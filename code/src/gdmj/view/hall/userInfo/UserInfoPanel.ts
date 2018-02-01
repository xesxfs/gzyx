/**
 * 个人信息界面
 * @author huanglong
 * 2017-030-20
 * 
 * 不是玩家自己需要传递参数
 */

class UserInfoPanel extends BasePanel{

    private closeBtn:eui.Button;
    private contactBtn:eui.Button;
    private headMaskImg:eui.Image;
    private headIcon:eui.Image;
    private sexImg:eui.Image;
    public nameLab:eui.EditableText;
    public modifyImg:eui.Image;
    public nameBg:eui.Image;
    private idLab:eui.Label;
    private totalLab:eui.Label;
    private winPercentLab:eui.Label;
    private integralLab:eui.Label;
    private continuousWinLab:eui.Label;
    private btnGro:eui.Group;
    private addFriendBtn:eui.Button;
    private kickBtn:eui.Button;
    private addFriendSBtn:eui.Button;
    public bindBtn:eui.Button;

    private curName:string;
    private offFlag:boolean;

    public constructor() {
        super();
        this.skinName = "gameUserSkin"
    }

   protected childrenCreated() {
        this.nameLab.maxChars = 8;
    }

    /** 添加到场景*/
    protected onEnable() {
        this.offFlag = true;
        this.initView();
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtn, this);
        this.contactBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSureBtn, this);
        this.kickBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.kickSomeone, this);
        this.addFriendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addFriend, this);
        this.addFriendSBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addFriend, this);
        this.modifyImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onModify,this);
        this.nameLab.addEventListener(egret.FocusEvent.FOCUS_IN, this.FcousIn, this)
        this.nameLab.addEventListener(egret.FocusEvent.FOCUS_OUT, this.FcousOut, this);
        this.bindBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBindBtn, this);
        this.setCenter();
    }

    /** 从场景中移除*/
    protected onRemove() {
      
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtn, this);
        this.contactBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSureBtn, this);
        this.kickBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.kickSomeone, this);
        this.addFriendBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.addFriend, this);
        this.addFriendSBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.addFriend, this);
        this.modifyImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onModify,this);
        this.nameLab.removeEventListener(egret.FocusEvent.FOCUS_IN, this.FcousIn, this)
        this.nameLab.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.FcousOut, this);
        this.bindBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBindBtn, this);
        this.recData = null;
    }

    /**设置界面值 */
    private initView() {
        this.nameBg.visible = false;
        var user;
        if (this.recData.self) {
            if (App.getInstance().indepFlag && App.DataCenter.UserInfo.getMyUserVo().visitorFlag) {
                this.bindBtn.visible = true;
                this.contactBtn.visible = false;
            }
            else {
                this.bindBtn.visible = false;
                this.contactBtn.visible = true;
            }
            
            this.btnGro.visible = false;
            this.nameLab.touchEnabled = true;
            this.modifyImg.visible = true;
            this.addFriendSBtn.visible = false;
        }
        else {
            if (App.DataCenter.roomInfo.roomType == RoomType.FriendRoom) {
                this.contactBtn.visible = false;
                //点自己显示确定
                if (App.DataCenter.UserInfo.getMyUserVo().userID == this.recData.uid) {
                    this.contactBtn.visible = true;
                    this.addFriendSBtn.visible = false;
                    this.btnGro.visible = false;
                }
                //房主显示踢人按钮
                else if (App.DataCenter.deskInfo.ownerID == App.DataCenter.UserInfo.getMyUserVo().userID) {
                    this.addFriendSBtn.visible = false;
                    this.btnGro.visible = true;
                }
                else {
                    this.addFriendSBtn.visible = true;
                    this.btnGro.visible = false;
                }
            }
            else {
                this.contactBtn.visible = true;
                this.btnGro.visible = false;
                this.addFriendSBtn.visible = false;
            }
            this.bindBtn.visible = false;
            this.nameLab.touchEnabled = false;
            this.modifyImg.visible = false;
        }

        user = this.recData;
        this.headIcon.mask = this.headMaskImg;
        //this.headIcon.source = RES.getRes(user.avater_url);
        //this.loadImg(user.avater_url);
        this.headIcon.source = user.avater_url;
        if (parseInt(user.sex) == SEX_TYPE.boy) {
            this.sexImg.texture = RES.getRes("boy_png");
        }
        else {
            this.sexImg.texture = RES.getRes("girl_png");
        }
        this.nameLab.text = user.name;
        this.idLab.text = user.accid+"";
        this.totalLab.text = user.totalgames+"";
        this.winPercentLab.text = user.ratewinning;
        this.integralLab.text = user.point+"";
        this.continuousWinLab.text = user.highest_winning_streak+"";

        this.curName = user.name;
    }

    /**头像 */
    public loadImg(headUrl){
        if(headUrl && headUrl != "" && headUrl != 1){
            this.headIcon.source = headUrl;
        }
    }

    /**改名 */
    private onModify() {
        this.nameLab.setFocus();
    }

    /**聚焦 */
    private FcousIn() {
        this.nameBg.visible = true;
    }

    /**失去焦点 */
    private FcousOut() {
        this.nameBg.visible = false;

        this.offFlag = true;
        var curText = this.nameLab.text;
        if (curText != this.curName) {
            var http = new HttpSender();
            var data = ProtocolHttp.editNickName;
            data.param.nickname = curText;
            http.send(data, (data)=>{
                console.log("修改昵称返回：", data);
                if (data.ret) {
                    TipsLog.hallInfo(data.desc);
                    this.nameLab.text = this.curName;
                    this.offFlag = false;
                }
                else {
                    this.curName = data.data;
                    //同步昵称到本地数据
                    App.DataCenter.UserInfo.changeName(data.data);
                }
            },this);
        }
    }

    /**踢人 */
    private kickSomeone() {
        // var data = ProtocolData.Send102_20_0;
        // data.kickUserID = Number(this.recData.uid);
        // App.gameSocket.send(ProtocolHead.Send102_20_0, data);
        var userid =  Number(this.recData.uid);
        var ctlr=<GameController>  App.getController(GameController.NAME);
        // ctlr.sendKick(userid);
        this.hide()
    }

    /**加好友 */
    private addFriend() {
        var http =new HttpSender();
        var data =ProtocolHttp.AddFriend;
        data.param.uid=this.recData.uid;
        http.send(data,this.friendBack,this);
    }

    /**加好友返回 */
    private friendBack(data){
        if(data.ret==0){
            TipsLog.gameInfo("添加好友请求已发送");
            this.hide();
        }else{
            if (Number(data.ret) == 303) {
                TipsLog.gameInfo("你们已经是好友了哦");
            }
            else {
                TipsLog.gameInfo(data.desc);
            }
        }
    }

    /**确定 */
    private onSureBtn() {
        if (this.offFlag) {
            this.hide();
        }
        this.offFlag = true;
    }

    /**绑定 */
    private onBindBtn() {
        App.PanelManager.open(PanelConst.BindPanel);
        this.hide();
    }

    /**关闭*/
    private onCloseBtn(e: egret.Event) {
        this.hide()
    }

}