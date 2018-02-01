/**
 * http请求类
 * @author leo
 *
 */
class HttpSender {
	
	/**
	 * 发送http请求
	 * @param dataToSend 发送的Json数据
	 * @param cb 回调函数
	 * @param obj thisObject
	 */ 
    public send(paramObj:Object, cb:Function, obj:any, lock:boolean = true):void{
        let dataObj=this.extendObj(ProtocolHttp.httpHead,paramObj);
        let dataToSend=JSON.stringify(dataObj);
        var url = App.DataCenter.ServerInfo.WEB_URL + '?base=' + dataToSend;
        console.log("send url:"+url);
        var request: egret.HttpRequest = new egret.HttpRequest();
        request.open(url,egret.HttpMethod.GET);
        request.once(egret.Event.COMPLETE,function(e) {
            if (lock) {
                App.LoadingLock.unlock();
            }
            var request = <egret.HttpRequest>e.currentTarget;
            console.log("requet.response:"+request.response);
            var re = JSON.parse(request.response);
            if (re.code == 505) {
                App.PanelManager.open(PanelConst.SocketClosePanel,null,null,false);
            }
            cb.call(obj, re);
        },this);
        
        request.once(egret.IOErrorEvent.IO_ERROR,function(e){
            console.log("error : event=" + e);
            App.PanelManager.open(PanelConst.SocketClosePanel,null,null,false);
        },this);

        request.send();

        if (lock) {
            App.LoadingLock.httpLock(()=>{
                TipsLog.hallInfo("请求超时，请稍候再试");
            });
        }
	}
    
    /**
     * 发送post登录请求
     */
    public post(url:string, paramObj:Object, cb:Function, obj:any):void{
        let dataObj=this.extendObj(ProtocolHttp.httpHead,paramObj);
        let dataToSend=JSON.stringify(dataObj);
        console.log("post url:"+App.DataCenter.ServerInfo.WEB_URL);
        var request: egret.HttpRequest = new egret.HttpRequest();
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.open(url,egret.HttpMethod.POST);
        request.once(egret.Event.COMPLETE,function(e) {
            var request = <egret.HttpRequest>e.currentTarget;
            console.log("requet.response:"+request.response);
            var re = JSON.parse(request.response);
           
            cb.call(obj, re);
        },this);
        
        request.once(egret.IOErrorEvent.IO_ERROR,function(e){
            console.log("error : event=" + e);
        },this);
        request.send(dataToSend);
	}
	
	
	/**
	 * 合并请求头和参数
	 * @param obj1 请求头
	 * @param obj2  参数
	 */
	private extendObj(obj1:Object,obj2:Object){
    	
        var obj3 = new Object;
    	
	    for(let key in obj2){
            if(obj3.hasOwnProperty(key))continue;
            obj3[key]=obj2[key];
            if(key == "skey") obj3[key] = App.DataCenter.UserInfo.httpUserInfo.skey;
            if(key == "uid") obj3[key] = App.DataCenter.UserInfo.httpUserInfo.userID;
            if(App.DataCenter.UserInfo.httpUserInfo) console.log("skey:::",App.DataCenter.UserInfo.httpUserInfo.skey)
            if(key == "param") {                
                for(let key1 in obj3[key]) {
                    if(key1 == "playerID") obj3[key][key1] = App.DataCenter.UserInfo.httpUserInfo.userID;
                }                
            }
	    }
	    
        for(let key in obj1) {
            if(obj3.hasOwnProperty(key)) continue;
            obj3[key] = obj1[key];
        }
	    return obj3;
	}

}
