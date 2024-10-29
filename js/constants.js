'use strict';

const HANDS = {
  GU: 1,
  CHOKI: 2,
  PA: 3, 
}

const IMAGES = {
  GU: '<img src="assets/img/gu.png" width="50">',
  CHOKI: '<img src="assets/img/choki.png" width="50">',
  PA: '<img src="assets/img/pa.png" width="50">',
  GU_LARGE: '<img src="assets/img/gu.png" width="250">',
  CHOKI_LARGE: '<img src="assets/img/choki.png" width="250">',
  PA_LARGE: '<img src="assets/img/pa.png" width="250">',
  GUCHOPA: '<img src="assets/img/guchopa.gif" width="150">',
}

const MESSAGES = {
  EVEN: '<h2>あいこ</h2>',
  WIN: '<h2>かち</h2>',
  LOSE: '<h2>まけ</h2>',
  CLEAR: '<h2></h2>',
  BUY_MEDAL: "10円か100円を投入してください",
}

const SOUNDS = {
  JANKENPON:  $("#junkenponSound").get(0),
  WIN: $("#winSound").get(0),
  LOSE: $("#loseSound").get(0),
  EVEN: $("#evenSound").get(0),
}

const gameStatus = {
  winCount: 0,
  medal: 0,
  isGuChokiPaAble: false,
  isStartAble: true,
  isGaming: false,
  audio: null,
  isSoundOK: true,
  cookieName: '01_guy_dagashi_games_byhands',
  cookieLongSpanName: '01_guy_dagashi_games_bybank',
}

const BACKGROUNDS = {
  NONE: 'none',
  LITTLE: 'url(assets/img/raining-money-26.gif)',
  MANY: 'url(assets/img/raining-money-12.gif)',
  LOSE: 'url(assets/img/lose.png)'
};

const COLORS = {
  DEFAULT_BG: "#f0e68c",
  INIT_BTN: "#c3f2ff",
  PUSH_BTN: "#0066CC",
  INIT_MULTI: "#ffcaca",
  APPLY_MULTI: "#f98fab"
};

const KEYS = {
  S: 83,
  G: 71,
  K: 75,
  P: 80
};

// DOM elements
const $startBtn = $("#start_btn");
const $guBtn = $("#gu_btn");
const $choBtn = $("#cho_btn");
const $paBtn = $('#par_btn');
const $judgment = $('#judgment');
const $yourHands = $('#your_hands');
const $pcHands = $('#pc_hands');
const $multi02 = $("#multi02");
const $multi04 = $("#multi04");
const $multi08 = $("#multi08");
const $multi16 = $("#multi16");
const $multi32 = $("#multi32");
const $multiAll = $(".multi");
const $medalnum = $("#medalnum");
const $tenYenInsert = $("#tenYenInsert");
const $hundredYenInsert = $("#hundredYenInsert");
const $medalSet = $("#medalSet");
const $medalGet = $("#medalGet");
const $document = $(document);
let $sound = $(".sound");
const $body = $("body");
const BG_IMG = 'background-image';
const BG_COLOR = "background-color";
