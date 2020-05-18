var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
var bgImage = new Image();
bgImage.src = "images/start_background.png";
canvas.width = bgImage.width;
canvas.height = bgImage.height;
document.getElementById("jeu").appendChild(canvas);



//buttons
var playbutton = new Image();
playbutton.src = "images/button-play.png";

var reglesbutton = new Image();
reglesbutton.src = "images/button-regles.png";


var hofbutton = new Image();
hofbutton.src = "images/button-score.png";


playbutton.onclick=function(){

    return "js/game.js"
}


// Draw background
function render() {
    context.drawImage(bgImage,0,0);
    context.drawImage(playbutton,60,215);
    context.drawImage(reglesbutton,60,324);
    context.drawImage(hofbutton,60,433);
}

var main = function () {

	render();
};

main();

