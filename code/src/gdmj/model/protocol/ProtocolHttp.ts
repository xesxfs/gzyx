/**
 * Http协议
 * @author chen
 * @date 2016/11/17
 */
class ProtocolHttp {

    /**接收登录*/
    public static rev_z_login = {
        ret:0,
        desc:"",
        data:{
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
        if_game: 0,//	integer	用户是否在房间中 0：不在 else：房间ID
        uid: 0,//	integer	
    }


    /**检查是否在游戏中 */
    public static send_MailList = {
        action: "MailList",
        param: {
        }
    }
    /***邮件信息 */
    public static mail_info = {
        id: 0,//	integer	邮件ID
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
        server_flag: 0,//	integer	房间类型
        server_name: "",//	string	房间名称
        server_port: 0,//	integer	连接端口
        player_num: 0,//	integer	房间已有人数
        min_access: 0,//	integer	最小金币数量
        max_access: 0,//	integer	最大金币数量
        base_gold: 0,//	integer	基础分
        tai_fee: 0,//	integer	每玩一局的固定扣费
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



    /*** 获取物品列表 */
    public static send_GetItemList = {
        action: "GetItemList",
        param: {
        }
    }
    public static rev_GetItemList = {
        item_list: [],//	任务完成信息
    }

    public static item_info = {
        id: 0,//	integer	物品ID
        name: "",//	string	物品名称
        type: "",//	integer	物品类型 0系统道具1抽奖2金币道具3钻石道具4兑换码道具
        desc: "",//	string	物品详细描述
        icon_id: 0,//	integer	
    }



    /*** 获取物品列表 */
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


}