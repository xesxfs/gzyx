/**
 * 服务器信息
 * @author chenkai
 * @date 2016/6/28
 */
class ServerInfo {
    /**Python调度服务器IP地址*/
    public SERVER_URL: string;
    /**Python推送服务器IP地址*/
    public PUSH_SERVER_URL: string;
    //游戏服务器
    public GAME_SERVER: string;
    //游戏断口
    public GAME_PORT: number;
    /**密码MD5码*/
    public MD5PASS: string;
    /**微信授权页面(无用)*/
    public WX_URL: string = "";

    /**php地址*/
    public get WEB_URL() {
        // 判断是否本地测试php地址 
        if (App.DataCenter.debugInfo.isLocalPhp == 1) {
            return "http://test.heroscocks.com/%1?uid=%2&skey=%3&param=%4";
        } else if (App.DataCenter.debugInfo.isLocalPhp == 2) {
            return "http://192.168.1.192/majapi/api.php";
        } else {
            // return "http://yxjmj.heroscocks.com/http_api/api.php?ver=1.0&action=%1&uid=%2&skey=%3&param=%4";
            // return "http://yxjmj.heroscocks.com:8383/%1?uid=%2&skey=%3&param=%4";
            // return "http://47.106.104.222/%1?uid=%2&skey=%3&param=%4";
            return "http://test.heroscocks.com/%1?uid=%2&skey=%3&param=%4";
        }
    }
}
