/**
 * socket管理类
 * @author chen
 * @date
 */
class SocketManager extends SingleClass{
    public serverSocket: ClientSocket;       //调度服务器
    public gameSocket: ClientSocket;         //游戏Socket
    public pushSocket: ClientSocket;        //推送Socket
    
	public constructor() {
    	super();
      this.gameSocket = new ClientSocket();
      this.gameSocket.name = "gameSocket";
      this.pushSocket = new ClientSocket();
      this.pushSocket.name = "pushSocket";
      this.serverSocket = new ClientSocket();
      this.serverSocket.name = "serverSocket";
	}
}
