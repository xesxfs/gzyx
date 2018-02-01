/**
 * 设备工具类
 * @author chenkai
 * @2016/10/11
 */
class DeviceUtils extends SingleClass{
	
	/**runtimeType 运行在web上*/
	public get IsWeb(){
		return (egret.Capabilities.runtimeType == egret.RuntimeType.WEB);
	}

	/**runtimeType 运行在native上*/
	public get IsNative(){
		return (egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE);
	}
	
	public get IsIos(){
	    return (egret.Capabilities.os=="iOS")
	}
	
	public get IsAndroid(){
        return (egret.Capabilities.os == "Android")
	}
}