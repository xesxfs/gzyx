/**
 * 用户数据
 * @author chenkai 
 * @date 2016/6/28
 */
class UserInfo {
    /**[userID][userVO] 全部用户列表(包括自己)  对应to_game,由于to_game大量数据冗余，只选择保存需要的*/
    public userList = {};
    /**用户http登录时，保存自己数据*/
    public selfUser:UserVO;
    
    /**
     * 添加用户
     * @param userVo 用户数据Vo
     */ 
    public addUser(userVo:UserVO){
        if(this.userList[userVo.userID]){
            console.log("用户重复添加:",userVo.userID);
        }else{
            this.userList[userVo.userID] = userVo;
        }
    }
    
    /**获取自己用户信息*/
    public getMyUserVo():UserVO{
        return this.getUser(this.selfUser.userID);
    }

    /**修改自己的名字 */
    public changeName(str) {
        var user:UserVO = this.getUser(this.selfUser.userID);
        user.nickName = str;
    }
    
    /**
     * 获取用户
     * @param userId 用户userId
     * @returns 返回用户信息
     */ 
    public getUser(userID:number){
        return this.userList[userID];
    }

    /**
     * 判断用户是否存在
     * @userID 用户ID
     * @return 是否存在
     */
    public isExist(userID:number){
        if(this.getUser(userID)){
            return true;
        }else{
            return false;
        }
    }
    
    /**
     * 根据座位号获取用户信息
     * @param seatID 座位号
     * @returns 返回用户信息
     */ 
    public getUserBySeatID(seatID:number):UserVO{
        for(var key in this.userList){
            if(this.userList[key].seatID == seatID){
                return this.userList[key];
            }
        }
    }

    /**
     * 根据pos获得用户信息
     */
    public getUserByPos(pos:UserPosition):UserVO{
        for(let key in this.userList){
            if(this.userList[key].userPos == pos){
                return this.userList[key];
            }
        }
        return null;
    }

        /**
     * 根据userID获取用户信息
     * @param userID 
     * @returns 返回用户信息
     */ 
    public getUserByUserID(userID:number):UserVO{
        for(var key in this.userList){
            if(this.userList[key].userID == userID){
                return this.userList[key];
            }
        }
    }

    /**
     * 删除用户信息
     * @param userID 用户ID
     */
    public deleteUser(userID:number){
        delete this.userList[userID];
    }

    /**删除所有用户信息，除了自己*/
    public deleteAllUserExcptMe(){
        for(var key in this.userList){
            if(parseInt(key) != this.selfUser.userID){
                delete this.userList[key];
            }
        }
    }
    /**删除所有用户信息*/
    public deleteAllUser() {
        for(var key in this.userList) {
                delete this.userList[key];
        }
    }

    /**获取用户数量*/
    public getUserNum(){
        return ArrayTool.getObjectLength(this.userList);
    }
    

}
