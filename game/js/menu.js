/**********************************************************
GESTION DU MENU
**********************************************************/

function displayMenu() {
    document.getElementById("mainmenu").style.display = "";
    document.getElementById("game").style.display = "none";
    document.getElementById("levelselection").style.display = "none";
    document.getElementById("rules").style.display = "none";
    document.getElementById("hallOfFame").style.display = "none";
    document.getElementById("lose").style.display = "none";
    document.getElementById("win").style.display = "none";
    document.getElementById("saveScore").style.display = "none";
}

function displayLevelSelection() {
    document.getElementById("mainmenu").style.display = "none";
    document.getElementById("game").style.display = "none";
    document.getElementById("levelselection").style.display = "";
    document.getElementById("rules").style.display = "none";
    document.getElementById("hallOfFame").style.display = "none";
    document.getElementById("lose").style.display = "none";
    document.getElementById("win").style.display = "none";
    document.getElementById("saveScore").style.display = "none";
}

function displayRules() {
    document.getElementById("mainmenu").style.display = "none";
    document.getElementById("game").style.display = "none";
    document.getElementById("levelselection").style.display = "none";
    document.getElementById("rules").style.display = "";
    document.getElementById("hallOfFame").style.display = "none";
    document.getElementById("lose").style.display = "none";
    document.getElementById("win").style.display = "none";
    document.getElementById("saveScore").style.display = "none";
}

function displayHOF() {
    document.getElementById("mainmenu").style.display = "none";
    document.getElementById("game").style.display = "none";
    document.getElementById("levelselection").style.display = "none";
    document.getElementById("rules").style.display = "none";
    document.getElementById("hallOfFame").style.display = "";
    document.getElementById("lose").style.display = "none";
    document.getElementById("win").style.display = "none";
    document.getElementById("saveScore").style.display = "none";
    showHof();
}

function displayLose() {
    document.getElementById("mainmenu").style.display = "none";
    document.getElementById("game").style.display = "none";
    document.getElementById("levelselection").style.display = "none";
    document.getElementById("rules").style.display = "none";
    document.getElementById("hallOfFame").style.display = "none";
    document.getElementById("lose").style.display = "";
    document.getElementById("win").style.display = "none";
    document.getElementById("saveScore").style.display = "none";
}

function displayWin() {
    document.getElementById("mainmenu").style.display = "none";
    document.getElementById("game").style.display = "none";
    document.getElementById("levelselection").style.display = "none";
    document.getElementById("rules").style.display = "none";
    document.getElementById("hallOfFame").style.display = "none";
    document.getElementById("lose").style.display = "none";
    document.getElementById("win").style.display = "";
    document.getElementById("saveScore").style.display = "none";
}

function displaySaveScore(callback) {
    document.getElementById("mainmenu").style.display = "none";
    document.getElementById("game").style.display = "none";
    document.getElementById("levelselection").style.display = "none";
    document.getElementById("rules").style.display = "none";
    document.getElementById("hallOfFame").style.display = "none";
    document.getElementById("lose").style.display = "none";
    document.getElementById("win").style.display = "none";
    document.getElementById("saveScore").style.display = "";
    callback();
}
