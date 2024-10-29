'use strict';
class JankenGame extends BaseGame {
  medalM;
  constructor() {
    super('じゃんけん');
    this.winCount = 0;
    this.isGuChokiPaAble = false;
    this.medalM = new MedalManager();
  }
  
  initializeGame() {
    super.initializeGame();
    this.guchopaDisable();
    this.btnHideControl();
    this.attachEventListeners();

  }

  attachEventListeners() {
    $startBtn.on("click", () => this.startGame());
    $guBtn.on("click", () => this.jankenGame(HANDS.GU));
    $choBtn .on("click", () => this.jankenGame(HANDS.CHOKI));
    $paBtn.on("click", () => this.jankenGame(HANDS.PA));
    $(document).keydown((e) => this.handleKeyPress(e));
    $tenYenInsert.on("click", () => this.medalM.insertCoins(1));
    $hundredYenInsert.on("click", () => this.medalM.insertCoins(10));
    $medalSet.on("click", this.medalM.setMedalCookie());
    $medalGet.on("click", this.medalM.getMedalFromCookie());
  }

  startGame() {
    super.startGame();
    this.guchopaRoundFunction();
    this.clearBtn();
    this.guchopaEnable();
    this.btnShowControl();
  }

  jankenGame(yourHand) {
    this.guchopaDisable();
    const handMap = {
      [HANDS.GU]: { img: IMAGES.GU, $btn: $("#gu_btn") },
      [HANDS.CHOKI]: { img: IMAGES.CHOKI, $btn: $("#cho_btn") },
      [HANDS.PA]: { img: IMAGES.PA, $btn: $("#par_btn") },
    };
    const { img, $btn } = handMap[yourHand];

    this.clearBtn();
    $btn.css("background", COLORS.PUSH_BTN);
    $('#your_hands').html(img);
    this.audio.pause();
    this.judgementHandle(yourHand, this.pcJanken());
    this.updateMedalInfo();
  }

  pcJanken() {
    let pchand = Math.ceil(Math.random() * 3);
    $('#pc_hands').html(IMAGES[Object.keys(HANDS)[pchand - 1] + '_LARGE']);
    return pchand;
  }

  judgementHandle(yourHand, pcHand) {
    const result = this.getGameResult(yourHand, pcHand);
    if (result === 'WIN') this.winHandle(yourHand);
    if (result === 'LOSE') this.loseHandle(yourHand);
    if (result === 'EVEN') this.evenHandle();
  }

  getGameResult(yourHand, pcHand) {
    if (yourHand === pcHand) return 'EVEN';
    if ((yourHand === HANDS.GU && pcHand === HANDS.CHOKI) ||
        (yourHand === HANDS.CHOKI && pcHand === HANDS.PA) ||
        (yourHand === HANDS.PA && pcHand === HANDS.GU)) {
      return 'WIN';
    }
    return 'LOSE';
  }

  winHandle(yourHand) {
    this.playSound(SOUNDS.WIN);
    $('#judgment').html(MESSAGES.WIN);
    this.btnHideControl(yourHand);
    this.winCount++;
    this.multiDisplay();
    setTimeout(() => this.endGame(), 1000);
  }

  loseHandle(yourHand) {
    $('#judgment').html(MESSAGES.LOSE);
    this.playSound(SOUNDS.LOSE);
    this.btnHideControl(yourHand);
    this.multiClear();
    this.bgGifDisplay(BACKGROUNDS.LOSE);
    setTimeout(() => this.endGame(), 1000);
  }

  evenHandle() {
    $('#judgment').html(MESSAGES.EVEN);
    this.playSound(SOUNDS.EVEN);
    setTimeout(() => {
      this.guchopaRoundFunction();
      this.guchopaEnable();
    }, 600);
  }

  guchopaRoundFunction() {
    $('#pc_hands').html(IMAGES.GUCHOPA);
  }

  guchopaDisable() {
    $("#gu_btn, #cho_btn, #par_btn").prop("disabled", true);
    this.isGuChokiPaAble = false;
  }

  guchopaEnable() {
    $("#gu_btn, #cho_btn, #par_btn").prop("disabled", false);
    this.isGuChokiPaAble = true;
  }

  btnHideControl(yourHand = 0) {
    if (yourHand === HANDS.GU) {
      $("#cho_btn, #par_btn").hide();
    } else if (yourHand === HANDS.CHOKI) {
      $("#gu_btn, #par_btn").hide();
    } else if (yourHand === HANDS.PA) {
      $("#gu_btn, #cho_btn").hide();
    } else {
      $("#gu_btn, #cho_btn, #par_btn").hide();
    }
  }

  btnShowControl() {
    $("#gu_btn, #cho_btn, #par_btn").show();
  }

  clearBtn() {
    $("#gu_btn, #cho_btn, #par_btn").css("background", COLORS.INIT_BTN);
  }

  multiDisplay() {
    const multiHandle = {
      1: { $disp: $("#multi02"), medal: 2, img: BACKGROUNDS.LITTLE },
      2: { $disp: $("#multi04"), medal: 4, img: BACKGROUNDS.LITTLE },
      3: { $disp: $("#multi08"), medal: 8, img: BACKGROUNDS.LITTLE },
      4: { $disp: $("#multi16"), medal: 16, img: BACKGROUNDS.MANY },
      5: { $disp: $("#multi32"), medal: 32, img: BACKGROUNDS.MANY },
    };

    const { $disp, medal, img } = multiHandle[this.winCount];
    $(".multi").css("background-color", COLORS.INIT_MULTI);
    $disp.css("background-color", COLORS.APPLY_MULTI);
    this.medalPayment(medal);
    this.bgGifDisplay(img);
    if (this.winCount === 5) this.ending();
  }

  multiClear() {
    this.winCount = 0;
    $(".multi").css("background-color", COLORS.INIT_MULTI);
  }

  ending() {
    this.winCount = 0;
    // エンディング処理
  }

  handleKeyPress(e) {
    const keyHandlers = {
      [KEYS.S]: () => this.startGame(),
      [KEYS.G]: () => this.isGuChokiPaAble && this.jankenGame(HANDS.GU),
      [KEYS.K]: () => this.isGuChokiPaAble && this.jankenGame(HANDS.CHOKI),
      [KEYS.P]: () => this.isGuChokiPaAble && this.jankenGame(HANDS.PA),
    };

    const handler = keyHandlers[e.keyCode];
    if (handler) handler();
  }
}