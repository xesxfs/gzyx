/**
 * Http协议
 * @author chen
 * @date 2018/03/19
 */
class ProtocolHttp {

    /**接收登录*/
    public static rev_z_login = {
        ret: 0,
        desc: "",
        data: {
            uid: 0,//	integer	用户ID
            nick_name: "",//	string	昵称
            sex: 0,//	integer	性别 1.man 2.woman
            avater_url: "",//	string	头像URL
            room_ticket: 0,//	integer	用户有多少张房卡(废弃)
            gold: 0,//integer	金币量
            diamonds: 0,//	integer	钻石量
            login_ip: "",//string	用户的IP地址
            win_board: 0,//integer	胜利场数
            lose_board: 0,//integer	失败场数
            pin_board: 0,//integer	平局场数
            skey: "",//	string	这是其它协议当Islogin为TRUE的时候必须传的一个参数
            paiwei_score: 0,//	integer	排位分
            paiwei_rank: 0,//integer	排位等级
            paiwei_rank_name: "",//string	等级名称
            is_first_time: 0,    //	integer	今天是否第一次登陆,1是-1不是
            vip_level: 0,    //	integer	VIP等级，0普通1白银2黄金
            vip_name: "",    //	string	VIP名称
            is_binding: 0,   //	integer	是否绑定了UID，0否1是
        }
    }


    /**账号登录*/
    public static send_z_login = {
        action: "Login",
        param: {
            user: "",
            password: ""
        }
    };


    /****注册 */
    public static send_z_regist = {
        action: "Register",
        param: {
            user: "",
            password: "",
            nick_name: "",
            ua: "",//手机型号
            code: "9527",
        }
    }


    /****注册 */
    public static rev_z_regist = {
        uid: 0,//	integer	用户ID，
        nick_name: "",//	string	昵称，
        sex: 0,//	integer	性别 1.man 2.woman，
        avater_url: "",//	string	头像URL，
        room_ticket: 0,//	integer	用户有多少张房卡(废弃) ，
        gold: 0,//	integer	金币量，
        diamonds: 0,//	integer	钻石量，
        login_ip: "",//	string	用户的IP地址，
        win_board: 0,//	integer	胜利场数，
        lose_board: 0,//	integer	失败场数，
        pin_board: 0,//	integer	平局场数，
        skey: "",//	string	这是其它协议当Islogin为TRUE的时候必须传的一个参数，
        login_type: 0,//	integer	登陆类型 1.手机用户 2.微信用户，
        paiwei_score: 0,//	integer	排位分，
        paiwei_rank: 0,//	integer	排位等级，
        paiwei_rank_name: "",//	string	，

    }

    /**刷新金币 */
    public static send_RefreshMoney = {
        action: "RefreshMoney",
        param: {
        }
    }

    public static rev_RefreshMoney = {
        uid: 0,//	integer	用户ID
        gold: 0,//	integer	金币量
        diamonds: 0,//	integer	钻石量
    }


    /**检查是否在游戏中 */
    public static send_CheckPlayerIfGame = {
        action: "CheckPlayerIfGame",
        param: {
        }
    }

    public static rev_CheckPlayerIfGame = {
        server_id: 0,   //	integer	服务器ID
        room_id: 0,  //	integer	房间ID    
        uid: 0,//	integer	用户ID
    }


    /**查询邮件列表 */
    public static send_MailList = {
        action: "MailList",
        param: {
        }
    }
    /***邮件信息 */
    public static mail_info = {
        id: 0,//	integer	邮件ID
        type: 0, //	integer	1普通邮件2领取附件邮件
        to_uid: 0,//	integer	这个邮件是系统发给谁的
        head: "",//	string	标题
        content: "",//	string	内容
        if_get: 0,//	integer	是否已经接受附件 0:没接收 1:接收了
        get_gold_num: 0,//	integer	附件金币量
        get_diamonds_num: 0,//	integer	附件钻石量
        get_time: "",//	string	用户接收时间
        create_time: "",//	string	邮件创建时间
    }

    public static rev_MailList = {
        mail_list: []
    }


    /***领取邮件的附件奖励 */
    public static send_ReadMail = {
        action: "ReadMail",
        param: {
            mail_id: 0
        }
    }

    public static rev_ReadMail = {
        mail_list: []
    }

    public static mail_detail = {
        gold: 0,//	integer	领取奖励之后的金币量
        diamonds: 0,//	integer	领取奖励之后的钻石量
    }

    /***获取房间列表 */
    public static send_ServerList = {
        action: "ServerList",
        param: {
        }
    }

    public static rev_ServerList = {
        server_list: [],
    }

    public static server_info = {
        server_flag: 0,  //	integer	房间类型
        server_name: "",    //	string	房间名称
        server_port: 0,  //	integer	连接端口
        server_ip: "",   //	string	房间IP
        websocket_port: 0,
        status: 0,  //	integer	服务器状态 1.正常运行 2.停止运行 3.运行错误
        player_num: 0,  //	integer	房间已有人数
        min_access: 0,  //	integer	最小金币数量
        max_access: 0,   //	integer	最大金币数量
        base_gold: 0,    //	integer	基础分
        tai_fee: 0,   //	integer	每玩一局的固定扣费
    }


    /**手动刷取浮动广播 */
    public static send_QueryNotice = {
        action: "QueryNotice",
        param: {
            period: 0
        }
    }

    public static rev_QueryNotice = {
        message_arr: [],
    }


    /***金币排行榜 */
    public static send_Rank = {
        action: "Rank",
        param: {
            period: 0
        }
    }

    public static rev_Rank = {
        data: [],
    }

    public static user_info = {
        uid: 0,//	integer	用户ID
        avater_url: 0,//	string	用户头像
        gold: 0,	//integer	金币数
        nick_name: 0,//	string	用户昵称

    }


    /**功能开关 */
    public static send_FuncSwitch = {
        action: "FuncSwitch",
        param: {

        }
    }

    public static rev_FuncSwitch = {
        func_arr: [],
    }

    public static func_info = {
        id: 0,//	integer	功能ID
        name: "",//	string	功能名称
        status: 0,//	integer	开关状态 1.开 0.关
    }


    /**钻石兑换金币 */
    public static send_BuyGold = {
        action: "BuyGold",
        param: {
            buy_id: 0
        }
    }

    public static rev_BuyGold = {
        cur_gold: 0,//	integer	当前金币
        cur_diamonds: 0,//	integer	当前钻石
    }


    /***钻石商品列表 */
    public static send_DiamondsMall = {
        action: "DiamondsMall",
        param: {
        }
    }

    public static rev_DiamondsMall = {
        diamonds_mall: []
    }

    public static diamonds_info = {
        id: 0,//	integer	商品ID
        name: "",//	string	商品名称
        hot_flag: 0,//	integer	是否热销的标记
        rmb: 0,//	人名币价值
        diamonds: 0,//	integer	钻石量
        give_num: 0,//	integer	赠送的钻石量
    }


    /***金币商品列表 */
    public static send_GoldMall = {
        action: "GoldMall",
        param: {
        }
    }

    public static rev_GoldMall = {
        gold_mall: [],
        uid: 0
    }

    public static gold_info = {
        id: 0,//	integer	商品ID
        name: "",//	string	商品名称
        hot_flag: 0,//	integer	是否热销的标记
        price: 0,//	integer	需要多少钻石才能购买
        gold: 0,//	integer	金币量
        give_num: 0,//	integer	赠送的金币量
    }


    /***日历表信息 */
    public static send_MonthlyCalendar = {
        action: "MonthlyCalendar",
        param: {
        }
    }

    public static rev_MonthlyCalendar = {
        today: "",//	string	今天的日期
        day: 0,//	integer	今天是几日
        year_month: "",//	string	XXXX年XX月
        month_all_days: 0,//	integer	本月总天数
        month_first_weekday: 0,//	integer	本月第一天是星期几
        sign_in: [],//	array<integer>	签到记录 1.签到 0.没签到 [1,0,1,1,1,1....(28-31个)]
        box_info: [],//	array<box_info>	签到宝箱领取记录
    }

    public static box_info = {
        id: 0,//	integer	签到多少天的宝箱
        get_flag: 0,//	integer	是否领取 0.没有 1.有
    }



    /***签到宝箱 */
    public static send_RewardBox = {
        action: "RewardBox",
        param: {
            box_id: 0
        }
    }

    public static rev_RewardBox = {
        add_gold: 0,//	integer	增加金币
        add_diamonds: 0,//	integer	增加钻石
        gold: 0,//	integer	当前金币
        diamonds: 0,//	integer	当前钻石
    }


    /***签到 */
    public static send_SignIn = {
        action: "SignIn",
        param: {

        }
    }
    public static rev_SignIn = {
        add_gold: 0//增加金币
    }


    /***兑换活动列表 */
    public static send_ExchangeActionList = {
        action: "ExchangeActionList",
        param: {
        }
    }

    public static rev_ExchangeActionList = {
        action_list: [],//	兑换活动列表
        uid: 0,//	integer	用户ID
    }



    /***兑换物品 */
    public static send_ExchangeItem = {
        action: "ExchangeItem",
        param: {
            uid: 0,//	integer	用户ID
            item_id: 0,//	integer	兑换活动里的哪一个物品
            action_id: 0,//	integer	兑换哪个活动的物品
        }
    }

    public static rev_ExchangeItem = {
        action_list: [],//	兑换活动列表
        uid: 0,//	integer	用户ID
    }


    /***完成任务 */
    public static send_FinishTask = {
        action: "FinishTask",
        param: {
            uid: 0,//	integer	用户ID
            task_id: 0,//	integer	用户准备完成哪个任务
            type: 0,//	integer	完成的任务类型 1每日任务 2充值任务
        }
    }

    public static rev_FinishTask = {
        task_info: [],//	任务完成信息
        uid: 0,//	integer	用户ID
    }

    public static task_info = {

    }

    /** 查询英雄令任务 */
    public static send_TaskList = {
        action: "TaskList",
        param: {
            uid: 0,
        }
    }

    public static rev_TaskList = {
        hero_count: 0, //	integer	用户拥有的英雄令个数
        uid: 0, //	integer	用户ID
        task_list: [] //	array<task_info>	每日任务列表
    }

    public static task_info3 = {
        task_id: 0, //	integer	任务ID
        task_name: "",//	string	任务名称
        limit: 0,//	integer	该任务每日可完成的次数
        unclaimed: 0,    //	integer	该任务可领取奖励的次数
        finished: 0, //	integer	该任务每日已经完成的次数
        begin_time: "", //	string	活动开始时间
        end_time: "",//	string	活动截止时间
        reward_list: [],//	array< reward_info > 获得的奖品列表
    }

    /** 充值任务列表 */
    public static send_RechargeTaskList = {
        action: "RechargeTaskList",
        param: {
            uid: 0,  //用户ID
        }
    }

    public static rev_RechargeTaskList = {
        lottery_count: 0, //	integer	用户拥有的转盘抽奖次数
        uid: 0,//	integer	用户ID
        lottery_item: 0, //	integer	转盘抽奖道具的物品ID
        item_rand: 0, //	integer	在转盘上的随机角度范围
        task_list: [],//	array< task_info > 任务列表
        item_rotate: [], //	array< rotate_info > 转盘停留角度列表
        recharge_num: 0, //	integer	用户在活动时间内充值了多少钱
    }

    public static task_info2 = {
        task_id: 0, //	integer	任务ID
        task_name: "", //	string	任务名称
        price: 0, //	integer	用户充值数量大于这个值时可以完成任务
        begin_time: "", //string	活动开始时间
        end_time: "",// string	活动截止时间
        reward_list: [],    //	array<reward_info> 获得的奖品列表
        is_finish: 0,//	integer	1.已经领取 2.等待领取 3.没资格领取
    }

    public static reward_info = {
        itemid: 0, //	integer	物品ID
        num: "",// string	获得的数量
    }

    /*** 获取物品列表 */
    public static send_GetItemList = {
        action: "GetItemList",
        param: {
        }
    }
    public static rev_GetItemList = {
        item_list: [],
    }

    public static item_info = {
        id: 0,//	integer	物品ID
        name: "",//	string	物品名称
        type: "",//	integer	物品类型 0系统道具1抽奖2金币道具3钻石道具4兑换码道具
        desc: "",//	string	物品详细描述
        icon_id: 0,//	integer	
    }



    /*** 查看背包物品 */
    public static send_ViewBag = {
        action: "ViewBag",
        param: {
            uid: 0
        }
    }
    public static rev_ViewBag = {
        uid: 0,//	integer	用户ID
        item_list: [],	//array<item_info>	游戏道具列表
        discount_list: [],//	array<discount_info>	优惠券列表
    }

    public static item_info2 = {
        id: 0,//	integer	物品ID
        type: 0,//	integer	物品类型(0系统道具1抽奖2金币道具3钻石道具4兑换码道具)(不可能是4)
        name: 0,//	integer	物品名称
        num: 0,//	integer	拥有个数
        reward: 0,//	integer	兑换价值 仅仅在type为2和3时有效 
    }

    public static discount_info = {
        id: 0,//	integer	优惠券ID
        item_id: 0,//	integer	物品类型ID
        type: "",//	string	物品类型(0系统道具1抽奖2金币道具3钻石道具4兑换码道具)(4没商量)
        name: 0,//	integer	物品名称
        sign: 0,//	integer	

    }

    /** 使用背包物品 */
    public static send_UseItem = {
        action: "UseItem",
        param: {
            uid: 0,//	integer	用户ID
            item_id: 0,//	integer	物品ID
        }
    }

    public static rev_UseItem = {
        uid: 0,  //	integer	用户ID
        type: 0, //	integer	物品类型(0系统道具1抽奖2金币道具3钻石道具4兑换码道具)(4和0不可以被使用)
        reward: 0,   //	integer	type为2和3时 使用道具获得的钱币数量
        reward_info: [],    //	object< reward_info > type为1时 抽奖结果

    }

    public static reward_info2 = {
        is_notice: 0,    //	integer	是否发送了全服广播
        id: 0,   //	integer	用户抽奖获得了什么物品1个
    }

    public static send_GetLuckyDraw = {
        action: "GetLuckyDraw",
        param: {}
    }

    public static rev_GetLuckyDraw = {
        uid: 0, //	integer	用户id
        lottery_count: 0,   //	integer	抽奖次数
        item_rand: 0,    //	integer	在转盘上的随机角度范围
        item_rotate: []  //	array<rotate_info>	转盘停留角度列表
    }

    public static rotate_info = {
        id: 0,  //	integer	奖品id
        rotate: 0    //	integer	如果抽到这个物品 转盘停留的角度 = rotate ± item_rand
    }

    /** 幸运大转盘抽奖 */
    public static send_HandleLuckyDraw = {
        action: "HandleLuckyDraw",
        param: {}
    }

    public static rev_HandleLuckyDraw = {
        uid: 0,  //	integer	用户id
        id: 0,  //	integer	奖品id
        desc: "",   //	string	奖品id
    }

    public static send_Announcement = {
        action: "Announcement",
        param: {
            mail_id: 0, //邮件ID
        }
    }

    public static rev_Announcement = {
        mail_list: [],  //	array<mail_info>	邮件列表
    }

    public static mall_info = {
        gold: 0, //	integer	领取奖励之后的金币量
        diamonds: 0, //	integer	领取奖励之后的钻石量
    }

    /** 加入房间 */
    public static send_AddRoom = {
        action: "AddRoom",
        param: {
            room_pwd: 0, //房间凭证(6位数字)
        }
    }

    public static rev_AddRoom = {
        room_id: 0,  //	integer	房间id
        server_id: 0,    //	integer	服务器id
    }

    // *********************************** 俱乐部http请求 ********************************************
    /** 修改俱乐部名称 */
    public static send_UpdateClubName = {
        action: "UpdateClubName",
        param: {
            name: "",    //	string	俱乐部名称	必须
            club_id: 0, //int	俱乐部id	必须
        }
    }

    /** 创建俱乐部 */
    public static send_CreateClub = {
        action: "CreateClub",
        param: {
            name: "",    //	string	俱乐部名称	必须
        }
    }

    /** 创建房间 */
    public static send_CreateRoom = {
        action: "CreateRoom",
        param: {
            club_id: 0,  //	integer	俱乐部id	必须
            player_num: 0,   //	integer	这个桌子可以坐多少人	必须
            use_cards: 0,    //	integer	为了开这个房间，使用了多少张房卡	必须
            board_choose: 0, //这个房间可以玩几圈	必须
        }
    }

    public static rev_CreateRoom = {
        result: 0,   //	integer	1:当前房卡数量不够 2.激活房间失败
        room_info: {},  //	object<room_info>	房间信息 当result=0时存在
    }

    public static room_info = {
        uid: 0,  //	integer	用户ID
        board: 0,    //	integer	这个房间能玩几局
        cost_ticket: 0,  //	integer	花了用户多少张房卡
        room_id: 0,  //	integer	房间ID
        room_pwd: "",    //	string	房间开启凭证
    }

    public static send_ServerDetail = {
        action: "ServerDetail",
        param: {
            id: 0,   //	integer	服务器ID 如果不为0 则只返回一个与对应的服务器
            game_flag: 0,    //	integer	服务器类型 如果id为0 则返回一个游戏类型为game_flag 而且压力最小的服务器地址
        }
    }

    public static rev_ServerDetail = {
        server_info: {},
    }

    /** 加入俱乐部房间 */
    public static send_AddClubRoom = {
        action: "AddClubRoom",
        param: {
            room_pwd: 0, //	integer	房间号(6位进入房间凭证)	必须
        }
    }

    public static rev_AddClubRoom = {
        room_id: 0,  //	integer	房间id
        server_id: 0,    //	integer	服务器id
        ticket_id: 0,    //	integer	房卡流水id
    }

    /** 处理加入俱乐部的请求 */
    public static send_HandleRequest = {
        action: "HandleRequest",
        param: {
            club_id: 0,  //	integer	俱乐部id	必须
            user_id: 0,  //	integer	申请加入的用户ID	必须
            status: 0,   //	integer	处理状态(1同意2不同意)	必须
        }
    }

    /** 查询俱乐部下所有的房间 */
    public static send_ClubRoomList = {
        action: "ClubRoomList",
        param: {
            club_id: 0,  //	integer	俱乐部id	必须
        }
    }

    public static rev_ClubRoomList = {
        room_list: [],
    }

    public static room_info2 = {
        id: 0,   //	integer	房间ID
        uid: 0,  //	integer	开房人
        clubid: 0,   //	integer	所属俱乐部ID
        service_id: 0,   //	integer	房间开在哪个服务器上
        desk_id: 0,  //	integer	房间开在哪个桌子上
        player_num: 0,   //	integer	这个桌子可以坐多少人
        board_choose: 0, //	integer	这个房间可以玩几圈
        use_cards: 0,    //	integer	为了开这个房间，使用了多少张房卡
        password: 0, //	integer	开房凭证
        status: 0,   //	integer	状态
        online_count: 0, //	integer	房间在线人数
        status_string: "",  //	string	状态转换的文字
        type: "",    //	string	类型
        special: "", //	string	特殊玩法
        user: {},    //	object	状态转换的文字
    }

    public static user_info2 = {
        id: 0,   //	integer	开房人ID
        nick_name: "",   //	string	昵称
        avater_url: "",  //	string	头像
    }

    /** 查询收到的俱乐部加入请求 */
    public static send_ClubRequest = {
        action: "ClubRequest",
        param: {
            club_id: 0,  //	integer	俱乐部id 为0则拉取所有的请求	必须
        }
    }

    public static rev_ClubRequest = {
        apply_list: []
    }

    public static apply_info = {
        id: 0,   //	integer	请求表id
        uid: 0,  //	integer	申请用户id
        clubid: 0,   //	integer	要申请的俱乐部id
        status: 0,   //	integer	申请后的处理状态
        desc: "",    //	string	申请描述
        create_time: "", //	string	申请时间
        user: {},
    }

    /** 查看某俱乐部成员列表 */
    public static send_ClubMembers = {
        action: "ClubMembers",
        param: {
            club_id: 0,  //	integer	俱乐部id	必须
        }
    }

    public static rev_ClubMembers = {
        list: [],       //俱乐部列表
        is_change: 0,    //1有变化0没变化
    }

    /** 查看的俱乐部列表 */
    public static send_ClubList = {
        action: "ClubList",
        param: {},
    }

    public static rev_ClubList = {
        club_list: [],
    }

    public static club_info = {
        id: 0,   //	integer	俱乐部id
        uid: 0,  //	integer	创建人uid
        name: "",    //	string	俱乐部名称
        create_time: "", //	string	创建俱乐部时间
        club_count: 0,   //	integer	俱乐部人数
        room_count: 0,   //	integer	俱乐部房间数
        user: {},   // object	创建人信息
    }

    /** 根据俱乐部id查找俱乐部 */
    public static send_CheckClub = {
        action: "CheckClub",
        param: {
            club_id: 0,  //	integer	俱乐部id	必须
        }
    }

    public static rev_CheckClub = {
        id: 0,   //	integer	俱乐部id
        uid: 0,  //	integer	创建人uid
        name: "",    //	string	俱乐部名称
        avater_url: "",  //	string	创建人头像
        create_time: "", //	string	创建俱乐部时间
    }

    /** 解散俱乐部 */
    public static send_DissolveClub = {
        action: "DissolveClub",
        param: {
            club_id: 0,	//integer	俱乐部id	必须
        }
    }

    /** 解散房间 */
    public static send_DissolutionRoom = {
        action: "DissolutionRoom",
        param: {
            id: 0,   //	integer	房间id	必须
        }
    }

    /** 加入俱乐部 */
    public static send_JoinInClub = {
        action: "JoinInClub",
        param: {
            club_id: 0,  //	integer	要加入的俱乐部id	必须
            desc: "",   // string	申请加入俱乐部描述	必须
        }
    }

    /** 退出俱乐部 */
    public static send_ExitClub = {
        action: "ExitClub",
        param: {
            club_id: 0,  //	integer	俱乐部id	必须
            user_id: 0,  //	integer	用户ID，如果存在则是踢别人，否则就是自己退出	可选
        }
    }

    /** 获取房卡列表 */
    public static send_TicketMall = {
        action: "TicketMall",
        param: {

        }
    }

    public static rev_TicketMall = {
        ticket_mall: [], //	array<ticket_info>	商品列表
        uid: 0,  //	integer	用户ID
    }

    public static tocket_info = {
        id: 0,   //	integer	商品ID
        name: "",    //	string	商品名称
        hot_flag: 0, //	integer	是否热销的标记
        price: 0,    //	integer	需要多少钻石才能购买
        num: 0,  //	integer	可以买多少张开房卡
    }

    /** 购买房卡 */
    public static send_BuyTicket = {
        action: "BuyTicket",
        param: {
            id: 0,   //	integer	需要兑换的道具ID
        }
    }

    public static rev_BuyTicket = {
        currentDiamonds: 0, //	integer	当前钻石
        currentRoomCards: 0, //	integer	当前房卡
    }

    /** 刷新快抢赛门票 */
    public static send_QuicklyGrabTicket = {
        action: "QuicklyGrabTicket",
        param: {

        }
    }

    public static rev_QuicklyGrabTicket = {
        grab_info: {},
    }

    public static grab_info = {
        total_charge_count: 0,   //	integer	总充值次数
        count: 0,    //	integer	快抢赛次数
        charge_count: 0, //	integer	今日已经充值的次数
        surplus_charge_count: 0, //	integer	今日剩余的充值次数
        next_recharge: 0,    //	integer	下次购买快抢赛所需的钻石数量, 如果返回-1证明今日已经不能购买了
    }

    /** 快抢赛列表 */
    public static send_QuicklyGrab = {
        action: "QuicklyGrab",
        param: {

        }
    }

    public static rev_QuicklyGrab = {
        match_infos: [],    //快抢赛事
    }

    public static match_info = {
        id: 0,   //	integer	id
        name: "",    //	string	快抢赛名称
        status: 0,   //	integer	快抢赛状态, 0禁用, 1待开始, 2已开始
        icon_url: "",   //	string	图片
        desc: "",    //	string	描述
        code_count: 0,  //	integer	生成码总数
        surplus_code_count: 0,   //	integer	生成码剩余数量
        start_time: "",  //	string	开始时间
        end_time: "",    //	string	结束时间
        create_time: "", //	string	创建时间
        expire_time: "", //	string	过期时间
    }

    /** 钻石兑换快抢赛基本次数 */
    public static send_ExchangeTicket = {
        action: "ExchangeTicket",
        param: {
            is_return: false,   //如果是会员并且是第二次购买,根据这个字段来是否返回购买前的提示,不传的话默认返回提示
        }
    }

    public static rev_ExchangeTicket = {
        exchange_info: {},
    }

    public static exchange_info = {
        front_count: 0,  //	integer	兑换前的快抢赛次数
        later_count: 0,  //	integer	兑换后的快抢赛次数
    }

    /** 获取最近获奖列表 */
    public static send_QuicklyGrabRecord = {
        action: "QuicklyGrabRecord",
        param: {
            length: 0,   //	integer	最近成功获得优惠券的返回记录数	不可空
        }
    }

    public static rev_QuicklyGrabRecord = {
        grab_record: [],
    }

    public static grab_record = {
        nickname: "",    //	string	用户昵称
        match_name: "",  //	string	快抢赛名称
    }

    public static send_ReadAccessoryMail = {
        action: "ReadAccessoryMail",
        param: {
            mail_id: 0,
        }
    }

    public static rev_ReadAccessoryMail = {
        // props: [],  // 领取返回的道具信息
    }

    public static prop_info = {
        icon_id: 0,  //	integer	道具icon
        name: "",    //	string	道具名称
        num: 0,  //	integer	道具数量
    }

    public static send_createFeedback = {
        action: "createFeedback",
        param: {
            title: "",   //	string	反馈标题
            content: "", //	string	反馈正文
        }
    }

    public static send_userBingDing = {
        action: "userBingDing",
        param: {
            bingding_uid: 0,
        }
    }
}