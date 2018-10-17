class MemoryGame {
  constructor(imgs) {
    this.cards = []
    for (var i = 0; i < imgs.length; i++) {
      this.cards.push({
        img: imgs[i],
        isVisible: false
      })
      this.cards.push({
        img: imgs[i],
        isVisible: false
      })
    }
    this.pickedCards = []
    this.pairsClicked = 0
    this.pairsGuessed = 0
  }

  shuffleCards() {
    for (var i = this.cards.length-1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = this.cards[i];
      this.cards[i] = this.cards[j];
      this.cards[j] = temp;
    }
  }

  checkIfPair(firstCard, secondCard) {
    this.pairsClicked++
    if (firstCard === secondCard) 
      this.pairsGuessed++
    return firstCard === secondCard
  }

  isFinished() {
    return this.pairsGuessed === this.cards.length / 2
  }

  render() {
    if (this.isFinished()) {
      $('#memory_board').html('<h2>Game over</h2>')
      return
    }

    var html = '';

    for (var i = 0; i < this.cards.length; i++) {
      var card = this.cards[i]

      html += '<div class="card" data-index="' + i + '">';
      if (card.isVisible)
        html += '  <img src="img/' + card.img + '">';
      html += '</div>';
    }

    $('#memory_board').html(html)

    $('#pairs_clicked').text(this.pairsClicked)
    $('#pairs_guessed').text(this.pairsGuessed)

    var that = this

    $('.card').click(function () {
      // var index = $(this).attr('data-index')
      var index = $(this).data('index')
      
      if (that.cards[index].isVisible) return;

      if (that.pickedCards.length < 2) {
        that.pickedCards.push(index)
        that.cards[index].isVisible = true
      }
      if (that.pickedCards.length === 2) {
        var firstCard = that.cards[that.pickedCards[0]].img
        var secondCard = that.cards[that.pickedCards[1]].img
        if (that.checkIfPair(firstCard,secondCard)){
          that.pickedCards = []
        }
        else {
          setTimeout(function() {
            console.log("0", that.cards[that.pickedCards[0]])
            console.log("1", that.cards[that.pickedCards[1]])
            that.cards[that.pickedCards[0]].isVisible = false
            that.cards[that.pickedCards[1]].isVisible = false
            that.pickedCards = []
            that.render()
          }, 1000)
        }
      }
      that.render()
    });
  }
}
