/**
 * App基类
 * @author chen
 * @date 2016/11/14
 */
class BaseApp extends SingleClass{
	/**控制模块列表*/
	protected moduleList = {};

	/**
	 * 注册controller
	 * @ctrlName 控制模块名
	 * @ctrl 控制模块
	 */
	public registerController(ctrlName:string ,ctrl:BaseController){
		this.moduleList[ctrlName] = ctrl;
		ctrl.onRegister();
	}

	/**
	 * 注销controller
	 * @ctrlName 控制模块名
	 */
	public unRegisterController(ctrlName:string){
		this.moduleList[ctrlName].onRemove();
		delete this.moduleList[ctrlName];
	}\

	/**
	 * 获取controller
	 * @ctrlName 控制模块名
	 * @return 控制模块
	 */
	public getController(ctrlName:string){
		return this.moduleList[ctrlName];
	}

	/**
	 * 发送事件
	 * @type 事件名
	 * @args 发送数据
	 */ 
	public sendEvent(type:string, ...args:any[]){
		App.EventManager.sendEvent(type, ...args);
	}
	
	/**
	 * 监听事件
	 * @type 事件名
	 * @listener 回调函数
	 * @thisObject 执行对象
	 */ 
	public addEvent(type:string, listener:Function, thisObject:any){
		App.EventManager.addEvent(type, listener,  thisObject);
	}

	/**
	 * 移除事件
	 * @type 事件名
	 * @listener 回调函数
	 * @thisObject 执行对象
	 */ 
	public removeEvent(type:string, listener:Function, thisObject:any){
		App.EventManager.removeEvent(type, listener,  thisObject);
	}
}