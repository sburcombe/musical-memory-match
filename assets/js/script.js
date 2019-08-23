$(document).ready(initializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var max_matches = 9;
var attempts = null;
var games_played = null;
var cards = []
var musicPlayer = new Audio();
var cardHelper = {
    'tchaikovsky':{
        music: '../memory_match/assets/audio/Tchaikovsky.m4a',
        portrait: '../memory_match/assets/images/Tchaikovsky.png',
        bio: 'he was a musician'
    },
    'mozart': {
        music: '../memory_match/assets/audio/Mozart.mp3',
        portrait: '../memory_match/assets/images/Mozart.png',
        bio: 'he was a musician'
    },
    'vivaldi': {
        music: '../memory_match/assets/audio/Vivaldi.mp3',
        portrait: '../memory_match/assets/images/Vivaldi.png',
        bio: 'he was a musician'
    },
    'saint-saens': {
        music: '../memory_match/assets/audio/SaintSaens.m4a',
        portrait: '../memory_match/assets/images/SaintSaens.png',
        bio: 'he was a musician'
    },
    'beethoven': {
        music: '../memory_match/assets/audio/Beethoven.m4a',
        portrait: '../memory_match/assets/images/Beethoven.png',
        bio: 'he was a musician'
    },
    'bach': {
        music: '../memory_match/assets/audio/Bach.m4a',
        portrait: '../memory_match/assets/images/Bach.png',
        bio: 'he was a musician'
    },
    'price': {
        music: '../memory_match/assets/audio/FlorencePrice.m4a',
        portrait: '../memory_match/assets/images/FlorencePrice.png',
        bio: 'she was a musician'
    },
    'bonds': {
        music: '../memory_match/assets/audio/MargaretBonds.m4a',
        portrait: '../memory_match/assets/images/MargaretBonds.png',
        bio: 'she was a musician'
    },
    'saint-georges': {
        music: '../memory_match/assets/audio/SaintGeorges.m4a',
        portrait: '../memory_match/assets/images/SaintGeorges.png',
        bio: 'he was a musician'
    }

}


function initializeApp() {
    //when a card is clicked, the handleCardClick function is called
    $(".card").click(handleCardClick);
    //when the winModal replay button is clicked, the game is reset
    $(".replayInvite").click(resetStats);
    cardCreation();
}
function shuffle(array) {
    for (var cardIndex = array.length - 1; cardIndex > 0; cardIndex--) {
        var randomIndex = Math.floor(Math.random() * (cardIndex + 1)); // random index from 0 to i

        // swap elements array[i] and array[j]
        // we use "destructuring assignment" syntax to achieve that
        // you'll find more details about that syntax in later chapters
        // same can be written as:
        // let t = array[i]; array[i] = array[j]; array[j] = t
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
        var cardFront = $("<div>").addClass("front-card").css("background-image", "url(" + imageUrl + ")");
        var cardBox = $("<div>").addClass("card");
        cardBox.append(cardFront);
        $("div.container").append(cardBox);



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

        // displayStats();

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
    matches = null;
    attempts = null;
    $("#winModalContainer").addClass("hidden");
    $(".back-card").removeClass("hidden");
    $("div.card").removeClass("clicked");
    $("#accuracy-calc").text(0 + "%");
    $("#attempts").text(0);

}
