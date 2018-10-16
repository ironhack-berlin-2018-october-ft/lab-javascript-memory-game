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
    // TODO: continue
  }

  shuffleCards() {}

  checkIfPair(firstCard, secondCard) {}

  isFinished() {}

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

    $('.card').click(function () {
      // TODO: write the code that should be triggered when the user click on a card
    });
  }
}
