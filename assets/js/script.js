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

    ///tracking stats #4, 5




}


function handleCardClick(event) {


   if($(this).hasClass("clicked")){
       return
   };

    if (firstCardClicked === null){

        $(event.currentTarget).addClass("clicked");
        firstCardClicked = $(this);
        firstCardClicked.find("div.back-card").addClass("hidden");


        console.log("card 1 click ",revealedCardClick1)



    } else {
        $(event.currentTarget).addClass("clicked");
        secondCardClicked = $(this);
        secondCardClicked.find("div.back-card").addClass("hidden");
        var revealedCardClick1 = firstCardClicked.find("div.front-card").css("background-image");
        var revealedCardClick2 = secondCardClicked.find("div.front-card").css("background-image");
        displayStats();
        console.log("card 2 click ",revealedCardClick2);

        if (revealedCardClick1 === revealedCardClick2){

            console.log("cards match");
            matches++;
            //add class of matched
            console.log("Current matches: ",matches);
            firstCardClicked = null;
            secondCardClicked = null;
            attempts++;
            displayStats();


        } else {
                setTimeout(function(){
                    firstCardClicked.find("div.back-card").removeClass("hidden");
                    secondCardClicked.find("div.back-card").removeClass("hidden");
                    //remove class remove class clicked
                    firstCardClicked.removeClass("clicked");
                    secondCardClicked.removeClass("clicked");
                    firstCardClicked = null;
                    secondCardClicked = null;
                    attempts++;
                    displayStats();
                }, 1500);
                //if they have the class of match, return



            console.log("No match");

        }
            if (matches === max_matches){
                function displayWinModal(){
                    $("#winModalContainer").removeClass("hidden");
                    games_played++
                    $("#games-played").text(games_played);
                }
                displayWinModal();


                }
            };
    }
function calculateAccuracy(){
        // debugger;
       var accuracyEquation = (matches / attempts).toFixed(2) * 100 + "%" ;

       return accuracyEquation ;
};
function displayStats(){

    var calculateAverage = calculateAccuracy();

    $("#accuracy-calc").text(calculateAverage);
    // $("#games-played").text(games_played);
    $("#attempts").text(attempts);


}




//