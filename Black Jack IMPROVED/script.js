function Card(value, name, suit) {
    this.value = value;
    this.name = name;
    this.suit = suit;
}
let jackcolor = "color:red; background-color:black; font-size:35px;";
let blackcolor = "color:black; background-color:red; font-size:35px;";
let drawcolor = "color:white; background-color:gray; font-size:35px;";
let choicecolor = "color:lightgreen; background-color:green; font-size:35px;";
console.log("%c BLACK ",blackcolor,)
console.log("%c JACK ",jackcolor,)

function createDeck() {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const values = ['Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King', 'Ace'];

    const deck = [];

    for (const suit of suits) {
        for (let i = 2; i <= 14; i++) {
            let value = i;
            if (i === 14) {
                value = 11;
            } else if (i > 10) {
                value = 10;
            }

            const name = values[i - 2];

            const card = new Card(value, name, suit);
            deck.push(card);
        }
    }

    return deck;
}

let i = 0;
let gracz = [];
let przeciwnik = [];
let talia = [];
let k = 0;

function bPRESS(){
    document.getElementById("play").disabled = true;
    document.getElementById("pass").disabled = true;
}

function newRound() {
    i = 0;
    k = 0;
    talia = createDeck();
    setTimeout(LosowanieGracz(),500);
    setTimeout(LosowanieAi(),500);
    i++;
    k++;
    setTimeout(LosowanieGracz(),500);
    setTimeout(LosowanieAiUkryte(),500);
    if (isBustOrJackGracz() >= 21) {
        return;
    }
    if (isBustOrJackprzeciwnik() >= 21) {
        return;
    }
    document.getElementById("start").disabled = true;
    document.getElementById("play").disabled = false;
    document.getElementById("pass").disabled = false;

    console.log("%c CHOICE: PASS OR PLAY ",choicecolor);
    //test();
    // document.getElementById("start").disabled = true;
}

function isBustOrJackGracz() {
    let sumaGracz = 0;
    for (let j = 0; j < gracz.length; j++) {
        sumaGracz += gracz[j].value;
    }
    if (sumaGracz > 21) {
        console.log("%c YOU BUSTED: OPPONENT WINS ",blackcolor);
        return 21;
    } else if (sumaGracz === 21) {
        console.log("%c BLACK JACK: YOU WIN ",jackcolor);
        return 21;
    } else {
        return sumaGracz;
    }
}

function isBustOrJackprzeciwnik() {
    let sumaPrzeciwnik = 0;
    for (let j = 0; j < przeciwnik.length; j++) {
        sumaPrzeciwnik += przeciwnik[j].value;
    }
    if (sumaPrzeciwnik > 21) {
        console.log("%c OPPONENT BUSTED: YOU WIN ",jackcolor);
        return 21;
    } else if (sumaPrzeciwnik === 21) {
        console.log("%c OPPONENT BLACK JACK: YOU LOSE ",blackcolor);
        return 21;
    } else {
        return sumaPrzeciwnik;
    }
}

function graczBONUS(){
    if(i===5){
        przeciwnikBONUS(0);
    } else {
        i++;
        LosowanieGracz();
        isBustOrJackGracz();
        if (isBustOrJackGracz() >= 21) {
            return;
        }
        console.log("%c CHOICE: PASS OR PLAY ",choicecolor);
    }
}

function przeciwnikBONUS() {
    let chance = 1
    if(isBustOrJackprzeciwnik() <= 10 ){
        chance = 2;
    } else if (10 < isBustOrJackprzeciwnik() <= 17 ){
        chance = 2
    } else if(isBustOrJackprzeciwnik() > 17){
        chance = 10
    }
    let r = Math.floor(Math.random() * chance);
    if (r === 0 || k === 5) {
        test();
    } else {
        k++
        LosowanieAiUkryte();
        isBustOrJackprzeciwnik();
        if (isBustOrJackprzeciwnik() >= 21) {
            return;
        }
        przeciwnikBONUS();
    }

}


function LosowanieAi() {
    let randomInteger = Math.floor(Math.random() * talia.length);
    if (talia[randomInteger] === 0) {
        LosowanieAi();
    } else {
        przeciwnik[k] = talia[randomInteger];
        console.log("Opponent Draws: " + przeciwnik[k].name + " of " + przeciwnik[k].suit);
        talia.splice(randomInteger, 1);
    }
}

function LosowanieAiUkryte() {
    let randomInteger = Math.floor(Math.random() * talia.length);
    if (talia[randomInteger] === 0) {
        LosowanieAiUkryte();
    } else {
        przeciwnik[k] = talia[randomInteger];
        console.log("Opponent Draws: (hidden)");
        talia.splice(randomInteger, 1);
    }
}

function LosowanieGracz() {
    let randomInteger = Math.floor(Math.random() * talia.length);
    if (talia[randomInteger] === 0) {
        LosowanieGracz();
    } else {
        gracz[i] = talia[randomInteger];
        console.log("You Draw: " + gracz[i].name + " of " + gracz[i].suit);
        talia.splice(randomInteger, 1);
    }
}

function test() {
    var blisko_gracz = 0;
    for (let j = 0; j < gracz.length; j++) {
        blisko_gracz += gracz[j].value;
    }
    var blisko_przeciwnik = 0;
    for (let j = 0; j < przeciwnik.length; j++) {
        blisko_przeciwnik += przeciwnik[j].value;
    }
    console.log("You Drew: ");
    for (let j = 0; j < gracz.length; j++) {
        console.log(gracz[j].name + " of " + gracz[j].suit);
    }
    console.log("Opponent Drew: ");
    for (let j = 0; j < przeciwnik.length; j++) {
        console.log(przeciwnik[j].name + " of " + przeciwnik[j].suit);
    }

    console.log(blisko_gracz + " " + blisko_przeciwnik);

    if (blisko_gracz > blisko_przeciwnik) {
        console.log("%c YOU WIN ",jackcolor);
    } else if (blisko_gracz < blisko_przeciwnik) {
        console.log("%c OPPONENT WINS ",blackcolor);
    } else {
        console.log("%c DRAW ",drawcolor);
    }
}

function reset() {
    location.reload();
}