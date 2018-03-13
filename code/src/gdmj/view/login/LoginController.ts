/**
 * 登录控制模块
 * @author chenkai
 * @date 2016/11/16
 */
class LoginController extends BaseController{
	/**模块名*/
	public static NAME:string = "LoginController";
	/**显示登录界面*/
	public static EVENT_SHOW_LOGIN:string = "ShowLoginScene";
	/**登录界面*/
	public loginScene:LoginScene;
	/**大厅是否加载完成*/
	private bHallLoaded:boolean = false;
	/**登录请求是否完成*/
    private bLogin:boolean = false;
	public constructor() {
		super();
	}

	public onRegister(){
		this.addEvent(LoginController.EVENT_SHOW_LOGIN,this.showLoginScene, this);
	}

	public unRegister() {
		this.removeEvent(LoginController.EVENT_SHOW_LOGIN,this.showLoginScene, this);
	}

	/**显示登录界面*/
	private showLoginScene(){
		this.bHallLoaded = false;
		this.bLogin = false;
        
		//测试账号登录  从浏览器获取账号，发送登录请求
        if(App.DataCenter.debugInfo.isDebug){
            this.sendDebugLoginReq(App.DataCenter.debugInfo.account, App.DataCenter.debugInfo.password);
			this.startLoadHall();
            return;
        }
        
        //App登录  首先加载登录界面，点击登录按钮后，首次登录调用Native微信SDK，获取code登录；二次登录使用保存的refreshToken登录。
        if(App.DeviceUtils.IsNative){
			console.log("原生登录");
			/**原有的原生登录 */
			//this.startLoadLogin();
			this.runLoginScene();
			return;
        }

        //Web微信网页授权登录 从浏览器获取php传递的code，发送登录请求
       var code = egret.getOption("code");
      
       if(code == null || code == ""){
			Tips.error("code or is null");
			return;
		}
		this.sendLoginWeiXin(code);
	    this.startLoadHall();
	}

	/**显示登录场景 */
	public runLoginScene() {
		this.loginScene = App.SceneManager.runScene(SceneConst.LoginScene) as LoginScene;
		this.loginScene.setController(this);
	}

	/**开始加载登录界面*/
	private startLoadLogin(){
		var preloadPanel: PreloadPanel = App.PanelManager.open(PanelConst.PreloadPanel);
		App.ResUtils.loadGroup(AssetConst.Login,this, this.loadLoginComplete, this.loadLoginProgress);
	}

	/**加载登录界面进度*/
	private loadLoginProgress(e:RES.ResourceEvent){
		var preloadPanel:PreloadPanel = App.PanelManager.getPanel(PanelConst.PreloadPanel);
		preloadPanel.setProgress(Math.round(e.itemsLoaded/e.itemsTotal*100));
	}

	/**加载登录界面完成*/
	private loadLoginComplete(){
		App.PanelManager.close(PanelConst.PreloadPanel);
		this.loginScene = App.SceneManager.runScene(SceneConst.LoginScene) as LoginScene;
		this.loginScene.setController(this);
	}

	/**开始加载大厅*/
	private startLoadHall(){
		var preloadPanel: PreloadPanel = App.PanelManager.open(PanelConst.PreloadPanel);
		App.ResUtils.loadGroup(["hall","common","preload","game"],this, this.loadHallComplete, this.loadHallProgress);
	}

	/**加载大厅界面进度*/
	private loadHallProgress(e:RES.ResourceEvent){
		var preloadPanel:PreloadPanel = App.PanelManager.getPanel(PanelConst.PreloadPanel);
		preloadPanel.setProgress(Math.round(e.itemsLoaded/e.itemsTotal*100));
	}

	/**加载大厅界面完成*/
	private loadHallComplete(){
		this.bHallLoaded = true;
		this.gotoHall();
	}

	/**测试账号登录*/
	public sendDebugLoginReq(account, password){
		var httpsend = new HttpSender();
		var testLoginData = ProtocolHttp.send_z_login;     
        var testAccount =  account;   
        var testPassword = password;
		testLoginData.param = { user: testAccount,password:testPassword};
		httpsend.send(testLoginData,this.revWxLoginReq,this);
	}

	/**IM登录请求 */
	public sendImLoginReq(token:string, uid:string) {
		console.log("发送登录请求, token:"+token);
		var httppost = new HttpSender();
		var data = ProtocolHttp.IMLogin;
		data.param.token = token;
		data.param.uid = uid;
		httppost.post("http://119.23.66.138:8090/majapi/postapi.php", data, this.RevImLoginRev, this);
	}

	/**IM登录返回 */
	private RevImLoginRev(data) {
		console.log("IM login data:"+data);
		if(!data.ret) {
			App.NativeBridge.sendLogin(true);
		}
		else {
			App.NativeBridge.sendLogin(false);
		}
		//清除弹窗
		var chooosePanel:LoginChoosePanel = App.PanelManager.getPanel(PanelConst.LoginChoosePanel);
		chooosePanel && chooosePanel.hide();

		var loginPanel:LoginPanel = App.PanelManager.getPanel(PanelConst.LoginPanel);
		loginPanel && loginPanel.hide();

		this.revWxLoginReq(data);
	}

	/**独立包登录逻辑 */
	public independenceLogin() {
		//App.PanelManager.open()
	}

	/** 
	 *发送微信授权页面登录
	 *@code 
	*/
	public sendLoginWeiXin(code){
		var httpsend = new HttpSender();
		var loginData = ProtocolHttp.send_z_loginweixin;
		loginData.param.code = code;
		httpsend.send(loginData,this.revWxLoginReq,this);
	}

	/**
	 * 发送微信登录请求
	 * @code
	 * @refreshToken
	 */
	public sendLoginAppReq(code, refreshToken){
		var httpsend = new HttpSender();
		var loginData = ProtocolHttp.send_z_loginapp;
		loginData.param.code = code;
		loginData.param.refToken = refreshToken;
		httpsend.send(loginData,this.revWxLoginReq,this);
	}


    /**返回登录结果*/
	private revWxLoginReq(result) {
		var rdata = ProtocolHttp.rev_z_login;
		rdata = result;
		if(!rdata.ret) {
			var ud = rdata.data;
			var su = new UserVO();
			su.userID = ud.uid;
			su.nickName = ud.name;
			su.headUrl = ud.avater_url == "1" ? "" : ud.avater_url;
			su.hadinvited = ud.hadinvited;
			su.skey = ud.skey;
			su.isOvertime=ud.is_overtime
			su.excluroomName=ud.excluroom_name;
			su.excluroomCode=ud.excluroom_code;			
			App.DataCenter.ServerInfo.SERVER_URL = "ws://" + ud.ip + ":" + ud.port;
			su.visitorFlag = ud.is_visitor;
			su.sex = ud.sex;
			
			if (App.DeviceUtils.IsNative) {
				//App.DataCenter.ServerInfo.SERVER_URL="ws://"+"192.168.0.73"+":"+"10001";
			}
			else {
				let server = App.DataCenter.debugInfo.Sever;
				switch(server){
					case 1:
					App.DataCenter.ServerInfo.SERVER_URL="ws://"+"192.168.0.73"+":"+"10001";
					break;
					case 2:
					App.DataCenter.ServerInfo.SERVER_URL="ws://"+"192.168.0.84"+":"+"10001";
					break;
					case 3:
					App.DataCenter.ServerInfo.SERVER_URL="ws://"+"192.168.0.72"+":"+"10001";
					break;
					case 4:
					App.DataCenter.ServerInfo.SERVER_URL="ws://"+"192.168.0.11"+":"+"10001";
					break;
				}
			}
			
			// App.DataCenter.ServerInfo.PUSH_SERVER_URL = "ws://" + ud.ip + ":" + ud.prushport;
			// var md5Pass = new md5().hex_md5(ud.password);
			App.DataCenter.ServerInfo.MD5PASS = ud.password;
			App.DataCenter.UserInfo.selfUser = su;
			App.DataCenter.UserInfo.addUser(su);
//			egret.localStorage.setItem("refresh_token",ud.refToken);
			this.bLogin = true;
            //判断是否通过分享链接进入，插入分享数据
            if(ud.hadinvited == 0) {
                this.insertShare();
            }
			//Native需要加载大厅；Web则直接显示大厅
			if(App.DeviceUtils.IsNative){
				this.startLoadHall();
			}else{
				// if(!this.bHallLoaded || !this.bLogin) {
				// 	this.startLoadHall();
				// }
				// else {
					this.gotoHall();
				//}
			}

		} else {
			console.log("login error action:%s,ret:%s,desc:%s",rdata.action,rdata.ret,rdata.desc);        
			Tips.error(rdata.desc+",将在2秒后重试!");
			this.retryCode();
		}
	}
     /**插入一条被分享数据*/
	 private insertShare(){
        var userVO: UserVO = App.DataCenter.UserInfo.getMyUserVo();
        var shareUserID = App.DataCenter.shareInfo.pidID;
        var deskCode = App.DataCenter.shareInfo.deskCode;
        var deskID = App.DataCenter.shareInfo.deskId;
        if(shareUserID && deskCode && deskID) {
            var http = new HttpSender();
            var sendData = ProtocolHttp.send_z_one_insertShare;
            sendData.uid = userVO.userID;
            sendData.param.pid = parseInt(shareUserID);
            sendData.param.sid = userVO.userID;
            console.log("分享，第一次发送：发送用户通过分享链接进入了游戏:","分享者:" + sendData.param.pid + " 被分享者:" + sendData.param.sid);
            http.send(sendData,this.revInsertShare,this);
        }
	}

    /**返回分享*/
    private revInsertShare(data) {
        //貌似无返回..
    }
	
	/**重新尝试获取code,会去除所有参数*/
	private retryCode(){
		var url = window.document.location.href;
		var pos=url.indexOf('?');
		if(pos!=-1){
			url=url.substring(0,pos);
		}
		console.log(url);
		egret.setTimeout(() => { window.open(url,"_self");},this,2000);
	}
	
	/**去大厅*/
	private gotoHall(){
		if(this.bHallLoaded && this.bLogin){
			console.log("显示大厅");
			App.PanelManager.close(PanelConst.PreloadPanel);
			App.getInstance().sendEvent(HallController.EVENT_SHOW_HALL);
		}
	}

	
}