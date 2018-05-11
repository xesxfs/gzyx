/**
 * Socket管理类
 * @author chen
 * @date 2016/6/28
 * 
 * 1 连接socket
 * 2 注册回调
 * 3 断线重连
 */
class ClientSocket {
    public name: string = "";                 //socket名字，用于判断push和game

    private socket: egret.WebSocket;          //socket
    private callBackList = {};               //回调列表
    private objList = {};                    //执行对象列表

    private reconnecting: boolean = false;    //是否断线重连中，重连中时不派发连接错误事件
    private reconInvalTime: number = 3000;    //断线重连时间间隔
    private curReconnectCount: number = 0;    //当前断线重连次数
    private reconnenctLimit: number = 5;      //断线重连限制次数
    private bAllowReconnnect: boolean = false;//是否允许断线重连

    public dataBuffer = null;                //数据缓存

    private url: string = "";                 //IP地址

    public serverType: Server_Type;           //服务器类型
    public gameID: Game_ID;                   //游戏ID
    public roomLevel: Room_Level;             //金币房间等级
    public deskCode: string;                  //加入的房间号
    private headSize: number = 4;       //头大小
    private heartbeatKey: number;


    /**
     * 注册通讯回调
     * @param proto 协议
     * @param callBack 回调函数
     * @param thisObject 回调函数绑定对象
     */
    public register(proto: number, callBack: Function, thisObject) {
        this.callBackList[proto.toString()] = callBack;
        this.objList[proto.toString()] = thisObject;
    }

    /**
     * 取消注册
     * @param proto 协议
     */
    public unRegister(proto: string) {
        delete this.callBackList[proto];
        delete this.objList[proto];
    }

    /**
     * 开始连接socket
     * @url IP地址
     * @bAllowReconnnect 是否允许断线重连
     * @serverType  服务器类型
     */
    public startConnect(url: string, bAllowReconnnect: boolean = false): void {
        console.log("开始连接" + this.name + ":" + url);
        this.url = url;
        this.bAllowReconnnect = bAllowReconnnect;
        this.createSocket();
        this.socket.connectByUrl(url);
    }

    //创建socket; egret引擎bug，不重新创建socket就不派发事件。
    private createSocket() {
        if (this.socket) {
            this.socket.removeEventListener(egret.Event.CONNECT, this.onConnect, this);
            this.socket.removeEventListener(egret.Event.CLOSE, this.onClose, this);
            this.socket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this);
            this.socket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.onRecieve, this);
            this.socket.connected && this.socket.close();
        }

        this.socket = new egret.WebSocket();
        this.socket.type = egret.WebSocket.TYPE_BINARY;
        this.socket.addEventListener(egret.Event.CONNECT, this.onConnect, this);
        this.socket.addEventListener(egret.Event.CLOSE, this.onClose, this);
        this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this);
        this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onRecieve, this);
    }

    //连接成功
    private onConnect(e: egret.Event): void {
        egret.log(this.name + " connect success");
        this.resetReconnenct();
        App.EventManager.sendEvent(EventConst.SocketConnect, this);
        this.startHeartbeat();
    }

    //连接关闭
    private onClose(e: egret.Event): void {
        egret.log(this.name + " close");

        //socket断开，派发事件，重启游戏
        // App.EventManager.sendEvent(EventConst.SocketClose, this);
    }

    //连接错误
    private onError(e: egret.IOErrorEvent): void {
        egret.log(this.name + " error");
        Tips.error("服务器已关闭");
        // App.PanelManager.open(PanelConst.SocketClosePanel, null, null, false);

    }

    /**
     * 尝试断线重连
     * @return 是否进行重连
     */
    private tryReconnect() {
        //不允许断线重连
        if (this.bAllowReconnnect == false) {
            return false;
        }
        //断线重连
        this.curReconnectCount++;
        if (this.curReconnectCount <= this.reconnenctLimit) {
            //如果第一次重连，则派发事件
            if (this.curReconnectCount == 1) {
                App.EventManager.sendEvent(EventConst.StartReconnect, this);
            }
            //开始断线重连
            egret.setTimeout(this.startConnect, this, this.reconInvalTime, this.url, true);
            return true;
        }
        return false;
    }

    //主动关闭Socket，不派发事件
    public close(): void {
        if (this.socket) {
            this.socket.removeEventListener(egret.Event.CONNECT, this.onConnect, this);
            this.socket.removeEventListener(egret.Event.CLOSE, this.onClose, this);
            this.socket.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.onError, this);
            this.socket.removeEventListener(egret.ProgressEvent.SOCKET_DATA, this.onRecieve, this);
            this.socket.connected && this.socket.close();
        }
        this.resetReconnenct();
        this.dataBuffer = null;
    }

    //重置重连
    private resetReconnenct() {
        this.reconnecting = false;
        this.curReconnectCount = 0;
    }

    /**是否已连接*/
    public isConnected() {
        if (this.socket && this.socket.connected) {
            return true;
        }
        return false;
    }

    /**
     * 发送数据
     * @param data 待发送json数据

     */
    public send(data: any = {}) {
        if (this.socket && this.socket.connected) {
            var sendDataByte: egret.ByteArray = new egret.ByteArray();
            sendDataByte.endian = egret.Endian.LITTLE_ENDIAN;
            var sendJson = JSON.stringify(data)
            sendJson = this.XORfunc(sendJson);
            sendDataByte.writeUnsignedInt(sendJson.length);
            sendDataByte.writeUTFBytes(sendJson);
            this.socket.writeBytes(sendDataByte);
            this.socket.flush();
            data.cmd != 2 && console.log("Send:", JSON.stringify(data));
        } else {
            egret.log("socket is not connected");
            this.dataBuffer = data;
            App.EventManager.sendEvent(EventConst.SocketNotConnect, this);
            App.PanelManager.open(PanelConst.SocketClosePanel, null, null, false);
        }
    }

    //接收数据
    private onRecieve(e: egret.ProgressEvent): void {
        // console.log("--------------------------------------")
        var b: egret.ByteArray = new egret.ByteArray();
        b.endian = egret.Endian.LITTLE_ENDIAN;
        this.socket.readBytes(b);
        this.processA(b);
    }

    /**
     * 解析数据
     * @param b 待解析数据
     */
    public process(b: egret.ByteArray): void {
        var size = b.readUnsignedInt();
        if (size != (b.length - this.headSize)) {
            this.processA(b);
            return
        }
        var str = b.readUTFBytes(b.length - this.headSize);
        var data;
        if ("" != str) {
            str = this.XORfunc(str);
            data = JSON.parse(str);
            console.log("rev:", data);
        }
        var proto = data.cmd;
        var callBack: Function = this.callBackList[proto];
        var thisObject = this.objList[proto];
        console.log("rev:", proto, data);
        if (callBack && thisObject) {
            callBack.call(thisObject, data);
        } else {
            console.log("不存在对应消息:", proto);
        }
    }
    /*** */
    private processA(b: egret.ByteArray) {
        b.position = 0;
        while (b.position != b.length) {
            var size = b.readUnsignedInt();
            var str = b.readUTFBytes(size);
            var data;
            if ("" != str) {
                str = this.XORfunc(str);
                data = JSON.parse(str);
            }
            var proto = data.cmd + "";
            var callBack: Function = this.callBackList[proto];
            var thisObject = this.objList[proto];
            data.cmd != 2 && console.log("rev:", proto, data);
            if (callBack && thisObject) {
                callBack.call(thisObject, data);
            } else {
                data.cmd != 2 && console.log("未处理的消息:", proto);
            }

        }
    }

    public startHeartbeat() {
        this.heartbeatKey = egret.setInterval(this.sendHearbeat, this, 2 * 1000);
    }

    private sendHearbeat() {
        if (this.isConnected()) {
            this.send(ProtocolData.Send2);
        } else {
            this.stopHeartbeat();
        }
    }

    public stopHeartbeat() {
        this.heartbeatKey && egret.clearInterval(this.heartbeatKey);
        this.heartbeatKey = null;
    }

    // private XORfunc(str: string): string {
    //     var KEY = 13;
    //     var strLen = (str.length);
    //     var temp: string = "";
    //     for (let i = 0; i < strLen; i++) {
    //         temp += String.fromCharCode(str.charCodeAt(i) ^ KEY);
    //     }
    //     return temp;
    // }

    private XORfunc(str: string): string {
        var KEY = 13;
        var from: egret.ByteArray = new egret.ByteArray();
        var to: egret.ByteArray = new egret.ByteArray();
        from.writeUTFBytes(str);
        from.position = 0;
        var strLen = (from.length);
        var temp: string = "";
        for (let i = 0; i < strLen; i++) {
            to.writeByte(from.readUnsignedByte() ^ KEY);
        }
        to.position = 0;
        temp = to.readUTFBytes(strLen);
        return temp;
    }

}

