/**
 * 加密类
 * @author chen
 * @date 
 */
class CryptoUtils {
    private static _instance: CryptoUtils;
    public static get instance(): CryptoUtils {
        if(this._instance) {
            return this._instance;
        }

        this._instance = new CryptoUtils();
        return this._instance;
    }
    public constructor() {
    }
    
    /**
     * 加密
     * @param aa 待加密json数据
     * @returns bb 加密后json字符串 
     */ 
    public encrypt(aa: any): string {
        var bb: string = JSON.stringify(aa);
        var bb: string = rc4(bb, this.key);
        bb = base64_encode(bb);
        bb = bb.replace(/\+/g, '-');
        return bb;
    }
    public key: string = 'YUS!8W@zyl@k9NrQ';
    
    /**
     * 解密
     * @str 待解密json字符串
     * @returns 解密后json数据
     */ 
    public decrypt(str: string): any {
        var aa: string = base64_decode(str);
        aa = rc4(aa, this.key);
        var bb: any = JSON.parse(aa);
        return bb;
    }
}
