/**
 * 用户数据VO
 * @author chen
 * @date 2016/6/28
 */
class UserVO {
    /**用户ID*/
    public userID: number = 0;
    /**昵称*/
    public nickName: string = "";
    /**积分*/
    public point: number = 0;
    /**钻石*/
    public coin: number = 0;
    /**独立房卡*/
    public roomCard: number = 0;
    /**共付房卡*/
    public roomCardCoop: number = 0;
    /**用户IP*/
    public IP: string = "";
    /**用户位置 0-3  0下 1右 2中上 3左*/
    public userPos: UserPosition;
    /**玩家座位号*/
    public seatID: number = 0;
    /**是否是桌子拥有者*/
    public deskOwner: boolean = false;
    /**玩家状态*/
    public state: PLAYER_STATE;
    /**玩家性别*/
    public sex: SEX_TYPE = SEX_TYPE.girl;
    /**签到状态 1允许签到  0不允许签到*/
    public signFlag: number = 0;
    /**用户头像地址*/
    private _headUrl = "";
    /**是否点击分享链接进入，并玩了一局游戏  1是，0否*/
    public hadinvited: number = 0;
    /**验证用户有效性*/
    public skey: string = "";
    /**is_vip */
    public is_vip: number = 0;
    /**vip等级*/
    public vipLevel: number = 0;
    /**金币*/
    public gold: number = 0;
    /**过期时间**/
    public isOvertime: number;
    /**房间名称**/
    public excluroomName: string;
    /**房间号**/
    public excluroomCode: string;
    /**游客标识 */
    public visitorFlag: number;
    /** 胜利场数 */
    public win_board: number;
    /** 失败场数 */
    public lose_board: number;
    /** 平局场数 */
    public pin_board: number;
    /** 排位分 */
    public paiwei_score: number;
    /** 排位等级 */
    public paiwei_rank: number;
    /** 等级名称 */
    public paiwei_rank_name: string;

    //服务端头像默认传送的不是字符串，而是数字，导致加载头像无法识别
    public set headUrl(url: any) {
        if (url == 1) {
            this._headUrl = "";
        } else {
            this._headUrl = url;
        }
    }

    public get headUrl() {
        return this._headUrl;
    }

    /**
     * 设置玩家状态
     * @state 状态位
     * @value 状态值
     */
    public setState(state: PLAYER_STATE, value: boolean) {
        if (value) {
            this.state = this.state | state;
        } else {
            this.state = this.state & (~state);
        }
        console.log(this.state);
    }

    /**
     * 检查玩家状态
     * @state 状态位
     * return true状态位1   false状态位0
     */
    public checkState(state: PLAYER_STATE): boolean {
        return ((this.state & state) > 0);
    }
}
