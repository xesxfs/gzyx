/**
 *
 * @author chen
 *  2017/01/16
 * 跑马灯信息
 */
class MarqueeInfo {

        public constructor() {
                this.init();
        }
        private gameMarquee: Array<string>;
        public messageMarquee: Array<string>;
        private init() {
                this.gameMarquee = [
                        "%1【%2】的%3牌技果然精湛，竟然以%4结束了这场牌局！",
                        "%1【%2】的%3出其不意的以%4力压群雄！",
                        "%1【%2】惊现%4牌型,%3在牌技的道路上又更近了一步！"
                ]
                this.messageMarquee = [];
        }

        public setMsgMarquee(data) {
                for (var i = 0; i < data.length; i++) {
                        this.messageMarquee.push(data[i]["content"]);
                }
        }

        //获取游戏跑马灯
        public getGameMqrquee(roomName: string, roomNo: number, userName: string, mjType: string): string {
                let marquee: string = this.gameMarquee[NumberTool.getRandInt(0, this.gameMarquee.length - 1)]
                marquee = marquee.replace("%1", decodeURIComponent(roomName))
                marquee = marquee.replace("%2", roomNo.toString())
                marquee = marquee.replace("%3", userName)
                marquee = marquee.replace("%4", mjType);
                return marquee;
        }
}
