module FL {
    /**
     * 微信登陆相关
     * @copyright 深圳市天天爱科技有限公司
     * @author Sven
     * @date 2018/3/21
     */
    export class WxApiUtil {
        /**todo 改成本游戏APPID  */
        private static readonly APPID = "wxd1615220058b0405";
        /**todo */
        private static readonly SECRET = "befdc4078139ffebd7fcf89a652075f9"

        /**
         * HTTP请求get方法
         */
        private static get(url: string, callback: Function, thisObj: any) {
            var request: egret.HttpRequest = new egret.HttpRequest();
            request.open(url, egret.HttpMethod.GET);
            request.once(egret.Event.COMPLETE, (e) => {
                var request = <egret.HttpRequest>e.currentTarget;
                console.log("requet.response:" + request.response);
                let re: any;
                try {
                    re = JSON.parse(request.response);
                }
                catch (err) {
                    console.error(err);
                }
                callback.call(thisObj, re);
            }, this);
            request.once(egret.IOErrorEvent.IO_ERROR, (e) => {
                console.log("error : event=" + e);
            }, this);

            request.send();
        }

        /**
         * 获取token
         * @param code 由原生SDK获取
         */
        private static getAccessToken(code: string, callback: Function, thisObj: any) {
            if (!code) return;

            let url: string = "https://api.weixin.qq.com/sns/oauth2/access_token?appid="+this.APPID+"&secret="+this.SECRET+"&code="+code+"&grant_type=authorization_code";
            this.get(url, callback, thisObj);
        }

        // tokenInfo = {
        //     access_token = "ACCESS_TOKEN",
        //     expires_in = 7200,
        //     refresh_token = "REFRESH_TOKEN",
        //     openid = "OPENID",
        //     scope = "SCOPE",
        //     unionid = "SCOPE",
        // }
        private static refreshToken(tokenInfo: any) {
            let refreshToken: string = tokenInfo.refresh_token;
            if (!refreshToken) return;

            let url: string = "https://api.weixin.qq.com/sns/oauth2/refresh_token?appid="+this.APPID+"&grant_type=REFRESH_TOKEN&refresh_token="+refreshToken;
            this.get(url, (revTokenInfo)=>{
                if (revTokenInfo.errcode) {
                    console.warn("refreshToken_error");
                    return;
                }
                else {
                    // Storage.setItem(Storage.WX_ACCESS_TOKEN_INFO, JSON.stringify(revTokenInfo));
                    this.getUserInfo(revTokenInfo);
                }
            }, this);
        }

        //  返回
        //  {
        //  "openid":"OPENID",
        //  "nickname":"NICKNAME",
        //  "sex":1,
        //  "province":"PROVINCE",
        //  "city":"CITY",
        //  "country":"COUNTRY",
        //  "headimgurl": "http://wx.qlogo.cn/mmopen/g3MonUZtNHkdmzicIlibx6iaFqAc56vxLSUfpb6n5WKSYVY0ChQKkiaJSgQ1dZuTOgvLLrhJbERQQ4eMsv84eavHiaiceqxibJxCfHe/0",
        //  "privilege":[
        //  "PRIVILEGE1",
        //  "PRIVILEGE2"
        //  ],
        //  "unionid": " o6_bmasdasdsad6_2sgVt7hMZOPfL"
        //  }
        private static getUserInfo(tokenInfo: any) {
            let acToken: string = tokenInfo.access_token;
            let openId: string = tokenInfo.openid;
            if (!(acToken && openId)) return;

            let url: string = "https://api.weixin.qq.com/sns/userinfo?access_token="+acToken+"&openid="+openId;
            this.get(url, (userinfo)=>{
                if (userinfo.errcode) {
                    console.warn("getUserInfo_error");
                    return;
                }
                else {
                    console.log("WX GET LOGIN SUCCESS");

                    // let vLoginMsg:LoginMsg = new LoginMsg();
                    // vLoginMsg.userName = userinfo.nickname;
                    // vLoginMsg.wxOpenID = userinfo.openid;
                    // vLoginMsg.password = userinfo.headimgurl;
                    // vLoginMsg.machineCode = NativeBridge.getInstance().machineCode;
                    // vLoginMsg.deviceFlag = Game.CommonUtil.DeviceFlag;
                    // vLoginMsg.sex = userinfo.sex;
                    // CommonHandler.setDevLoginMsg(vLoginMsg);
                    // MvcUtil.send(LoginModule.LOGIN_DEV_LOGIN, vLoginMsg);
                }
            }, this);
        }

        public static loginWXQuick() {
            // let localItem = Storage.getItem(Storage.WX_ACCESS_TOKEN_INFO);
            // console.log("WX_ACCESS_TOKEN_INFO:::"+localItem);
            // let localAccessInfo = JSON.parse(localItem);
            // let localAccessToken;
            // if (localAccessInfo) {
            //     localAccessToken = localAccessInfo.access_token
            // }
            // if (!(localAccessToken && localAccessToken.length > 0)) {
            //     console.log("weixin_login::::getcode");
            //     let jsonData = {
            //         "eventType": SendNativeMsgType.SEND_NATIVE_GET_WX_CODE,
            //         "data": {
            //         }
            //     }
            //     NativeBridge.getInstance().sendNativeMessage(JSON.stringify(jsonData));
            // }
            // else {
            //     console.log("weixin_login::::had access_token");
            //     this.refreshToken(localAccessInfo);
            // }
        }

        /**接收原生SDK发送的 WX CODE */
        public static revNativeWXCode(code: string) {
            this.getAccessToken(code, (tokenInfo)=>{
                if (tokenInfo.errcode) {
                    console.log("weixin_login::::getAccessToken_error");
                    return;
                }
                else {
                    this.refreshToken(tokenInfo);
                }
            },this);
        }
    }
}