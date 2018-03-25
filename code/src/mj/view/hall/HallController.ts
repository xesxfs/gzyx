/**
 * 大厅模块
 * @author chenkai
 * @date 2016/11/4
 */
class HallController extends BaseController {
    /**控制模块名*/
    public static NAME: string = "HallController";
    /**显示大厅*/
    public static EVENT_SHOW_HALL: string = "ShowHallScene";
    /**大厅*/
    private hallScene: HallScene;
    //当前房间
    private curRoomid;
    private curDeskId: number
    public isReconnection: boolean = false;

    private isLogin: boolean = false;
    private room_type: number;//房间类型

    public constructor() {
        super();
    }

    //注册时调用
    public onRegister() {
        this.addEvent(HallController.EVENT_SHOW_HALL, this.showHallScene, this);
        this.registerSocket();
    }


    //移除注册时调用
    public onRemove() {

    }

    /**显示大厅*/
    private showHallScene() {
        this.hallScene = App.SceneManager.runScene(SceneConst.HallScene, this) as HallScene;
        //   this.sendEvent(GameController.EVENT_SHOW_GAME_SCENE);
    }

    //注册socket
    public registerSocket() {
        var gameSocket: ClientSocket = App.gameSocket;
        gameSocket.register(ProtocolHead.server_command.SERVER_ENTER_ROOM_UC, this.revEnterRoom, this);
        gameSocket.register(ProtocolHead.open_room_type_command.CLIENT_OPEN_ROOM_REQ, this.revOpenRoom, this);
        gameSocket.register(ProtocolHead.open_room_type_command.CLIENT_JOIN_ROOM_REQ, this.revJoinRoom, this);
        gameSocket.register(ProtocolHead.server_command.SERVER_REBIND_UC, this.revReBind, this);
        // gameSocket.register(ProtocolHead.server_command.SERVER_ROOM_INFO_BC, this.revRoomInfo, this);
        // gameSocket.register(ProtocolHead.server_command.SERVER_GAME_START_BC, this.revGameStart, this);

        //socket连接错误事件
        this.addEvent(EventConst.SocketIOError, this.onSocketError, this);
    }

    //     public unRegistSocket() {
    //         var gameSocket: ClientSocket = App.gameSocket;
    //         this.removeEvent(EventConst.SocketConnect, this.onSocketConnect, this);
    //         this.removeEvent(EventConst.SocketIOError, this.onSocketError, this);
    // }




    //     /**socket连接成功*/
    private onSocketConnect(socket: ClientSocket) {
        console.log(" hall connenct success");
        // App.gameSocket.send({ cmd: 1, f: "jjj" })

    }

    //     /**socket连接错误*/
    private onSocketError(socket: ClientSocket) {
        if (socket == App.gameSocket) {
            App.MsgBoxManager.recycleAllBox();
            var messageBox: MessageBox = App.MsgBoxManager.getBoxB();
            messageBox.showMsg("网络连接失败，请检查您的网络。");
        }
    }

    //     //***********************************************************************
    //     //------------------------ Socket通讯-------------------------------------
    //     //------------------------ Socket通讯-------------------------------------
    //     //------------------------ Socket通讯-------------------------------------
    //     //************************************************************************


    private revEnterRoom(data) {
        let json = ProtocolData.Rev2001;
        json = data;
        let myuser =App.DataCenter.UserInfo.selfUser;
        if(myuser.userID==json.uid){
            myuser.seatID=json.seatid;
        }
        this.sendEvent(GameController.EVENT_SHOW_GAME_SCENE);

    }

    /****断线重连 */
    private revReBind(data) {
        let json = ProtocolData.Rev2021;
        json = data;

    }

    /******开房****** */
    public sendOpenRoom(data) {
        var gameSocket: ClientSocket = App.gameSocket;
        gameSocket.dataBuffer = data;
        this.addEvent(EventConst.SocketConnect, this.onOpenRoom, this);
        gameSocket.startConnect(App.DataCenter.ServerInfo.GAME_SERVER);

    }

    private onOpenRoom(socket: ClientSocket) {
        let data = socket.dataBuffer;
        socket.send(data);
    }

    private revOpenRoom(data) {

    }


    /**** 进入房间*/
    public sendJoinRoom(data) {
        var gameSocket: ClientSocket = App.gameSocket;
        gameSocket.dataBuffer = data;
        this.addEvent(EventConst.SocketConnect, this.onJoinRoom, this);
        gameSocket.startConnect(App.DataCenter.ServerInfo.GAME_SERVER);
    }

    private onJoinRoom(socket: ClientSocket) {
        let data = socket.dataBuffer;
        socket.send(data);
    }

    private revJoinRoom() {

    }


}