/**
 * 头像插件
 * @author xiongjian 
 * @date 2017/6/29
 */
class HeadPlugin extends BaseUI {

    private headGroup: eui.Group;
    private readyGroup: eui.Group;
    private readyBtn: eui.Button;
    private gangFenGroup: eui.Group;
    private btnGroup: eui.Group;
    private readyBtn1: eui.Button;
    private jixuBtn: eui.Button;
    private xujuBtn: eui.Button;

    private playerNum = 4;   //玩家人数
    private gangZhengList = [];  //杠正分
    private gangFuList = [];     //杠负分
    private gangFenYList = [];   //杠分的y轴位置

    public readyList = [];       //所有玩家准备图标
    private zhuangFlag: ZhuangFlag;      //庄家标志

    /**准备按钮list*/
    private readyList1 = [];
    private readyList2 = [];

    //-----------头像----------------
    public headUIList: Array<HeadUI> = new Array<HeadUI>();     //所有玩家头像列表
    public headUIList1: Array<HeadUI> = new Array<HeadUI>();     //散开所有玩家头像列表 (定位用)

    private headUIPointXlist = [1, 583, 583, 1];       //开始游戏后个人头像X坐标
    private headUIPointYlist = [848, 709, 30, 137];    //开始游戏后个人头像Y坐标
    private headScaleX = 1;   //游戏开始之后头像X缩小
    private headScaleY = 1;   //游戏开始之后头像Y缩小

    private headUIPointSXlist = [285, 490, 285, 60];       //开始游戏前个人头像X坐标
    private headUIPointSYlist = [671, 423, 147, 423];    //开始游戏前个人头像Y坐标

    //--------------逻辑--------------
    public cardFactory: CardFactory;      //麻将牌工厂
    public cardLogic: CardLogic;          //麻将牌逻辑

    public constructor() {
        super();
        this.skinName = "headPlugin";
    }

    protected childrenCreated() {
        for (var i = 0; i < this.playerNum; i++) {
            this.headUIList.push(<HeadUI>this.headGroup.getChildAt(i));
            this.headUIList1.push(<HeadUI>this.headGroup.getChildAt(i + 4));
            this.gangZhengList.push(this.gangFenGroup.getChildAt(i));
            this.gangFuList.push(this.gangFenGroup.getChildAt(i + 4));
            this.gangFenYList.push(this.gangZhengList[i].y);
            // 准备
            this.readyList1.push(this.readyGroup.getChildAt(i));
            this.readyList2.push(this.readyGroup.getChildAt(i + 4));
        }
        //头像点击
        this.headGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.headTouch, this);
    }

      protected onEnable() {
        this.jixuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onJixuTouch, this);
        this.xujuBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onXujuTouch, this);
        this.readyBtn1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onReady1Touch, this);
      }

    /**重置头像 */
    public resetHeadUI() {
        let len = this.headUIList.length;
        for (let i = 0; i < len; i++) {
            this.headUIList[i].scaleX = 1;
            this.headUIList[i].scaleY = 1;
            this.headUIList[i].x = this.headUIPointSXlist[i];
            this.headUIList[i].y = this.headUIPointSYlist[i];
            this.headUIList[i].nameLabel.visible = true;
        }
        this.hideAllReady();
        this.setUserReady();//重置准备

    }

    /**隐藏所有准备图标*/
    public hideAllReady() {
        this.readyGroup.removeChildren();
    }

    /**显示准备图标*/
    public showReady(pos: UserPosition) {
        //最初状态准备按钮
        if (this.headUIList[0].x != this.headUIPointXlist[0]) {
            this.readyList = this.readyList1;
            this.readyGroup.addChild(this.readyList[pos]);
        } else {
            this.readyList = this.readyList2;
            this.readyGroup.addChild(this.readyList[pos]);
        }
    }

    /**隐藏准备图标*/
    public hideReady(pos: UserPosition) {
        if (this.readyList.length) {

            //最初状态准备按钮
            if (this.headUIList[0].x != this.headUIPointXlist[0]) {
                this.readyList = this.readyList1;
                var ready = this.readyList[pos];
                ready && ready.parent && ready.parent.removeChild(ready);
            } else {
                this.readyList = this.readyList2;
                var ready = this.readyList[pos];
                ready && ready.parent && ready.parent.removeChild(ready);
            }


        }
    }

    /**设置准备按钮*/
    public showReadyBtn() {
        this.readyGroup.addChild(this.readyBtn);
        this.readyBtn.visible = true;
    }

    //显示已进入房间的玩家头像和准备
    public setInviteUserHead() {
        var userList = App.DataCenter.UserInfo.userList;
        console.log("设置已进入邀请界面玩家的头像,用户列表:", userList);
        for (var key in userList) {
            this.updateUserHead(userList[key]);
        }
    }

    /**设置已进入房间玩家状态*/
    public setUserReady() {
        var userList = App.DataCenter.UserInfo.userList;
        console.log("设置玩家状态,用户列表:", userList);
        for (var key in userList) {
            var userVo: UserVO = userList[key];
            //设置准备
            if (userVo.checkState(PLAYER_STATE.READY)) {
                this.showReady(userVo.userPos);
            } else {
                if (userVo.userPos == UserPosition.Down) {
                    this.showReadyBtn();
                }
            }
        }
    }



    /**显示玩家头像、昵称等信息*/
    public updateUserHead(userVo: UserVO) {
        if (userVo) {
            this.cardLogic = CardLogic.getInstance();
            var deskVo: DeskInfo = App.DataCenter.deskInfo;
            userVo.userPos = this.cardLogic.changeSeat(userVo.seatID);
            var headUI: HeadUI = this.headUIList[userVo.userPos];

            headUI.loadImg(userVo.headUrl);

            //开始游戏后隐藏昵称
            if (this.headUIList[0].x == this.headUIPointXlist[0]) {
                headUI.nameLabel.visible = false;
            } else {
                headUI.nameLabel.visible = true;
            }



            headUI.nameLabel.text = StringTool.formatNickName(userVo.nickName);
            headUI.scoreLabel.visible = true;        //显示积分
            headUI.sidai.visible = true;            //显示丝带
            headUI.scoreLabel.text = NumberTool.formatMoney(userVo.point);
            headUI.seatID = userVo.seatID;
            //显示房主标识
            deskVo && (headUI.headOwner.visible = userVo.userID == deskVo.ownerID);
            this.headGroup.addChild(headUI);
        }
    }

    /**更新积分*/
    public updatePoint() {
        var userList = App.DataCenter.UserInfo.userList;
        for (var key in userList) {
            var userVo: UserVO = userList[key];
            this.headUIList[userVo.userPos].scoreLabel.text = NumberTool.formatMoney(userVo.point);

        }
    }

    /**隐藏玩家头像*/
    public hideHeadUI(pos) {
        var headUI: HeadUI = this.headUIList[pos];
        headUI.clear();
    }

    /**清理头像UI*/
    public hideAllHeadUI() {
        var len = this.headUIList.length;
        var headUI: HeadUI;
        for (var i = 0; i < len; i++) {
            headUI = this.headUIList[i];
            headUI.clear();
        }
    }

        /**设置头像位置*/
    private setGameHeadPos(pos = null) {
        console.log("设置头像")
        var time = 500;
        //此处不能用循环处理
        egret.Tween.get(<HeadUI>this.headUIList[0]).to({ x: this.headUIPointXlist[0], y: this.headUIPointYlist[0] }, time).call(() => {
            this.headUIList[0].scaleX = this.headScaleX;
            this.headUIList[0].scaleY = this.headScaleY;
            this.headUIList[0].nameLabel.visible = false;   //游戏开始隐藏昵称
        });
        egret.Tween.get(<HeadUI>this.headUIList[1]).to({ x: this.headUIPointXlist[1], y: this.headUIPointYlist[1] }, time).call(() => {
            this.headUIList[1].scaleX = this.headScaleX;
            this.headUIList[1].scaleY = this.headScaleY;
            this.headUIList[1].nameLabel.visible = false;
        });
        egret.Tween.get(<HeadUI>this.headUIList[2]).to({ x: this.headUIPointXlist[2], y: this.headUIPointYlist[2] }, time).call(() => {
            this.headUIList[2].scaleX = this.headScaleX;
            this.headUIList[2].scaleY = this.headScaleY;
            this.headUIList[2].nameLabel.visible = false;
        });
        egret.Tween.get(<HeadUI>this.headUIList[3]).to({ x: this.headUIPointXlist[3], y: this.headUIPointYlist[3] }, time).call(() => {
            this.headUIList[3].scaleX = this.headScaleX;
            this.headUIList[3].scaleY = this.headScaleY;
            this.headUIList[3].nameLabel.visible = false;
            //需要做延时处理 怕资源未被加载  显示庄
            egret.Tween.get(this).wait(500).call(() => {
                if (pos != null) {
                    var headUI = this.headUIList[pos];
                    var headImg = headUI.headImg;
                    this.zhuangFlag || (this.zhuangFlag = new ZhuangFlag());
                    this.zhuangFlag.x = headUI.x + headImg.x + 96 - 10;
                    this.zhuangFlag.y = headUI.y + headImg.y;
                    this.headGroup.addChild(this.zhuangFlag);
                }
            })
        });
    }

        private headTouch(e: egret.Event) {
        // console.log(e.target);
        switch (e.target.parent) {
            case this.headUIList[0]:
                this.getOtherUserInfo(0);

                break;
            case this.headUIList[1]:
                this.getOtherUserInfo(1);
                break;
            case this.headUIList[2]:
                this.getOtherUserInfo(2);
                break;
            case this.headUIList[3]:
                this.getOtherUserInfo(3);
                break;
        }
    }

    /**
     * 发送Http请求玩家信息
     */
    private getOtherUserInfo(num: number) {
        // let user: UserVO = App.DataCenter.UserInfo.getUserByPos(num);
        // if (user) {
        //     let http = new HttpSender();
        //     let data = ProtocolHttp.getOtherUserInfo;
        //     data.param.uid = user.userID;
        //     http.send(data, this.updateUserInfo, this);
        // }
    }

    /**
     * 更新用户资料
     */
    private updateUserInfo(data) {
        if (!data.ret) {
            App.PanelManager.open(PanelConst.UserInfoPanel, null, this, true, true, data.data);
        }
        else {
            TipsLog.gameInfo(data.desc);
        }
    }

    //继续
    private onJixuTouch() {
        // this.resetGame();
        this.readyBtn.visible = true;
        this.resetHeadUI();
        // this.hideDisc();
        // this.friendRoomGroup.visible = true;
    }

    //续局
    private onXujuTouch() {
        // this.resetGame();
        this.readyBtn.visible = true;
        this.resetHeadUI();
        // this.hideDisc();
        // this.friendRoomGroup.visible = true;
    }

        //结算后准备
    private onReady1Touch() {
        // this.hideBtnGroup();
        // this.resetGame();
        // this.onInitPosition();
        // App.ResUtils.loadGroup([AssetConst.Game, AssetConst.Card], this, this.sendReady, null, 10);
    }
}