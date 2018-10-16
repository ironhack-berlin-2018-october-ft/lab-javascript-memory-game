class MemoryGame {
  constructor(imgs) {
    this.pickedCards = []; // the 2 cards the user has picked
    this.pairsClicked = 0; // the amount of tries the user had so far
    this.pairsGuessed = 0; // the guessed pairs so far
    this.cards = [];
    this.indexTemp = 0;
    for (var i = 0; i < imgs.length; i++) {
      var card = {
        img: imgs[i],
        isVisible: false
      };
      this.cards.push(card);
    }
    for (var i = 0; i < imgs.length; i++) {
      var card = {
        img: imgs[i],
        isVisible: false
      };
      this.cards.push(card);
    }
  }

  shuffleCards() {
    var sortedCards = this.cards;
    var shuffeledCards = [];
    var amoutOfCards = sortedCards.length;
    for (let numberOfCards = 0; numberOfCards < amoutOfCards; numberOfCards++) {
      var randomNumber = Math.floor(Math.random() * sortedCards.length);
      shuffeledCards[numberOfCards] = sortedCards[randomNumber];
      sortedCards.splice(randomNumber, 1);
    }
    this.cards = shuffeledCards;
  }

  checkIfPair(firstCard, secondCard) {
    this.pairsClicked++;
    if (firstCard.img === secondCard.img) {
      this.pairsGuessed++;
      return true;
    }
    return false;
  }

  isFinished() {
    if (this.pairsGuessed === (this.cards.length / 2)) return true;
    return false;
  }

  render() {
    //Default position
    var html = "";
    var index;
    var index2;
    var turn;

    for (var i = 0; i < this.cards.length; i++) {
      var card = this.cards[i];
      html += '<div class="card" data-index="' + i + '">';
      if (card.isVisible) html += '  <img src="img/' + card.img + '">';
      html += "</div>";
    }
    $("#memory_board").html(html);

    $(".card").click(e => {
      console.log("Test");
      index = e.target.getAttribute("data-index");
      if (!this.cards[index].isVisible) {
        if (this.pickedCards.length === 0) {
          this.pickedCards.push(this.cards[index]);
          this.cards[index].isVisible = true;
          this.indexTemp = index;
        } else {
          this.pickedCards.push(this.cards[index]);
          if (this.checkIfPair(this.pickedCards[0], this.pickedCards[1])) {
            this.cards[index].isVisible = true;
            this.pickedCards = [];
          } else {
            $("[data-index=" + index + "]").html(
              '  <img src="img/' + this.cards[index].img + '">'
            );
            this.cards[index].isVisible = false;
            this.cards[this.indexTemp].isVisible = false;
            this.pickedCards = [];
          }
        }
      }
      this.render();
      if (this.isFinished()) alert("You made it!")
    });
  }
}
