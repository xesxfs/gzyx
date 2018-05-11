/**
 * 声音管理类
 * @author chenkai
 * @date 2016/6/30
 */
class SoundManager extends SingleClass {
    private soundList = {};                    //声音列表
    private bgmChannel: egret.SoundChannel;     //背景音声道
    private _allowPlayEffect: boolean = true;   //是否允许播放音效
    private _allowPlayBGM: boolean = true;      //是否允许播放背景音乐
    private _effectVolume: number = 1;          //音效音量
    private _bgmVolume: number = 1;             //背景音量

    private girlCard = [];                     //女生出牌
    private girlAct = [];                      //女生动作
    private boyCard = [];                      //男生出牌
    private boyAct = [];                       //男生动作

    private gd_girlCard = [];                  //广东话
    private gd_girlAct = [];
    private gd_boyCard = [];
    private gd_boyAct = [];

    private boyChat = [];                      //聊天语音
    private girlChat = [];
    private gd_boyChat = [];
    private gd_girlChat = [];

    public isGuangDongSpeak: boolean = false; //游戏广东话、普通话

    public static win: string = "audio_win_mp3";                  //胜利
    public static lose: string = "audio_lose_mp3";                //输
    public static warn: string = "audio_warn_mp3";                //倒计时小于3秒
    public static hall_click: string = "audio_button_click_mp3";  //大厅点击按钮
    public static clickCard: string = "audio_card_click_mp3";     //点击牌
    public static enter: string = "audio_enter_mp3";              //玩家进入
    public static bgm: string = "Audio_Game_Back_mp3";            //背景音乐
    public static user_left: string = "audio_left_mp3";           //玩家离开
    public static liuju: string = "audio_liuju_mp3";              //流局
    public static ready: string = "audio_ready_mp3";              //准备
    public static shazi: string = "audio_shaizi_mp3";             //骰子
    public static tuoGuan: string = "audio_tuo_guan_mp3";         //托管
    public static button: string = "audio_button_click_mp3"       //按钮

    public constructor() {
        super();
        //筒索万
        for (var i = 0; i < 9; i++) {
            this.boyCard[11 + i] = (i + 1) + "wan_m" + "_mp3";
            this.boyCard[31 + i] = (i + 1) + "tiao_m" + "_mp3";
            this.boyCard[51 + i] = (i + 1) + "tong_m" + "_mp3";

            this.girlCard[11 + i] = (i + 1) + "wan_w" + "_mp3";
            this.girlCard[21 + i] = (i + 1) + "tiao_w" + "_mp3";
            this.girlCard[31 + i] = (i + 1) + "tong_w" + "_mp3";

            // this.gd_boyCard[0x11+i] = "gd_man" + (i+11) + "_mp3";
            // this.gd_boyCard[0x21+i] = "gd_man" + (i+31) + "_mp3";
            // this.gd_boyCard[0x31+i] = "gd_man" + (i+21) + "_mp3";
            // this.gd_girlCard[0x11+i] = "gd_woman" + (i+11) + "_mp3";
            // this.gd_girlCard[0x21+i] ="gd_woman" + (i+31) + "_mp3";
            // this.gd_girlCard[0x31+i] = "gd_woman" + (i+21) + "_mp3";
        }

        //吃碰杠胡，每个声音3种
        this.boyAct[ACT_act.Act_Chi] = [];
        this.boyAct[ACT_act.Act_AnGang] = [];
        this.boyAct[ACT_act.Act_Gang] = [];
        this.boyAct[ACT_act.Act_Hu] = [];
        this.boyAct[ACT_act.Act_Peng] = [];
        this.boyAct[ACT_act.Act_zimo] = [];

        this.girlAct[ACT_act.Act_Chi] = [];
        this.girlAct[ACT_act.Act_AnGang] = [];
        this.girlAct[ACT_act.Act_Gang] = [];
        this.girlAct[ACT_act.Act_Hu] = [];
        this.girlAct[ACT_act.Act_Peng] = [];
        this.girlAct[ACT_act.Act_zimo] = [];

        this.gd_boyAct[ACT_act.Act_Chi] = [];
        this.gd_boyAct[ACT_act.Act_AnGang] = [];
        this.gd_boyAct[ACT_act.Act_Gang] = [];
        this.gd_boyAct[ACT_act.Act_Hu] = [];
        this.gd_boyAct[ACT_act.Act_Peng] = [];
        this.gd_boyAct[ACT_act.Act_zimo] = [];

        this.gd_girlAct[ACT_act.Act_Chi] = [];
        this.gd_girlAct[ACT_act.Act_AnGang] = [];
        this.gd_girlAct[ACT_act.Act_Gang] = [];
        this.gd_girlAct[ACT_act.Act_Hu] = [];
        this.gd_girlAct[ACT_act.Act_Peng] = [];
        this.gd_girlAct[ACT_act.Act_zimo] = [];

        for (var i = 0; i < 3; i++) {
            this.boyAct[ACT_act.Act_Chi][i] = "man_chi" + i + "_mp3";
            this.boyAct[ACT_act.Act_AnGang][i] = "man_gang" + i + "_mp3";
            this.boyAct[ACT_act.Act_Gang][i] = "man_gang" + i + "_mp3";
            this.boyAct[ACT_act.Act_Hu][i] = "man_hu" + i + "_mp3";
            this.boyAct[ACT_act.Act_Peng][i] = "man_peng" + i + "_mp3";
            this.boyAct[ACT_act.Act_zimo][i] = "man_zimo" + i + "_mp3";
            this.girlAct[ACT_act.Act_Chi][i] = "woman_chi" + i + "_mp3";
            this.girlAct[ACT_act.Act_AnGang][i] = "woman_gang" + i + "_mp3";
            this.girlAct[ACT_act.Act_Gang][i] = "woman_gang" + i + "_mp3";
            this.girlAct[ACT_act.Act_Hu][i] = "woman_hu" + i + "_mp3";
            this.girlAct[ACT_act.Act_Peng][i] = "woman_peng" + i + "_mp3";
            this.girlAct[ACT_act.Act_zimo][i] = "woman_zimo" + i + "_mp3";

            this.gd_boyAct[ACT_act.Act_Chi][i] = "gd_man_chi" + i + "_mp3";
            this.gd_boyAct[ACT_act.Act_AnGang][i] = "gd_man_gang" + i + "_mp3";
            this.gd_boyAct[ACT_act.Act_Gang][i] = "gd_man_gang" + i + "_mp3";
            this.gd_boyAct[ACT_act.Act_Hu][i] = "gd_man_hu" + i + "_mp3";
            this.gd_boyAct[ACT_act.Act_Peng][i] = "gd_man_peng" + i + "_mp3";
            this.gd_boyAct[ACT_act.Act_zimo][i] = "gd_man_zimo" + i + "_mp3";
            this.gd_girlAct[ACT_act.Act_Chi][i] = "gd_woman_chi" + i + "_mp3";
            this.gd_girlAct[ACT_act.Act_AnGang][i] = "gd_woman_gang" + i + "_mp3";
            this.gd_girlAct[ACT_act.Act_Gang][i] = "gd_woman_gang" + i + "_mp3";
            this.gd_girlAct[ACT_act.Act_Hu][i] = "gd_woman_hu" + i + "_mp3";
            this.gd_girlAct[ACT_act.Act_Peng][i] = "gd_woman_peng" + i + "_mp3";
            this.gd_girlAct[ACT_act.Act_zimo][i] = "gd_woman_zimo" + i + "_mp3";
        }

        //聊天语音
        for (var i = 0; i <= 7; i++) {
            this.boyChat.push("man_chat" + i + "_mp3");
            this.gd_boyChat.push("gd_man_chat" + i + "_mp3");
            this.girlChat.push("woman_chat" + i + "_mp3");
            this.gd_girlChat.push("gd_woman_chat" + i + "_mp3");
        }

    }

    /**
     * 播放出牌声音
     * @cardValue 牌值
     * @sex 性别
     */
    public playOutCard(cardValue: number, sex: number = SEX_TYPE.boy) {
        if (sex == SEX_TYPE.boy) {
            if (this.isGuangDongSpeak) {
                this.playEffect(this.gd_boyCard[cardValue]);
            } else {
                this.playEffect(this.boyCard[cardValue]);
            }
        } else {
            if (this.isGuangDongSpeak) {
                this.playEffect(this.gd_girlCard[cardValue]);
            } else {
                this.playEffect(this.girlCard[cardValue]);
            }
        }
    }

    /**
     * 播放动作声音
     * @act 吃碰杠胡等动作
     * @sex 性别
     */
    public playAct(act: ACT_act, sex: number = SEX_TYPE.boy) {
        var rand = NumberTool.getRandInt(0, 2);
        if (sex == SEX_TYPE.boy) {
            if (this.isGuangDongSpeak) {
                this.gd_boyAct[act] && this.playEffect(this.gd_boyAct[act][rand]);
            } else {
                this.boyAct[act] && this.playEffect(this.boyAct[act][rand]);
            }
        } else {
            if (this.isGuangDongSpeak) {
                this.gd_girlAct[act] && this.playEffect(this.gd_girlAct[act][rand]);
            } else {
                this.girlAct[act] && this.playEffect(this.girlAct[act][rand]);
            }
        }
    }

    /**
     * 播放聊天语音
     * @chatType 聊天类型0-7
     * @sex 性别
     */
    public playChat(chatType: number, sex: number = SEX_TYPE.boy) {
        if (sex == SEX_TYPE.boy) {
            if (this.isGuangDongSpeak) {
                this.gd_boyChat[chatType] && this.playEffect(this.gd_boyChat[chatType]);
            } else {
                this.boyChat[chatType] && this.playEffect(this.boyChat[chatType]);
            }
        } else {
            if (this.isGuangDongSpeak) {
                this.gd_girlChat[chatType] && this.playEffect(this.gd_girlChat[chatType]);
            } else {
                this.girlChat[chatType] && this.playEffect(this.girlChat[chatType]);
            }
        }
    }

	/**
	 * 播放音效
	 * @param soundName 声音名
	 * @param startTime 播放起始位置
	 * @param loops 循环次数
	 */
    public playEffect(soundName: string, startTime: number = 0, loops: number = 1) {
        if (this.allowPlayEffect == false) {
            return;
        }
        //从声音列表中获取,声音列表中不存在，则从加载资源中获取
        var sound: egret.Sound = this.soundList[soundName];
        if (sound == null) {
            sound = RES.getRes(soundName);
            if (sound != null) {
                this.soundList[soundName] = sound
            } else {
                //TODO 从resource/assets中加载，则使用一个加载一个，而不需要全部加载
            }
        }
        if (sound) {
            sound.type = egret.Sound.EFFECT;
            var channel: egret.SoundChannel = sound.play(startTime, loops);
            channel.volume = this._effectVolume;
        }
    }

	/**
	 * 播放背景音乐
	 * @param bgmName 背景音名
	 * @param startTime 播放起始位置
	 * @param loops 循环次数
	 */
    public playBGM(bgmName: string, startTime: number = 0, loops: number = Number.MAX_VALUE) {
        // if(this.allowPlayBGM == false || this.bgmChannel != null  || App.SceneManager.getCurScene() == App.SceneManager.getScene(SceneConst.HallScene)) {
        //     return;
        // }
        this.stopBGM();
        var bgm: egret.Sound = this.soundList[bgmName];
        if (bgm == null) {
            bgm = RES.getRes(bgmName);
            bgm && (this.soundList[bgmName] = bgm);
        }
        if (bgm) {
            bgm.type = egret.Sound.MUSIC;
            this.bgmChannel = bgm.play(startTime, loops);
            this.bgmChannel.volume = this._bgmVolume;
        }

    }

    /**停止背景音乐*/
    public stopBGM() {
        if (this.bgmChannel) {
            this.bgmChannel.stop();
            this.bgmChannel = null;
        }
    }

    /**获取是否允许播放音效*/
    public get allowPlayEffect() {
        return this._allowPlayEffect;
    }

    /**设置是否允许播放音效*/
    public set allowPlayEffect(bAllow: boolean) {
        this._allowPlayEffect = bAllow;
    }

    /**获取是否允许播放背景音*/
    public get allowPlayBGM() {
        return this._allowPlayBGM;
    }

    /**设置是否允许播放背景音*/
    public set allowPlayBGM(bAllow: boolean) {
        this._allowPlayBGM = bAllow;
        if (this._allowPlayBGM == false) {
            this.stopBGM();
        } else {
            this.playBGM(SoundManager.bgm);
        }
    }

    /**获取音效音量*/
    public get effectVolume() {
        return this._effectVolume;
    }

    /**设置音效音量*/
    public set effectVolume(value: number) {
        this._effectVolume = value;
    }

    /**获取BGM音量*/
    public get bgmVolume() {
        return this._bgmVolume;
    }

    /**设置BGM音量*/
    public set bgmVolume(value: number) {
        this._bgmVolume = value;
        if (this.bgmChannel) {
            this.bgmChannel.volume = this._bgmVolume;
        }
    }

    /**停止所有声音 */
    public stopAllSound() {
        this.stopBGM();
    }
}
