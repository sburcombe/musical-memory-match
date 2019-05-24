$(document).ready(initializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;



function initializeApp() {

    $(".card").click(handleCardClick);


}


function handleCardClick(event) {

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
        console.log("card 2 click ",revealedCardClick2)

        if (revealedCardClick1 === revealedCardClick2){

            console.log("cards match");
            matches++;
            console.log("Current matches: ",matches)
        } else {
                setTimeout(function(){
                    firstCardClicked.find("div.back-card").removeClass("hidden");
                    secondCardClicked.find("div.back-card").removeClass("hidden");
                }, 1500);


            console.log("No match");

        }
    }


};

//