import { Injectable } from '@angular/core';
import * as CryptoTS from 'crypto-ts';

@Injectable({
  providedIn: 'root',
})
export class EncryptionService {
  appProperties = {
    VALUES: {
      KEY: 'MTIzNDU2Nzg5MEFCQ0RFRkdISUpLTE1O',
      IV: 'MTIzNDU2Nzg=',
    },
  };

  constructor() {}

  encryptionAES(msg: any) {
    // Encrypt
    const ciphertext = CryptoTS.AES.encrypt(
      msg,
      'd3v6Zw7GSkhPzfQbpkscHkzh6UeXRyLFrSB2YkkG'
    );
    return ciphertext.toString();
  }

  decryptionAES(msg: any) {
    // Decrypt
    const bytes = CryptoTS.AES.decrypt(
      msg,
      'd3v6Zw7GSkhPzfQbpkscHkzh6UeXRyLFrSB2YkkG'
    );
    const plaintext = bytes.toString(CryptoTS.enc.Utf8);
    return plaintext;
  }
}
