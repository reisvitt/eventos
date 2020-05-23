import CryptoJS from "crypto-js";

class SecureStorage {
  SECRET_KEY = "%ekmZRi8AKv@pjI@z*&c#F[3t,s34@e=A*b:g1L5xLP0";

  hash(key) {
    key = CryptoJS.SHA256(key, this.SECRET_KEY);

    return key.toString();
  }

  encrypt(data) {
    data = CryptoJS.AES.encrypt(data, this.SECRET_KEY);

    data = data.toString();

    return data;
  }

  decrypt(data) {
    data = CryptoJS.AES.decrypt(data, this.SECRET_KEY);

    data = data.toString(CryptoJS.enc.Utf8);

    return data;
  }

  setItem(key, data) {
    localStorage.setItem(this.hash(key), this.encrypt(data));
  }

  getItem(key) {
    return this.decrypt(localStorage.getItem(this.hash(key)));
  }
}

export const secureStorage = new SecureStorage();
