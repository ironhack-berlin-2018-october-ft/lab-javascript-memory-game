class MemoryGame {
  constructor(imgs) {
    this.pickedCards = []; // the 2 cards the user has picked
    this.pairsClicked = 0; // the amount of tries the user had so far
    this.pairsGuessed = 0; // the guessed pairs so far
    this.cards = [];
    this.indexFirstCard = 0;
    for (var i = 0; i < imgs.length; i++) {
      this.cards.push({
        img: imgs[i],
        isVisible: false
      });
      this.cards.push({
        img: imgs[i],
        isVisible: false
      });
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
    if (this.pairsGuessed === this.cards.length / 2) return true;
    return false;
  }

  render() {
    //Default position
    var html = "";
    var index;
    var isPair = false;

    $("#pairs_clicked").text(this.pairsClicked);
    $("#pairs_guessed").text(this.pairsGuessed);
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
        this.cards[index].isVisible = true;
        if (this.pickedCards.length === 0) {
          this.pickedCards.push(this.cards[index]);
          this.indexFirstCard = index;
          isPair = true;
        } else {
          this.pickedCards.push(this.cards[index]);
          if (this.checkIfPair(this.pickedCards[0], this.pickedCards[1])) {
            this.pickedCards = [];
            isPair = true;
          } else {
            this.pickedCards = [];
            isPair = false;
          }
        }
      }
      this.render();
      if (this.isFinished()) alert("You made it!");
      if (!isPair) {
        setTimeout(() => {
          this.cards[index].isVisible = false;
          this.cards[this.indexFirstCard].isVisible = false;
          this.render();
        }, 400);
      }
    });
  }
}
