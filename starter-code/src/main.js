var imgs = [
  'aquaman.jpg',
  'batman.jpg',
  'captain-america.jpg',
  'fantastic-four.jpg',
  'flash.jpg',
  'green-arrow.jpg',
  'green-lantern.jpg',
  'ironman.jpg',
  'spiderman.jpg',
  'superman.jpg',
  'the-avengers.jpg',
  'thor.jpg'
];

// memoryGame is a global variable and you can access it with your browser console
var memoryGame;

$(document).ready(function () {
  memoryGame = new MemoryGame(imgs);

  memoryGame.shuffleCards();

  memoryGame.render()
});


