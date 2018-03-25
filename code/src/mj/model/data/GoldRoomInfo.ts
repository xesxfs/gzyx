/**
 * 金币场房间信息
 * @author chen
 * @date 2016/12/6
 */
class GoldRoomInfo {
	/**金币场信息列表*/
	public infoList = [];

	/**
	 * 读取http数据
	 * @data 
	 */
	public readData(data){
		// var len = data.length;
		// for(var i=0;i<len;i++){
		// 	// var obj = ProtocolHttp.GoldRoomJson;
		// 	obj = data[i];
		// 	obj.versusroomcfg = JSON.parse(data[i].versusroomcfg);
		// 	this.infoList.push(obj);
		// }
	}	

	/**
	 * 获取金币场信息
	 * @gameID 游戏类型 1鸡平胡 2推倒胡
	 * @level 房间等级
	 * @return 返回金币场信息
	 */
	public getData(gameID:number, level:number){
		var len = this.infoList.length;
		for(var i=0;i<len;i++){
			var obj = this.infoList[i];
			if((obj.GameID == (gameID + "")) && obj.level == (level + "")){
				return obj;
			}
		}
		return null;
	}
}


