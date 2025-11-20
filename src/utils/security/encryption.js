import CryptoJS from "crypto-js";

export const generateEncryption = ({plainText ="" , signature = process.env.ENCRYPTION_SIGNATURE} = {}) => {
    const encrypted = CryptoJS.AES.encrypt(plainText, signature).toString();
    return encrypted;
}


export const generateDecryption = ({cipherText ="", signature = process.env.ENCRYPTION_SIGNATURE}={}) => {
    const decrypted = CryptoJS.AES.decrypt(cipherText, signature).toString(CryptoJS.enc.Utf8);
    return decrypted;
}