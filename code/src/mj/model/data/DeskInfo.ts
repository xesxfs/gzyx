/**
 * 桌子信息
 * @author chen
 * @date 2016/11/17
 */
class DeskInfo {
    /**桌子ID*/
    public deskID:number = 0;
    /**桌子拥有者ID*/
    public ownerID:number = 0;
    //房间号还是桌子号呢???????????
    /**房间号*/
    public deskCode:number = 0;
    /**游戏ID*/
    public gameID:Game_ID;
    /**游戏底分*/
    public basePoint:number = 0;
    /**桌子等级*/
    public deskLevel:number = 0;
    
    public chip:number=0;
    
    public curPlayCount:number
    
    public curSitPeopleCoiunt:number
    
    public deposit:number
    
    public deskDesc:string
    
    public deskName:string
    
    public deskNo:number=0
    
    public isGameRunning:boolean=false
    
    public isPlaying:boolean =false
    
    public ownerName:string =""
    
    public peoplecount:number=0
    
    public playCount:number =0
    
    public  gameConfig
    
    public readData(deskInfo){
        this.deskID = deskInfo.deskID;
        this.ownerID = deskInfo.ownerID;
        this.deskCode = deskInfo.deskCode;
        this.gameID = deskInfo.gameid;
        this.deskLevel = deskInfo.deskLevel;
        this.chip=deskInfo;
        this.curPlayCount=deskInfo;
        this.curSitPeopleCoiunt=deskInfo;
        this.deposit = deskInfo.deposit;
        this.deskDesc = deskInfo.deskDesc;
        this.deskName = deskInfo.deskName;
        this.deskNo = deskInfo.deskNo;
        this.isGameRunning = deskInfo.isGameRunning;
        this.isPlaying = deskInfo.isPlaying;
        this.ownerName = deskInfo.ownerName;
        this.peoplecount = deskInfo.peoplecount;
        this.playCount = deskInfo.playCount;        
        this.gameConfig = deskInfo.gameConfig;
        

        //服务端有时是大写basePoint有时是小写basepoint
        if(deskInfo.basepoint){
            this.basePoint = deskInfo.basepoint;
        }else if(deskInfo.basePoint){
            this.basePoint = deskInfo.basePoint;
        }


    }
}