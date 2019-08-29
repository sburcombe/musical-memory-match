$(document).ready(initializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var max_matches = 9;
var attempts = null;
var games_played = null;
var cards = [];
var songs
var musicPlayer = new Audio();
musicPlayer.oncanplaythrough = function(){
    musicPlayer.play();
}
var cardHelper = {
    'tchaikovsky':{
        music: './assets/audio/Tchaikovsky.m4a',
        portrait: './assets/images/Tchaikovsky.png',
        bio: 'he was a musician'
    },
    'mozart': {
        music: './assets/audio/Mozart.mp3',
        portrait: './assets/images/Mozart.png',
        bio: 'he was a musician'
    },
    'vivaldi': {
        music: './assets/audio/Vivaldi.mp3',
        portrait: './assets/images/Vivaldi.png',
        bio: 'he was a musician'
    },
    'saint-saens': {
        music: './assets/audio/SaintSaens.m4a',
        portrait: './assets/images/SaintSaens.png',
        bio: 'he was a musician'
    },
    'beethoven': {
        music: './assets/audio/Beethoven.m4a',
        portrait: './assets/images/Beethoven.png',
        bio: 'he was a musician'
    },
    'bach': {
        music: './assets/audio/Bach.m4a',
        portrait: './assets/images/Bach.png',
        bio: 'he was a musician'
    },
    'price': {
        music: './assets/audio/FlorencePrice.m4a',
        portrait: './assets/images/FlorencePrice.png',
        bio: 'she was a musician'
    },
    'bonds': {
        music: './assets/audio/MargaretBonds.m4a',
        portrait: './assets/images/MargaretBonds.png',
        bio: 'she was a musician'
    },
    'saint-georges': {
        music: './assets/audio/SaintGeorges.m4a',
        portrait: './assets/images/SaintGeorges.png',
        bio: 'he was a musician'
    }

}

var preloadMusicArray = [];
function initiatePreload(){
    for(var key in cardHelper){
        preloadMusicArray.push( cardHelper[key].music );
    }
    preloadAudio();
}

function preloadAudio( ){
    if(!preloadMusicArray.length){
        console.log('done preloading')
        return;
    }
    var nextAudio = preloadMusicArray.pop();
    console.log('preloading '+nextAudio);
    var audio = new Audio();
    audio.oncanplaythrough = preloadAudio;
    audio.load();
    audio.src = nextAudio;
}

function initializeApp() {
    //when the winModal replay button is clicked, the game is reset
    $(".replayInvite").click(resetStats);
    cardCreation();
    //when a card is clicked, the handleCardClick function is called
    $(".card").click(handleCardClick);
    initiatePreload();
}
function shuffle(array) {
    for (var cardIndex = array.length - 1; cardIndex > 0; cardIndex--) {
        var randomIndex = Math.floor(Math.random() * (cardIndex + 1));
   [array[cardIndex], array[randomIndex]] = [array[randomIndex], array[cardIndex]];
    }
}
function cardCreation(){
    $.each(cardHelper, function(key, value){
        $.each(value,function (key, image){
            if(key === 'portrait'){
                cards.push(image);
                cards.push(image);
                 }
            })
        })
        shuffle(cards);
    for(var cardIndex = 0; cardIndex < cards.length; cardIndex++){
        var imageUrl = cards[cardIndex];
        var cardFront = $("<div>").addClass("front-card").css("background-image", "url(" + imageUrl + ")") //card class
        var cardBox = $("<div>").addClass("card");
        $.each(cardHelper, function (key, value) {
            if (value['portrait'] === imageUrl) {
                cardBox.attr('data-card', key);
            }
        })
        var cardBack = $("<div>").addClass("back-card "); //card class
        cardBox.append(cardFront);
        $("div.container").append(cardBox);
        cardBox.append(cardBack);
    }

}


function handleCardClick(event) {
    if($(this).hasClass("clicked")){
       return
    }

    if (firstCardClicked === null){
        $(event.currentTarget).addClass("clicked");
        firstCardClicked = $(this);
        firstCardClicked.find("div.back-card").addClass("hidden");


    } else {
        $(event.currentTarget).addClass("clicked");
        secondCardClicked = $(this);
        secondCardClicked.find("div.back-card").addClass("hidden");
        var revealedCardClick1 = firstCardClicked.find("div.front-card").css("background-image");
        var revealedCardClick2 = secondCardClicked.find("div.front-card").css("background-image");


        if (revealedCardClick1 === revealedCardClick2){
            var thisCardData = cardHelper[ firstCardClicked.attr('data-card')];
            musicPlayer.src = thisCardData.music;
            musicPlayer.play();

            matches++;
            firstCardClicked = null;
            secondCardClicked = null;
            attempts++;
            displayStats();

        } else {
            $('.card').off();
                setTimeout(function(){
                    firstCardClicked.find("div.back-card").removeClass("hidden");
                    secondCardClicked.find("div.back-card").removeClass("hidden");
                    firstCardClicked.removeClass("clicked");
                    secondCardClicked.removeClass("clicked");
                    firstCardClicked = null;
                    secondCardClicked = null;
                    attempts++;
                    displayStats();
                    $(".card").click(handleCardClick);
                }, 1500);
        }
        if (matches === max_matches){
            setTimeout(function(){
                displayWinModal();
            }, 3500);
        }
    }
}
function displayWinModal() {
    $("#winModalContainer").removeClass("hidden");
    games_played++;
    $("#games-played").text(games_played);
}

function calculateAccuracy(){
    var accuracyEquation = (matches / attempts)
    if(isNaN(accuracyEquation)){
        return 0;
    } else {
        var accuracy = accuracyEquation * 100;
        var accuracyRounded = Math.round(accuracy)  + "%";
        return accuracyRounded;
    }

}
function displayStats(){
    var calculateAverage = calculateAccuracy();
    $("#accuracy-calc").text(calculateAverage);
    $("#attempts").text(attempts);
}

function resetStats(){
    musicPlayer.pause();
    matches = null;
    attempts = null;
    $("#winModalContainer").addClass("hidden");
    $(".back-card").removeClass("hidden");
    $("div.card").removeClass("clicked");
    $("#accuracy-calc").text(0 + "%");
    $("#attempts").text(0);


}
