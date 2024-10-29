'use strict';
class BaseGame {
  constructor(name) {
    this.name = name;
    this.medal = 0;
    this.isGaming = false;
    this.audio = null;
    this.isSoundOK = true;
  }

  initializeGame() {
    this.updateMedalInfo();
    this.bgGifDisplay(BACKGROUNDS.LITTLE);
  }

  startGame() {
    if (this.isGaming) return;
    if (!this.isPlayAble()) return;
    this.startDisable();
    this.medalConsumption();
    this.initStatus();
    this.animateBtn($("#start_btn"));
    this.playSound(SOUNDS.JANKENPON);
    this.isGaming = true;
  }

  endGame() {
    this.isGaming = false;
    this.startEnable();
  }

  playSound(sound) {
    if (!this.isSoundOK) return;
    this.audio = sound;
    this.audio.load();
    this.audio.play();
  }

  animateBtn($btn) {
    $btn.animate({width: "90px"}, 100)
      .promise().done(function() {
        setTimeout(() => {
          $btn.animate({width: "105px"}, 100);
        }, 100);
      });
  }

  medalPayment(num) {
    this.medal += num;
    this.updateMedalInfo();
  }

  medalConsumption() {
    this.medal -= 1;
    this.updateMedalInfo();
  }

  updateMedalInfo() {
    $("#medalnum").html('<h4>' + this.medal + '</h4>');
  }

  isPlayAble() {
    if (this.medal > 0) {
      return true;
    } else {
      alert(MESSAGES.BUY_MEDAL);
      return false;
    }
  }

  bgGifDisplay(imgURL = BACKGROUNDS.NONE) {
    $("body").css('background-image', imgURL);
  }

  startDisable() {
    $("#start_btn").prop("disabled", true);
  }

  startEnable() {
    $("#start_btn").prop("disabled", false);
  }

  initStatus() {
    $('#your_hands').html(MESSAGES.CLEAR);
    $('#judgment').html(MESSAGES.CLEAR);
    this.updateMedalInfo();
    this.bgGifDisplay();
  }
}