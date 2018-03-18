/**
 * Socket通讯协议头
 * @author chen
 * @date 2016/11/17
 */
class ProtocolHead {

    /**发送心跳*/
    public static Send100000: string = "100000";
    /**接收心跳*/
    public static Rev1_1_0: string = "100000";
    /**发送断线重连 */
    public static Send100010:string ="100010"
    /**广播玩家断线重连 102 2 99*/
    public static Rev102_2_99: string = "100011";
    /**玩家加入房间(广播) 102 4 2*/
    public static Rev102_4_2: string = "100145";
    /**发送退出房间*/
    public static Send102_5_0: string = "100147";
    /**接收退出房间(广播)*/
    public static Rev102_5_1: string = "100149";
    /**接收通知玩家被踢出*/
    public static Rev102_20_1: string = "100129";
    /**接收更新房卡*/
    public static Rev103_10_0: string = "100141";
    /**赠送房间*/
    public static Send104_3_0: string = "104_3_0";
    /**赠送返回*/
    public static Rev104_3_1: string = "104_3_1";
    /**广播房间房主变更*/
    public static Rev104_3_2: string = "104_3_2";
    /**申请解散房间*/
    public static Send104_5_0: string = "100151";
    /**申请返回*/
    // public static Rev104_5_1: string = "100155";
    /**询问是否同意解散*/
    public static Rev104_5_2: string = "100157";
    /**发送是否同意解散*/
    public static Send104_5_5: string = "104_5_5";
    /**广播桌子解散*/
    public static Rev104_5_6: string = "100159";
    /**发送再来一战*/
    public static Send104_8_0: string = "100160";
    /**接收再来一战*/
    public static Rev104_8_0: string = "104_8_0";
    /**长时间没有开始游戏，提示强制解散房间*/
    public static Rev104_10_0: string = "104_10_0";
    // /**发送准备*/
    // public static Send100162: string = "100162";
    // /**广播玩家准备*/
    // public static Rev100165: string = "100165";
    // /**取消准备*/
    // public static Send100164: string = "100164";
    /**接收游戏状态*/
    public static Rev100803: string = "100803";
    /**广播取消准备*/
    // public static Rev100167: string = "100167";
    /**发送聊天信息*/
    public static Send111_1_0: string = "111_1_0";
    /**广播聊天室信息*/
    public static Rev111_1_1: string = "111_1_1";
    /**禁言广播 */
    public static Gag111_2_1: string = "111_2_1";
    /**发送互动表情*/
    public static Send112_1_0: string = "112_1_0";
    /**互动道具失败*/
    public static Rev112_1_1: string = "112_1_1";
    /**广播互动道具*/
    public static Rev112_1_2: string = "112_1_2";
    /**通知领取救济金*/
    public static Rev_113_1_0: string = "113_1_0";
    /**领取救济金*/
    public static Send113_2_0: string = "113_2_0";
    /**接收领取救济金结果*/
    public static Rev113_2_1: string = "113_2_1";
    /**请求游戏状态*/
    public static Send100150: string = "100150";
    /**广播更新玩家信息*/
    // public static Rev100802: string = "100802";
    /**玩家(取消)托管*/
    public static Send100804: string = "100804";
    /**广播玩家(取消)托管 */
    public static Rev100805: string = "100805";
    /**游戏开始,获取庄家位置*/
    // public static Rev100806: string = "100806";
    /**发牌*/
    public static Rev100808: string = "100808";
    /**摸牌*/
    public static Rev100809: string = "100809";
    /**玩家请求操作(吃、碰、杠、胡等)*/
    public static Send100810: string = "100810";
    /**通知玩家叫牌(是否能吃、碰等)*/
    public static Rev100811: string = "100811";
    /**相应玩家操作(广播玩家吃、碰等操作)*/
    public static Rev100812: string = "100812";
    /**通知玩家出牌?*/
    public static Rev100813: string = "100813";
    /**游戏结束，结算*/
    public static Rev100814: string = "100814";
    /**广播买马结果*/
    public static Rev180_59_0: string = "100815";
    /**广播通知鬼牌*/
    public static Rev180_60_0: string = "100816";
    /**广播杠结算*/
    public static Rev180_61_0: string = "100817";
    /**接收牌局信息，桌子解散时接收 */
    public static Rev180_62_0: string = "100818";
    /**广播玩家叫牌*/
    public static Rev100819: string = "100819";
    /**测试确定下次发的牌*/
    public static Send180_99_0: string = "100820";
    /**测试换牌*/
    public static Send180_100_0: string = "100821";
    /**测试换牌*/
    public static Rev100822: string = "100822";
    /**测试看牌 -1最后一张 0为第一张 主要用来测试海底捞月*/
    public static Send100823: string = "100823";
    /**接收测试最后一张牌*/
    public static Rev180_103_0: string = "100824";
    /**其他玩家登陆该账号*/
    public static Rev10000_0_0: string = "100039";
    /**通知金币变化*/
    public static Rev103_6_0: string = "100137";
    /**游戏中不能站起*/
    public static Rev102_8_60:string = "100044";
    /**玩家离开游戏离线 */
    public static Rev102_7_0:string = "102_7_0";


    /**登陆游戏服务器 {“userid”:int, “pass”:string} 其中pass为md5加密后的密文*/
    public static Send100002: string = "100002";
    /**推送服务器登录*/
    public static Send181_0_0: string = "100825";
    /**登陆 当 session被占用时返回 [100, 3, 9] 消息*/
    public static Rev100_3_9: string = "100035";
    /**登陆 当密码错误时返回 [100, 3, 3] 消息，无结构*/
    public static Rev100_3_3: string = "100031";
    /**登陆 当玩家没有登录Z服务器时返回 [100,3,19]消息，无结构*/
    public static Rev100_3_19: string = "100037";
    /**登陆 当玩家在其他游戏中登录或没有正常登出时*/
    public static Rev100_3_8: string = "100033";
    /**登陆 断线重连*/
    // public static Rev102_2_50: string = "100010";
    /**登陆 登陆成功*/
    public static Rev100_2_1: string = "100003";
    /**推送服务器 登录成功*/
    public static Rev182_1_0: string = "100826";
    /**接收推送消息*/
    public static Rev182_0_0: string = "100827"
    /**创建房间*/
    public static Send104_1_0: string = "100120";
    /**创建房间*/
    public static Rev104_1_1: string = "100121";
    /**搜索房间*/
    public static Send104_2_0: string = "100122";
    /**接收搜索房间*/
    public static Rev104_2_1: string = "100123";
    /**进入房间*/
    public static Send102_4_0: string = "100110";
    /**加入房间*/
    public static Rev102_4_1: string = "100111";
    /**玩家进入广播*/
    public static CC102_4_2: string = "100145";
    /**获取游戏服务器地址*/
    public static Send200_1_0 = "100829";
    /** 查询房间号是否存在*/
    public static Send200_2_0 = "100831";
    /**返回房间是否存在*/
    public static Rev200_2_1 = "100832";
    /**接收游戏服务器地址*/
    public static Rev200_1_1 = "100830";
    /**金币场 玩家请求加入排队*/
    public static Send102_11_0 = "100126";
    /**桌子结束*/
    public static Rev104_4_0: string = "100125";
    /**通知房主房间结束*/
    public static Rev104_4_1: string = "100127";
    /**金币场进入失败，金币太少*/
    public static Rev102_16_0: string = "102_16_0";
    /**金币场进入失败，金币太多*/
    public static Rev102_18_0: string = "102_18_0";
    /**专属房**/
    public static Rev121_1_0: string = "100105";
    /**更改房间配置 */
    public static Send120_1_0: string = "100102";
    /**加入桌子**/
    public static Send102_8_0: string ="102_8_0";
    /**返回加入桌子**/
    public static Rev102_8_1: string ="102_8_1";
    /**获取指定的桌子的信息**/
    public static Send104_10_0: string ="100114";
    /**返回桌子的信息**/
    public static Rev104_10_1: string = "100115";
    /**没有可用的专属房**/
    public static Rev121_2_0: string = "100106";    
    /**踢人*/
    public static Send102_20_0: string = "100128";
    /**踢人返回*/
    public static Rev102_20_2: string ="100131";
    /**接收踢人广播*/
    public static Rev102_20_3: string = "100133";
    /**禁言*/
    public static Send111_2_0: string = "111_2_0";
    /**接收禁言广播*/
    public static Rev111_2_1: string = "111_2_1";    
    /**更改房间配置返回 **/
    //public static Rev120_1_1: string = "100103";
    /**更改房间规则广播 */
    public static Rev100103: string = "100103";
    /**更改房间配置广播**/
    public static Rev120_1_2: string = "100104";
    //查看是否禁言*/
    public static Send111_3_0:string = "111_3_0";
    /**返回是否被禁言*/
    public static Rev111_3_1: string = "111_3_1";
    /**聊天失败返回*/
    public static Rev111_1_2: string = "111_1_2";
    /**解除禁言返回*/
    public static Rev111_4_0: string = "111_4_0";
    /**通知房主哪个人禁言解除*/
    public static Rev111_4_1: string = "111_4_1"; 


    /**玩家站起 */
    public static Send100040:string ="100040"
    /**广播玩家站起 */
    public static Rev100041:string = "100041";
    /**玩家坐下 */
    public static Send100041:string ="100042";
    /**广播玩家坐下 */
    public static Rev100043 :string = "100043";
    /**游戏中不能站起或离开 */
    public static Rev100125 : string = "100125";
    /**用户同意消息，排队机房间自动发送*/
    public static Rev100135 :string = "100135";
    /**游戏中结算信息 */
    public static Rev100139 :string = "100139";
    /**通知新的一轮开始游戏 */
    public static Rev100107 :string ="100107";
    /**通知一轮游戏结束 */
    public static Rev100109:string ="100109";
    /**好友房加入房间 */
    public static Send100110 :string = "100110";
    /**好友房返回加入房间 */
    public static Rev100111:string = "100111";
    /**专属房搜索房间 */
    public static Send100112:string ="100112";
    /**查找房间返回 */
    public static Rev100113 :string ="100113";
    /**获取游戏状态消息，当进入房间是应当发送该消息，以便获取游戏状态 */
    public static Rev100116:string ="100116";
    /**接收起手胡 */
    public static Rev100900:string ="100900";
  
    /***
     * 快速匹配场
     */
    /**创建房间请求 */
    public static Send100120:string ="100120";
    /**创建房间返回 */
    public static Rev100121:string ="100121";
    /**查找房间请求 */
    public static Send100122:string ="100122";
    /**查找房间返回 */
    public static Rev100123:string = "100123";
    /**房间解散请求 */
    public static Send100125:string ="100125";
    /**房间解散返回 */
    public static Rev100127:string ="100127";
    /**加入房间广播 */
    public static Rev100145:string ="100145";
    /**玩家准备 */
    public static Send100162:string = "100162";
    /**玩家取消准备 */
    public static Send100164:string = "100164";
    /**广播玩家准备 */
    public static Rev100165:string ="100165";
    /**广播玩家取消准备 */
    public static Rev100167:string ="100167";
    /**广播更新玩家信息*/
    public static Rev100802: string = "100802";
    /**游戏开始,获取庄家位置*/
    public static Rev100806: string = "100806";
    /**发送断线重连消息 */
    public static Send100801 :string = "100801";
    /**测试换牌返回 */
    // public static Rev100823: string = "100823";

    /**发送创建好友房 */
    public static Send101000 = "101000";
    /**发送加入好友房 */
    public static Send101001 = "101001";
    /**广播通知有玩家进入好友房桌子 */
    public static Rev101003 = "101003";
    /**发送好友房内记录 */
    public static Send101004 = "101004";
    /**匹配房发送退出房间 */
    public static Send100121 = "100121";
    /**好友房发送退出房间 */
    public　static　Send101002 ="101002";
    /**广播通知有玩家断线 */
    public static Rev100012 ="100012";
    /**广播由玩家重连 */
    public static Rev100011 ="100011";
    /**测试确认色子点数 */
    public static Send100824 = "100824";
    /**发送修改好友房 */
    public static Send100102 ="100102";
    /**游戏结束扎鸟 */
    public  static Rev100901 = "100901";
    /**发送查看规则测试 */
    public static Send100117 = "100117";
    /**修改规则界面获取初始值 */
    public static Send100118 = "100118";
    /**发送邀请好友时的规则 */
    public static Send100119 = "100119";
    /**发送好友房解散房间 */
    public static Send100151 = "100151";
    /**广播通知玩家请求解散桌子 */
    public static Rev100155 = "100155";
    /**广播通知某玩家对解散桌子的回应 */
    public static Rev100159 ="100159";
    /**广播通知解散桌子 */
    public static Rev100160 = "100160";
    /**发送是否同意解散 */
    public static　Send100156　="100156";
    /**广播通知有人离开房间 */
    public static Rev100047 ="100047";
    /**广播一轮游戏结束通知 */
    public static Rev100818 = "100818";
    /**设备在其他设备登陆 */
    public static Rev100013 = "100013";
    /**拒绝解散房间消息 */
    public static Rev100161 ="100161";
    /**发送踢人消息 */
    public static Send100128="100128";
    /**广播踢人消息 */
    public static Rev100129="100129";
    /**通知自己被踢出 */
    public static Rev100133="100133";
    /**匹配场换桌 */
    public static Send100124="100124";
    /**广播当前局数 */
    public static Rev100108="100108";
}