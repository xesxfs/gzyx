/**
 * 背包信息
 * @author chenwei
 *
 */
class BagInfo {
    public itemList = [];
}

/**0系统道具1抽奖2金币道具3钻石道具4兑换码道具*/
enum ItemType {
    SYSTEM,
    LOTTERY,
    GOLD,
    DIAMOND,
    EXCHANGE
}