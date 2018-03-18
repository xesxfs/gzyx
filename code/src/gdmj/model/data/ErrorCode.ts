/**
 *
 * @author chen
 * 2016/07/12
 */

module MatchCode {

    var mecthCode = [];
    var mecthProto = [];
    //登陆错误码
    mecthCode["100_3_9"] = "当前session被占用";
    mecthCode["100_3_3"] = "密码错误";
    mecthCode["100_3_19"] = "没有登录Z服务器";

    //创建房间错误码
    mecthCode["104_1_1_1"] = "开房卡不足";
    mecthCode["104_1_1_2"] = "桌子数达到上限";
    mecthCode["104_1_1_3"] = "创建数量达到上限";
    mecthCode["104_1_1_4"] = "暗号已存在或为空";

    //进入房间错误码
    mecthCode["102_4_1_1"] = "房间不存在，请确认所输入的房间号是否正确";
    mecthCode["102_4_1_2"] = "房间人满";
    mecthCode["102_4_1_3"] = "金币不足";
    mecthCode["102_4_1_4"] = "位置上已经有人";
    mecthCode["102_4_1_5"] = "XXX太多";
    mecthCode["102_4_1_-3"] = "资金与约定金不足!";
    mecthCode["102_4_1_-11"] = "被房主踢出!";
    mecthCode["102_4_1_-12"] = "强退了其他房间!";
    mecthCode["102_4_1_-13"] = "人满!";
    mecthCode["102_4_1_-14"] = "房主不在线!";
    mecthCode["102_4_1_-15"] = "房间已过期，请续费!";

    //专属房 进入房间错误码
    mecthCode["102_4_1_-11"] = "你被房主请离房间，3分钟不能进入。"
    mecthCode["102_4_1_-12"] = "你强退了其他房间，所以不能进入"
    mecthCode["102_4_1_-13"] = "房间人员已满，不能加入房间"


    //搜索房间
    mecthCode["104_2_1"] = "房间不存在，请确认所输入的房间号是否正确"
    //加入金币场
    mecthCode["102_11_1"] = "无空闲的桌子"

    /**********************
     **********************
     ******协议匹配码*******
     **********************
     **********************/
    //  mecthProto[ProtocolHead.Rev1_1_0] ="接收心跳"
    mecthProto["100002"] = "登录服务器"
    mecthProto["100120"] = "快速匹配"
    mecthProto["100145"] = "广播通知有玩家进入"
    mecthProto["100047"] = "广播退出房间"
    mecthProto["100137"] = "通知客户端更新金币"
    mecthProto["100162"] = "玩家准备"
    mecthProto["100165"] = "广播玩家准备"
    mecthProto["100801"] = "游戏断线重连请求"
    mecthProto["100802"] = "玩家进入"
    mecthProto["100803"] = "获取游戏状态"
    mecthProto["100804"] = "玩家(取消)托管"
    mecthProto["100805"] = "广播玩家(取消)托管"
    mecthProto["100806"] = "获取庄家位置"
    mecthProto["100808"] = "发牌通知"
    mecthProto["100809"] = "玩家摸牌"
    mecthProto["100810"] = "玩家请求操作"
    mecthProto["100811"] = "玩家叫牌"
    mecthProto["100812"] = "响应玩家操作"
    mecthProto["100813"] = "通知玩家出牌"
    mecthProto["100814"] = "游戏结算"
    mecthProto["100815"] = "买马结果"
    mecthProto["100816"] = "通知鬼牌"
    mecthProto["100817"] = "通知杠结算"
    mecthProto["100818"] = "通知总战绩，桌子解散时候发送"
    mecthProto["100819"] = "广播通知玩家有玩家在叫牌(吃碰杠胡)"
    mecthProto["100820"] = "测试确定下面的牌 "
    mecthProto["100821"] = "测试换牌"
    mecthProto["100822"] = "通知玩家更新手牌（换牌后）"
    mecthProto["100823"] = "测试看牌     "
    mecthProto["100824"] = "测试返回牌    "
    mecthProto["100825"] = "推送服务器登录       "
    mecthProto["100826"] = "已经登录           "
    mecthProto["100827"] = "登录成功  "
    mecthProto["100828"] = "为推送消息 "
    mecthProto["100829"] = "请求游戏服务器地址 "
    mecthProto["100830"] = "返回游戏服务器地址 "
    mecthProto["100831"] = "查询房间号是否存在 "
    mecthProto["100832"] = "查询房间号是否存在返回"


    /**
     * 配对错误码
     * 协议
     * @param proto
     * 返回码 可选
     * @param code
     */
    export function getCodeText(proto: string, code?: number): string {

        let codes = proto + (code ? "_" + code.toString() : "");

        return mecthCode[codes] ? mecthCode[codes] : "未定义的错误码:" + codes;
    }


    export function MecthProto(proto: string) {
        var protostr = mecthProto[proto];
        if (!protostr) {
            protostr = "未注解的协议号:" + proto
        }
        return protostr;
    }

}
