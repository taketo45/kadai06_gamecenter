class MedalManager {
  medal;
  // ui;
  cookie;

  constructor() {
    this.medal = gameStatus.medal;
    // ui = new UiManager();
    this.cookie = new CookieManager(gameStatus.cookieName);
  }


  insertCoins(num) {
    if(gameStatus.isGaming) return;
    this.medalPayment(num);
  }

  setMedalCookie(){
    if(gameStatus.isGaming) return;
    console.log(`gameStatus.isGaming=${gameStatus.isGaming}`);
    this.cookie.setCookie(this.medal);
    this.medal = 0;
    this.updateMedalInfo();
    // return this.medal;
  }

  getMedalFromCookie(){
    if(gameStatus.isGaming) return;
    this.medal += this.cookie.getCookie()||0;
    console.log(`getMedalFromCookie()=${this.medal}`);
    this.cookie.deleteGookie();
    this.updateMedalInfo();
    // return this.medal;
  }

  medalPayment(num) {
    this.medal += num;
    console.log(`medalPayment()=${this.medal}`);
    this.updateMedalInfo();
  }

  medalConsumption() {
    this.medal -= 1;
    this.updateMedalInfo();
  }

  updateMedalInfo() {
    $medalnum.html('<h4>' + this.medal + '</h4>');
  }

}