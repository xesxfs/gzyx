/**
 * 支付界面
 * @author eyanlong 
 * @date 2017/2/21
 */

class PaymentPanel extends BasePanel{
	/**关闭 */
	private payment_close:eui.Button;
	/**确认支付 */
	private payment_right:eui.Button;
	/**选择支付方式 */
	private payment_method:eui.Rect;
	/**支付名字 */
	private payment_name:eui.Label;
	/**支付金额 */
	private payment_money:eui.Label;
	/**商品图标 */
	public iconImg:eui.Image;
	public purseLab:eui.Label;

	/**支付对象ID */
	public targetId:number = 1;
	/**支付方式 */
	public payType:number = 1;

	public constructor() {
		super();
		this.skinName = "PaymentPanelSkin";
	}

	protected onEnable() {
        this.payment_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
		this.payment_right.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rights, this);
		this.payment_method.addEventListener(egret.TouchEvent.TOUCH_TAP, this.method, this);
    }

    protected onRemove() {
        this.payment_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
		this.payment_right.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.rights, this);
		this.payment_method.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.method, this);
    }

	/**设置数据 */
	public setData(data:any){
		this.targetId = Number(this.recData);
		this.iconImg.source = App.getController("HallController").getUrl(this.recData);
		this.payment_name.text = data.name;
		this.payType = Number(data.pay_type);
		this.payment_money.text = "¥"+data.price+".00";
		if ( Number(this.payType) == 4 ) {
			var purseElement = <Array<egret.ITextElement>>[
            {text:"钱包剩余",style:{"size":30,"textColor":0x000000,"fontFamily":"Microsoft YaHei"}},
			{text:"（¥"+data.paymentname+"）",style:{"size":30,"textColor":0x943300,"fontFamily":"Microsoft YaHei"}}];
			this.purseLab.textFlow = purseElement;
		}
		else {
			this.purseLab.text = data.paymentname;
		}
	}

	/**关闭 */
	protected close(){
		this.hide();
	}

	/**确认支付 */
	protected rights(){
		// var ctrl = new HallController();
		// ctrl.sendBuySure(this.targetId,this.payType);
		// this.hide();
	}

	/**选择支付方式 */
	protected method(){
		if (App.DeviceUtils.IsIos) {
			return;
		}
		App.getController("HallController").sendBuyPayment();
	}

	/**接收支付方式变更 */
	public changeMethod(type:number = 1, name:any = 0) {
		this.payType = type;

		if ( Number(name) ) {
			var purseElement = <Array<egret.ITextElement>>[
            {text:"钱包剩余",style:{"size":30,"textColor":0x000000,"fontFamily":"Microsoft YaHei"}},
			{text:"（¥"+name+"）",style:{"size":30,"textColor":0x943300,"fontFamily":"Microsoft YaHei"}}];
			this.purseLab.textFlow = purseElement;
		}
		else {
			this.purseLab.text = name;
		}
	}
}