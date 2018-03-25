/**
 * 事件名
 * @author chen
 * @date 2016/9/27
 */
class EventConst {
	/**Socket连接成功*/
	public static SocketConnect:string = "SocketConnect";
	/**socket开始重连*/
	public static StartReconnect:string = "StartReconnect";
	/**send数据时，socket未连接*/
	public static SocketNotConnect:string = "SocketNotConnect";
	/**socket 连接错误*/
	public static SocketIOError:string = "SocketIOError";
	/**socket 关闭*/
	public static SocketClose:string = "SocketClose";
	/**游戏状态更改*/
    public static GameStateChange: string = "GameStateChange";    
    /**游戏配置修改*/
    public static GameConfigChange:string ="GameConfigChange";
}