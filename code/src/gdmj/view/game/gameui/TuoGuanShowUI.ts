class TuoGuanShowUI extends eui.Component{
	public constructor() {
		super();
	}

	public bTuoGuan:boolean=false;

	public showTuoGuan(){
		this.bTuoGuan=true;
		this.visible=true;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTuoGuanTouch, this);
	}

	public hideTuoGuan(){
		this.bTuoGuan=false;
		this.visible=false;
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTuoGuanTouch, this);
	}
	private onTuoGuanTouch() {
        console.log("取消托管");       
       
    }
}
