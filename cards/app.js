// const game = {
//     palyer1 : {
//         username : 'Blue',
//         playingAs : 'X'
//     },
//     player2 : {
//         username : 'muffins',
//         playingAs: 'O'
//     },
//     board: [['O', null, 'X'], ['X','O', 'X'], [null, 'O', 'X']]
// };

// const target = Math.floor(Math.random() * 10);
// let guess = Math.floor(Math.random() * 10);


// while(guess !== target){
//     console.log(guess);
//     guess =  Math.floor(Math.random() * 10);
// }

// function rollDie() {
//     let roll =  Math.floor(Math.random() * 6) + 1;
//     console.log(roll);
// }
//  function throwDice(numRolls){
//     for(let i=0; i< numRolls; i++){
//         rollDie();
//     }
//  }

//  throwDice(7);

// function isValidPassword(username, password){
//     if(password === username || password.length < 8 || password.includes(" ") === true){
//         return false;
//     }
//     return true;
// }

// function average(arr){
//     let sum=0;
//     for(let x of arr){
//         sum += x;
//     }
//     avg = sum / arr.length;
//     return avg;
// }

// function isPangram(sentence){
//     sentence = sentence.toLowerCase();
//     for(let char of 'abcdefghijklmnopqrstuvwxyz'){
//         if(!sentence.includes(char)){
//             return false;
//         }
//     }
//     return true;
// }

// function pickRandom(arr){
//     const id = Math.floor(Math.random() * arr.length);
//     return arr[id];
// }
// const number = [2,3,4,5,6,7,8,9,10,'J','Q','K','A'];
// const type = ['Clubs','Spades','Hearts','Diamonds']

// function getCard(number, type){
//         return { 
//             'Value' : pickRandom(number),
//             'Suit' : pickRandom(type)
//     };
// }

// const annoyer = {
//     phrases : ["haha", 'hehe', 'hohohoho', 'yolo', 'yeah!!'],
//     pickPhrase(){
//         const {phrases} = this;
//         const idx = Math.floor(Math.random() * phrases.length);
//         return phrases[idx]
//     },
//     start(){
//         this.timerId = setInterval(() => {
//             console.log(this.pickPhrase())
//         }, 3000)
//     },
//     stop(){
//        clearInterval(this,timrId);
//     }
// }


function makeDeck() {
    const deck = [];
    const suits = ['Clubs','Spades','Hearts','Diamonds'];
    const values = '2,3,4,5,6,7,8,9,10,J,Q,K,A';
    for(let value of values.split(',')){
        for(let suit of suits){
            deck.push({
                value,
                suit
            })
        }
    }
    return deck;
}

function drawCard(deck){
    return deck.pop();
}

const myDeck = {
    deck: [],
    drawncard: [],
    suits: ['Clubs','Spades','Hearts','Diamonds'],
    values: '2,3,4,5,6,7,8,9,10,J,Q,K,A',
    initialiseDeck() {
        const {suits, values, deck} = this;
        for(let value of values.split(',')){
            for(let suit of suits){
                deck.push({
                    value,
                    suit
                })
            }
        }
        // return deck;
    },
    drawCard() {
        const card = this.deck.pop();
        this.drawncard.push(card);
        return card;
    },
    drawMultiple(numcards) {
        const cards = [];
        for(let i=0; i<numCards; i++){
            cards.push(this.drawCard());
        }
        return cards;
    }
}