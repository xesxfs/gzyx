/**
 *	二级邮箱界面
 * @author eyanlong
 *	2017/2/23
 */
class EmailTwoPanel extends BasePanel {

	private email_two_back:eui.Button;
	public email_back:eui.Button;
	public email_title:eui.Label;
	public contentImg:eui.Image;
	public email_content:eui.Label;
	public enclosure:eui.Group;
	public iconImg:eui.Image;
	public email_name:eui.Label;
	public getedGro:eui.Group;
	public getGro:eui.Group;
	public email_two_receive:eui.Button;
	private eid:number;

	public constructor() {
		super();
        this.skinName = "EmailTwoSkin";
	}

	/**添加到场景中*/
    protected onEnable() {
		this.email_two_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
		this.email_two_receive.addEventListener(egret.TouchEvent.TOUCH_TAP, this.receive, this);
    }

    /**从场景中移除*/
    protected onRemove() {
        this.email_two_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
		this.email_two_receive.addEventListener(egret.TouchEvent.TOUCH_TAP, this.receive, this);
    }

	/**设置内容 */
	public setData(data:any){
		this.eid = data.id;
		if(data.reward.length<1){
			this.enclosure.visible = false;
		}else{
			this.enclosure.visible = true;
			this.email_name.text = data.reward[0].name+"("+data.reward[0].quantity+")";
		}
		if(data.is_receive == 0){
			this.getedGro.visible = false;
			this.getGro.visible = true;
			this.setIconColor();
		}else{
			this.getedGro.visible = true;
			this.getGro.visible = false;
			this.setIconGray();
		}
		this.email_title.text = data.title;
		this.email_content.text = data.content;
	}

	/**领取附件 */
	protected receive(){
		var ctrl = new HallController();
		// ctrl.sendEmailGoods(this.eid);
	}

	/**更新邮件状态,领取成功回调 */
	public refreshEmailStatus() {
		this.getedGro.visible = true;
		this.getGro.visible = false;

		this.setIconGray();
	}

	private setIconColor() {
		this.iconImg.filters = [];
	}

	private setIconGray() {
		var colorMatrix = [
			0.3,0.6,0,0,0,
			0.3,0.6,0,0,0,
			0.3,0.6,0,0,0,
			0,0,0,1,0
		]
		var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
		this.iconImg.filters = [colorFlilter];
	}

	protected back(){
		App.PanelManager.getPanel(PanelConst.EmailPanel).sendGetEmail();
		this.hide();
	}
}