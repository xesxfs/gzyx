/**
 * 福利数据，可以领取的福利
 * @author chenkai
 * @date 2016/11/16
 */
class WelfareInfo {
	/**已领取救济金次数*/
	public benefit_cnt:number = 0;
	/**领取次数限制。领取次数小于最大次数限制时，才可以领取救济金*/
	public benefitMax:number = 3;
	/**是否可以领取救济金 0不可领取 1可领取*/
	public benefitflag:number = 0;
	/**低于多少钱可以领取救济金*/
	public broke_money:number = 0;

	/**是否可以申请领取救济金*/
	public isCanApply(){
		if(this.benefit_cnt >= this.benefitMax || App.DataCenter.UserInfo.getMyUserVo().gold >= this.broke_money){
			return false;
		}
		return true;
	}
}