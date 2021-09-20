// Steps 1 and 2 of Exercise
// axios
//   .get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
//   .then((res) => {
//     const deckId = res.data.deck_id;
//     return axios.get(
//       `http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
//     );
//   })
//   .then((res) => {
//     const value = res.data.cards[0].value;
//     const suit = res.data.cards[0].suit;
//     const image = res.data.cards[0].image;
//     console.log(`${value} of ${suit}`);
//     const deckId = res.data.deck_id;
//     return axios.get(
//       `http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
//     );
//   })
//   .then((res) => {
//     const value = res.data.cards[0].value;
//     const suit = res.data.cards[0].suit;
//     const image = res.data.cards[0].image;
//     console.log(`${value} of ${suit}`);
//     console.log(res.data);
//   });

// Async-Await Version of Promise Exercise Steps 1-2
async function getTwoCardsFromDeck() {
  try {
    let res = await axios.get(
      'http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
    );
    const deckId = res.data.deck_id;
    res = await axios.get(
      `http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );
    const v1 = res.data.cards[0].value;
    const s1 = res.data.cards[0].suit;
    console.log(`${v1} of ${s1}`);
    res = await axios.get(
      `http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
    );
    const v2 = res.data.cards[0].value;
    const s2 = res.data.cards[0].suit;
    console.log(`${v2} of ${s2}`);
  } catch (e) {
    console.log('Something went wrong', e);
  }
}

getTwoCardsFromDeck();

// let cardDeck = [];
// axios
//   .get('http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
//   .then((res) => {
//     const deckId = res.data.deck_id;
//     return axios.get(
//       `http://deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`
//     );
//   })
//   .then((res) => {
//     const cards = res.data.cards;
//     for (let card of cards) {
//       cardDeck.push(card);
//     }
//     $('#top').append(
//       '<h1>Lets Play Some Cards</h1><button id="draw-btn">GIMME A CARD!</button>'
//     );
//   });

// if (cardDeck.length > 0) {
//   const card = cardDeck[0];
//   $('#card-area').append(
//     `<img src="${card.image}" alt="" class="draw-card" id="${cardDeck.length}">`
//   );
//   $(`#${cardDeck.length}`).css(
//     'transform',
//     `rotate(${Math.floor(Math.random() * 180)}deg) translateY(${Math.floor(
//       Math.random() * 20
//     )}px) translateX(${Math.floor(Math.random() * 20)}px)`
//   );
//   cardDeck.shift();
// } else {
//   alert('Deck is empty!');
// }

class Deck {
  constructor() {
    this.deckId;
    this.cardDeck = [];
    this.cards;
  }
  async createDeck() {
    try {
      let res = await axios.get(
        'http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1'
      );
      this.deckId = res.data.deck_id;
      res = await axios.get(
        `http://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=52`
      );
      this.cards = res.data.cards;
      for (let card of this.cards) {
        this.cardDeck.push(card);
      }
      $('#top').append(
        '<h1>Lets Play Some Cards</h1><button id="draw-btn">GIMME A CARD!</button>'
      );
    } catch (e) {
      console.log('Something went wrong', e);
    }
  }
  drawCard() {
    if (this.cardDeck.length > 0) {
      const card = this.cardDeck[0];
      $('#card-area').append(
        `<img src="${card.image}" alt="" class="draw-card" id="${this.cardDeck.length}">`
      );
      $(`#${this.cardDeck.length}`).css(
        'transform',
        `rotate(${Math.floor(Math.random() * 180)}deg) translateY(${Math.floor(
          Math.random() * 20
        )}px) translateX(${Math.floor(Math.random() * 20)}px)`
      );
      this.cardDeck.shift();
    } else {
      alert('Deck is empty!');
    }
  }
}

const game = new Deck();
game.createDeck();
$('body').on('click', '#draw-btn', game.drawCard.bind(game));
