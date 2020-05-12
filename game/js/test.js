// Create the canvas

var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");

var bgImage = new Image();
bgImage.src = "images/background.png";

canvas.width = bgImage.width;
canvas.height = bgImage.height;

document.getElementById("jeu").appendChild(canvas);



// Create the hero
var heroImage = new Image();
heroImage.src = "images/hero1.png";


// Game objects
var hero = {
	speed: 256 // movement in pixels per second
};



// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;

    // Lock scroll
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);


// Update game objects
var update = function (modifier) {
	if (38 in keysDown) { // Player holding up
        if (isInMap('y',-10)){
          hero.y -= hero.speed * modifier;
        }
	}
	if (40 in keysDown) { // Player holding down
        if (isInMap('y',10)){
		  hero.y += hero.speed * modifier;
        }
	}
	if (37 in keysDown) { // Player holding left
        if (isInMap('x',-10)){
		  hero.x -= hero.speed * modifier;
        }
	}
	if (39 in keysDown) { // Player holding right
        if (isInMap('x',10)){
		  hero.x += hero.speed * modifier;
        }
	}
};


function isInMap(position,limit) {
    var x = hero.x + heroImage.height/2;
    var y = hero.y + heroImage.width/2;



    if (position === 'x') {
        if(x + heroImage.height/2 > canvas.width && limit > 0)
            return false;
        else if(x - heroImage.height/2 < 0 && limit < 0)
            return false;
        else
            x += limit;
    } else {
        if(y + heroImage.width/2 > canvas.height && limit > 0)
            return false;
        else if(y - heroImage.width/2 < 0 && limit < 0)
            return false;
        else
            y += limit;
    }

    var data = context.getImageData(x, y, canvas.width, canvas.height).data;
    var rgb = [ data[0], data[1], data[2] ];
    //console.log(rgb);
    if (data[0] === 255 && data[1] === 51 && data[2] === 51){
        return false;
    } else {
        return true;
    }

}


// Draw background and hero
function render() {
    context.drawImage(bgImage,0,0);
    context.drawImage(heroImage,hero.x,hero.y);
}


// Reset position
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;
};


var main = function () {

    var now = Date.now();
	var delta = now - then;

	update(delta / 1000);

	render();

    then = now;

    // Request to do this again ASAP
	requestAnimationFrame(main);
};



var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var then = Date.now();
reset();
main();


