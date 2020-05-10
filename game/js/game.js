// Create the canvas
var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
var bgImage = new Image();
bgImage.src = "images/background.png";
canvas.width = bgImage.width;
canvas.height = bgImage.height;
document.getElementById("jeu").appendChild(canvas);


// drag related variables
var dragok = false;
var startX;
var startY;
var BB = canvas.getBoundingClientRect();
var offsetX = BB.left;
var offsetY = BB.top;


// listen for mouse events
canvas.onmousedown = myDown;
canvas.onmouseup = myUp;
canvas.onmousemove = myMove;


// Create the hero
var heroImage = new Image();
heroImage.src = "images/hero.png";

// Create the guard
var guardImage = new Image();
guardImage.src = "images/monster.png";

//Create the key
var keyImage = new Image();
keyImage.src = "images/key.png";


// Game objects
var hero = {
	speed: 256 // movement in pixels per second
};

var guard1 = {
    speed: 256
};

var guard2 = {
    speed:256
}

var guard3 ={
    speed:256
}

var key = {};
key.isDragging = false;



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

// handle mousedown events
function myDown(e) {
    e.preventDefault();
    e.stopPropagation();

    var mx = parseInt(e.clientX - offsetX);
    var my = parseInt(e.clientY - offsetY);

    dragok = false;
    if (mx > key.x && mx < key.x + keyImage.width && my > key.y && my < key.y + keyImage.height) {
            dragok = true;
            key.isDragging = true;
        }

    startX = mx;
    startY = my;
}


// handle mouseup events
function myUp(e) {
    e.preventDefault();
    e.stopPropagation();

    dragok = false;
    key.isDragging = false;

    if(key.x + keyImage.width/2 > hero.x && key.x + keyImage.width/2 < hero.x + heroImage.width && key.y + keyImage.height/2 > hero.y && key.y + keyImage.height/2 < hero.y + heroImage.height){
        console.log('key dropped on hero !');
    }
}

// handle mouse moves
function myMove(e) {
    if (dragok) {

        e.preventDefault();
        e.stopPropagation();

        var mx = parseInt(e.clientX - offsetX);
        var my = parseInt(e.clientY - offsetY);

        var dx = mx - startX;
        var dy = my - startY;

        if (key.isDragging) {
                key.x += dx;
                key.y += dy;
            }

        render();

        startX = mx;
        startY = my;

    }
}


// Draw background
function render() {
    context.drawImage(bgImage,0,0);
    context.drawImage(heroImage,hero.x,hero.y);
    context.drawImage(guardImage, guard1.x,guard1.y);
    context.drawImage(guardImage,guard2.x,guard2.y);
    context.drawImage(guardImage,guard3.x,guard3.y);
	context.drawImage(keyImage,key.x,key.y);
}


// Reset position
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;
    guard1.x=32+(Math.random()*(canvas.width-64));
    guard1.y=32+(Math.random()*(canvas.height-64));
    guard2.x=32+(Math.random()*(canvas.width-64));
    guard2.y=32+(Math.random()*(canvas.height-64));
    guard3.x=32+(Math.random()*(canvas.width-64));
    guard3.y=32+(Math.random()*(canvas.height-64));
	key.x=32+(Math.random()*(canvas.width-64));
    key.y=32+(Math.random()*(canvas.height-64));

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


