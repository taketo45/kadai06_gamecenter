'use strict';
class CookieManager {
  cookieNmame;
  constructor(cookieNmame){
    cookieNmame = cookieNmame;
  }
  setCookie(number){
    $.cookie(this.cookieNmame,number);
    console.log(`setCookie(name,number)=${this.cookieNmame},${number}`);
  }
  getCookie(){
    return Number($.cookie(this.cookieNmame));
  }
  deleteGookie(){
    $.removeCookie(this.cookieNmame);
  }
}