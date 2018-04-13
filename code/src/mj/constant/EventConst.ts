/**
 * 事件名
 * @author chen
 * @date 2016/9/27
 */
class EventConst {
	/**Socket连接成功*/
	public static SocketConnect: string = "SocketConnect";
	/**socket开始重连*/
	public static StartReconnect: string = "StartReconnect";
	/**send数据时，socket未连接*/
	public static SocketNotConnect: string = "SocketNotConnect";
	/**socket 连接错误*/
	public static SocketIOError: string = "SocketIOError";
	/**socket 关闭*/
	public static SocketClose: string = "SocketClose";
	/**游戏状态更改*/
	public static GameStateChange: string = "GameStateChange";
	/**游戏配置修改*/
	public static GameConfigChange: string = "GameConfigChange";


	/** 更新金币 */
	public static UpdateGold: string = "UpdateGold";
	/** 更新钻石 */
	public static UpdateDiamond: string = "UpdateDiamond";
	/** 背包使用物品 */
	public static UseItem: string = "UseItem";
	/** 背包显示详细信息 */
	public static ShowItemDesc: string = "ShowItemDesc";
	/** 显示邮件详情 */
	public static ShowMail: string = "ShowMail";
	/** 广告轮播 */
	public static ShowNotice: string = "ShowNotice";
	/** 显示俱乐部的房间列表 */
	public static showRoom:string = "showRoom";
}