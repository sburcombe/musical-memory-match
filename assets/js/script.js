$(document).ready(initializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var max_matches = 9;
var attempts = null;
var games_played = null;
var mozartSound = new Audio("../memory_match/assets/audio/Mozart.mp3");
var vivaldiSound = new Audio("../memory_match/assets/audio/Vivaldi.mp3");
var tchaikovskySound = new Audio("../memory_match/assets/audio/Tchaikovsky.m4a");
var saintSaensSound = new Audio("../memory_match/assets/audio/SaintSaens.m4a");
var beethovenSound = new Audio("../memory_match/assets/audio/Beethoven.m4a");
var bachSound = new Audio("../memory_match/assets/audio/Bach.m4a");
var priceSound = new Audio("../memory_match/assets/audio/FlorencePrice.m4a");
var bondsSound = new Audio("../memory_match/assets/audio/MargaretBonds.m4a");
var saintGeorgesSound = new Audio("../memory_match/assets/audio/SaintGeorges.m4a");




function initializeApp() {
    //when a card is clicked, the handleCardClick function is called
    $(".card").click(handleCardClick);
    //when the winModal replay button is clicked, the game is reset
    $(".replayInvite").click(resetStats);
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
            mozartSound.pause();
            vivaldiSound.pause();
            tchaikovskySound.pause();
            saintSaensSound.pause();
            beethovenSound.pause();
            bachSound.pause();
            priceSound.pause();
            bondsSound.pause();
            saintGeorgesSound.pause();
            var cardChildNode = firstCardClicked[0].childNodes[2];
            switch (cardChildNode.className) {
                case "front-card mozart":
                    mozartSound.play();
                    setTimeout(function () {
                        mozartSound.pause();
                    }, 4250);
                    break;
                case "front-card vivaldi":
                    vivaldiSound.play();
                    setTimeout(function () {
                        vivaldiSound.pause();
                    }, 6000);
                    break;
                case "front-card tchaikovsky":
                    tchaikovskySound.play();
                    break;
                case "front-card saint-saens":
                    saintSaensSound.play();
                    break;
                case "front-card beethoven":
                    beethovenSound.play();
                    break;
                case "front-card bach":
                    bachSound.play();
                    break;
                case "front-card price":
                    priceSound.play();
                    break;
                case "front-card bonds":
                    bondsSound.play();
                    break;
                case "front-card saint-georges":
                    saintGeorgesSound.play();
                    break;
            }
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
