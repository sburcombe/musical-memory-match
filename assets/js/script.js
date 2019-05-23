$(document).ready(initializeApp);

function initializeApp() {

    $(".card").click(handleCardClick);


}


function handleCardClick(event) {

     $(this).find("div.front-card").addClass("hidden");
     //find a child inside of an element in jQuery

    console.log("You clicked the card!");
}