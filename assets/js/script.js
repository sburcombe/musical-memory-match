$(document).ready(initializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var max_matches = 9;
var attempts = null;
var games_played = null;



function initializeApp() {
    //when a card is clicked, the handleCardClick function is called
    $(".card").click(handleCardClick);
    //when the winModal replay button is clicked, the game is reset
    $(".replayInvite").click(resetStats);
}


function handleCardClick(event) {


   if($(this).hasClass("clicked")){
       return
   };

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

        displayStats();

        if (revealedCardClick1 === revealedCardClick2){

            matches++;
            firstCardClicked = null;
            secondCardClicked = null;
            attempts++;
            displayStats();

        } else {
                setTimeout(function(){
                    firstCardClicked.find("div.back-card").removeClass("hidden");
                    secondCardClicked.find("div.back-card").removeClass("hidden");
                    firstCardClicked.removeClass("clicked");
                    secondCardClicked.removeClass("clicked");
                    firstCardClicked = null;
                    secondCardClicked = null;
                    attempts++;
                    displayStats();
                }, 1500);

        }
        if (matches === max_matches){

            displayWinModal();
        };

    function displayWinModal(){

        $("#winModalContainer").removeClass("hidden");
        games_played++
        $("#games-played").text(games_played);

            };
        }

    };

function calculateAccuracy(){

    var accuracyEquation = (matches / attempts).toFixed(2) * 100 + "%" ;
    return accuracyEquation ;
};
function displayStats(){

    var calculateAverage = calculateAccuracy();
    $("#accuracy-calc").text(calculateAverage);
    $("#attempts").text(attempts);

};

function resetStats(){

    matches = null;
    attempts = null;
    $("#winModalContainer").addClass("hidden");
    $(".back-card").removeClass("hidden");
    $("div.card").removeClass("clicked");
    $("#accuracy-calc").text(0 + "%");
    $("#attempts").text(0);

};




