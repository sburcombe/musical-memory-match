$(document).ready(initializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var max_matches = 2;



function initializeApp() {

    $(".card").click(handleCardClick);



}


function handleCardClick(event) {

   // if (it has a matched class){
   //      return;
   //  };

    if (firstCardClicked === null){

        firstCardClicked = $(this);
        firstCardClicked.find("div.back-card").addClass("hidden");

        console.log("card 1 click ",revealedCardClick1)

        //find a child inside of an element in jQuery

    } else {
        secondCardClicked = $(this);
        secondCardClicked.find("div.back-card").addClass("hidden");
        var revealedCardClick1 = firstCardClicked.find("div.front-card").css("background-image");
        var revealedCardClick2 = secondCardClicked.find("div.front-card").css("background-image");
        console.log("card 2 click ",revealedCardClick2);

        if (revealedCardClick1 === revealedCardClick2){

            console.log("cards match");
            matches++;
            //add class of matched
            console.log("Current matches: ",matches);
            firstCardClicked = null;
            secondCardClicked = null;

        } else {
                setTimeout(function(){
                    firstCardClicked.find("div.back-card").removeClass("hidden");
                    secondCardClicked.find("div.back-card").removeClass("hidden");
                    firstCardClicked = null;
                    secondCardClicked = null;
                }, 1500);
                //if they have the class of match, return



            console.log("No match");

        }
            if (matches === max_matches){
                function displayWinModal(){
                    $("#winModalContainer").removeClass("hidden");

                }
                displayWinModal();


                }
            };
    }




//