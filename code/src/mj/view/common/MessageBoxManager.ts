/**
 * 消息弹出框管理类
 * @author chenkai
 * @date 2016/7/22
 */

class MessageBoxManager extends SingleClass{
	private boxPool:ObjectPool;

	public constructor() {
		super();
		this.boxPool = ObjectPool.getPool(MessageBox.NAME);
	}

	/**获取一个消息弹框A，有确定和取消按钮 */
	public getBoxA():MessageBox{
		var box:MessageBox = this.boxPool.getObject();
		box.skinName = "MessageBoxASkin";
		return box;
	}

	/**获取一个消息弹框B，只有确定按钮 */
	public getBoxB():MessageBox{
		var box:MessageBox = this.boxPool.getObject();
		box.skinName = "MessageBoxBSkin";
		return box;
	}
	
	/**获取一个消息弹框C, 无任何按钮*/
	public getBoxC():MessageBox{
        var box: MessageBox = this.boxPool.getObject();
        box.skinName = "MessageBoxCSkin";
        return box;
	}
	
    /**获取一个消息弹框A，有确定和取消按钮 */
    public getBoxD(): MessageBox {
        var box: MessageBox = this.boxPool.getObject();
        box.skinName = "MessageBoxDSkin";
        return box;
    }
	
	/**回收 */
	public recycle(msgBox:MessageBox){
		this.boxPool.returnObject(msgBox);
	}

	/**回收所有弹框*/
	public recycleAllBox(){
		var layer:eui.UILayer = App.LayerManager.msgLayer;
		var len = layer.numChildren;
		for(var i=len-1;i>=0;i--){
			var box = layer.getChildAt(i);
			if(box && box instanceof MessageBox){
				box.hideAndRecycle();
			}
		}
	}
}