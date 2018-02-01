/**
 *	邮件item
 * @author eyanlong
 *  2017/02/23
 */
class EmailItem extends eui.ItemRenderer{
	public constructor() {
    	super();
		this.skinName = "EmailItemSkin";
        this.touchChildren = true;
	}

	public email_hard:eui.Label;
	public email_time:eui.Label;
	public email_iamge:eui.Image;
	public readedImg:eui.Image;

	public dataChanged():void{
		if(this.data.data.is_read==1){
			this.readedImg.visible = true;
			if(this.data.data.is_receive == undefined){
				this.email_iamge.source =  RES.getRes("open_envelope_png");
			}else if(this.data.data.is_receive == 1){
				//this.email_iamge.source =  RES.getRes("open_gift_png");
				this.email_iamge.source =  RES.getRes("open_envelope_png");
			}else{
				this.email_iamge.source =  RES.getRes("gift_png");
			}
		}else{
			this.readedImg.visible = false;
			if(this.data.data.is_receive == undefined){
				this.email_iamge.source =  RES.getRes("envelope_png");
			}else if(this.data.data.is_receive == 1){
				this.email_iamge.source =  RES.getRes("open_gift_png");
			}else{
				this.email_iamge.source =  RES.getRes("gift_png");
			}
		}
		this.email_hard.text = this.data.data.title;
		this.email_time.text = this.data.data.send_date;
	}

	protected childrenCreated() {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    }
    private onTouch(e: egret.TouchEvent) {
        var ctrl = new HallController();
		ctrl.sendEmailDetail(this.data.data.id);
    }
}
