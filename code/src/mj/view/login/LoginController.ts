/**
 * 登录控制模块
 * @author chen
 * @date 2016/11/16
 */
class LoginController extends BaseController {
	/**模块名*/
	public static NAME: string = "LoginController";
	/**显示登录界面*/
	public static EVENT_SHOW_LOGIN: string = "ShowLoginScene";
	/**登录界面*/
	public loginScene: LoginScene;
	/**大厅是否加载完成*/
	private bHallLoaded: boolean = false;
	/**登录请求是否完成*/
	public bLogin: boolean = false;
	public constructor() {
		super();
	}

	public onRegister() {
		this.addEvent(LoginController.EVENT_SHOW_LOGIN, this.showLoginScene, this);
	}

	public unRegister() {
		this.removeEvent(LoginController.EVENT_SHOW_LOGIN, this.showLoginScene, this);
	}

	/**显示登录界面*/
	private showLoginScene() {
		this.bHallLoaded = false;
		this.bLogin = false;

		//测试账号登录  从浏览器获取账号，发送登录请求
		// if(App.DataCenter.debugInfo.isDebug){
		//     this.sendDebugLoginReq(App.DataCenter.debugInfo.account, App.DataCenter.debugInfo.password);
		// 	this.startLoadHall();
		//     return;
		// }	
		this.startLoadLogin();
	}

	/**显示登录场景 */
	public runLoginScene() {
		this.loginScene = App.SceneManager.runScene(SceneConst.LoginScene) as LoginScene;
		this.loginScene.setController(this);
	}

	/**开始加载登录界面*/
	private startLoadLogin() {
		App.PanelManager.open(PanelConst.PreloadPanel) as PreloadPanel;
		App.ResUtils.loadGroup(AssetConst.Login, this, this.loadLoginComplete, this.loadLoginProgress);
	}

	/**加载登录界面进度*/
	private loadLoginProgress(e: RES.ResourceEvent) {
		var preloadPanel:PreloadPanel = App.PanelManager.getPanel(PanelConst.PreloadPanel);
		preloadPanel.setProgress(Math.round(e.itemsLoaded/e.itemsTotal*100));
	}

	/**加载登录界面完成*/
	private loadLoginComplete() {
		App.PanelManager.close(PanelConst.PreloadPanel);
		this.loginScene = App.SceneManager.runScene(SceneConst.LoginScene) as LoginScene;
		this.loginScene.setController(this);
	}

	/**开始加载大厅*/
	public startLoadHall() {
		var preloadPanel = App.PanelManager.open(PanelConst.PreloadPanel) as PreloadPanel;
		App.ResUtils.loadGroup([AssetConst.Lobby, AssetConst.Common, AssetConst.Game], this, this.loadHallComplete, this.loadHallProgress);
	}

	/**加载大厅界面进度*/
	private loadHallProgress(e: RES.ResourceEvent) {
		var preloadPanel: PreloadPanel = App.PanelManager.getPanel(PanelConst.PreloadPanel);
		preloadPanel.setProgress(Math.round(e.itemsLoaded / e.itemsTotal * 100));
	}

	/**加载大厅界面完成*/
	private loadHallComplete() {
		this.bHallLoaded = true;
		this.gotoHall();
	}

	/**测试账号登录*/
	public sendDebugLoginReq(account, password) {
		var httpsend = new HttpSender();
		var testLoginData = ProtocolHttp.send_z_login;
		var testAccount = account;
		var testPassword = password;
		testLoginData.param = { user: testAccount, password: testPassword };
		httpsend.send(testLoginData, this.revWxLoginReq, this);
	}

	/**返回登录结果*/
	private revWxLoginReq(result) {
		// var rdata = ProtocolHttp.rev_z_login;
		// rdata = result;
		// if(!rdata.ret) {
		// 	var ud = rdata.data;
		// 	var su = new UserVO();
		// 	su.userID = ud.uid;
		// 	su.nickName = ud.name;
		// 	su.headUrl = ud.avater_url == "1" ? "" : ud.avater_url;
		// 	su.hadinvited = ud.hadinvited;
		// 	su.skey = ud.skey;
		// 	su.isOvertime=ud.is_overtime
		// 	su.excluroomName=ud.excluroom_name;
		// 	su.excluroomCode=ud.excluroom_code;			
		// 	App.DataCenter.ServerInfo.SERVER_URL = "ws://" + ud.ip + ":" + ud.port;
		// 	su.visitorFlag = ud.is_visitor;
		// 	su.sex = ud.sex;


		// App.DataCenter.ServerInfo.PUSH_SERVER_URL = "ws://" + ud.ip + ":" + ud.prushport;
		// var md5Pass = new md5().hex_md5(ud.password);
		// App.DataCenter.ServerInfo.MD5PASS = ud.password;
		// App.DataCenter.UserInfo.selfUser = su;
		// App.DataCenter.UserInfo.addUser(su);
		//			egret.localStorage.setItem("refresh_token",ud.refToken);
		this.bLogin = true;



		// } else {
		// 	console.log("login error action:%s,ret:%s,desc:%s",rdata.action,rdata.ret,rdata.desc);        
		// 	Tips.error(rdata.desc+",将在2秒后重试!");

		// }
	}



	/**去大厅*/
	private gotoHall() {
		if (this.bHallLoaded && this.bLogin) {
			console.log("显示大厅");
			App.PanelManager.close(PanelConst.PreloadPanel);
			App.getInstance().sendEvent(HallController.EVENT_SHOW_HALL);
		}
	}


}