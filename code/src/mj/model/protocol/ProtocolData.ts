//游戏状态
enum State {
    STATE_READY = 0,
    STATE_MJ_FLASH = 1,
    STATE_DING_QUE = 2, //定缺
    STATE_PLAYING = 3,
    STATE_END = 4,
};
/**
 * Socket通讯协议
 * @author  chen
 * @date 2018/03/20
 */
class ProtocolData {

    /**测*/
    public static Send1 = {
        cmd: 1
    }

    /**心跳*/
    public static Send2 = {
        cmd: 2
    }

    /**常用语聊天*/
    public static Send3 = {
        cmd: 3,//	integer	协议ID
        type: 0,//	integer	消息类型 1、2.是预设的头像或消息 3.是用户自定义消息
        message: "",//	string	type=3时的自定义消息
        tag: 0,//	integer	type=1、2时的预设内容
    }

    /**常用语聊天应答*/
    public static Send4 = {
        cmd: 4,//	integer	协议ID
        uid: 0,//	integer	发送用户ID
        seatid: 0,//	integer	座位号
        roomid: 0,//	integer	房间号
        nick_name: "",//	integer	发送用户的昵称
        type: 0,//	integer	消息类型 1、2.是预设的头像或消息 3.是用户自定义消息
        message: "",//	string	type=3时的自定义消息
        tag: 0,//integer	type=1、2时的预设内容
    }

    /**开房*/
    public static Send101 = {
        cmd: 101,//	integer	协议ID
        uid: 0,//	integer	开房用户ID
        // board_choose: 0,//	integer	游戏局数
        // player_num: 0,//	integer	游戏有几个座位
        ticket_id: 0, //	integer	房卡消费流水ID
        password: 0, //	integer	开房间凭证
    }


    /**加入房间*/
    public static Send102 = {
        cmd: 102,//	integer	协议ID
        uid: 0,
        roomid: 0,//	integer	房间号就是100000~999999之间的随机密码
        match_id: 0,    //快抢赛号,只有快抢赛时有效
    }


    /**客户端发起解散房间*/
    public static Send103 = {
        cmd: 103
    }


    /** 客户端发送是否同意解散房间*/
    public static Send104 = {
        cmd: 104,//	integer	协议ID
        confirm: 0,//	integer	是否同意 1.同意 0.不同意
    }


    /** 广播某玩家的解散房间请求*/
    public static Rev201 = {
        cmd: 201,//	integer	协议ID
        init_uid: 0,//	integer	发起者用户的ID
        init_nick_name: "",//	string	发起者用户的昵称
        roomid: 0,//	integer	准备解散的房间号
    }


    /**广播某玩家是否同意解散房间*/
    public static Rev202 = {
        cmd: 202,//	integer	协议ID
        uid: 0,//integer	反馈用户的ID
        nick_name: "",//	string	反馈用户的昵称
        roomid: 0,//	integer	准备解散的房间号
        confirm: 0,//integer	是否同意 1.同意 0.不同意
    }


    /**广播解散房间结果*/
    public static Send203 = {
        cmd: 203,//	integer	协议ID
        result: 0,//	integer	解散结果 1.成功 0.失败
        roomid: 0,//	integer	准备解散的房间号
    }


    /**结束整个大牌局*/
    public static Rev204 = {
        cmd: 204,//	integer	协议ID
        board_choose: 0,//	integer	游戏局数
        end_board: 0,//	integer	玩了多少局
        time_str: "",//	string	时间字符串 YY-MM-DD HH:mm:ss
        players: [],//	array<player_info>	房间中所有用户的信息
    }

    public static player_info = {
        uid: 0,//	integer	用户的ID
        avater_url: "",//	string	用户头像
        nick_name: "",//	string	用户昵称
        zimo_times: 0,//	integer	自摸次数
        jiepao_times: 0,//	integer	接炮次数
        dianpao_times: 0,//	integer	点炮次数
        anggang_times: 0,//	integer	暗杠次数
        minggang_times: 0,//	integer	明杠次数
        score_arr: [],//	array<integer>	每一局的积分变化
        total_score: 0,//	integer	总积分变化
    }

    /**准备游戏*/
    public static Send1001 = {
        cmd: 1001
    }


    /**碰*/
    public static Send1002 = {
        cmd: 1002,
        uid: 0,
    }

    /**暗杠*/
    public static Send1003 = {
        cmd: 1003,
        uid: 0,
        angang_mj: 0,
    }


    /**明杠*/
    public static Send1004 = {
        cmd: 1004,
        uid: 0,
        ming_gang_mj: 0
    }


    /**放杠*/
    public static Send1005 = {
        cmd: 1005,
        uid: 0,
    }


    /**出牌*/
    public static Send1006 = {
        cmd: 1006,
        uid: 0,
        out_mj: 0
    }


    /** PASS别人打的牌*/
    public static Send1007 = {
        cmd: 1007,
        uid: 0,
    }


    /** PASS自己摸得牌*/
    public static Send1008 = {
        cmd: 1008,
        uid: 0,
    }



    /** 自摸胡*/
    public static Send1009 = {
        cmd: 1009,
        uid: 0,
    }

    /** 放炮胡*/
    public static Send1010 = {
        cmd: 1010,
        uid: 0,
    }


    /** 抢杠胡*/
    public static Send1011 = {
        cmd: 1011,
        uid: 0,
        opt: 0//	integer	1.选择抢杠胡 0.拒绝抢杠胡
    }


    /** 定缺请求*/
    public static Send1012 = {
        cmd: 1012,
        uid: 0,
        dq_val: 0//	integer	定缺 1.万 3.条 5.筒
    }


    /** 报听请求*/
    public static Send1013 = {
        cmd: 1013,
        uid: 0,
        ting_out_mj: 0//	integer	选择听哪个牌
    }


    /** 请求退出房间*/
    public static Send1051 = {
        cmd: 1051,
    }

    /** 取消托管操作*/
    public static Send1052 = {
        cmd: 1052,

    }

    /** 机器人自动出一张牌*/
    public static Send1053 = {
        cmd: 1053,
        uid: 0,
    }
    /*****************游戏逻辑玩法基本应答指令******************** */
    /** 进入房间成功*/
    public static Rev2001 = {
        cmd: 2001,
        uid: 0,
        game_flag: 0,//	integer	游戏类型 1.开房 2XX.排位 1XX.金币场
        roomid: 0,//	integer	房间号
        board_choose: 0,//	integer	这个房间可以玩多少局
        seatid: 0,//	integer	座位号
        player_num: 0,//	integer	这个房间有多少座位
        gold: 0,//	integer	用户有多少金币
    }

    /** 房间信息，当有用户加入房间时进行广播*/
    public static Rev2002 = {
        cmd: 2002,//	integer	协议ID

        game_flag: 0,//	integer	游戏类型 1.开房 2XX.排位 1XX.金币场
        roomid: 0,//	integer	房间号
        board_choose: 0,//	integer	这个房间可以玩多少局
        rest_board: 0,//	integer	这个房间剩余可以玩多少局
        player_num: 0,//	integer	这个房间有多少座位
        base_gold: 0,//	integer	基础倍数 适用game_flag为金币场时
        min_access_gold: 0,//	integer	最少可玩金币数 适用game_flag为金币场时
        max_access_gold: 0,//integer	最多可玩金币数 适用game_flag为金币场时
        tai_fee: 0,//integer	税收 适用game_flag为金币场时
        players: [],//	array<player_info>	房间中所有用户的信息
    }

    public static player_info2 = {
        login_ip: "",
        uid: 0,//integer	用户的ID
        seatid: 0,//	integer	座位ID
        avater_url: "",//	string	用户头像
        nick_name: "",//	string	用户昵称
        sex: 0,//	integer	性别 1.男 0.女
        gold: 0,//	integer	黄金
        diamonds: 0,//	integer	钻石
        status: 0,//	integer	用户状态 1.可用
        online: 0,//	integer	是否在线 1.在 0.不在
        paiwei_score: 0,//	integer	排位分
        score: 0,//	integer	游戏得分

    }

    /** 开始游戏*/
    public static Rev2003 = {
        cmd: 2003,//	integer	协议ID
        banker_seatid: 0,//	integer	庄家所在座位
        roomid: 0,//	integer	房间号
        rest_mjs: 0,//	integer	牌堆中有多少麻将
        rest_board: 0,//	integer	这个房间剩余可以玩多少局
        dice: [],//	array<integer>	两个骰子
        players: [],//	array<player_info>	房间中所有用户的信息
    }

    public static player_info3 = {
        uid: 0,//	integer	用户的ID
        seatid: 0,//	integer	座位ID
        gold: 0,//	integer	黄金
        diamonds: 0,//	integer	钻石
        hole_mjs: [],//	array<integer>	手牌
    }


    /** 广播玩家游戏准备，有用户准备时进行广播*/
    public static Rev2004 = {
        cmd: 2004,//	integer	协议ID
        uid: 0,//integer	用户的ID
        seatid: 0,//	integer	哪个座位准备好了
        roomid: 0,//	integer	房间号
    }


    /** 玩家自动从公牌中摸取一张麻将牌广播*/
    public static Rev2005 = {
        cmd: 2005,//	integer	协议ID
        uid: 0,//	integer	用户的ID
        seatid: 0,//	integer	哪个座位打出的牌
        roomid: 0,//	integer	房间号
        rest_mjs: 0,//	integer	桌面还有多少空闲牌
        mj: 0,//	integer	打出了哪一张牌
        mo_type: 0,//	integer	摸牌方式 0.正常摸 1.杠牌从最后摸
    }


    /** 玩家打出一张麻将牌对所有人广播*/
    public static Rev2006 = {
        cmd: 2006,//	integer	协议ID
        uid: 0,//integer	用户的ID
        seatid: 0,//	integer	哪个座位打出的牌
        roomid: 0,//	integer	房间号
        out_mj: 0,//	integer	打出了哪一张牌
        mjs_info: {},//	object<player_mj_info>	出牌用户的所有牌(有危险)
    }


    /** 玩家摸取麻将牌后自己的可操作提示板*/
    public static Rev2007 = {
        cmd: 2007,//	integer	协议ID
        uid: 0,//integer	用户的ID
        seatid: 0,//	integer	哪个座位打出的牌
        roomid: 0,//	integer	房间号
        ming_gang_flag: 0,//	integer	是否可以明杠 1.可 0.不可
        getin_mj: 0,//	integer	当前这个用户摸了那个牌
        an_gang_flag: 0,//	integer	是否可以暗杠 1.可 0.不可
        zi_mo_hu_flag: 0,//	integer	是否可以自摸 1.可 0.不可
        //  ting_flag: 0,//integer	是否可以听牌 1.可以 0.不可以
        //  an_gang_mj_choose: [],//	array<integer>	有哪些暗杠牌可以选择 当an_gang_flag=1时有效
        // ting_mj_choose: [],//	array<integer>	有哪些听牌可以选择 当ting_flag=1时有效
    }
    /***广播解散房间结果 */
    public static Rev203 = {
        cmd: 203,
        result: 0,   //	integer	解散结果 1.成功 0.失败
        roomid: 0,   //	integer	准备解散的房间号
        ticket_id: 0,    //	integer	房间流水号 当可以解散的时候才会有这个字段
        uid: 0,  //	integer	这个房间的主人
    }

    /** 玩家打出一张麻将牌后的其他玩家可操作提示板*/
    public static Rev2008 = {
        cmd: 2008,//	integer	协议ID
        uid: 0,//integer	用户的ID
        seatid: 0,//	integer	哪个座位打出的牌
        roomid: 0,//	integer	房间号
        fang_pao_hu_flag: 0,//	integer	可不可以放炮胡 1.可 0.不可
        fang_gang_flag: 0,//	integer	可不可以放杠 1.可 0.不可
        peng_flag: 0,//	integer	是否可以碰 1.可 0.不可
    }

    /** 玩家碰牌后可操作提示*/
    public static Rev2009 = {
        cmd: 2009,//	integer	协议ID
        uid: 0,//integer	用户的ID
        seatid: 0,//	integer	哪个座位打出的牌
        roomid: 0,//	integer	房间号
        an_gang_flag: 0,//	integer	是否可以暗杠 1.可 0.不可
        an_gang_mj_choose: [],//	array<integer>	有哪些暗杠牌可以选择 当an_gang_flag=1时有效
    }

    /** 玩家明杠时发送是否可抢杠胡操作提示*/
    public static Rev2010 = {
        cmd: 2010,//	integer	协议ID
        uid: 0,//	integer	用户的ID
        seatid: 0,//	integer	哪个座位打出的牌
        roomid: 0,//	integer	房间号
        qgh_mj: 0,//	integer	可以抢杠胡哪张牌
    }


    /** PASS别人打的牌，通知PASS的人成功的PASS了*/
    public static Rev2011 = {
        cmd: 2011,//	integer	协议ID
        uid: 0,//integer	用户的ID
        seatid: 0,//	integer	座位ID
        roomid: 0,//	integer	房间号
    }

    /** 有人碰牌的全房间广播*/
    public static Rev2012 = {
        cmd: 2012,//	integer	协议ID
        uid: 0,//integer	用户的ID
        seatid: 0,//	integer	碰牌的座位ID
        roomid: 0,//	integer	房间号
        mj: 0,//	integer	碰了哪个麻将
        from_seatid: 0,//	integer	被碰牌的座位ID
        mjs_info: {},//	object<player_mj_info>	碰牌用户的所有牌(有危险)
    }


    /** 有人暗杠的全房间广播*/
    public static Rev2013 = {
        cmd: 2013,//	integer	协议ID
        uid: 0,//integer	用户的ID
        seatid: 0,//integer	暗杠的座位ID
        roomid: 0,//	integer	房间号
        mj: 0,//integer	暗杠了哪个麻将
        mjs_info: {},//	object<player_mj_info>	暗杠用户的所有牌(有危险
    }


    /** 明杠*/
    public static Rev2014 = {
        cmd: 2014,//	integer	协议ID
        uid: 0,//integer	用户的ID
        seatid: 0,//	integer	明杠的座位ID
        roomid: 0,//	integer	房间号
        mj: 0,//integer	明杠了哪个麻将
        mjs_info: {},//	object<player_mj_info>	明杠用户的所有牌(有危险)
    }


    /** 有人放杠的全房间广播*/
    public static Rev2015 = {
        cmd: 2015,//	integer	协议ID
        uid: 0,//	
        seatid: 0,//	integer	明杠的座位ID
        roomid: 0,//	integer	房间号
        mj: 0,//	integer	明杠了哪个麻将
        from_seatid: 0,//	integer	被放杠的座位ID
        mjs_info: {},//	object<player_mj_info>	明杠用户的所有牌(有危险
    }


    /** 有人自摸胡的全房间广播*/
    public static Rev2016 = {
        cmd: 2016,//	integer	协议ID
        uid: 0,//	
        seatid: 0,//		integer	自摸胡的座位ID
        roomid: 0,//		integer	房间号
        mjs_info: {},//		object<player_mj_info>	自摸胡用户的所有牌(有危险)
    }



    /** 接炮胡*/
    public static Rev2017 = {
        cmd: 2017,//	integer	协议ID
        uid: 0,//
        seatid: 0,//	integer	接炮胡的座位ID
        roomid: 0,//	integer	房间号
        mj: 0,//	integer	接炮胡了哪个麻将
        from_seatid: 0,//	integer	被接炮胡的座位ID
        mjs_info: {},//	object<player_mj_info>	接炮胡用户的所有牌(有危险)	
    }

    /** 玩家抢杠胡*/
    public static Rev2018 = {
        cmd: 2018,//	integer	协议ID
        uid: 0,//	
        seatid: 0,//	integer	抢杠胡的座位ID
        roomid: 0,//	integer	房间号
        mj: 0,//	integer	抢杠胡了哪个麻将
        mjs_info: {},//	object<player_mj_info>	抢杠胡用户的所有牌(有危险)
    }

    /** 游戏进入下一局开始准备阶段的全房间广播*/
    public static Rev2019 = {
        cmd: 2004,   //	integer	协议ID
        roomid: 0,   //	integer	房间号
    }


    /** 游戏结束结算广播*/
    public static Rev2020 = {
        cmd: 2020,//	integer	协议ID
        roomid: 0,//	integer	房间号
        board_choose: 0,//	integer	可以玩几局
        player_num: 0,//	integer	一桌几个玩家
        cur_board: 0,//	integer	当前是第几局
        time_str: 0,//	string	时间字符串
        end_type: 0,//	integer	游戏结束类型 1自摸 2放炮 3抢杠胡 4荒庄
        fangpaiji_mj: 0,//	integer	番牌鸡牌
        fangpaiji_mj_next: 0,//	integer	番牌鸡牌的下一张牌
        game_flag: 0,//	integer	游戏类型 1.开房 2XX.排位 1XX.金币场
        base_gold: 0,//	integer	当是金币场的基础分
        players: [],//	array<player_result_info>	所有用户结算结果
    }

    public static player_result_info = {
        uid: 0,//integer	用户ID
        nick_name: "",//string	昵称
        avater_url: "",//	string	头像URL
        seatid: 0,//	integer	座位ID
        jiaopai_flag: 0,//	integer	是否叫牌 1.是 0.否
        cur_gang_score: 0,//	integer	本局杠分
        cur_angang_score: 0,//	integer	本局暗杠分
        cur_minggang_score: 0,//integer	本局明杠分
        cur_fanggang_score: 0,//integer	本局放杠分
        cur_fangpaiji_score: 0,//integer	番牌鸡得分
        cur_gudingji_score: 0,//integer	固定鸡得分
        cur_chongfengji_score: 0,//	integer	冲锋鸡得分
        cur_zherengji_score: 0,//integer	责任鸡得分
        cur_cardtype_score: 0,//	integer	当前最大的牌型输赢分数
        cur_add_paiwei_score: 0,//	integer	要增加的排位分
        cur_winlose_score: 0,//integer	输赢的分数
        score: 0,//integer	积分
        cur_end_flag: 0,//	integer	0平，1输，2赢，3屁胡
        cur_pao_flag: 0,//	integer	本局放炮还是自摸，0初始值, 1点炮玩家，2接炮玩家，3自摸玩家，4包胡玩家
        card_type: 0,//integer<CARD_TYPE>	用户获胜的最大牌型
        fangpaiji_num: 0,//	integer	番牌鸡算分基数
        gudingji_num_hole: 0,//	integer	手上的固定鸡 算分基数
        gudingji_num_out: 0,//	integer	打出去的固定鸡 算分基数
        chongfengji_num: 0,//integer	冲锋鸡 算分基数
        gold: 0,//integer	黄金数量
        diamonds: 0,//	integer	钻石数量
        paiwei_score: 0,//	integer	排位分数
        if_banker: 0,//integer	是不是庄家 1.是 0.否
        hole_mjs: [],
        out_mjs: [],
        //并入	: 0,//<player_mj_info>	用户的所有牌(有危险)
    }


    /** 某用户重连，把之前所有信息告诉他*/
    public static Rev2021 = {
        cmd: 2021,//integer	协议ID
        uid: 0,//integer	用户ID
        seatid: 0,//integer	座位ID
        room_pwd: 0,//	integer	房间号
        state: State,//integer<STATE>	用户重连时的游戏状态
        do_dissolution: 0,//integer	是否同意解散房间 1.同意 0.不同意
        board_choose: 0,//	integer	房间可玩局数
        rest_board: 0,//	integer	还剩多少局可以玩
        player_num: 0,//	integer	这一桌可以坐多少人
        gang_mo_cnt: 0,//integer	牌堆最后被杠牌摸掉的牌数量
        rest_mjs: 0,//integer	牌堆有多少牌
        game_flag: 0,//integer	游戏类型 1.开房 2XX.排位 1XX.金币场
        base_gold: 0,//integer	基础分倍数
        chongfengji_seatid: 0,//	integer	冲锋鸡所在位置 -1.还没有冲锋鸡 state=3时有效
        banker_seatid: 0,//	integer	庄家的座位 state>0时有效
        dice: [],//	array	两颗骰子的点数 state>0时有效
        //base_gold	: 0,//integer	基础分倍数 state>0时有效
        players: [],//	array<player_info>	所有用户信息
        cur_seat: 0,//当前出牌的位置
    }

    public static player_info4 = {
        uid: 0,//	integer	用户ID
        nick_name: "",//	string	昵称
        avater_url: "",//	string	头像URL
        seatid: 0,//	integer	座位ID
        login_ip: "",//	string	用户IP
        score: 0,//integer	游戏得分
        sex: 0,//integer	性别 1.男 0.女
        gold: 0,//integer	黄金数量
        form_mjs: [],
        hole_mjs: [],   //手牌
        out_mjs: [],    //打出去的牌
        diamonds: 0,//	integer	钻石数量
        status: 0,//	integer	玩家状态标志 0未准备 1准备 2游戏中没轮到操作 3游戏中轮到操作未操作 4游戏中轮到操作已经操作(已经打出牌了)
        online: 0,//	integer	1.在线 0.离线
        agree_dissroom: 0,//	integer	是否同意解散房间， 0,未确认 1 发起者 2 同意 3 不同意
        dq_val: 0,//	integer	定缺的花色
        cur_baoting_flag: 0,//	integer	是否报听 0未报听，1天听，2地听
        robot_opt: 0,//integer	是不是机器人在操作 1.机器人 0.正常
        paiwei_score: 0,//	integer	排位分数
        //并入: 0,//	<player_mj_info>	用户的所有牌(有危险)
    }

    /** 返回错误信息*/
    public static Rev2022 = {
        cmd: 2022,//integer	协议ID
        err: 0,//integer	错误号
        err_msg: "",//string	错误信息
    }

    /** 进入定缺阶段广播*/
    public static Rev2023 = {
        cmd: 2023,//	integer	协议ID
        roomid: 0,//	
    }


    /** 发送定缺成功广播*/
    public static Rev2024 = {
        cmd: 2024,//	integer	协议ID
        uid: 0,//	integer	用户ID
        seatid: 0,//integer	座位号
        roomid: 0,//	integer	房间号
        dq_val: 0,//	integer	定缺的花色	
    }

    /** 冲锋鸡广播*/
    public static Rev2025 = {
        cmd: 2025,//	integer	协议ID
        uid: 0,//integer	用户ID
        seatid: 0,//integer	座位号	
    }

    /** 报听成功广播*/
    public static Rev2026 = {
        cmd: 2026,//	integer	协议ID
        uid: 0,//
        seatid: 0,//	integer	座位号
        roomid: 0,//integer	房间号
        mjs_info: {},//	object<player_mj_info>	用户的所有牌(有危险)		
    }

    /** 责任鸡广播*/
    public static Rev2027 = {
        cmd: 2027,//integer	协议ID
        uid: 0,//integer	用户ID
        seatid: 0,//	integer	座位号
        zherenji_from_uid: 0,//	integer	放责任鸡的用户ID
        zherenji_from_seatid: 0,//	integer	放责任鸡的座位号
    }

    /** 给旧连接发送，在其他设备登陆*/
    public static Rev2028 = {
        cmd: 2028,//integer	协议ID
        uid: 0,//integer	用户ID
    }

    /** 退出房间*/
    public static Rev2038 = {
        cmd: 2038,//integer	协议ID
        uid: 0,//integer	用户ID
        seatid: 0,//	integer	座位号
        type: 0,//integer	退出类型 1.不存在这个用户 2.用户没钱了
    }

    /** 玩家自动开启托管广播*/
    public static Rev2039 = {
        cmd: 2039,//integer	协议ID
        uid: 0,//integer	用户ID
        seatid: 0,//	integer	座位号
        roomid: 0,//integer	房间ID
    }


    /** 取消托管操作广播*/
    public static Rev2040 = {
        cmd: 2040,//integer	协议ID
        uid: 0,//integer	用户ID
        seatid: 0,//	integer	座位号
        roomid: 0,//integer	房间ID
    }
    /***用户牌型 */
    public static player_mj_info = {
        hole_mjs: [],//	array<integer>	手牌列表
        out_mjs: [],//array<integer>	打出来在桌面上的牌
        form_mjs: [],//	array<form_info>	成型牌列表
    }

    public static form_info = {
        u_type: [],//	integer<ZU_TYPE>	成型牌的类型
        from_seat: [],//integer	这个牌是吃哪个座位的
        zu_mjs: [],//array<integer>	这个组里面有哪些牌
    }


    /** 所有玩家定缺完成*/
    public static Rev2041 = {
        cmd: 2041,//integer	协议ID
        players: []	//array<player_info>	用户信息
    }

    public static player_info5 = {
        uid: 0,//integer	用户ID
        seatid: 0,//	integer	座位号
        dq_val: 0,//	integer	定缺花色
    }
}
//成型牌的类型
enum ZU_TYPE {
    PENG = 0,       //碰
    FANG_GANG = 1,  //放杠
    MING_GANG = 2,  //明杠
    ANG_GANG = 3,  //暗杠
};
//胡牌类型
enum CARD_TYPE {
    CARD_TYPE_ERROR = 0,     //无牌型
    CARD_TYPE_PINGHU = 1,   //平胡，1
    CARD_TYPE_DADUIZI = 2,   //大对子 (碰碰胡)，5
    CARD_TYPE_QIDUI = 3,   //七对   (七小对)，10
    CARD_TYPE_QINGYISE = 4,  //清一色 ，10
    CARD_TYPE_DANDIAO = 5,   //单调，10	
    CARD_TYPE_DI_TING = 6, //地听，10	
    CARD_TYPE_QINGDADUI = 7, //清大对 (清一色碰碰胡)，15		
    CARD_TYPE_DANDIAOQINGYISE = 8, //单调清一色，20
    CARD_TYPE_TIAN_TING = 9,//天听，20
    CARD_TYPE_LONGQIDUI = 10, //龙七对 (豪华七对)，20
    CARD_TYPE_QINGQIDUI = 11, //清七对 (清一色七小对)，20
    CARD_TYPE_TIANHU = 12, //天胡，20
    CARD_TYPE_DIHU = 13, //地胡，20
    CARD_TYPE_SHA_BAO = 14, //杀报 
    CARD_TYPE_QINGLONGBEI = 15, //清龙背 (清一色 豪华七对)，30
};

//胡牌分数
enum card_type_score {
    CARD_TYPE_PINGHU = 1,
    CARD_TYPE_DADUIZI = 5,
    CARD_TYPE_QIDUI = 10,
    CARD_TYPE_LONGQIDUI = 20,
    CARD_TYPE_QINGYISE = 10,
    CARD_TYPE_QINGDADUI = 15,
    CARD_TYPE_QINGQIDUI = 20,
    CARD_TYPE_QINGLONGBEI = 30,
    CARD_TYPE_DANDIAO = 10,
    CARD_TYPE_DANDIAOQINGYISE = 20,
    CARD_TYPE_TIANHU = 20,
    CARD_TYPE_DIHU = 20,
    CARD_TYPE_TIAN_TING = 20,
    CARD_TYPE_DI_TING = 10
}











