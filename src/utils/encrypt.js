import CryptoJS from 'crypto-js';
import NodeRSA from 'node-rsa';
class Encrypt {
    /**
     * 随机串，返回16位随机数字或字母
     */
    randomStr() {
        const S4 = function() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        };
        return `${S4()}${S4()}${S4()}${S4()}`;
    }
    /**
     * aes加密
     * @param {加密参数} encryptData 
     * @param {加密秘钥} aesKey
     */
    aesEncrypt(encryptData, aesKey) {
        let result = '';
        const secretPassphrase = CryptoJS.enc.Utf8.parse(aesKey);
        try {
            const cipherText = CryptoJS.AES.encrypt(
                encryptData,
                secretPassphrase, {
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7,
                    iv: secretPassphrase
                }
            );
            result = CryptoJS.enc.Base64.stringify(cipherText.ciphertext);
            // console.log(`加密文本: ${result}`);
        } catch (error) {
            console.log(error);
        }
        return result;
    }

    /**
     * aes解密
     * @param {aes解密串} decryptedData 
     * @param {加密秘钥} aesKey
     */
    aesDecrypt(decryptedData, aesKey) {
        const secretPassphrase = CryptoJS.enc.Utf8.parse(aesKey);
        let result = '';
        try {
            const decrypted = CryptoJS.AES.decrypt(
                decryptedData,
                secretPassphrase, {
                    mode: CryptoJS.mode.CBC,
                    padding: CryptoJS.pad.Pkcs7,
                    iv: secretPassphrase
                }
            );
            result = decrypted.toString(CryptoJS.enc.Utf8);
            // console.log(`解密文本: ${result}`);
        } catch (error) {
            console.log(error);
        }
        return result;
    }

    /**
     * 
     * @param {aes解密串} decryptedData 
     */
    rsaDecrypt(decryptedData) {
        let result = '';
        const publicKey = this.getPan();
        const key = new NodeRSA(publicKey);
        try {
            key.setOptions({ encryptionScheme: 'pkcs1' });
            result = key.decryptPublic(decryptedData, 'utf8');
            // console.log(`公钥解密文本: ${result}`);
        } catch (error) {
            console.log(error);
        }
        return result;
    }

    /**
     * 
     * @param {rsa加密串} encryptData 
     */
    rsaEncrypt(encryptData) {
        let result = '';
        const publicKey = this.getPan();
        const key = new NodeRSA(publicKey);
        try {
            key.setOptions({ encryptionScheme: 'pkcs1' });
            result = key.encrypt(encryptData, 'base64', 'utf8');
        } catch (error) {
            console.log(error);
        }
        return result;
    }
    /**
     * 获取公钥
     */
    getPan() {
        let baseStr1 = 'TUlHZk1BMEdDU3FHU0liM0RRRUJBUVVBQTRHTkFEQ0JpUUtCZ1FDRDZyaHdYUnd6eWhuVFZ2';
        let baseStr2 = 'T2hIWTE1MG05QWdGMEFvUHFWRjVEL21uenNTQzFyRUI3ekR0VjNxSmZxcE5LeU5xMzFycXRy';
        let baseStr3 = 'UHZNbU1wdFdxSk5UbWkrN0lXaXN3YUo2MlZiNW12alJ2VmV3VmFmeUU4ajJhd2JtWDB1SzMv';
        let baseStr4 = 'aE5FYUZHdG91UUNoY2ZOVENhMFRKNEtLYjA0Zm4vMllhRnZYc0hEVWpEUmZodmF3SURBUUFC';
        let baseStr5 = 'LS0tLS1CRUdJTiBQVUJMSUMgS0VZLS0tLS0=';
        let baseStr6 = 'LS0tLS1FTkQgUFVCTElDIEtFWS0tLS0t';
        let baseArr = [baseStr5, baseStr1, baseStr3, baseStr2, baseStr4, baseStr6];
        let textString = '';
        baseArr.forEach(item => {
            let words = CryptoJS.enc.Base64.parse(item);
            textString += CryptoJS.enc.Utf8.stringify(words);
        });
        return textString;
    }
    /**
     * 获取get请求参数
     * @param {入参对象} obj 
     */
    getUrlPan(obj) {
        let result = '';
        for (let i in obj) {
            if (obj[i] || obj[i] === 0) {
                result += result === '' ? `${i}=${obj[i]}` : `&${i}=${obj[i]}`;
            }
        }
        return result;
    }
    /**
     * 解析dora数据
     * @param {返回值} result 
     */
    parseDora(result) {
        if(!result){
            return;
        }
        //获取aes key
        let key = '';
        if(result && result.headers && result.headers['pan']){
            key = this.rsaDecrypt(result.headers['pan']);
        }
        if (result.data && result.data.dora && key) {
            let resultStr = this.aesDecrypt(result.data.dora, key);
            if (resultStr) {
                return this.isJSON(resultStr) ? JSON.parse(resultStr) : {
                    message: resultStr
                };
            } else {
                return result.data;
            }
        } else {
            return result.data;
        }
    }
    /**
     * 判断是否json文本串
     * @param {字符串} str 
     */
    isJSON(str) {
        if (typeof str === 'string') {
            try {
                JSON.parse(str);
                return true;
            } catch (e) {
                return false;
            }
        }
    }
}
export default new Encrypt();