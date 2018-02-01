/**
 * 数字工具类
 * @author chenkai
 * @date 2016/6/29
 */
class NumberTool {
    
    /**
     * 将数字格式化为时间数字, 例 5 -> "05"
     * @param num 待格式化数字
     * @returns 格式化后的数字字符串
     */ 
    public static formatTime(num:number):string{
    	  if(num >=0 && num < 10){
        	  return "0" + num;
    	  }else{
        	  return num + "";
    	  }
	}
	
	/**
	 * 获取随机整数   getRandInt(1,5) 返回1,2...5任意整数
	 * @start 起始数
	 * @end  终止数
	 * @return 随机值
	 */
	public static getRandInt(start:number, end:number):number{
		return (Math.round(Math.random()*(end-start)) + start);
	}

	/**
	 * 获取数字1~9对应的"一"~"九"
	 * @num 阿拉伯数字
	 * @return 大写数字
	 */
	public static formatCapital(num:number):string{
		if(num <=0 || num >=10){
			return "";
		}
		return (["一","二","三","四","五","六","七","八","九"])[num-1];
	}

	/**
	 * 当数字超过10万时，将数字进行转换。例如10万的金币，"117315"转换成"11.73万"。
	 * @num 待转换数字
	 * @return 转换结果
	 */
	public static formatMoney(num:number):string{
		if(num >= 10000 || num<=-10000){
			return Math.round(num/100)/100 + "万";
		}else{
			return num + "";
		}
	}
}
