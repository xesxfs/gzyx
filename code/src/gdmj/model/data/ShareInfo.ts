/**
 * 分享信息
 * @author chenkai
 * @date 2016/11/17
 */
class ShareInfo {

	/**分享的桌子号*/
	public get deskCode(){
		var deskCode = egret.getOption("deskCode");
        if(deskCode && deskCode != ""){
            return deskCode;
        }else{
            return null;
        }
	}

	/**分享的回放码*/
	public get replayCode(){
		return egret.getOption("replayCode");
	}

	/**分享的用户ID*/
    public get pidID(){
		return egret.getOption("pid"); 
	}
	
    /**被分享的用户id*/
    public get userID(){
        return egret.getOption("uid"); 
    }
	
	
	/**分享的桌号ID*/
	public get deskId(){
	    return egret.getOption("deskId");
	}
	
    /**服务器类型*/
    public get serverType():Server_Type{
        var _serverType = egret.getOption("serverType");
        if(_serverType){
            return parseInt(_serverType);
        }
        return null;
    }

    /**游戏ID*/
    public get gameID(){
        var _gameID = egret.getOption("gameID");
        if(_gameID){
            return parseInt(_gameID);
        }
        return null;
    }
    
    public get roomId(){
        return egret.getOption("roomId");
    }
}