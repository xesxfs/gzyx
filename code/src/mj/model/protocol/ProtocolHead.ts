/**
 * Socket通讯协议头
 * @author chen
 * @date 2018/03/21
 */
 module  ProtocolHead {

    export enum mjcode {
        W1 = 11, W2, W3, W4, W5, W6, W7, W8, W9, // 1~9 万
        S1 = 31, S2, S3, S4, S5, S6, S7, S8, S9, // 1~9 条(索)ííí
        T1 = 51, T2, T3, T4, T5, T6, T7, T8, T9, // 1~9 筒(饼)
        Zh = 71, Fa = 81, Ba = 91              // 中, 发, 白
    };
    //基本系统指令
   export enum system_command {
        SYS_ECHO = 1, //测试指令
        HEART_BEAT = 2, //心跳(客户端根据服务端的返回测试网络情况)
        CLIENT_NOLMAL_CHART_REQ = 3, //常用语聊天请求    
        SERVER_NOLMAL_CHAT_BC = 4, //常用语聊天应答    
        CLIENT_SPEAK_REQ = 5, //语音功能请求
        SERVER_SPEAK_BC = 6, //语音功能应答
    };

    //只和开房模式玩法相关的指令
    export enum open_room_type_command {

        CLIENT_OPEN_ROOM_REQ = 101, //开房    
        CLIENT_JOIN_ROOM_REQ = 102, //输入开房密码加入房间    
        CLIENT_DISSOLUTION_ROOM_REQ = 103, //客户端发起解散房间
        CLIENT_DISSOLUTION_ROOM_CONFIRM = 104, //客户端发送是否同意解散房间
        SERVER_DISSOLUTION_ROOM_REQ_BC = 201, //广播某玩家的解散房间请求
        SERVER_DISSOLUTION_ROOM_CONFIRM_BC = 202, //广播某玩家是否同意解散房间
        SERVER_DISSOLUTION_ROOM_RESULT_BC = 203, //广播解散房间结果
        SERVER_GAME_ALL_END_BC = 204, //结束整个大牌局        
    };


    //游戏逻辑玩法基本请求指令
    export enum client_command {
        CLIENT_READY_REQ = 1001, //准备游戏
        CLIENT_PENG_REQ = 1002, //碰
        CLIENT_ANG_GANG_REQ = 1003, //暗杠
        CLIENT_MING_GANG_REQ = 1004, //明杠    
        CLIENT_FANG_GANG_REQ = 1005, //放杠
        CLIENT_OUT_MJ_REQ = 1006, //出牌
        CLIENT_PASS_REQ = 1007, //PASS别人打的牌    
        CLIENT_PASS2_REQ = 1008, //自己摸得牌，可以暗杠或者自摸胡，点击了过PASS 
        CLIENT_ZIMO_HU_REQ = 1009, //自摸胡    
        CLIENT_FANG_PAO_HU_REQ = 1010, //放炮胡
        CLIENT_QIANG_GANG_HU_REQ = 1011, //抢杠胡
        CLIENT_DING_QUE_REQ = 1012, //定缺请求(两人场，三人场有)
        CLIENT_BAO_TING_REQ = 1013, //报听请求  
        //金币场请求退出房间
        CLIENT_GOLDROOM_LOGOUT_ROOM = 1051, //请求退出房间
        CLIENT_CANCEL_ROBOT_OP_REQ = 1052, //取消托管操作
        CLIENT_ROBOT_AUTO_OUT_MJ_REQ = 1053, //机器人自动出一张牌
    };
    //游戏逻辑玩法基本应答指令  
    export enum server_command {
        SERVER_ENTER_ROOM_UC = 2001,//进入房间成功
        SERVER_ROOM_INFO_BC = 2002,//房间信息
        SERVER_GAME_START_BC = 2003,//开始游戏    
        SERVER_READY_BC = 2004,//广播玩家游戏准备
        SERVER_GET_ONE_MJ = 2005,//玩家自动从公牌中摸取一张麻将牌广播
        SERVER_OUT_ONE_MJ = 2006,//玩家打出一张麻将牌单播
        SERVER_OPERATE_CHECK_AFTER_GETIN_MJ = 2007, //玩家摸取麻将牌后，自己的可操作提示板 //自摸胡，亮牌，暗杠，蓄杠，过
        SERVER_OPERATE_CHECK_OTHERS_PUTOUT_MJ = 2008, //玩家打出一张麻将牌后的其他玩家可操作提示板 //点炮胡，碰，明杠，过
        SERVER_OPERATE_CHECK_AFTER_PENG = 2009, //玩家碰牌后，可操作提示 //是否能亮牌，否则出牌, 过
        SERVER_OPERATE_CHECK_QIANG_GANG_HU = 2010, //玩家明杠时，检测其他玩家如果可以抢杠胡，发送可操作提示 // 胡，过
        SERVER_PASS = 2011,//PASS别人打的牌   
        SERVER_PENG = 2012,//碰
        SERVER_ANGGANG = 2013,//暗杠
        SERVER_MINGGANG = 2014,//明杠    
        SERVER_FANG_GANG = 2015,//放杠
        SERVER_ZIMOHU = 2016, //自摸胡
        SERVER_FANG_PAO_HU = 2017, //接炮胡    
        SERVER_QIANG_GANG_HU = 2018, //玩家抢杠胡
        SERVER_GAME_READY_STAGE_BC = 2019, //游戏进入下一局开始准备阶段
        SERVER_GAME_END_BC = 2020, //游戏结束结算广播    
        SERVER_REBIND_UC = 2021, //重连    
        SERVER_ERROR_UC = 2022, //返回错误信息
        SERVER_DINGQUE_STARGE_BC = 2023, //进入定缺阶段广播
        SERVER_DINGQUE_SUCC_BC = 2024, //发送定缺成功广播
        SERVER_CHONG_FENG_JI_BC = 2025, //冲锋鸡广播
        SERVER_BAO_TING_SUCC_BC = 2026, //报听成功。
        SERVER_ZHE_REN_JI_BC = 2027, //责任鸡广播
        SERVER_LOGIN_OTHER_DEVICE = 2028, //在其他设备登陆
        SERVER_GOLDROOM_LOGOUT_ROOM = 2038, //退出房间
        SERVER_BEGIN_ROBOT_OP_BC = 2039, //玩家自动开启托管广播
        SERVER_CANCEL_ROBOT_OP_SUCC_BC = 2040, //取消托管操作
        SERVER_ALL_DIN_QUE_SUCC_BC = 2041, // 所有玩家定缺完成
    };
}