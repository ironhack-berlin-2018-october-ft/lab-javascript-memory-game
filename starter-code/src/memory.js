class MemoryGame {
  constructor(imgs) {
    this.cards = []
    console.log("this.cards:", this.cards);
    for (var i = 0; i < imgs.length; i++) {
      var card1 = {
        img: imgs[i],
        isVisible: false
      }
      var card2 = {
        img: imgs[i],
        isVisible: false
      }
      this.cards.push(card1, card2)
    }
    this.pickedCards = []
    this.pairsClicked = 0;
    this.pairsGuessed = 0;
  }

  shuffleCards() {
    for (var i=this.cards.length-1;i>0;i--) {
      var random = Math.floor(Math.random() * i)
      var placeholder = this.cards[random];
      this.cards[random] = this.cards[i];
      this.cards[i] = placeholder;
    }
  }

  checkIfPair(firstCard, secondCard) {
    this.pairsClicked++;
    if (firstCard === secondCard) {
      this.pairsGuessed++;
      if (this.isFinished()) {
        console.log('You won the game!');
      }
    } 
    return firstCard === secondCard
  }

  isFinished() {
    return this.pairsGuessed === this.cards.length/2;
  }

  render() {
    var html = '';
    for (var i = 0; i < this.cards.length; i++) {
      var card = this.cards[i]

      html += '<div class="card" data-index="' + i + '">';
      if (card.isVisible)
        html += '  <img src="img/' + card.img + '">';
      html += '</div>';
    }

    $('#memory_board').html(html);

    $('#pairs_clicked').text(this.pairsClicked);
    $('#pairs_guessed').text(this.pairsGuessed);

    $('.card').click(e => {
      var clickedCardDOM = e.currentTarget;
      var index = clickedCardDOM.getAttribute('data-index');
      if (this.pickedCards.length >= 2 || this.cards[index].isVisible) return; //does not allow user to click too many cards, 
      this.pickedCards.push(this.cards[index]);                                 // or to click already visible card
      this.cards[index].isVisible = true; 
      if (this.pickedCards.length == 2 ) {
        if (this.checkIfPair(this.pickedCards[0].img,this.pickedCards[1].img)) {
          this.pickedCards.pop();
          this.pickedCards.pop();
        } else {
          var that = this;
          setTimeout(function(){
            that.pickedCards[0].isVisible = false;
            that.pickedCards[1].isVisible = false;
            that.pickedCards.pop();
            that.pickedCards.pop();
            that.render();
          }, 1500)
        }
      }
      this.render();
    });
  }
}



    // $('.card').click(e => {
    //   var clickedCardDOM = e.currentTarget;
    //   var index = clickedCardDOM.getAttribute('data-index');
    //   if (this.cards[index].isVisible) {
    //     console.log("card is already revealed")
    //     return;
    //   } 
    //   this.pickedCards.push(this.cards[index])
    //   this.cards[index].isVisible = true; 
    //   if (this.pickedCards.length > 2 ) {
    //     this.pickedCards[0].isVisible = false;
    //     this.pickedCards[1].isVisible = false;
    //     this.pickedCards[0] = this.pickedCards[2]
    //     this.pickedCards.pop();
    //     this.pickedCards.pop();
    //   } else if (this.pickedCards.length == 2 ) {
    //     if (this.checkIfPair(this.pickedCards[0],this.pickedCards[1])) {
    //       this.pickedCards.pop();
    //       this.pickedCards.pop();
    //     }
    //   }
    //   this.render();
    // });