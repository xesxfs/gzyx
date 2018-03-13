/**
 * http请求类
 * @author chen
 *
 */
class HttpSender {

	/**
	 * 发送http请求
	 * @param dataToSend 发送的Json数据
	 * @param cb 回调函数
	 * @param obj thisObject
	 */
    public send(paramObj: Object, cb: Function, obj: any, action: string = "", lock: boolean = true): void {

        let dataObj = paramObj;
        let dataToSend = JSON.stringify(dataObj);
        var url = App.DataCenter.ServerInfo.WEB_URL.replace("%1", action);
        url = url.replace("%2", App.DataCenter.UserInfo.selfUser.userID.toString());
        url = url.replace("%3", App.DataCenter.UserInfo.selfUser.skey);
        url = url.replace("%4", dataToSend);
        console.log("send url:" + url);
        var request: egret.HttpRequest = new egret.HttpRequest();
        request.open(url, egret.HttpMethod.GET);
        request.once(egret.Event.COMPLETE, function (e) {
            if (lock) {
                App.LoadingLock.unlock();
            }
            var request = <egret.HttpRequest>e.currentTarget;
            console.log("requet.response:" + request.response);
            var re = JSON.parse(request.response);
            if (re.code == 505) {
                App.PanelManager.open(PanelConst.SocketClosePanel, null, null, false);
            }
            cb.call(obj, re);
        }, this);

        request.once(egret.IOErrorEvent.IO_ERROR, function (e) {
            console.log("error : event=" + e);
            App.PanelManager.open(PanelConst.SocketClosePanel, null, null, false);
        }, this);

        request.send();

        if (lock) {
            App.LoadingLock.httpLock(() => {
                TipsLog.hallInfo("请求超时，请稍候再试");
            });
        }
    }

    /**
     * 发送post登录请求
     */
    public post(url: string, paramObj: Object, cb: Function, obj: any): void {
        let dataObj = this.extendObj(ProtocolHttp.httpHead, paramObj);
        let dataToSend = JSON.stringify(dataObj);
        console.log("post url:" + App.DataCenter.ServerInfo.WEB_URL);
        var request: egret.HttpRequest = new egret.HttpRequest();
        request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        request.open(url, egret.HttpMethod.POST);
        request.once(egret.Event.COMPLETE, function (e) {
            var request = <egret.HttpRequest>e.currentTarget;
            console.log("requet.response:" + request.response);
            var re = JSON.parse(request.response);

            cb.call(obj, re);
        }, this);

        request.once(egret.IOErrorEvent.IO_ERROR, function (e) {
            console.log("error : event=" + e);
        }, this);
        request.send(dataToSend);
    }


}
