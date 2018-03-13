/**
 * 场景基类
 * @author chen 
 * @date 2016/6/27
 */
class BaseScene extends BaseUI{
	/**场景的控制类*/
	protected ctrl:BaseController;

	public constructor() {
    	super();
    	this.percentWidth = 100;
    	this.percentHeight = 100;
	}

	/**
	 * 设置
	 */
	public setController(ctrl:BaseController){
		this.ctrl = ctrl;
	}
}
