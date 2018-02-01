class FriendRoomShowUI extends eui.Component{
	public constructor() {
		super();		
	}
	private friendRoomGroup:eui.Group;
	private deskNumberLabel:eui.BitmapLabel;
	private gameYaoqing:eui.Button;
	private gameXiugai:eui.Button;
	private gameChakan:eui.Button;

	protected childrenCreated(){
		this.init();
	}

	private init(){
		this.gameYaoqing.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.gameXiugai.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        this.gameChakan.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
	}

	public setDeskNo(deskNo:number){
		this.deskNumberLabel.text=deskNo.toString();
	}

	public setRuleOwn(bOwn:boolean){
		this.gameChakan.visible = !bOwn;
		this.gameXiugai.visible = bOwn;
	}

	private onTouch(e:egret.TouchEvent){
		this.doAction();

	}

	private doAction(){
		this.dispatchEventWith("onFriendTouch");
	}

	public hide(){
		this.visible=false;
	}

	public show(){
		this.visible=true;
	}

}