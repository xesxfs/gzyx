/**
 * 游戏数据
 * @author chen
 * @date 2016/6/29
 */
class GameInfo {
    /***当前游戏模式 */
    public static curGameType: GAME_TYPE;
    /***是否重连 */
    public static isReConnection: boolean = false;

    public static curRoomNo: number;

    public static curRoomId: number;
    /***重连数据 */
    public static reBuildData: any;
    /***玩家数量 */
    public static playerNumber: number = 4;
    public static state: number; //当前游戏进行的阶段 0.准备 1.开始动画 2.定缺 3游戏进行中 4.游戏结束动画

    //聊天信息
    public Chat_Msg = [
        { "wz": "大家好，很高兴见到各位!" },
        { "wz": "快点吧,我等到花儿都谢了!" },
        { "wz": "不要走，决战到天亮!" },
        { "wz": "你是帅哥还是美女啊?" },
        { "wz": "君子报仇，十年不算晚!" },
        { "wz": "不要意思，我有事要先走一会了!" },
        { "wz": "家里是开银行的吧!" },
        { "wz": "今天真高兴!" },
        { "wz": "你的牌打的太好了!" },
        { "wz": "你放炮，我不胡!" },
        { "wz": "你手气真的太好了!" },
        { "wz": "你太牛哦!" },
    ];

    //胡牌类型
    public huTypeList = [
        "无牌型",
        "平胡",
        "大对子",
        "七对",
        "清一色",
        "单调",
        "地听",
        "清大对",
        "单调清一色",
        "天听",
        "龙七对",
        "清七对",
        "天胡",
        "地胡",
        "杀报",
        "清龙背"
    ];

    public csHuTypeList = [

        "屁胡",       // 0
        "大四喜",  // [---1---]小胡 X*N (X=配型番数,倍数 , N=房间底分)
        "板板胡",  // ２小胡 X*N (X=配型番数,倍数 , N=房间底分) 庄自摸:其他每家输2X , 闲自摸: 庄输2X,其他输1X.
        "缺一色",  // ３小胡 X*N (X=配型番数,倍数 , N=房间底分) 点炮方为庄家,则庄输2X, 捉炮方为庄家,则点炮方输2X, 其他点炮捉炮都是1X.
        "六六顺",  // ４小胡 X*N (X=配型番数,倍数 , N=房间底分)
        "三同",// ５
        "步步高",// ６
        "一枝花",// ７
        "",
        "",
        "",
        "天胡",    //11 大胡 庄自摸, 闲家每人输 4X , 闲家自摸, 庄输4X, 闲家输3X
        "地胡",    //12 大胡 点炮为庄家,则庄家输7X, 如果捉炮方为庄家,则点炮方输7X, 其他点炮捉炮都是 6X
        "碰碰胡",   //13 小胡 X*N (X=配型番数,倍数 , N=房间底分)
        "将将胡", // 14
        "清一色",  // [---15---]
        "七小对", // 16
        "豪华七小队", //17
        "海底捞月", // 18
        "海底炮", // 19
        "杠上开花", // 20
        "抢杠胡", //21
        "杠上炮", //22
        "全求人",//23
    ]

    /**包三家玩法*/
    public BaoSanJia = [
        "杠上开花包杠",
        "12张落地",
        "大三元包自摸",
        "大四喜包自摸",
        "抢杠胡"
    ];

}


//动作
// enum ACT_state {   //00000001    0pass  1hu 二进制
//     Act_Pass = 1,   //不吃、碰、杠、胡等
//     Act_NormalDo = 2,   //出牌
//     Act_Ting = 4,       //听
//     Act_Chi = 8,        //吃
//     Act_Peng = 16,       //碰
//     Act_Gang = 32,       //杠
//     Act_AnGang = 64,     //暗杠
//     Act_Hu = 128          //胡
// };

enum ACT_act {
    Act_ChangeCard = -2,// 换牌， 回放用
    Act_GetCard = -1,//摸牌,回放用
    Act_Pass = 5,   //不吃、碰、杠、胡等
    Act_NormalDo = 7,   //出牌
    Act_Ting = 0,       //听
    Act_Chi = 6,        //吃
    Act_Peng = 1,       //碰
    Act_Gang = 2,       //杠
    Act_AnGang = 3,     //暗杠
    Act_Hu = 4,         //胡

    Act_zimo = 8        //自摸,额外添加
};

//胡牌类型
enum MJ_TYPE {
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


//游戏状态
enum GS_GAME_STATION {
    GS_WAIT_SETGAME = 0,    // 等待设置游戏
    GS_WAIT_ARGEE,			// 等待玩家同意游戏
    GS_GAME_PLAYING,		// 游戏中
    GS_GAME_FINSHED,		// 游戏结束
};

//游戏配置中，游戏类型
enum GAME_TYPE {
    RoomCardGame = 1,      // 房卡赛
    RankGame = 2,          // 排位赛
    GoldGame = 3,          // 金币赛
    QuickGame = 4,         // 快抢赛

};



//牌值
enum MJ_CARD_VAL {
    BLACK = 0,

    WAN_1 = 0x11,
    WAN_2,
    WAN_3,
    WAN_4,
    WAN_5,
    WAN_6,
    WAN_7,
    WAN_8,
    WAN_9,

    TIAO_1 = 0x21,
    TIAO_2,
    TIAO_3,
    TIAO_4,
    TIAO_5,
    TIAO_6,
    TIAO_7,
    TIAO_8,
    TIAO_9,

    BING_1 = 0x31,
    BING_2,
    BING_3,
    BING_4,
    BING_5,
    BING_6,
    BING_7,
    BING_8,
    BING_9,

    FENG_DONG = 0x41,
    FENG_NAN,
    FENG_XI,
    FENG_BEI,

    JIAN_ZHONG = 0x51,
    JIAN_FA,
    JIAN_BAI,

    HUA_CHUN = 0x61,
    HUA_XIA,
    HUA_QOU,
    HUA_DONG,
    HUA_MEI,
    HUA_LAN,
    HUA_ZHU,
    HUA_JU,
};

//玩家状态  1111二进制表示，可多种状态叠加
enum PLAYER_STATE {
    TRSHIP = 1,	// 托管
    ESC = 2,	// 逃跑
    READY = 4,	// 准备
    SETTLE = 8,	// 结算
};

//人物坐的实际位置，上下左右
enum UserPosition {
    NULL = -1,
    Down = 0,
    R = 1,
    Up = 2,
    L = 3
}

//聊天类型
enum CHAT_TYPE {
    Face = 1,     //表情    
    Common = 2,   //常用
    Text = 4,     //自定义文本
    Voice = 4    //语音
}



/**性别类型*/
enum SEX_TYPE {
    boy = 1,
    girl = 2,
    unknow = 3
}

/**风牌*/
enum MJ_FENG_POINT {
    DONG = 1,
    NAN = 2,
    XI = 3,
    BEI = 4,
};

/**动作表情*/
enum ACT_FACE {
    Boom = 1,
    FanQie,
    Stone,
    Zan,
    Kiss,
    Flower
}

//包三家类型
enum MJ_BAO_SAN_JIA_TYPE {
    BAO_SAN_JIA_TYPE_GANG_KAI = 0, // 杠上开花
    BAO_SAN_JIA_TYPE_12,   // 十二张落地包自摸
    BAO_SAN_JIA_TYPE_DA_SAN_YUAN, // 大三元
    BAO_SAN_JIA_TYPE_DA_SI_XI,  // 大四喜
    BAO_SAN_JIA_TYPE_QIANG_GANG, // 抢杠
};

/**房间类型*/
enum Game_ID {
    CardRoom = 99999999,//房卡
    GoldRoom = 99999997,//金币
    selfRoom = 99999995,//专属
};

/**金币场等级*/
enum Room_Level {
    Level1 = 1, //新手
    Level2 = 2,     //平民
    Level3 = 3,     //雀神
    Level4 = 4     //富豪
}

/**服务器类型*/
enum Server_Type {
    createRoom = 1,  //创建房间 （金币场时为鸡平胡，专属房时为加入自己房间）
    joinRoom = 2     //加入房间  (金币场时为推倒胡，专属房时为加入其它人房间)
}

//踢人理由
enum KickCause {
    PREPARE_TIME_OUT = 1,   //准备超时
    MONEY_TOO_LITTLE = 2,   //钱太少
    MONEY_TOO_MORE = 3      //钱太多
}

/**游戏状态*/
enum GameState {
    Ready,        //准备阶段
    EffectStart,       //开始动画
    Fixed,    //定缺阶段
    Playing,     //游戏阶段
    GameOver,    //游戏结束
}

/**专属房信息 */
var ExRoomInformation = {
    deskCode: 0,
    hasYiPaoSanXiang: "一炮三响",
    hasHaiDiLaoYue: "海底捞月",
    hasMaiMa: "买马",
    hasFengQuan: "风位风圈刻子",
    hasFengWei: "风位刻子",
    hasSanYuan: "三元牌",
    hasGangAddFan: "杠牌加番",
    hasQiangGang: "抢杠",
    hasBuBuGao: "步步高",
    hasGangShangKaiHua: "杠上开花",
    vipDate: 0,  //vip时间
    timelimit: "", //享用时间
    basePoint: 0, //底分
    deposit: 0, //约定金
    ownerName: "", //房间名字
    playCount: 0,    //局数
    chip: 0
}