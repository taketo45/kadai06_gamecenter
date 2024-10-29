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
  LSName: '01_guy_dagashi_games_byhands',
  LSLongSpanName: '01_guy_dagashi_games_bybank',
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
  updateMedalInfo($medalnum, gameStatus.LSName);
  updateMedalInfo($longmedalnum, gameStatus.LSLongSpanName);
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
    setMedalLS(gameStatus.LSLongSpanName,getMedalFromLS(gameStatus.LSName)||0);
    deleteLS(gameStatus.LSName);
    updateMedal();
  });
  $medalGet.on("click", ()=> {
    animateBtn($medalGet);
    setMedalLS(gameStatus.LSName,getMedalFromLS(gameStatus.LSLongSpanName)||0);
    deleteLS(gameStatus.LSLongSpanName);
    updateMedal();
  });
  $medalClear.on("click", ()=> {
    animateBtn($medalClear);
    // setMedalLS(gameStatus.LSName,getMedalFromLS(gameStatus.LSLongSpanName));
    deleteLS(gameStatus.LSName);
    deleteLS(gameStatus.LSLongSpanName);
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
  gameStatus.medal = num + getLS(gameStatus.LSName);
  setMedalLS(gameStatus.LSName,gameStatus.medal);
  console.log(` medalPayment内のsetMedalLS(${gameStatus.LSName},${gameStatus.medal})`);
}

function setMedalLS(LSname,medal){
  setLS(LSname,medal);
  console.log(`setMedalLS内のsetLS(${LSname},${medal})`);
  // gameStatus.medal = 0;
  updateMedalInfo($medalnum, gameStatus.LSName);
}

function setLS(LSname, medal){
  // $.cookie(LSname,medal);
  localStorage.setItem(LSname,medal);
}

function updateMedal(){
  updateMedalInfo($medalnum, gameStatus.LSName);
  updateMedalInfo($longmedalnum, gameStatus.LSLongSpanName);

}

function updateMedalInfo($tag, LSname) {
  $tag.html('<h4>' + getMedalFromLS(LSname) + '</h4>');
}

function getMedalFromLS(LSname){

  const LSResult = getLS(LSname);
  console.log(`getMedalFromLS内のgetLS(${LSResult})`);
  gameStatus.medal = LSResult;
  console.log(`getMedalFromLS内のgameStatus.medal(${gameStatus.medal})`);
  return gameStatus.medal;
}

function getLS(LSname){
  // return Number($.cookie(LSname))||0;
  return Number(localStorage.getItem(LSname))||0;
}

function deleteLS(LSname){
  // $.removeCookie(LSname);
  localStorage.removeItem(LSname);
  
}