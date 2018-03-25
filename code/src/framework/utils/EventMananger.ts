
/**
 * 事件管理类
 * 一个全局的Event类
 * 对比egret.Event，该事件类可传递..args多个参数。在回调函数上callBack(a,b,c)形式接收。
 * 而egret.Event回调只能以 callBack(data)方式接收，当需要传递多个参数时，每次发送和接收都需要封装一次data。
 * @author chen
 * @date 2016/8/30
 */
class EventMananger extends SingleClass{
    /**事件列表*/
    private eventList = {};

    /**
     * 发送事件
     * @type 事件类型
     * @args 携带数据
     */
	public sendEvent(type:string,...args:any[]){
        var arr:Array<any> = this.eventList[type];
        if(arr != null){
            var len = arr.length;
            var listen:Function;
            var thisObject:any;
            for(var i=0;i<len;i++){
                var msg = arr[i];
                listen = msg[0];
                thisObject = msg[1];
                listen.apply(thisObject, args);
            }
        }
    }

    /**
     * 监听事件
     * @type 事件类型
     * @listener 回调函数
     * @thisObject 回调执行对象
     */
    public addEvent(type:string, listener:Function, thisObject:any){
        var arr:Array<any> = this.eventList[type];
        if(arr == null){
            arr = [];
            this.eventList[type] = arr;
        }else{
            var len = arr.length;
            for(var i=0;i<len;i++){
                if(arr[i][0] == listener && arr[i][1] == thisObject){
                    return;
                }
            }
        }
        arr.push([listener, thisObject]);
    }

    /**
     * 移除事件
     * @type 事件类型
     * @listener 回调函数
     * @thisObject 回调执行对象
     */
    public removeEvent(type:string ,listener, thisObject:any){
        var arr:Array<any> = this.eventList[type];
        if(arr != null){
            var len = arr.length;
            for(var i = len-1; i>=0;i--){
                if(arr[i][0] == listener && arr[i][1] == thisObject){
                    arr.splice(i,1);
                }
            }
        }
        if(arr && arr.length == 0){
            this.eventList[type] = null;
            delete this.eventList[type];
        }
    }

}