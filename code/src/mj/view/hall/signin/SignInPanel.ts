/**
 * 签到界面
 * @author huanglong
 * 2017/3/17
 */
class SignInPanel extends BasePanel {


	public constructor() {
		super();
        this.skinName = "SignInPanelSkin";
  
	}

	/**添加到场景中*/
    protected onEnable() {
        this.setCenter();
    }

    /**从场景中移除*/
    protected onRemove() {
	
    }


	/**返回 */
	private back(){
		this.hide();
	}
}