'use strict';

$(document).ready(function() {
  const game = new JankenGame();
  game.initializeGame();
  game.attachEventListeners();
});