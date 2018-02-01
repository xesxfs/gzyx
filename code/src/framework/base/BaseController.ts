/**
 * 控制基类
 * @author chenkai 
 * @date 2016/11/10
 */
class BaseController {

	/**注册时调用*/
	public onRegister(){

	}

	/**移除注册调用*/
	public onRemove(){
		
	}

	/**
	 * 发送事件
	 * @type 事件名
	 * @args 发送数据
	 */ 
	public sendEvent(type:string, ...args:any[]){
		App.EventManager.sendEvent(type, args);
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
	 * 移除监听
	 * @type 事件名
	 * @listener 回调函数
	 * @thisObject 执行对象
	 */
	public removeEvent(type:string, listener:Function, thisObject:any){
		App.EventManager.removeEvent(type,listener, thisObject);
	}
}
