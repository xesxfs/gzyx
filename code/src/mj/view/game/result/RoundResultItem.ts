class RoundResultItem extends BaseUI {

	public headImg: eui.Image;
	public nickNameLab: eui.Label;
	public uidLab: eui.Label;
	public card_typeImg: eui.Image;
	public end_typeImg: eui.Image;
	public maskImg: eui.Image;
	public bgImg: eui.Image;
	public bankerImg: eui.Image;
	public descLab: eui.Label;

	public constructor() {
		super();
		this.skinName = "RoundResultItemSkin"
	}

	protected childrenCreated() {
		this.headImg.mask = this.maskImg;
	}

	public setHead(src: string) {
		if (!src) return;
		this.headImg.source = src;
	}

	public update(data, base) {
		let playInfo = ProtocolData.player_result_info;
		playInfo = data;

		// this.setHead(playInfo.avater_url);
		this.uidLab.text = playInfo.uid.toString();
		this.nickNameLab.text = playInfo.nick_name;
		
		//胡牌类型
		if (playInfo.card_type == 0) {
			this.card_typeImg.source = "jiao" + playInfo.jiaopai_flag + "_png"
		} else {
			this.card_typeImg.source = "cardtype_" + playInfo.card_type.toString() + "_png";
		}
		// 庄家标志
		this.bankerImg.visible = playInfo.if_banker == 0 ? false : true;
		// 赢家标志
		if (playInfo.cur_end_flag == 2) {
			this.bgImg.source = "jies_yellow_bg_png";
		}

		if (playInfo.cur_pao_flag > 0) {
			this.end_typeImg.source = "end_type" + playInfo.cur_pao_flag.toString() + "_png";
			this.end_typeImg.visible = true;
		} else {
			this.end_typeImg.visible = false;
		}

		var zheng = { "size": 20, "textColor": 0xFF7A04, "fontFamily": "黑体" };
		var fu = { "size": 20, "textColor": 0x877A71, "fontFamily": "黑体" };
		var tColor = { "size": 20, "textColor": 0xC57E1B, "fontFamily": "黑体" };
		var totalColor = { "size": 24, "textColor": 0xC3591F, "fontFamily": "黑体" };

		//常见问题
		var desc = <Array<egret.ITextElement>>[
			{ text: "合计番数	", style: totalColor }, { text: playInfo.cur_winlose_score / base, style: playInfo.cur_winlose_score > 0 ? zheng : fu }, { text: "	番", style: totalColor }
		];
		if (playInfo.cur_fangpaiji_score != 0) {
			desc.push({ text: "\n番牌鸡	", style: tColor });
			desc.push({ text: playInfo.cur_fangpaiji_score.toString(), style: playInfo.cur_fangpaiji_score > 0 ? zheng : fu })
			desc.push({ text: "		番", style: tColor });
		}
		if (playInfo.cur_gudingji_score != 0) {
			desc.push({ text: "\n固定鸡	", style: tColor });
			desc.push({ text: playInfo.cur_gudingji_score.toString(), style: playInfo.cur_gudingji_score > 0 ? zheng : fu });
			desc.push({ text: "		番", style: tColor });
		}
		if (playInfo.cur_chongfengji_score != 0) {
			desc.push({ text: "\n冲锋鸡	", style: tColor });
			desc.push({ text: playInfo.cur_chongfengji_score.toString(), style: playInfo.cur_chongfengji_score > 0 ? zheng : fu });
			desc.push({ text: "		番", style: tColor });
		}
		if (playInfo.cur_zherengji_score != 0) {
			desc.push({ text: "\n责任鸡	", style: tColor });
			desc.push({ text: playInfo.cur_zherengji_score.toString(), style: playInfo.cur_zherengji_score > 0 ? zheng : fu });
			desc.push({ text: "		番", style: tColor });
		}

		if (playInfo.card_type >= 0) {
			desc.push({ text: "\n" + CardLogic.getInstance().getHuStr(playInfo.card_type) + "	", style: tColor });
			desc.push({ text: playInfo.cur_cardtype_score.toString(), style: playInfo.cur_cardtype_score > 0 ? zheng : fu });
			desc.push({ text: "		番", style: tColor });
		}

		if (playInfo.cur_angang_score != 0) {
			desc.push({ text: "\n暗杠		" + CardLogic.getInstance().getHuStr(playInfo.card_type) + "		", style: tColor });
			desc.push({ text: playInfo.cur_angang_score.toString(), style: playInfo.cur_angang_score > 0 ? zheng : fu });
			desc.push({ text: "		番", style: tColor });
		}
		if (playInfo.cur_minggang_score != 0) {
			desc.push({ text: "\n明杠		" + CardLogic.getInstance().getHuStr(playInfo.card_type), style: tColor });
			desc.push({ text: playInfo.cur_minggang_score.toString(), style: playInfo.cur_minggang_score > 0 ? zheng : fu });
			desc.push({ text: "		番", style: tColor });
		}
		if (playInfo.cur_fanggang_score != 0) {
			desc.push({ text: "\n放杠		" + CardLogic.getInstance().getHuStr(playInfo.card_type), style: tColor });
			desc.push({ text: playInfo.cur_fanggang_score.toString(), style: playInfo.cur_fanggang_score > 0 ? zheng : fu });
			desc.push({ text: "		番", style: tColor });
		}

		this.descLab.textFlow = desc;
	}

}