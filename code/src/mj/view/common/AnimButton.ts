module how {
	/**
	 *带动画特效的Button
	 * @author none
	 *
	 */
    export class AnimButton extends eui.Button {
        public animDisplay: how.Animator;

        public constructor() {
            super();
        }

        public get getanimDisplay(): how.Animator {
            return this.animDisplay;
        }
        /**
         * 获取按钮上的特效播放一次的持续时间
         * @return delay {number} 特效持续时间(毫秒)
         */ 
        public getAnimDelay(): number {
            return this.animDisplay.getAnimDuration();
        }
    }
}
