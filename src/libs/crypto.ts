import CryptoJS from 'crypto-js';
import { isString } from './type';

const salt = 'oxygenTool';

export const SHA3Encrypt = (data: string): string => {
  return CryptoJS.HmacSHA3(data, salt).toString();
};

/**
 * 加密
 * @param data
 * @returns
 */
export const cryptoEncode = (data: string): string => {
  if (!isString(data)) return '';
  return CryptoJS.AES.encrypt(data, salt, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  }).toString();
};

/**
 * 解密
 * @param data
 * @returns
 */
export const cryptoDecode = (data: string): string => {
  if (!isString(data)) return '';
  return CryptoJS.AES.decrypt(data, salt, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7,
  }).toString(CryptoJS.enc.Utf8);
};
