/**
 * 支付选择界面
 * @author eyanlong 
 * @date 2017/2/21
 * 
 * @author huanglong
 * @change 2017/5/5
 */
class PaymentMethod extends BasePanel{
	public method_close:eui.Button;
	public methodList:eui.List;

	private reData:any;

	public constructor() {
		super();
		this.skinName = "PaymentMethodSkin";
	}

	protected onEnable() {
        this.method_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
    }

    protected onRemove() {
        this.method_close.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this);
    }

	public setData(data:any){
		console.log("listdata:",data);
		if (App.DeviceUtils.IsAndroid) {
			for(var i = 0; i < data.length; i ++) {
				if(data[i] && data[i].pay_type && data[i].pay_type == "2") {
					data.splice(i, 1);
					break;
				}
			}
		}
		
		let ac = new eui.ArrayCollection();
        ac.source = data;
        this.methodList.dataProvider = ac;
        this.methodList.itemRenderer = PayMentMethodItem;
	}

	/**关闭 */
	protected close(){
		this.hide();
	}
}