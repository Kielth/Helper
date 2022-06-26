var highScores = [];


function loadHighScores(){
    //get from local storage, parse it back into an array and store in highScores[]
    highScores = JSON.parse(localStorage.getItem('highScores'));
    //calls the sortArray function from below
    sortArray();
}

// organizes the highScore Array to display highest sccore first
function sortArray(){
    //sorts the highScores array into a lowest to highest list of scores
    highScores.sort(function(a,b) {
        return a[1] - b[1];
    });
    // revereses the array so highest score comes first
    highScores.reverse();
}

// creates the list items to be displayed in the OL on the scores.html page
function displayHighScores(){
    // calling loadHighScores drom above
    loadHighScores();
    // assign the OL item from scores.html to an object 
    var highScoreOrderedList = document.querySelector("#highScoreList");
    // create a list item for each high score entry in highScores[]
    for (var firstArrayIndex = 0; firstArrayIndex < highScores.length; firstArrayIndex++){
        var newListItem = document.createElement("li");
        newListItem.textContent = highScores[firstArrayIndex][0] + "-" + highScores[firstArrayIndex][1];
        highScoreOrderedList.appendChild(newListItem);
    }

}