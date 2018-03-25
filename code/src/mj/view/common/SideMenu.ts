/**
 * 侧边栏
 * @author huanglong
 * @date 2017/04/05
 */
class SideMenu extends eui.Component{
    public newsBtn:eui.Button;
    public friendBtn:eui.Button;

    
	public constructor() {
    	  super();
          this.skinName = "SideMenuSkin";
	}

    protected childrenCreated() {
        this.touchEnabled = true;
        this.newsBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNews, this);
        this.friendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFriend, this);
    }

    private onNews() {
        console.log("onNews");
    }

    private onFriend() {
        console.log("onFriend");
    }
}
