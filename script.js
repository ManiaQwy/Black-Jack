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
    const suits = ['Hearts ♥', 'Diamonds ♦', 'Clubs ♣', 'Spades ♠'];
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
let stache = 1000;
let bet = 0;

function bPRESS(){
    document.getElementById("play").disabled = true;
    document.getElementById("pass").disabled = true;
    document.getElementById("stacheholder").innerHTML = stache
}

function newRound() {
    bet = document.getElementById("betholder").value;
    if(bet > stache){
        alert("man you really aint got money for that. bet something lower")
        return;
    }
    stache = stache - bet;
    document.getElementById("stacheholder").innerHTML = stache
    i = 0;
    k = 0;
    document.getElementById("infoplace").innerHTML += ("You Bet " + bet + "$" + "<br>");
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

    document.getElementById("infoplace").innerHTML += (" CHOICE: PASS OR PLAY ");
    //test();
    // document.getElementById("start").disabled = true;
}

function isBustOrJackGracz() {
    let sumaGracz = 0;
    for (let j = 0; j < gracz.length; j++) {
        sumaGracz += gracz[j].value;
    }
    if (sumaGracz > 21) {
        document.getElementById("infoplace").innerHTML += ("YOU BUSTED: OPPONENT WINS " + "<br>");
        stache = stache + (bet * 0)
        document.getElementById("stacheholder").innerHTML = stache
        document.getElementById("play").disabled = true;
        document.getElementById("pass").disabled = true;
        return 21;
    } else if (sumaGracz === 21) {
        document.getElementById("infoplace").innerHTML += ("BLACK JACK: YOU WIN " + "<br>");
        stache = stache + (bet * 5)
        document.getElementById("stacheholder").innerHTML = stache
        document.getElementById("play").disabled = true;
        document.getElementById("pass").disabled = true;
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
        document.getElementById("infoplace").innerHTML += ("OPPONENT BUSTED: YOU WIN "+ "<br>");
        stache = stache + (bet * 2)
        document.getElementById("stacheholder").innerHTML = stache
        document.getElementById("play").disabled = true;
        document.getElementById("pass").disabled = true;
        return 21;
    } else if (sumaPrzeciwnik === 21) {
        document.getElementById("infoplace").innerHTML += ("OPPONENT BLACK JACK: YOU LOSE "+ "<br>");
        stache = stache + (bet * 0)
        document.getElementById("stacheholder").innerHTML = stache
        document.getElementById("play").disabled = true;
        document.getElementById("pass").disabled = true;
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
        if (isBustOrJackGracz() >= 21) {
            return;
        }
        document.getElementById("infoplace").innerHTML += " CHOICE: PASS OR PLAY " + "<br>";
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
        document.getElementById("infoplace").innerHTML += ("Opponent Draws: " + przeciwnik[k].name + " of " + przeciwnik[k].suit + "<br>");
        if(przeciwnik[k].suit == "Hearts ♥" || przeciwnik[k].suit == "Diamonds ♦" ){
            document.getElementById("opdeck").innerHTML += '<div id="kartared">' + przeciwnik[k].name + " of " + przeciwnik[k].suit + "</div>"}
            else{
            document.getElementById("opdeck").innerHTML += '<div id="kartablack">' + przeciwnik[k].name + " of " + przeciwnik[k].suit + "</div>"
            }
        talia.splice(randomInteger, 1);
    }
}

function LosowanieAiUkryte() {
    let randomInteger = Math.floor(Math.random() * talia.length);
    if (talia[randomInteger] === 0) {
        LosowanieAiUkryte();
    } else {
        przeciwnik[k] = talia[randomInteger];
        document.getElementById("infoplace").innerHTML += ("Opponent Draws: (hidden)" + "<br>");
        document.getElementById("opdeck").innerHTML += '<div id="karta">'+  "</div>"

        talia.splice(randomInteger, 1);
    }
}

function LosowanieGracz() {
    let randomInteger = Math.floor(Math.random() * talia.length);
    if (talia[randomInteger] === 0) {
        LosowanieGracz();
    } else {
        gracz[i] = talia[randomInteger];
        document.getElementById("infoplace").innerHTML += ("You Draw: " + gracz[i].name + " of " + gracz[i].suit + "<br>");
        if(gracz[i].suit == "Hearts ♥" || gracz[i].suit == "Diamonds ♦" ){
        document.getElementById("deck").innerHTML += '<div id="kartared">' + gracz[i].name + " of " + gracz[i].suit + "</div>"}
        else{
        document.getElementById("deck").innerHTML += '<div id="kartablack">' + gracz[i].name + " of " + gracz[i].suit + "</div>"
        }
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
    document.getElementById("infoplace").innerHTML += ("You Drew: ");
    for (let j = 0; j < gracz.length; j++) {
        document.getElementById("infoplace").innerHTML += (gracz[j].name + " of " + gracz[j].suit + "<br>");
    }
    document.getElementById("infoplace").innerHTML += ("Opponent Drew: ");
    for (let j = 0; j < przeciwnik.length; j++) {
        document.getElementById("infoplace").innerHTML += (przeciwnik[j].name + " of " + przeciwnik[j].suit + "<br>");
    }

    document.getElementById("infoplace").innerHTML += (blisko_gracz + " " + blisko_przeciwnik + "<br>");

    if (blisko_gracz > blisko_przeciwnik) {
        document.getElementById("infoplace").innerHTML += ("YOU WIN " + "<br>");
        stache = stache + (bet * 2)
        document.getElementById("stacheholder").innerHTML = stache
        document.getElementById("play").disabled = true;
        document.getElementById("pass").disabled = true;
    } else if (blisko_gracz < blisko_przeciwnik) {
        document.getElementById("infoplace").innerHTML += (" OPPONENT WINS " + "<br>");
        stache = stache + (bet * 0)
        document.getElementById("stacheholder").innerHTML = stache
        document.getElementById("play").disabled = true;
        document.getElementById("pass").disabled = true;
    } else {
        document.getElementById("infoplace").innerHTML += (" DRAW "+ "<br>");
        stache = stache + (bet * 1)
        document.getElementById("stacheholder").innerHTML = stache
        document.getElementById("play").disabled = true;
        document.getElementById("pass").disabled = true;
    }
}

function reset() {
    i = 0;
    gracz = [];
    przeciwnik = [];
    talia = [];
    k = 0;
    document.getElementById("start").disabled = false;
    document.getElementById("play").disabled = true;
    document.getElementById("pass").disabled = true;
    document.getElementById("infoplace").innerHTML = "";
    document.getElementById("deck").innerHTML = ""; 
    document.getElementById("opdeck").innerHTML = ""; 
    if(stache <= 0){
        let TV = prompt("DAMN! you are all out of cash. Don't worry tho, we can fix that. Do you want to sell your nana's TV?")
        if(TV || !TV){
            alert("I'll take that as a Yes")
            stache = 250;
            document.getElementById("stacheholder").innerHTML = stache
        }
    }
    //location.reload();
}