/**
 * 邀请好友界面
 * @author huanglong
 * 2017-5-5
 */

class InvitePanelT extends BasePanel{
    public pengjiBtn:eui.Button;
    public qqBtn:eui.Button;
    public wxBtn:eui.Button;
    public wxfriendBtn:eui.Button;


    public constructor() {
        super();
        this.skinName = "InvitePanelTSkin"
    }

   protected childrenCreated() {
    }

    /** 添加到场景*/
    protected onEnable() {
        this.pengjiBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtn, this);
        this.qqBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtn, this);
        this.wxBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtn, this);
        this.wxfriendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtn, this);
    }

    /** 从场景中移除*/
    protected onRemove() {
        this.pengjiBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtn, this);
        this.qqBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtn, this);
        this.wxBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtn, this);
        this.wxfriendBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchBtn, this);
    }

    private onTouchBtn(e: egret.Event) {
        var inviteType = 0;
        switch(e.target) {
            case this.pengjiBtn:
                inviteType = 0;
                break;
            case this.qqBtn:
                inviteType = 1;
                break;
            case this.wxBtn:
                inviteType = 2;
                break;
            case this.wxfriendBtn:
                inviteType = 3;
                break;
            default:
                break;
        }
        this.setParam(inviteType.toString());
    }

    /**
     * 组织发给原生参数并发送
     */
    private setParam(inviteType: string) {
        var data = {
            roomId: "0",
            gameId: "10004",
            title: "名字",
            invite: "0",
            rule: [],
            gameName: "长沙麻将"
        }
        data.roomId = App.DataCenter.deskInfo.deskID+"";
        data.title = App.DataCenter.UserInfo.getMyUserVo().nickName;
        data.invite = inviteType;
        data.rule = this.setRule(this.recData);

        App.NativeBridge.sendInviteFriend(data);
    }

    /**
     * 组织规则
     */
    public setRule(data):Array<string> {
		// var json = ProtocolData.Rev100117;
        // json =data;

        // var ruleList = [];

        // var list1:string = "";
        // let count=json.info.play_times_limit;
		//  if(count){
		// 	 list1 =""+count+"局";
		// 	 if(count>99){
		// 		 list1 = "不限"
		// 	 }
		//  }
        //  list1 = "局数："+list1;
        //  ruleList.push(list1);

        // var list2:string = ""
		// let hasBuBuGao =json.info.hasBuBuGao;
		// let hasSanTong =json.info.hasSanTong;
		// let hasYiPaoSanXiangs =json.info.hasYiPaoSanXiang;
		// let hasYiZhiHua = json.info.hasYiZhiHua;
		// let playMet = "";
		// if(hasBuBuGao){
		// 	playMet += "、"+"步步高";
		// }
		// if(hasSanTong){
		// 	playMet += "、"+"三同";
		// }
		// if(hasYiZhiHua){
		// 	playMet += "、"+"一枝花";
		// }
		// if(playMet!=""){
		// 	playMet=playMet.substr(1);
		// 	list2 =playMet;
		// }
		// else {
		// 	list2 = "无";
		// }
        // list2 = "玩法："+list2;
        // ruleList.push(list2);

        // var list3:string = "抓鸟：抓"+json.info.zhaNiaoNum+"鸟";
        // ruleList.push(list3);

        // return ruleList;
        return
	}
    
  /**关闭*/
    private onCloseBtn() {
        this.hide()
    }

}