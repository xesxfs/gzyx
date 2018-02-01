/**
 * 登录界面
 * @author chenwei
 * @date 2016/6/27
 */
class LoginScene extends BaseScene{
    /**控制模块*/
    protected ctrl:LoginController;

    private editText: eui.EditableText;

    public constructor() {
        super();       
        this.skinName = "LoginSceneSkin";
	}
    
    protected onEnable() {    
        App.NativeBridge.getBagType();
    }

    protected onRemove() {
        
    }

    /**判断本机是否存在token */     
    private isToken(){         
        var refreshToken = egret.localStorage.getItem("refresh_token");         
        if(refreshToken != null&&refreshToken != undefined){             
            var ctrl1 = new LoginController();             
            ctrl1.sendLoginAppReq("",refreshToken);         
        }else{                 
        }     
    }

    //原生登陆放回     
    private backWXLogin(){         
        egret.ExternalInterface.addCallback("wxLoginBack", function (message:string) {             
            var ctrl1 = new LoginController();             
            ctrl1.sendLoginAppReq(message,"");         
        });   
    }

    /**点击微信登录*/   
    private onWXLogin(e: egret.Event) {
		//egret.ExternalInterface.call("wxLogin","wx"); 
        /**test */
        if (!this.editText) {
            this.showTestInput();
        }
        else {
            if (this.editText.text != "") {
                this.ctrl.sendDebugLoginReq(this.editText.text, App.DataCenter.debugInfo.password);
            }
        }
    } 

    /**Native资源更新列表*/
    private getChangeList(){
        var changeList = RES.getVersionController().getChangeList();
        var len = changeList.length;
        console.log("加载列表长度:" + len);
        for(var i=0;i<len;i++){
            console.log("加载列表" + i + ":" + changeList[i].url + "," + changeList[i].size);
        }
    }
    
    /**输入测试账号 */
    private showTestInput() {
        this.editText = new eui.EditableText();
        this.editText.y = 800;
        this.editText.size = 40;
        this.editText.width = 200;
        this.editText.height = 100;
        this.editText.textColor = 0x8CC254;
        this.editText.horizontalCenter = 0;
        this.editText.prompt = "输入账号";
        this.editText.setFocus();
        this.addChild(this.editText);
    }

   /**测试账号按钮*/
   private debugBtns(){
        var row=2;
        var column=6;
        var xoffset=450;
        var yoffset=40
        
        for(var i = 1;i <= 16;i++) {
            let b=new eui.Label();
            let ii=i-1;
            b.background=true;
            b.backgroundColor=0x000000;
            b.text = "test" +i.toString();
            
            b.x = ii % column * 100 + xoffset
            b.y = yoffset + ~~(ii / column) * 60;
           
            b.x=~~(ii/row)*80+xoffset
            b.y=yoffset+(ii%row)*60;
            this.addChild(b);
            b.addEventListener(egret.TouchEvent.TOUCH_TAP,(e:egret.TouchEvent)=>{   
            let lab= <eui.Label>e.target;                 
            
            this.ctrl.sendDebugLoginReq(lab.text, App.DataCenter.debugInfo.password);
            },this)
        }
    }
}
