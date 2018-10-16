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
    
    this.shuffleCards()
  }

  shuffleCards() {
    var m = this.cards.length, t, i;
  
    // While there remain elements to shuffle…
    while (m) {
  
      // Pick a remaining element…
      i = Math.floor(Math.random() * m--);
  
      // And swap it with the current element.
      t = this.cards[m];
      this.cards[m] = this.cards[i];
      this.cards[i] = t;
    }
  }

  checkIfPair(firstCard, secondCard) {
    if(firstCard == secondCard){
      this.pairsClicked += 1
      this.pairsGuessed += 1
      return true
    }
    else {
      this.pairsClicked += 1
      return false
    }
  }

  isFinished() {
    if (this.pairsGuessed==(this.cards.length/2)) {
      return true
    }
    else {
      return false
    }
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

    $('.card').click((e)=> {
      if(this.pickedCards.length<2) {
        
        let index = e.target.dataset.index;
       // console.log(e.target);
        this.cards[index].isVisible = true;
        this.render();
        this.pickedCards.push(index)
        //console.log(this.pickedCards)

        if(this.pickedCards.length==2) {
          //console.log("Maximum reached")
          var pair = this.checkIfPair(this.cards[this.pickedCards[0]].img, this.cards[this.pickedCards[1]].img)
          $("#pairs_clicked").text(this.pairsClicked)
          $("#pairs_guessed").text(this.pairsGuessed)
          if(pair == true){
            //console.log("true")
            var end = this.isFinished()
            if(end == true) {
              setTimeout(function()
              {alert("YOU WIIIIIIIIIIIN")}, 300)
            }
            else{
              this.pickedCards=[]
            }
          }
          else {
            this.cards[this.pickedCards[0]].isVisible = false
            this.cards[this.pickedCards[1]].isVisible = false
            setTimeout(()=> {
              this.render()
            }, 1000)
            this.pickedCards=[]
          }
        }
      }
    });
  }
}