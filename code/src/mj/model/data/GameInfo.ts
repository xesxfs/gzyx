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

    //聊天信息
    public Chat_Msg = [
        "大家好，很高兴见到各位！",
        "快点吧,我等到花儿都谢了！",
        "不要走，决战到天亮！",
        "你是帅哥还是美女啊？",
        "君子报仇，十盘不算晚!",
        "快放炮啊，我都等得不耐烦了。",
        "真不好意思，又胡了。",
        "打错了...呜呜呜"
    ];

    //特殊玩法：一炮三响，三元牌，风位风圈刻字，海底捞月，抢杠胡，杠上开花，杠上开花包杠,大三元包自摸,大四喜包自摸、十二张落地包自摸

    //胡牌类型
    public huTypeList = [
        "",
        "鸡胡",     //[---1---]
        "平胡",
        "自摸",    //自摸不算番型
        "风位",
        "风圈",
        "三元牌",   //中
        "三元牌",   //白
        "三元牌",   //发
        "碰碰胡",
        "混一色",   //[---10---]
        "一炮三响",
        "杠上开花",
        "海底捞月",


        "清一色",
        "混碰",
        "清碰",
        "混幺九",
        "小三元",
        "小四喜",
        "字一色",  //[---20---]
        "清幺九",
        "大三元",
        "大四喜",
        "九莲宝灯",
        "十三幺",
        "抢杠胡",
        "天胡",
        "人胡",
        "地胡",

        "小胡", //推倒胡普通牌型   //[---30---]
        "无鬼",
        "杠上开花",
        "满鬼",
        "清一色",
        "字一色",
        "七对子",
        "四暗刻",
        "十八罗汉",
        "大三元",
        "小四喜",   //[---40---]
        "大四喜",
        "十三幺",
        "抢杠胡",   //[---43---]
        "杠牌加番"
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

    /**玩法列表，有些胡牌类型属于玩法，而不是番型*/
    public playTypeList = [
        MJ_TYPE.MJTYPE_JIPINGHU_FENG_WEI,           // 风位
        MJ_TYPE.MJTYPE_JIPINGHU_FENG_QUAN,          // 风圈
        MJ_TYPE.MJTYPE_JIPINGHU_JIAN_ZHONG,         // 三元牌， 中   
        MJ_TYPE.MJTYPE_JIPINGHU_JIAN_BAI,           // 三元牌， 白
        MJ_TYPE.MJTYPE_JIPINGHU_JIAN_FA,            // 三元牌， 发
        MJ_TYPE.MJTYPE_JIPINGHU_YI_PAO_SAN_XIANG,   // 一炮三响
        MJ_TYPE.MJTYPE_JIPINGHU_GANG_SHANG_KAI_HUA, // 杠上开花
        MJ_TYPE.MJTYPE_JIPINGHU_HAI_DI_LAO_YUE,     // 海底捞月
        MJ_TYPE.MJTYPE_JIPINGHU_QIANG_GANG_HU,      // 抢杠胡
        MJ_TYPE.MJTYPE_TUIDAOHU_GANG_SHANG_KAI_HUA, //杠开
        MJ_TYPE.MJTYPE_TUIDAOHU_QIANG_GANG,          //抢杠
        MJ_TYPE.MJTYPE_JIPINGHU_GANG_ADD_FAN         //杠牌加番                  
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
    Act_Pass = 0,   //不吃、碰、杠、胡等
    Act_NormalDo,   //出牌
    Act_Ting,       //听
    Act_Chi,        //吃
    Act_Peng,       //碰
    Act_Gang,       //杠
    Act_AnGang,     //暗杠
    Act_Hu,         //胡

    Act_zimo        //自摸,额外添加
};

//胡牌类型
enum MJ_TYPE {
    MJTYPE_JIPINGHU_JI_HU = 1, // 鸡胡    [---1---]
    MJTYPE_JIPINGHU_PING_HU,  // 平胡
    MJTYPE_JIPINGHU_ZI_MO,   // 自摸
    MJTYPE_JIPINGHU_FENG_WEI,  // 风位
    MJTYPE_JIPINGHU_FENG_QUAN,  // 风圈
    MJTYPE_JIPINGHU_JIAN_ZHONG,  // 三元牌， 中
    MJTYPE_JIPINGHU_JIAN_BAI,  // 三元牌， 白
    MJTYPE_JIPINGHU_JIAN_FA,   // 三元牌， 发
    MJTYPE_JIPINGHU_PENG_PENG_HU, // 碰碰胡
    MJTYPE_JIPINGHU_HUN_YI_SE,  // 混一色    [---10---]
    MJTYPE_JIPINGHU_YI_PAO_SAN_XIANG,// 一炮三响
    MJTYPE_JIPINGHU_GANG_SHANG_KAI_HUA,// 杠上开花
    MJTYPE_JIPINGHU_HAI_DI_LAO_YUE, // 海底捞月

    // 下面是爆胡
    MJTYPE_JIPINGHU_QING_YI_SE,  // 清一色
    MJTYPE_JIPINGHU_HUN_PENG,  // 混碰
    MJTYPE_JIPINGHU_QING_PENG,  // 清碰
    MJTYPE_JIPINGHU_HUN_YAO_JIU,  // 混幺九
    MJTYPE_JIPINGHU_XIAO_SAN_YUAN, // 小三元
    MJTYPE_JIPINGHU_XIAO_SI_XI,  // 小四喜
    MJTYPE_JIPINGHU_ZI_YI_SE,  // 字一色      [---20---]
    MJTYPE_JIPINGHU_QING_YAO_JIU, // 清幺九
    MJTYPE_JIPINGHU_DA_SAN_YUAN,  // 大三元
    MJTYPE_JIPINGHU_DA_SI_XI,  // 大四喜
    MJTYPE_JIPINGHU_JIU_LIAN_BAO_DENG,// 九莲宝灯
    MJTYPE_JIPINGHU_SHI_SAN_YAO,  // 十三幺
    MJTYPE_JIPINGHU_QIANG_GANG_HU, // 抢杠胡
    MJTYPE_JIPINGHU_TIAN_HU,   // 天胡
    MJTYPE_JIPINGHU_REN_HU,   // 人胡
    MJTYPE_JIPINGHU_DI_HU,   // 地胡


    MJTYPE_TUIDAOHU_BASE_TYPE,  //  推倒胡基础牌型    [---30---]

    // 下面是大胡
    MJTYPE_TUIDAOHU_WU_ONI,   // 无鬼
    MJTYPE_TUIDAOHU_GANG_SHANG_KAI_HUA, // 杠开
    MJTYPE_TUIDAOHU_MAN_ONI,  // 满鬼
    MJTYPE_TUIDAOHU_QING_YI_SE,  // 推到胡，清一色，带鬼
    MJTYPE_TUIDAOHU_ZI_YI_SE,  // 推倒胡， 字一色， 带鬼
    MJTYPE_TUIDAOHU_QI_DUI_ZI,  // 推倒胡， 七对子， 带鬼
    MJTYPE_TUIDAOHU_SI_AN_KE,  // 推倒胡， 四暗刻, 带鬼
    MJTYPE_TUIDAOHU_SHI_BA_LOU_HAN, // 推倒胡, 十八罗汉
    MJTYPE_TUIDAOHU_DA_SAN_YUAN, // 推倒胡， 大三元， 带鬼
    MJTYPE_TUIDAOHU_XIAO_SI_XI,  // 推倒胡, 小四喜, 带鬼    [---40---]
    MJTYPE_TUIDAOHU_DA_SI_XI,  // 推倒胡, 大四喜，带鬼
    MJTYPE_TUIDAOHU_SHI_SAN_YAO, // 推倒胡, 十三幺, 带鬼
    MJTYPE_TUIDAOHU_QIANG_GANG,  // 抢杠            [---43---]
    MJTYPE_JIPINGHU_GANG_ADD_FAN    //杠牌加番
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
    Common = 0,   //常用
    Face = 1,     //表情    
    Text = 2,     //自定义文本
    Voice = 3    //语音
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
    Free,        //空闲
    Ready,       //准备阶段
    DealCard,    //发牌阶段
    Playing,     //游戏阶段
    GameOver,    //游戏结束
    Replay,       //回放
    Qishouhu,        //起手胡
    ZhaNiao       //扎鸟
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