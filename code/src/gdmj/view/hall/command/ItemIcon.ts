/**
 *
 * @author 
 *
 */
module ItemIcon {
    
    var nameCode = [];
    var idCode=[];
    nameCode["钻石"] = "itemicon_diamond0_png";
    nameCode["金币"] = "shop_gold_png";
    nameCode["独立型房卡"] = "com_icon_card1_png";
    nameCode["共付型房卡"] = "com_icon_card1_png";
    nameCode["房卡"] = "com_icon_card1_png";
    nameCode["房卡(独立型)"] = "com_icon_card1_png";
    nameCode["房卡(共付型)"] = "com_icon_card1_png";
    nameCode["10个独立型房卡"] = "com_icon_card1_png";
    nameCode["30个独立型房卡"] = "com_icon_card1_png";
    nameCode["10个共付型房卡"] = "com_icon_card1_png";
    nameCode["30个共付型房卡"] = "com_icon_card1_png";
    
    nameCode["孖宝兄弟"] = "item_act_self_png";
    nameCode["孖宝兄弟(7天)"] = "item_act_self_png";
    nameCode["专属动作"] = "item_act_self_png";
    nameCode["默认动作"] = "item_act_def_png";
    nameCode["VIP动作"] = "item_act_vip_png";
    
    nameCode["专属表情"] = "item_face_self_png";
    nameCode["默认表情"] = "item_face_def_png";
    nameCode["VIP表情"] = "item_face_vip_png";
    nameCode["经典表情"] = "item_face_vip_png";
    nameCode["经典表情(7天)"] = "item_face_vip_png";
    nameCode["悠嘻猴"] = "item_face_self_png";
    nameCode["悠嘻猴(7天)"] = "item_face_self_png";
    
    nameCode["VIP场景"] = "shop_s3_select_png";
    nameCode["默认场景"] = "shop_s1_select_png";
    nameCode["专属场景"] = "shop_s2_select_png";    
    nameCode["春风悠扬"] = "shop_s3_select_png";
    nameCode["世外雅苑"] = "shop_s1_select_png";
    nameCode["皇家王座"] = "shop_s2_select_png";
    nameCode["春风悠扬(7天)"] = "shop_s3_select_png";
    nameCode["室外雅苑(7天)"] = "shop_s1_select_png";
    nameCode["皇家王座(7天)"] = "shop_s2_select_png";

    
    export function getIcon4Name(name:string):string{        
        let icons=nameCode[name];
        if(!icons){icons=""};        
        return icons;
    }

    /**
     * 获取商城中物品对应的图标资源名
     * @type 商品类型
     * @index 商品在http请求返回的数组中的下标，一般数字越小，商品数量越少，对应的图标上金币(钻石数)也少
     * @return 返回对应的图标资源名
    */
    export function getShopIcon(type:ShopType, index:number = 0){
        switch(type){
            case ShopType.Gold:
                var goldIcon = "itemicon_gold" + index + "_png";
                return RES.hasRes(goldIcon)?goldIcon:"item_icon_gold7_png";
            case ShopType.Diamon:
                var diamondIcon = "itemicon_diamond" + index + "_png";
                return RES.hasRes(diamondIcon)?diamondIcon:"itemicon_diamond6_png";
            case ShopType.Item:
                var cardIcon = "itemicon_card" + index + "_png";
                return RES.hasRes(cardIcon) ? cardIcon : "itemicon_card0_png";                
        }
    }

    /**抽奖图片*/
    var lotteryIconList = {
        "金币":"com_icon_gold1_png",
        "钻石":"com_icon_diamond1_png",
        "房卡":"com_icon_card0_png"
    }

    /**
     * 获取抽奖奖品图片
     * @name 奖品名称
     */
    export function getLotteryIcon(name:string){
        var icon =  lotteryIconList[name];
        if(!icon){icon="";}
        return icon;
    }

}
