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
heroImage.src = "images/audi.png";

// Create the guard
var guardImage = new Image();
guardImage.src = "images/monster.png";

//Create the key
var keyImage = new Image();
keyImage.src = "images/key.png";


// Game objects
var hero = {
	speed: 256, // movement in pixels per second
    up: false,
    down: false,
    left: false,
    right: false
};

var guard1 = {
    speed: 64,
    up: false,
    down: true,
    left: false,
    right: false
};

var guard2 = {
    speed:64,
     up: false,
    down: false,
    left: false,
    right: true
};

var guard3 ={
    speed:64,
     up: true,
    down: false,
    left: false,
    right: false
};

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
        if (isInMap(hero,heroImage,'y',-1)){
          hero.y -= hero.speed * modifier;
        }
	}
	if (40 in keysDown) { // Player holding down
        if (isInMap(hero,heroImage,'y',1)){
		  hero.y += hero.speed * modifier;
        }
	}
	if (37 in keysDown) { // Player holding left
        if (isInMap(hero,heroImage,'x',-1)){
		  hero.x -= hero.speed * modifier;
        }
	}
	if (39 in keysDown) { // Player holding right
        if (isInMap(hero,heroImage,'x',1)){
		  hero.x += hero.speed * modifier;
        }
	}
};

// Move Guards
var moveGuards = function (guard,modifier) {
    if(guard.down){
        //console.log('down');
        if (isInMap(guard,guardImage,'y',1)){
            //console.log('In');
          guard.y += guard.speed * modifier;
        }
        else {
            //console.log('Out');
            guard.down=false;
            guard.right = true;
        }
    }
    if(guard.right){
        //console.log('right');
        if (isInMap(guard,guardImage,'x',1)){
            //console.log('In');
          guard.x += guard.speed * modifier;
        }
        else {
            //console.log('Out');
            guard.right=false;
            guard.up = true;
        }
    }
    if(guard.up){
        //console.log('up');
        if (isInMap(guard,guardImage,'y',-1)){
            //console.log('In');
          guard.y -= guard.speed * modifier;
        }
        else {
            //console.log('Out');
            guard.up=false;
            guard.left = true;
        }
    }
    if(guard.left){
        //console.log('left');
        if (isInMap(guard,guardImage,'x',-1)){
            //console.log('In');
          guard.x -= guard.speed * modifier;
        }
        else {
            //console.log('Out');
            guard.left=false;
            guard.down = true;
        }
    }

};


function isInMap(gameObject,gameImage,coordinate,direction) {
    var x = gameObject.x + gameImage.width/2;
    var y = gameObject.y + gameImage.height/2;

    if (coordinate === 'x') {
        if(direction === 1 && x + gameImage.width/2 > canvas.width)
            return false;
        else if(direction === -1 && x - gameImage.width/2 < 0)
            return false;
        else
            x += direction*gameImage.width;
    } else {
        if(direction === 1 && y + gameImage.height/2 > canvas.height)
            return false;
        else if(direction === -1 && y - gameImage.height/2 < 0)
            return false;
        else
            y += direction*gameImage.height;
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

    context.fillStyle = "#00FF00";

    context.fillRect(hero.x + heroImage.width/2,hero.y + heroImage.height/2,2,2);
}


// Reset position
var reset = function () {
	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;
    guard1.x=333;
    guard1.y=500;
    guard2.x=160;
    guard2.y=46;
    guard3.x=914;
    guard3.y=132;
	key.x=32+(Math.random()*(canvas.width-64));
    key.y=32+(Math.random()*(canvas.height-64));

};


var main = function () {

    var now = Date.now();
	var delta = now - then;

	moveGuards(guard1,delta/1000);
    moveGuards(guard2,delta/1000);
    moveGuards(guard3,delta/1000);

	update(delta/1000);

	render();

    then = now;

    // Request to do this again ASAP
	requestAnimationFrame(main);
};



var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var then = Date.now();
reset();
console.log('height: ' + heroImage.height + ' | width: ' + heroImage.width);
main();


