/**
 *  分享
 * @author chen
 * @date 2016/8/15 

 */
class SharePanel extends BasePanel{
    /**关闭 */

    
	public constructor() {
    	super();
    	this.skinName = "SharePanelSkin";
	}
	
    protected onEnable() {
		this.setCenter();

    }

    protected onRemove() {
     
    }

    /**关闭 */
	protected close(){
		this.hide();
	} 
	
}
