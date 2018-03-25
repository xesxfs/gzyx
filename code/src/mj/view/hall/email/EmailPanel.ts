/**
 *	邮箱界面
 * @author chen
 *	2017/2/23
 */
class EmailPanel extends BasePanel {


	public constructor() {
		super();
        this.skinName = "EmailSkin";
	}
	/**添加到场景中*/
    protected onEnable() {
        this.setCenter();
		
    }

    /**从场景中移除*/
    protected onRemove() {
		
    }

	/**设置数据 */
    public setData(data:any) {

    }

	

	/**返回 */
	private back(){
		this.hide();
	}
	
}