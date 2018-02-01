/**
 * 调试信息
 * @author chenkai
 * @date 2016/11/16
 */
class DebugInfo {
	/**是否调试模式*/
	public get isDebug():boolean{
		return (egret.getOption("debug") != null && egret.getOption("debug") != "");
	};

	/**是否访问本地php，用于php访问地址设置*/
	public get isLocalPhp():number{
		return parseInt(egret.getOption("local"));
	};

	/**
	 * 
	 */
	public get Sever(){
		return Number(egret.getOption("server"));
	}

	/**测试账号*/
	public get account(){
		var debug:string = egret.getOption("debug");
		if (typeof Number(debug.substr(0,1) == "number")) {
			return "test" + egret.getOption("debug");
		}
		//临时登录测试
		else {
			this.password = egret.getOption("password");
			return egret.getOption("debug");
		}
	}
	/**测试密码*/
	public password:string = "112233";
}