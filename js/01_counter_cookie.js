'use strict';
const COLORS = {
  DEFAULT_BG: "#f0e68c",
  INIT_BTN: "#c3f2ff",
  PUSH_BTN: "#0066CC",
  INIT_MULTI: "#ffcaca",
  APPLY_MULTI: "#f98fab"
};

const MESSAGES = {
  EVEN: '<h2>あいこ</h2>',
  WIN: '<h2>かち</h2>',
  LOSE: '<h2>まけ</h2>',
  CLEAR: '<h2></h2>',
  BUY_MEDAL: "10円か100円を投入してください",
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
  lskey: '01_counter',
}

const $window = $(window);
const $document = $(document);
const $medalnum = $("#medalnum");
const $longmedalnum = $("#longmedalnum");
const $tenYenInsert = $("#tenYenInsert");
const $hundredYenInsert = $("#hundredYenInsert");
const $medalClear = $("#medalClear");
const $medalSet = $("#medalSet");
const $medalGet = $("#medalGet");

$window.on('load',()=>{
  updateMedalInfo($medalnum, gameStatus.cookieName);
  updateMedalInfo($longmedalnum, gameStatus.cookieLongSpanName);
  console.log('ロードされました');
});

$document.ready(function() {
  // initializeGame();
  attachEnevntListners();
});

function attachEnevntListners(){
  $tenYenInsert.on("click", () => {
    animateBtn($tenYenInsert);
    insertCoins(1);
    updateMedal();
  });
  $hundredYenInsert.on("click", () => {
    animateBtn($hundredYenInsert);
    insertCoins(10);
    updateMedal();
  });
  $medalSet.on("click", ()=> {
    animateBtn($medalSet);
    setMedalCookie(gameStatus.cookieLongSpanName,getMedalFromCookie(gameStatus.cookieName)||0);
    deleteCookie(gameStatus.cookieName);
    updateMedal();
  });
  $medalGet.on("click", ()=> {
    animateBtn($medalGet);
    setMedalCookie(gameStatus.cookieName,getMedalFromCookie(gameStatus.cookieLongSpanName)||0);
    deleteCookie(gameStatus.cookieLongSpanName);
    updateMedal();
  });
  $medalClear.on("click", ()=> {
    animateBtn($medalClear);
    // setMedalCookie(gameStatus.cookieName,getMedalFromCookie(gameStatus.cookieLongSpanName));
    deleteCookie(gameStatus.cookieName);
    deleteCookie(gameStatus.cookieLongSpanName);
    updateMedal();
  });
  // $document.keydown(handleKeyPress);
}

function animateBtn($btn) {
  $btn.animate({height: "7vh"}, 100)
    .promise().done(function() {
      setTimeout(() => {
        $btn.animate({height: "8vh"}, 100);
      }, 100);
    });
}

function insertCoins(num) {
  medalPayment(num);
}

function medalPayment(num) {
  gameStatus.medal = num + getCookie(gameStatus.cookieName);
  setMedalCookie(gameStatus.cookieName,gameStatus.medal);
  console.log(` medalPayment内のsetMedalCookie(${gameStatus.cookieName},${gameStatus.medal})`);
}

function setMedalCookie(cookiename,medal){
  setCookie(cookiename,medal);
  console.log(`setMedalCookie内のsetCookie(${cookiename},${medal})`);
  // gameStatus.medal = 0;
  updateMedalInfo($medalnum, gameStatus.cookieName);
}

function setCookie(cookiename, medal){
  $.cookie(cookiename,medal);
}

function updateMedal(){
  updateMedalInfo($medalnum, gameStatus.cookieName);
  updateMedalInfo($longmedalnum, gameStatus.cookieLongSpanName);

}

function updateMedalInfo($tag, cookiename) {
  $tag.html('<h4>' + getMedalFromCookie(cookiename) + '</h4>');
}

function getMedalFromCookie(cookiename){

  const cookieResult = getCookie(cookiename);
  console.log(`getMedalFromCookie内のgetCookie(${cookieResult})`);
  gameStatus.medal = cookieResult;
  console.log(`getMedalFromCookie内のgameStatus.medal(${gameStatus.medal})`);
  return gameStatus.medal;
}

function getCookie(cookiename){
  return Number($.cookie(cookiename))||0;
}

function deleteCookie(cookiename){
  $.removeCookie(cookiename);
}