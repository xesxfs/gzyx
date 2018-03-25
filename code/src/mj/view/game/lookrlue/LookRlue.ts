/**
 * 查看规则
 * @author huanglong 
 * @date 2017/3/28
 */

class LookRlue extends BasePanel {
	public roomerLab:eui.Label;
	public roundLab:eui.Label;
	public playMetLab:eui.Label;
	public zhuaLab:eui.Label;
	public sureBtn:eui.Button;
	public closeBtn:eui.Button;

	public constructor() {
		super();
    	this.skinName = "LookRlueSkin";
	}

	protected childrenCreated() {
        // this.initView();
    }

	protected onEnable() {
        this.sureBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtn, this);
        this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtn, this);
    }

	protected onRemove() {
        this.sureBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtn, this);
        this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCloseBtn, this);
    }

	/**设置界面值 */
    private initView() {
        this.roomerLab.text = "萌萌萌";
		this.roundLab.text = "7局";
		this.playMetLab.text = "瞎猫打";
		this.zhuaLab.text = "抓鸡";
    }

	public updataView(data){
		// var json = ProtocolData.Rev100117;
        // json =data;

		// let owner =json.info.desk_owner_id;
		// let user : UserVO =App.DataCenter.UserInfo.getUserByUserID(owner);
		// let name = user.nickName;
		// this.roomerLab.text =""+name; 


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
		// // if(hasYiPaoSanXiangs){
		// // 	playMet += "、"+"一炮三响";
		// // }
		// if(playMet!=""){
		// 	playMet=playMet.substr(1);
		// 	this.playMetLab.text =playMet;
		// }
		// else {
		// 	this.playMetLab.text = "无";
		// }

		//  let count=json.info.play_times_limit;
		//  if(count){
		// 	 this.roundLab.text =""+count+"局";
		// 	 if(count>99){
		// 		 this.roundLab.text = "不限"
		// 	 }
		//  }

		// let zhaniao = json.info.zhaNiaoNum;
		// this.zhuaLab.text = "抓"+zhaniao+"鸟";
	}


	/**关闭*/
    private onCloseBtn() {
        this.hide()
    }
}