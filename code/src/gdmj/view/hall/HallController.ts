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

    }


    //移除注册时调用
    public onRemove() {

    }

    /**显示大厅*/
    private showHallScene() {
        this.hallScene = App.SceneManager.runScene(SceneConst.HallScene, this) as HallScene;
    }

    //注册socket
    public registerSocket() {
        var gameSocket: ClientSocket = App.gameSocket;
        //         gameSocket.register(ProtocolHead.Rev100_3_8, this.revLoginError, this);
        //         //socket连接成功事件
        this.addEvent(EventConst.SocketConnect, this.onSocketConnect, this);
        //         //socket连接错误事件
        this.addEvent(EventConst.SocketIOError, this.onSocketError, this);
        gameSocket.startConnect(App.DataCenter.ServerInfo.GAME_SERVER);
    }

    //     public unRegistSocket() {
    //         var gameSocket: ClientSocket = App.gameSocket;
    //         gameSocket.unRegister(ProtocolHead.Rev100_3_8);
    //         gameSocket.unRegister(ProtocolHead.Send100010);
    //         gameSocket.unRegister(ProtocolHead.Rev100_2_1);
    //         gameSocket.unRegister(ProtocolHead.Rev102_4_1);
    //         gameSocket.unRegister(ProtocolHead.Gag111_2_1);
    //         gameSocket.unRegister(ProtocolHead.Rev121_1_0);
    //         //gameSocket.unRegister(ProtocolHead.Rev120_1_1);
    //         gameSocket.unRegister(ProtocolHead.Rev120_1_2);
    //         gameSocket.unRegister(ProtocolHead.Rev200_1_1);
    //         gameSocket.unRegister(ProtocolHead.Rev182_1_0);
    //         gameSocket.unRegister(ProtocolHead.Rev182_0_0);
    //         this.removeEvent(EventConst.SocketConnect, this.onSocketConnect, this);
    //         this.removeEvent(EventConst.SocketIOError, this.onSocketError, this);
    // }


    //     /**socket连接成功*/
    private onSocketConnect(socket: ClientSocket) {
        console.log(" hall connenct success");
        App.gameSocket.send("",{cmd:1,f:"jjj"})
       
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

    //     /**发送获取游戏服务器*/
    //     public sendGetGameServer() {
    //         console.log("发送获取游戏服务器");
    //         var data = ProtocolData.Send200_1_0;
    //         data.serverType = App.gameSocket.serverType;
    //         data.userid = App.DataCenter.UserInfo.selfUser.userID;
    //         data.gameid = Game_ID.selfRoom;
    //         data.deskCode = this.curRoomid;
    //         //查询房间所在游戏服务器
    //         App.gameSocket.send(ProtocolHead.Send200_1_0, data);
    //     }

    //     /**接收匹配房返回 */
    //     public revMatchRoom(data) {
    //         App.LoadingLock.unlock();

    //         var json = ProtocolData.Rev100120;
    //         json = data;

    //         if (json&&json.info&&json.info.chat_room_id) {
    //             App.NativeBridge.sendJoinRoom({roomId: json.info.chat_room_id});
    //         }

    //         if (data.code == 200) {
    //             console.log("进入匹配房成功")
    //             var len = json.info.userList.length
    //             var info = json.info;
    //             for (var i = 0; i < len; i++) {
    //                 var to_game = ProtocolData.to_game;
    //                 to_game = JSON.parse(info.userList[i])
    //                 var userVO: UserVO = App.DataCenter.UserInfo.getUser(to_game.userid);
    //                 if (userVO == null) {
    //                     userVO = new UserVO();
    //                     userVO.userID = to_game.userid;
    //                     App.DataCenter.UserInfo.addUser(userVO);
    //                 }
    //                 userVO.nickName = to_game.nickname;
    //                 userVO.seatID = to_game.deskstation;
    //                 userVO.headUrl = to_game.avater;
    //                 userVO.sex = to_game.sex;
    //                 userVO.gold = to_game.money;
    //                 userVO.point = to_game.point;
    //             }

    //             this.hallScene.intoMatchRoom();
    //         }else{
    //             var desc = data.info.desc;
    //             TipsLog.hallInfo(desc);
    //         };
    //         // if (data.code == 3002 || data.code == 3003) {
    //         //     var desc = data.info.desc;
    //         //     TipsLog.hallInfo(desc);
    //         // }

    //     }

    //     /**接收好友房返回 */
    //     public revFriendRoom(data) {
    //         var json = ProtocolData.Rev100120;
    //         json = data;

    //         if (json&&json.info&&json.info.chat_room_id) {
    //             App.NativeBridge.sendJoinRoom({roomId: json.info.chat_room_id});
    //         }

    //         if (data.code == 200) {
    //             console.log("进入好友房成功")

    //             var len = json.info.userList.length
    //             var info = json.info;
    //             for (var i = 0; i < len; i++) {
    //                 var to_game = ProtocolData.to_game;
    //                 to_game = JSON.parse(info.userList[i])
    //                 var userVO: UserVO = App.DataCenter.UserInfo.getUser(to_game.userid);
    //                 if (userVO == null) {
    //                     userVO = new UserVO();
    //                     userVO.userID = to_game.userid;
    //                     App.DataCenter.UserInfo.addUser(userVO);
    //                 }
    //                 userVO.nickName = to_game.nickname;
    //                 userVO.seatID = to_game.deskstation;
    //                 userVO.headUrl = to_game.avater;
    //                 userVO.sex = to_game.sex;
    //                 userVO.gold = to_game.money;
    //                 userVO.point = to_game.point;
    //             }
    //             //重置准备
    //             var userVo: UserVO = App.DataCenter.UserInfo.getMyUserVo();
    //             userVo && (userVo.setState(PLAYER_STATE.READY, false));
    //             this.hallScene.intoFriendRoom();

    //         };

    //         if (data.code == 3002 || data.code == 3003) {
    //             var desc = data.info.desc;
    //             TipsLog.hallInfo(desc);
    //         }
    //     }


    //     /**接收获取游戏服务器*/
    //     private revGameServer(data) {
    //         console.log("接收游戏服务器");
    //         //关闭调度服务器
    //         // App.gameSocket.close();
    //         var json = ProtocolData.Rev200_1_1;
    //         json = data;
    //         if (!json.retCode) {
    //             let ip = "ws://" + json.host + ":" + json.port;
    //             App.DataCenter.ServerInfo.GAME_SERVER = json.host;
    //             App.DataCenter.ServerInfo.GAME_PORT = json.port
    //             App.gameSocket.startConnect(ip);
    //         } else if (json.retCode == 1) {
    //             TipsLog.hallInfo("房主不在线,返回自己的房间");
    //             this.sendSelfRoom();
    //         }
    //     }
    //     /**查询房间是否存在**/
    //     private sendCheckRoom() {
    //         var data = ProtocolData.Send200_2_0;
    //         data.deskCode = this.curRoomid;
    //         data.gameid = Game_ID.selfRoom;
    //         App.gameSocket.send(ProtocolHead.Send200_2_0, data);
    //     }



    //     /**返回房间是否存在**/
    //     private revCheckRoom(data) {

    //         var info = ProtocolData.Rev200_2_1;
    //         info = data;
    //         if (info.isExist) {
    //             //必须先断开连接,房间可能在不同游戏服务器里面
    //             console.log("game socket close!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
    //             // App.gameSocket.close();
    //             egret.setTimeout(() => { this.sendGetGameServer(); }, this, 200)

    //         } else {
    //             //通过链接进入,不存在将返回自己房间
    //             if (this.curDeskId) {
    //                 TipsLog.hallInfo("房主不在线,房间已关闭,您已回到自己房间");
    //                 this.sendSelfRoom();
    //                 //否则为点击加入房间
    //             } else {
    //                 TipsLog.hallInfo("房间不存在");
    //             }
    //         }
    //     }

    //     /**发送登录游戏服务器*/
    //     public sendWLogin() {
    //         var data = ProtocolData.Send100002;
    //         data.userid = App.DataCenter.UserInfo.selfUser.userID;
    //         data.pass = App.DataCenter.ServerInfo.MD5PASS;
    //         App.gameSocket.send(ProtocolHead.Send100002, data);
    //     }

    //     /**游戏服务器登录成功,服务器此时会发送该房间下所有的桌子信息 ,如果是断线重连则等待断线重连消息,revSelfRoom*/
    //     private revWLogin(data) {
    //         // var info = ProtocolData.to_game;
    //         // info = data;
    //         // console.log("登录成功,是否断线重连:" + info.reconnect);
    //         // this.isReconnection=false;
    //         // if (info.reconnect) {
    //         //     this.isReconnection = true;
    //         //     TipsLog.hallInfo("~~嗷嗷~~断线重连中~~~~~~")
    //         // } else {
    //         //     App.MsgBoxManager.recycleAllBox();        
    //         // }
    //         // var info = ProtocolData.to_game;
    //         var info = ProtocolData.Rev100002;
    //         info = data;
    //         if (data.code == 200) {
    //             console.log("登录成功,是否断线重连:" + data.info.reconnect);
    //             this.isReconnection = false;
    //             this.isLogin = true;
    //             if (data.info.reconnect) {

    //                 this.isReconnection = true;
    //                 TipsLog.hallInfo("断线重连中~~~~~~");
    //                 // let json = JSON.parse(data.info.data);
    //                 let room_name = data.info.room_name;
    //                 let desk_code = data.info.desk_code;
    //                 console.log("*****" + desk_code);
    //                 if (desk_code != -1) {
    //                     App.DataCenter.roomInfo.roomType = RoomType.FriendRoom;
    //                     App.DataCenter.deskInfo.deskID = parseInt(desk_code);
    //                     this.room_type = RoomType.FriendRoom;
    //                     this.SendReconnection(room_name);

    //                 } else if (desk_code == -1) {

    //                     App.DataCenter.roomInfo.roomType = RoomType.MatchRoom;
    //                     this.room_type = RoomType.MatchRoom;
    //                     this.SendReconnection(room_name);
    //                 }

    //                 // this.revReconnection(json);
    //             }
    //             else {
    //                 this.judgeInvite();
    //             }
    //         }

    //     }

    //     /***接收房间桌子列表,这里接受的是自己的桌子信息**/
    //     private revSelfRoom(data) {
    //         var info = ProtocolData.Rev121_1_0;
    //         info = data;
    //         var roomId = this.curRoomid;
    //         if (!this.isReconnection) {
    //             console.log("当前房间号_________________:", roomId);
    //             let deskId = 1
    //             if (this.curDeskId) deskId = this.curDeskId;
    //             this.sendInRoom(roomId, deskId);
    //         }
    //     }
    //     /**
    //  * 发送进入房间
    //  * @deskID 房间号
    //  */
    //     private sendInRoom(roomId, deskId) {
    //         let data = ProtocolData.Send102_4_0;
    //         data.deskCode = roomId;
    //         data.deskid = deskId;
    //         App.gameSocket.send(ProtocolHead.Send102_4_0, data);
    //     }
    //     /**发送加入房间 */
    //     public sendInRoom1(roomId) {
    //         let data = ProtocolData.Send102_4_0;
    //         data.deskCode = roomId;
    //         App.gameSocket.send(ProtocolHead.Send102_4_0, data);
    //     }
    //     /**
    //      * 创建好友房
    //      */
    //     public createFriendRoom(){
    //         var json = ProtocolData.Send101000;
    //         json.desk_name=App.DataCenter.UserInfo.getMyUserVo().nickName;
    //         json.deviceID="111";
    //         json.userid=App.DataCenter.UserInfo.getMyUserVo().userID;
    //         App.gameSocket.send(ProtocolHead.Send101000,json);
    //     }

    //     /**接收进入房间*/
    //     private revInRoom(data) {
    //         //清空非游戏内面板
    //         App.PanelManager.closeAllPanel();
    //         App.DataCenter.UserInfo.deleteAllUserExcptMe();
    //         var info = ProtocolData.Rev102_4_1;
    //         info = data;
    //         if (!info.retCode) {
    //             console.log("进入房间++++++++++++++++++++++++++++++++++++++++++++++++++++++++:" + info);
    //             App.DataCenter.roomInfo.readDeskList(info.deskLst);
    //             App.DataCenter.roomInfo.setCurDesk(info.deskno);
    //             let cur: DeskInfo = App.DataCenter.roomInfo.getCurDesk();
    //             App.DataCenter.deskInfo = cur;
    //             //保存to_game用户数据
    //             var len = info.userList.length;
    //             for (var i = 0; i < len; i++) {
    //                 var to_game = ProtocolData.to_game;
    //                 to_game = JSON.parse(info.userList[i])
    //                 var userVO: UserVO = App.DataCenter.UserInfo.getUser(to_game.userid);
    //                 if (userVO == null) {
    //                     userVO = new UserVO();
    //                     userVO.userID = to_game.userid;
    //                     App.DataCenter.UserInfo.addUser(userVO);
    //                 }
    //                 userVO.nickName = to_game.nickname;
    //                 userVO.seatID = to_game.deskstation;
    //                 userVO.headUrl = to_game.avater;
    //                 userVO.sex = to_game.sex;
    //                 userVO.gold = to_game.money;
    //                 userVO.state=to_game.userstate;
    //                 // userVO.point = to_game.point;
    //             }
    //             this.hallScene.intoGameDesk();
    //             console.log("updateDesk_______________________________________________________________________________")
    //             // this.hallScene.updateCurDeskUI();
    //             // this.sendGetQRCode();
    //             //被踢出后3分钟不能进入,将进自己房间
    //         } else if (info.retCode == -11) {
    //             this.sendSelfRoom()
    //             TipsLog.hallInfo(MatchCode.getCodeText(ProtocolHead.Rev102_4_1, info.retCode));
    //         } else if (info.retCode == 2 && !this.isReconnection) {
    //             let nextDeskId: number = -1;
    //             for (let i = 0; i < info.deskLst.length; i++) {
    //                 let desk: DeskInfo = info.deskLst[i]
    //                 if (desk.curSitPeopleCoiunt < 4) {
    //                     nextDeskId = desk.deskID;
    //                     break;
    //                 }
    //             }

    //             if (nextDeskId != -1) {
    //                 var messageBox: MessageBox = App.MsgBoxManager.getBoxA();
    //                 messageBox.ok = () => {
    //                     this.sendInRoom(this.curRoomid, nextDeskId);
    //                 };


    //                 if (this.curDeskId) {
    //                     App.DataCenter.roomInfo.readDeskList(info.deskLst);
    //                     App.DataCenter.roomInfo.setCurDeskById(this.curDeskId);
    //                     let cur: DeskInfo = App.DataCenter.roomInfo.getCurDesk();
    //                     App.DataCenter.deskInfo = cur;
    //                     // this.hallScene.setGameContent(null)
    //                     // this.hallScene.updateCurDeskUI();
    //                     messageBox.showMsg("当前麻将桌人数已满,房主其它麻将桌有空位,是否立即前往?");
    //                 } else {
    //                     this.sendSelfRoom(this.curRoomid, nextDeskId);
    //                 }


    //             } else {

    //                 App.DataCenter.roomInfo.readDeskList(info.deskLst);
    //                 App.DataCenter.roomInfo.setCurDeskById(this.curDeskId);
    //                 let cur: DeskInfo = App.DataCenter.roomInfo.getCurDesk();
    //                 App.DataCenter.deskInfo = cur;
    //                 // this.hallScene.setGameContent(null)
    //                 var messageBox: MessageBox = App.MsgBoxManager.getBoxB();
    //                 messageBox.showMsg("房主所有的麻将桌人数已满！");
    //                 // this.hallScene.updateCurDeskUI();
    //             }
    //             //房间过期
    //         } else if (info.retCode == -15) {
    //             this.hallScene.openReNew();
    //             App.DataCenter.roomInfo.clean();
    //             // this.hallScene.restPageView();
    //             // this.hallScene.updateCurDeskUI();
    //         } else {
    //             console.log("进入房间:", info.retCode);
    //             TipsLog.hallInfo(MatchCode.getCodeText(ProtocolHead.Rev102_4_1, info.retCode));
    //         }
    //     }

    //     /**
    //      *  进入专属房
    //      * @param deskCode 房间号;没有房间号进入自己专属房，否则进入别人专属房
    //      */
    //     public sendSelfRoom(deskCode = null, deskId = null) {

    //         var serverType;
    //         App.gameSocket.gameID = Game_ID.selfRoom;
    //         this.curDeskId = deskId;
    //         //加入他人专属房
    //         if (deskCode) {
    //             serverType = Server_Type.joinRoom;
    //             this.curRoomid = deskCode;
    //         } else {
    //             //自己房间
    //             serverType = Server_Type.createRoom;
    //             this.curRoomid = App.DataCenter.UserInfo.getMyUserVo().excluroomCode;
    //         }
    //         // App.gameSocket.startConnect(App.DataCenter.ServerInfo.SERVER_URL,false,serverType);
    //     }

    //     /**
    //      * 加入桌子
    //      * @param deskNo 桌子号
    //      */
    //     private sendInDesk(deskNo: number) {
    //         var info = ProtocolData.Send102_8_0;
    //         info.deskno = deskNo;
    //         App.gameSocket.send(ProtocolHead.Send102_8_0, info);
    //     }

    //     /**
    //      * 接受加入桌子返回
    //      */
    //     private revInDesk(data) {
    //         var info = ProtocolData.Rev102_8_1;
    //         info = data;
    //     }

    //     /**
    //      * 获取桌子信息
    //      * @param deskNo
    //      */
    //     private sendGetDesk(deskNo: number) {
    //         var info = ProtocolData.Send104_10_0;
    //         info.deskNo = deskNo;
    //         App.gameSocket.send(ProtocolHead.Send104_10_0, info);
    //     }

    //     /**
    //      * 获取桌子信息
    //      */
    //     private revGetDesk(data) {
    //         var info = ProtocolData.Rev104_10_1;
    //         info = data;
    //     }

    //     /**推送服务登陆成功*/
    //     private revPushLogin(data) {
    //         console.log("推送服务器登陆成功");
    //     }

    //     /**推送消息*/
    //     private revPushMessage(data) {
    //     }


    //     /**
    //      *  发送房间修改
    //      */
    //     public sendRoomChange(infodata) {
    //         var info = ProtocolData.Send120_1_0;
    //         info = infodata
    //         App.gameSocket.send(ProtocolHead.Send120_1_0, info);
    //     }

    //     /**
    //      * 房主房间修改返回
    //      * @param data
    //      */
    //     private RevRoomChange(data) {
    //         var info = ProtocolData.Rev120_1_1;
    //         info = data;
    //         if (!info.retCode) {
    //         } else {
    //             TipsLog.hallInfo(data.desc);
    //         }
    //     }

    //     /**
    //      * 接收修改规则初始值
    //      */
    //     private rev100118(data) {
    //         console.log("修改规则初始值：",data); 
    //         var json = ProtocolData.Rev100117;
    //         json = data;
    //         if (json.code == 200) {
    //             App.PanelManager.open(PanelConst.ModifyRlueT,null,null,true,true,data);
    //         } else {
    //             if (json.code == 3002 || json.code == 3003) {
    //                 TipsLog.hallInfo(data.info.desc);
    //             }
    //         }
    //     }

    //     /**
    //      *  接受房间更改广播,只返回更改的属性
    //      * @param data
    //      */
    //     private RevBCRoomChange(data) {
    //         TipsLog.hallInfo("房间信息已修改!!");
    //         if (typeof (data.gameConfig) == "string") {
    //             data.gameConfig = JSON.parse(data.gameConfig);
    //         }
    //         let ischange = App.DataCenter.roomInfo.exCurDesk(data);
    //         // this.hallScene.updateCurDeskUI();
    //         // this.hallScene.updateCurDeskInfo();
    //         if (ischange) {
    //             this.sendEvent(EventConst.GameConfigChange);
    //         }

    //     }

    //     /**推送服务器*/
    //     public sendPushLogin() {
    //         var data = ProtocolData.Send181_0_0;
    //         data.userid = App.DataCenter.UserInfo.selfUser.userID;
    //         App.gameSocket.send(ProtocolHead.Send181_0_0, data);
    //     }

    //     /**玩家游戏中登录或没有正常登出*/
    //     private revLoginError(data) {
    //         var info = ProtocolData.Rev100_3_8;
    //         info = data;
    //         console.log("没有正常登出:" + info);
    //     }

    //     /**断线重连*/
    //     public revReconnection(data) {
    //         var json = ProtocolData.Rev100010;
    //         json = data;
    //         var info = json.info;

    //         if(json&&json.info&&json.info.chat_room_id) {
    //             App.NativeBridge.sendJoinRoom({roomId: json.info.chat_room_id});
    //         }

    //         if (json.code == 200) {


    //             console.log("后端数据：",info.deskInfo);
    //             App.DataCenter.deskInfo.readData(info.deskInfo);
    //             console.log("前端数据：", App.DataCenter.deskInfo);
    //             let list = [info.deskInfo];
    //             // App.DataCenter.roomInfo.readDeskList(list);
    //             // App.DataCenter.roomInfo.setCurDesk(info.deskindex);
    //             // let cur: DeskInfo = App.DataCenter.roomInfo.getCurDesk();
    //             // App.DataCenter.deskInfo = cur;
    //             let desk_code = parseInt(info.desk_code);
    //             //desk_code有时是int 有时是string
    //             if (desk_code != -1) {
    //                 App.DataCenter.deskInfo.deskID = parseInt(info.desk_code);
    //             }

    //             // this.hallScene.updateCurDeskUI();
    //             // this.sendGetQRCode();
    //             var userList = info.userlist;
    //             if (userList) { //只有1人时，userList是null, 多人时userList才有数据
    //                 var len = userList.length;
    //                 for (var i = 0; i < len; i++) {
    //                     var toGame = ProtocolData.toGame;
    //                     toGame = JSON.parse(userList[i]);
    //                     var userVO: UserVO = App.DataCenter.UserInfo.getUser(toGame.userid);
    //                     if (userVO == null) {
    //                         userVO = new UserVO();
    //                         userVO.userID = toGame.userid;
    //                         App.DataCenter.UserInfo.addUser(userVO);
    //                     }
    //                     userVO.nickName = toGame.nickname;
    //                     userVO.seatID = toGame.deskstation;
    //                     userVO.sex = toGame.sex;
    //                     userVO.headUrl = toGame.avater;
    //                     userVO.gold = toGame.money;
    //                     userVO.point = toGame.point;
    //                 }
    //             } else {
    //                 var userVO: UserVO = App.DataCenter.UserInfo.getUser(info.userid);
    //                 if (userVO == null) {
    //                     userVO = new UserVO();
    //                     userVO.userID = info.userid;
    //                     App.DataCenter.UserInfo.addUser(userVO);
    //                 }
    //                 userVO.seatID = info.deskstation;
    //             }

    //             //进入房间
    //             this.hallScene.intoGameDesk(false, null, true, this.room_type);
    //         } else {
    //             TipsLog.hallInfo("连接失败");
    //         }
    //     }

    //     /**创建好友房返回 */
    //     private revFriendRoomCreate(data) {
    //         var json = ProtocolData.Rev101000;
    //         json = data;

    //         if(json&&json.info&&json.info.retData&&json.info.retData.chat_room_id) {
    //             App.NativeBridge.sendJoinRoom({roomId: json.info.retData.chat_room_id})
    //         }

    //         if (json.code == 200) {
    //             console.log("创建好友房成功")
    //             //记录桌子信息
    //             App.DataCenter.deskInfo.deskID = json.info.deskCode;
    //             App.DataCenter.deskInfo.deskName = json.info.deskName;
    //             App.DataCenter.deskInfo.deskNo = json.info.retData.deskno;
    //             App.DataCenter.deskInfo.gameConfig = json.info.gameConfig;
    //             App.DataCenter.deskInfo.basePoint = json.info.basePoint;
    //             App.DataCenter.deskInfo.ownerID = json.info.ownerID;
    //             App.DataCenter.deskInfo.ownerName = json.info.ownerName;

    //             this.hallScene.intoFriendRoom();
    //         } else {
    //             if (json.code == 3002 || json.code == 3003) {
    //                 TipsLog.hallInfo(data.info.desc);
    //             } else {
    //                 TipsLog.hallInfo("创建房间失败");
    //             }
    //         }
    //     }

    //     /**加入好友房返回 */
    //     private revJoinFriendRoom(data) {
    //         App.LoadingLock.unlock();

    //         var json = ProtocolData.Rev101001;
    //         json = data;

    //         if (json&&json.info&&json.info.chat_room_id) {
    //             App.NativeBridge.sendJoinRoom({roomId: json.info.chat_room_id});
    //         }

    //         if (json.code == 200) {
    //             console.log("加入房间成功");
    //             var len = json.info.userList.length;

    //             //记录桌子信息
    //             App.DataCenter.deskInfo.deskID = data.info.deskCode;
    //             App.DataCenter.deskInfo.deskName = data.info.deskName;
    //             App.DataCenter.deskInfo.deskNo = data.info.deskno;
    //             App.DataCenter.deskInfo.ownerID = data.info.ownerID;

    //             for (var i = 0; i < len; i++) {
    //                 var to_game = ProtocolData.to_game;
    //                 to_game = JSON.parse(json.info.userList[i])
    //                 var userVO: UserVO = App.DataCenter.UserInfo.getUser(to_game.userid);
    //                 if (userVO == null) {
    //                     userVO = new UserVO();
    //                     userVO.userID = to_game.userid;
    //                     App.DataCenter.UserInfo.addUser(userVO);
    //                 }
    //                 userVO.nickName = to_game.nickname;
    //                 userVO.seatID = to_game.deskstation;
    //                 userVO.headUrl = to_game.avater;
    //                 userVO.sex = to_game.sex;
    //                 userVO.gold = to_game.money;
    //                 userVO.point = 0;
    //             }

    //             //重置准备状态
    //             var userVo: UserVO = App.DataCenter.UserInfo.getMyUserVo();
    //             userVo && (userVo.setState(PLAYER_STATE.READY, false));

    //             this.hallScene.intoFriendRoom();
    //         }
    //         else if (data.code == 1006) {
    //             TipsLog.hallInfo("房间不存在，请检查所输入的房间号是否正确");
    //             (<JoinNumber>App.PanelManager.getPanel(PanelConst.JoinNumber)).fuckfuck();
    //         }
    //         else {
    //             TipsLog.hallInfo(data.info.desc);
    //             (<JoinNumber>App.PanelManager.getPanel(PanelConst.JoinNumber)).fuckfuck();
    //             // if (json.code == 3002 || json.code == 3003) {
    //             //     TipsLog.hallInfo(data.info.desc);
    //             // } else {
    //             //     TipsLog.hallInfo("加入房间失败");
    //             // }

    //         }

    //     }

    //     private onSelfRoomEmpty() {
    //         TipsLog.hallInfo("没有可用的专属房!!");
    //     }

    //     /**
    //      * 发送断线重连消息
    //      */
    //     private SendReconnection(room_name) {
    //         var json = ProtocolData.Send100010;
    //         json.userid = App.DataCenter.UserInfo.getMyUserVo().userID;
    //         json.room_name = room_name;
    //         App.gameSocket.send(ProtocolHead.Send100010, json)
    //     }

    //     //同时进入游戏时有可能收到用户进入消息
    //         /**接收用户进入*/  
    //     public revUserJoin(data) {
    //         var json = ProtocolData.Rev104_4_2;
    //         json = data;
    //         // console.log("json"+json.userid+"seatID"+json.deskstation);
    //         var userVo: UserVO = App.DataCenter.UserInfo.getUserBySeatID(json.deskstation);
    //         if (userVo == null) {
    //             userVo = new UserVO();
    //             userVo.userID = json.userid;
    //             App.DataCenter.UserInfo.addUser(userVo);
    //         }
    //         userVo.userID = json.userid;
    //         userVo.seatID = json.deskstation;
    //         userVo.nickName = json.nickname;
    //         userVo.headUrl = json.avater;
    //         userVo.sex = json.sex;
    //         userVo.gold = json.money;
    //         if(App.DataCenter.roomInfo.roomType == RoomType.MatchRoom){
    //              userVo.point = json.point;
    //         }else{
    //              userVo.point = 0;
    //         }

    //         userVo.userPos = CardLogic.getInstance().changeSeat(userVo.seatID);

    //         console.log("用户加入，用户ID:", userVo.userID, " 用户位置:", userVo.userPos);
    //     }



    //************************************************************************
    //------------------------ HTTP通讯---------------------------------------
    //------------------------ HTTP通讯---------------------------------------
    //------------------------ HTTP通讯---------------------------------------
    //************************************************************************

    /**
     * 获取录像数据
     * @replayCode 录像回放码
    //  */
    // public sendReplayDataReq(replayCode) {
    //     var http = new HttpSender();
    //     var sendData = ProtocolHttp.send_z_replayCombatGain;
    //     sendData.param.replaycode = parseInt(replayCode);
    //     http.send(sendData, this.revReplayDataReq, this);
    // }

    // /**返回录像数据，并进入游戏放录音*/
    // private revReplayDataReq(data) {
    //     if (!data.ret) {
    //         let replayData = data.data;
    //         this.hallScene.intoGameDesk(true, replayData);
    //     } else {
    //         TipsLog.hallInfo(data.desc);
    //     }
    // }

    // /**记录发送请求的商品ID */
    // protected buyPropRecData: any = null;
    // /**
    //  * 发送购买物品请求
    //  * @id 商品id
    //  */
    // public sendBuyProp(id: number) {
    //     var http = new HttpSender();
    //     var data = ProtocolHttp.send_z_buyprop;
    //     data.param.propid = id;
    //     if (App.DeviceUtils.IsIos) {
    //         data.param.platform = 2;
    //     }
    //     this.buyPropRecData = id;
    //     http.send(data, this.revBuyPropReq, this);
    // }

    // /**返回购买物品结果*/
    // private revBuyPropReq(data) {
    //     if (!data.ret) {
    //         console.log("购买物品返回：：：", data);
    //         var paymentPanel: PaymentPanel = App.PanelManager.open(PanelConst.PaymentPanel, null, this, true, true, this.buyPropRecData);
    //         paymentPanel.setData(data.data);
    //     } else {
    //         TipsLog.hallInfo(data.desc);
    //     }
    // }

    // /**
    //  * 选择支付方式
    //  * @id 商品id
    //  */
    // public sendBuyPayment() {
    //     var http = new HttpSender();
    //     var data = ProtocolHttp.send_z_buypayment;
    //     http.send(data, this.rebBuyPayment, this);
    // }
    // /**选择支付方式返回 */
    // private rebBuyPayment(data) {
    //     console.log("选择支付方式返回：：：", data);
    //     if (!data.ret) {
    //         var paymentMethod: PaymentMethod = App.PanelManager.open(PanelConst.PaymentMethod);
    //         paymentMethod.setData(data.data);
    //     } else {
    //         TipsLog.hallInfo(data.desc);
    //     }
    // }

    // /**
    //  * 确认支付
    //  * @goodsid 商品ID
    //  * @pay_type 支付方式
    //  */
    // public sendBuySure(id: number = 1, type: number = 1) {
    //     var http = new HttpSender();
    //     var data = ProtocolHttp.send_z_buySure;
    //     data.param.goodsid = id;
    //     data.param.pay_type = type;
    //     http.send(data, this.revBuySure, this);
    // }

    // /**确认支付返回 */
    // private revBuySure(data) {
    //     console.log("pay http rev++++++++++");
    //     console.log(data);
    //     if (data.ret != 0) {
    //         TipsLog.hallInfo("获取支付信息错误");
    //         return;
    //     }

    //     App.LoadingLock.lock();
    //     App.LoadingLock.addDesc("正在为您购买，请稍候");

    //     var iData = data.data.pay;
    //     var sData = {
    //         subject: "长沙麻将",
    //         amount: iData.price,
    //         pay_type: iData.pay_type,
    //         process_type: 0,
    //         order_id: iData.orderid,
    //         app_id: "1",
    //         goodsid: iData.id
    //     }
    //     App.NativeBridge.sendPay(sData);
    // }


    // /**发送反馈信息 */
    // public sendFeedbackReq(contenter: string) {
    //     var http: HttpSender = new HttpSender();
    //     var data = ProtocolHttp.send_z_feedback;
    //     data.param.content = contenter;
    //     http.send(data, this.sendFeedbackReqCallback, this);
    // }
    // /** 发送反馈回调 */
    // private sendFeedbackReqCallback(data) {
    // }
    // /**接受二维码*/
    // private revQRCode(data) {
    //     if (!data.ret) {
    //         App.DataCenter.roomInfo.QrUrl = data.data.url
    //     } else {
    //         TipsLog.hallInfo(data.desc)
    //     }
    // }
    // /*二维码*/
    // public sendGetQRCode() {
    //     var http: HttpSender = new HttpSender();
    //     var qr = ProtocolHttp.ShareByQrcode;
    //     qr.param.deskCode = App.DataCenter.roomInfo.getCurDesk().deskCode.toString();
    //     qr.param.deskId = App.DataCenter.roomInfo.getCurDesk().deskNo;
    //     http.send(qr, this.revQRCode, this);
    // }

    // /*获取邮件*/
    // public sendGetEmail() {
    //     var http: HttpSender = new HttpSender();
    //     var qr = ProtocolHttp.send_z_emailList;
    //     http.send(qr, this.revGetEmail, this);
    // }
    // /**邮件返回 */
    // private revGetEmail(data) {
    //     if (!data.ret) {
    //         var emailPanel: EmailPanel = App.PanelManager.open(PanelConst.EmailPanel);
    //         emailPanel.setData(data.data);
    //     } else {
    //         var emailPanel: EmailPanel = App.PanelManager.open(PanelConst.EmailPanel);
    //         emailPanel.setData([]);
    //     }
    // }
    // /*获取邮件详情*/
    // public sendEmailDetail(id) {
    //     var http: HttpSender = new HttpSender();
    //     var qr = ProtocolHttp.send_z_emailDetail;
    //     qr.param.eid = id;
    //     http.send(qr, this.revEmailDetail, this);
    // }
    // /**邮件详情返回 */
    // private revEmailDetail(data) {
    //     if (!data.ret) {
    //         var emailTwoPanel: EmailTwoPanel = App.PanelManager.open(PanelConst.EmailTwoPanel);
    //         emailTwoPanel.setData(data.data);
    //     } else {
    //         TipsLog.hallInfo(data.desc)
    //     }
    // }
    // /**获取邮件附件 */
    // public sendEmailGoods(id) {
    //     var http: HttpSender = new HttpSender();
    //     var qr = ProtocolHttp.send_z_getEmailGoods;
    //     qr.param.eid = id;
    //     http.send(qr, this.revEmailGoods, this);
    // }
    // /**获取附件返回 */
    // private revEmailGoods(data) {
    //     if (!data.ret) {
    //         TipsLog.hallInfo("领取成功！");
    //         App.PanelManager.getPanel(PanelConst.EmailTwoPanel).refreshEmailStatus();
    //     } else {
    //         TipsLog.hallInfo(data.desc)
    //     }
    // }
    // // //开新桌
    // // public sendOpenDesk(dds) {
    // //     var http = new HttpSender();
    // //     var data = ProtocolHttp.AddDesk;
    // //     data.param.ip = App.DataCenter.ServerInfo.GAME_SERVER;
    // //     data.param.port = App.DataCenter.ServerInfo.GAME_PORT;
    // //     data.param.gameConfig = dds.gameConfig;
    // //     data.param.basePoint = dds.basePoint;
    // //     http.send(data, this.revOpenDesk, this);
    // // }
    // // //接受开新桌
    // // private revOpenDesk(data) {
    // //     if (!data.ret) {
    // //         TipsLog.hallInfo("桌子增加成功!!");
    // //         App.DataCenter.roomInfo.addDesk(data.data)

    // //         this.hallScene.left = 20
    // //         this.hallScene.top
    // //         this.hallScene.right
    // //         this.hallScene.bottom

    // //         // this.hallScene.addPageView();
    // //     } else {
    // //         TipsLog.hallInfo(data.desc)
    // //     }
    // //     console.log(data);
    // // }

    // /**
    // * 发送商城列表请求
    // * @type 请求类型
    // */
    // public sendShopListReq(type: ShopType) {
    //     var http = new HttpSender();
    //     var data = ProtocolHttp.send_z_goodsList;
    //     data.param.type = type;
    //     http.send(data, this.revShopListReq, this);
    // }

    // /**返回商城列表*/
    // private revShopListReq(data) {
    //     var goodsList: Array<any> = data.data.goodses;
    //     console.log("商城列表:", goodsList);
    //     var type: number = data.data.type;
    //     if (!data.ret) {
    //         var mallPanel: MallPanel = App.PanelManager.open(PanelConst.MallPanel, null, this, true, true, goodsList);
    //     } else {
    //         TipsLog.hallInfo(data.desc);
    //     }
    // }

    // /**
    // * 获取背包
    // * @type 请求类型
    // */
    // public getBackpack() {
    //     var http = new HttpSender();
    //     var data = ProtocolHttp.get_z_back;
    //     http.send(data, this.revBackpack, this);
    // }
    // /**
    //  * 背包物品返回
    //  */
    // private revBackpack(data) {
    //     console.log("背包物品返回：：：", data);
    //     if (!data.ret) {
    //         App.PanelManager.open(PanelConst.BackpackPanel, null, this, true, true, data.data);
    //     } else {
    //         App.PanelManager.open(PanelConst.BackpackPanel, null, this, true, true, []);
    //     }
    // }
    // /*获取公告跑马灯*/
    // public sendGetMsgMarquee() {
    //     var http = new HttpSender();
    //     var data = ProtocolHttp.send_z_marquee;
    //     http.send(data, this.revMesMarquee, this);
    // }
    // /**接受跑马灯公告*/
    // private revMesMarquee(data) {
    //     console.log(data.data.marquees);
    //     App.DataCenter.marqueeInfo.setMsgMarquee(data.data.marquees);
    //     this.hallScene.starMarquee();
    // }


    // /**开通会员 */
    // public sendShopVipReq(gid: number) {
    //     this.sendPay(gid);
    // }

    // /**支付**/
    // public sendPay(id: number) {
    //     var http = new HttpSender();
    //     let data = ProtocolHttp.send_z_Pay;
    //     data.param.goodsid = id;
    //     //微信支付
    //     data.param.pay_type = 1;
    //     http.send(data, this.onWxPay, this);
    // }

    // /**拉起微信客户端支付**/
    // private onWxPay(data) {
    //     if (!data.ret) {
    //         TipsLog.hallInfo("支付成功！");
    //     }
    // }
    // /**验证支付 */
    // public verificationPay(bill: string) {
    //     var http = new HttpSender();
    //     //http.send1(bill, this.onVerificationPay, this);
    // }
    // /**验证回调 */
    // private onVerificationPay(data) {
    //     if (!data.ret) {
    //         console.log("支付验证成功！");
    //     }
    // }

    // /**记录请求 */
    // public sendRecord() {
    //     var http = new HttpSender();
    //     let data = ProtocolHttp.GetScoreList;
    //     http.send(data, this.recRecord, this);
    // }

    // /**记录接收 */
    // public recRecord(data) {
    //     console.log("记录接收：", data);
    //     if (!data.ret) {
    //         if(data.ret == 301){
    //             App.PanelManager.open(PanelConst.RecordPanel, null, this, true, true, []);
    //         }else{
    //             App.PanelManager.open(PanelConst.RecordPanel, null, this, true, true, data.data);
    //         }
    //     } else {
    //         App.PanelManager.open(PanelConst.RecordPanel, null, this, true, true, []);
    //     }
    // }

    // /**个人信息请求 */
    // public sendUserinfo() {
    //     var http = new HttpSender();
    //     let data = ProtocolHttp.getUserInfo;
    //     http.send(data, this.recUserinfo, this);
    // }

    // /**个人接收 */ 
    // private recUserinfo(data) {
    //     console.log("个人信息接收：", data);
    //     if (!data.ret) {
    //         data.data.self = true;
    //         App.PanelManager.open(PanelConst.UserInfoPanel, null, this, true, true, data.data);
    //     } else {
    //         TipsLog.hallInfo(data.desc);
    //     }
    // }

    // /**根据ID获取商城图片 */
    // private getUrl(id: number): string {
    //     var urlStr = "";
    //     switch (id) {
    //         case 1:
    //             urlStr = "hall_one_card_png";
    //             break;
    //         case 2:
    //             urlStr = "hall_ten_card_png";
    //             break;
    //         case 3:
    //             urlStr = "hall_some_card_png";
    //             break;
    //         default:
    //             urlStr = "hall_some_card_png";
    //             break;
    //     }

    //     return urlStr;
    // }

    // //被邀请进入判断
    // private judgeInvite() {
    //     console.log("App.DataCenter.inviteFlag::"+App.DataCenter.inviteFlag);
    //     if (App.DataCenter.inviteFlag && App.DataCenter.inviteFlag != "") {
    //         var json = ProtocolData.Send101001;
    //         json.desk_code = parseInt(App.DataCenter.inviteFlag);
    //         json.deviceID = "111";
    //         json.userid = App.DataCenter.UserInfo.getMyUserVo().userID;
    //         App.gameSocket.send(ProtocolHead.Send101001, json);
    //     }
    //     App.DataCenter.inviteFlag = "";
    // }

    // //获取二维码URL
    // public getQrCode() {
    //     var http = new HttpSender();
    //     let data = ProtocolHttp.getQrCodeImg;
    //     http.send(data, this.revQrCode, this, false);
    // }

    // private revQrCode(data) {
    //     if (!data.ret){
    //         App.DataCenter.qrCodeUrl = data.data.url;
    //     }
    // }

    // private revOtherLogin() {
    //     App.gameSocket.close();
    //     var messageBoxB: MessageBox = App.MsgBoxManager.getBoxB();
    //     messageBoxB.showMsg("您的账号在其他设备登录，已与服务器断开连接。");
    // }

    // /**获取icon列表 */
    // public getIconUrl() {
    //     var http = new HttpSender();
    //     let data = ProtocolHttp.getIconUrl;
    //     http.send(data, this.revIcon, this, false);
    // }

    // private revIcon(data) {
    //     if (!data.ret) {
    //         var panel:LoginPanel =  App.PanelManager.open(PanelConst.LoginPanel,null,null,false,false,data.data);
    //     }
    // }
}