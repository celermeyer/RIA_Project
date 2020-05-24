var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
var bgImage = new Image();
bgImage.src = "images/start_background.png";
canvas.width = bgImage.width;
canvas.height = bgImage.height;
document.getElementById("jeu").appendChild(canvas);
const RECT = canvas.getBoundingClientRect();
const BUTTONS_X = 60;
const BUTTON_PLAY_Y = 215;
const BUTTON_RULES_Y = 324;
const BUTTON_HOF_Y = 433;

//buttons
var playbutton = new Image();
playbutton.src = "images/button-play.png";

var reglesbutton = new Image();
reglesbutton.src = "images/button-regles.png";

var hofbutton = new Image();
hofbutton.src = "images/button-score.png";


canvas.onclick=function(event){
    const x = event.clientX - RECT.left;
    const y = event.clientY - RECT.top;

    if(x>=BUTTONS_X && x<=BUTTONS_X+playbutton.width){
        if(y>=BUTTON_PLAY_Y && y<=BUTTON_PLAY_Y+playbutton.height){
            console.log('play button pressed');
        }
        else if(y>=BUTTON_RULES_Y && y<=BUTTON_RULES_Y+reglesbutton.height)
            console.log('rules button pressed');
        else if(y>=BUTTON_HOF_Y && y<=BUTTON_HOF_Y+hofbutton.height)
            console.log('hof button pressed');
    }
};



// Draw background
function render() {
    context.drawImage(bgImage,0,0);
    context.drawImage(playbutton,BUTTONS_X,BUTTON_PLAY_Y);
    context.drawImage(reglesbutton,BUTTONS_X,BUTTON_RULES_Y);
    context.drawImage(hofbutton,BUTTONS_X,BUTTON_HOF_Y);
}

var main = function () {

	render();
};

main();

