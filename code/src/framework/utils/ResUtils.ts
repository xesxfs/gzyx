/**
 * 资源管理类
 * @author chen
 * @date 2016/9/8
 * 
 * 功能：
 * 1. 设置单一加载版本 initResVersion
 * 2. 序列加载配置     loadConfig
 * 3. 加载资源组       loadGroup
 * 4. 带动画加载资源组  loadUIAsset
 */
class ResUtils extends SingleClass{
	/**待加载资源组 */
	private groupList:Array<any>;
	/**待加载配置列表*/
	private configList:Array<any>;
	/**配置加载完成回调*/
    private onConfigComplete:Function;
	/**配置加载完成回调执行对象*/
    private onConfigCompleteTarget:any;

	public constructor() {
        super();

		this.initResVersion();
		this.groupList = new Array<any>();
        this.configList = new Array<any>();

		RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceLoadProgress, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
    }

	/**
     * Res加载使用版本号的形式
	 * version在index.php页面设置
     */
    private initResVersion():void {
		if(window && window["version"]){
			RES.web.Html5VersionController.prototype.getVirtualUrl = function (url) {
				var version:string = window["version"];
				if (url.indexOf("?") == -1) {
					url += "?ver=" + version;
				} else {
					url += "&ver=" + version;
				}
				return url;
			}
		}
    }

	/**
     * 添加一个配置文件
     * @jsonPath resource.json路径
     * @filePath 访问资源路径
     */
    public addConfig(jsonPath:string, filePath:string) {
        this.configList.push([jsonPath, filePath]);
    }

    /**
     * 开始加载配置文件
     * @onConfigComplete 加载完成执行函数
     * @onConfigCompleteTarget 加载完成执行函数所属对象
     */
    public loadConfig(onConfigComplete:Function, onConfigCompleteTarget:any) {
        this.onConfigComplete = onConfigComplete;
        this.onConfigCompleteTarget = onConfigCompleteTarget;
        this.loadNextConfig();
    }

    /**
     * 加载下一项配置
     */
    private loadNextConfig() {
        //加载完成
        if (this.configList.length == 0) {
            this.onConfigComplete.call(this.onConfigCompleteTarget);
            this.onConfigComplete = null;
            this.onConfigCompleteTarget = null;
            return;
        }

        var arr:any = this.configList.shift();
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigCompleteHandle, this);
        RES.loadConfig(arr[0], arr[1]);
    }

    /**
     * 加载配置完成
     */
    private onConfigCompleteHandle(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigCompleteHandle, this);
        this.loadNextConfig();
    }
    
    /**
     * 静默加载 (无回调)
     * @group 资源组名称(支持字符串和数组)
     * @priority 加载优先级 数字越大，优先级越高
     */ 
    public loadGroupQuiet(group:any,priority:number = 1){
        var groupName: string = this.combGroupName(group);
        RES.loadGroup(groupName,priority);
    }

	/**
     * 加载资源组 (有回调)
     * @group 资源组名称(支持字符串和数组)
	 * @thisObject 资源加载监听函数所属对象
     * @onComplete 资源加载完成执行函数
     * @onProgress 资源加载进度监听函数
     */
    public loadGroup(group:any, thisObject:any=null, onComplete:Function=null, onProgress:Function=null, priority:number = 1):void {
        var groupName:string = this.combGroupName(group);
        this.groupList[groupName] = [onComplete, onProgress, thisObject];
        this.loadGroupQuiet(group,priority)
    }

    /**
     * 资源组加载完成
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        var groupName:string = event.groupName;
		// console.log("加载资源组完成:",groupName);
        if (this.groupList[groupName]) {
            var loadComplete:Function = this.groupList[groupName][0];
            var loadCompleteTarget:any = this.groupList[groupName][2];
            if (loadComplete != null) {
                loadComplete.call(loadCompleteTarget);
            }
			this.deleteCallBack(groupName);
        }
    }

    /**
     * 资源组加载进度
     */
    private onResourceLoadProgress(event:RES.ResourceEvent):void {
        var groupName:string = event.groupName;
        if (this.groupList[groupName]) {
            var loadProgress:Function = this.groupList[groupName][1];
            var loadProgressTarget:any = this.groupList[groupName][2];
            if (loadProgress != null) {
                loadProgress.call(loadProgressTarget, event);
            }
        }
    }

    /**
     * 资源组加载失败
     * @param event
     */
    private onResourceLoadError(event:RES.ResourceEvent):void {
		// console.error(event.groupName + "资源组加载失败");
        this.onResourceLoadComplete(event);
    }

	/**
	 * 停止加载资源组的回调函数
	 * @groupName 资源组名
	 */
	public deleteCallBack(groupName){
		// console.log("取消加载资源组回调:"+ groupName);

		//删除列表中回调
		this.groupList[groupName] = null;
		delete this.groupList[groupName];
	}

	/**删除所有资源组回调*/
	public deleteAllCallBack(){
		for(var key in this.groupList){
			this.deleteCallBack(key);
		}
	}

	/**
	 * 拼接资源组名
	 * @group 资源数组
	 * @return 资源组名
	 */
	private combGroupName(group):string{
        var groupName = "";
        if(typeof (group) == "string") {
            groupName = group;
        } else {
            var len = group.length;
            for(var i=0;i<len;i++){
                groupName += group[i];
            }
            RES.createGroup(groupName,group);
        }
		return groupName;
	}
}