/**********************************************************
VARIABLES
**********************************************************/

var DISTANCE_TO_BORDER = 4;
var introduction = false;
var apparition = false;
var playing = false;
var level1 = false;
var level2 = false;
var level3 = false;
var pause1 = 200;
var pause2 = 200;





/********************************************************
CANVAS CREATION
********************************************************/
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 1000;
canvas.height = 600;
canvas.id = "gameCanvas";
document.getElementById("game").appendChild(canvas);




/********************************************************
KEYBOARD CONTROLS
********************************************************/

//Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;

    // Lock scroll
    if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);




/********************************************************
MOUSE CONTROLS
********************************************************/

var dragok = false;
var startX;
var startY;
var BB = canvas.getBoundingClientRect();
var offsetX = BB.left;
var offsetY = BB.top;

//Listen for mouse events

canvas.onmousedown = myDown;
canvas.onmouseup = myUp;
canvas.onmousemove = myMove;


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

    if (key.x + keyImage.width / 2 > hero.x && key.x + keyImage.width / 2 < hero.x + heroImage.width && key.y + keyImage.height / 2 > hero.y && key.y + keyImage.height / 2 < hero.y + heroImage.height) {
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





/********************************************************
GAME OBJECTS
********************************************************/

//BG
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "images/background.png";



//Hero
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
    heroReady = true;
};

var hero = {
    speed: 125, // movement in pixels per second
};



//Introduction

var introHeroReady = false;
var introHeroImage = new Image();
introHeroImage.onload = function () {
    introHeroReady = true;
}

var introHero = {
    y: 350,
    x: -200,
};

var bulle1Ready = false;
var bulle1Image = new Image();
bulle1Image.onload = function () {
    bulle1Ready = true;
}

var bulle1 = {
    y: 100,
    x: -450,
};

var bulle2Ready = false;
var bulle2Image = new Image();
bulle2Image.onload = function () {
    bulle2Ready = true;
}

var bulle2 = {
    y: 100,
    x: -450,
};



//Guards
var guardReady = false;
var guardImage = new Image();
guardImage.onload = function () {
    guardReady = true;
};
guardImage.src = "images/monster.png";


var guard1 = {
    speed: 64,
    direction: 0
};

var guard2 = {
    speed: 64,
    direction: 0
};

var guard3 = {
    speed: 64,
    direction: 0
};


//Key
var keyReady = false;
var keyImage = new Image();
keyImage.onload = function () {
    keyReady = true;
}
keyImage.src = "images/key.png";

var key = {};
key.isDragging = false;




/********************************************************
BEFORE THE GAME
********************************************************/

//Start introduction animation

var startAnimation = function (modifier) {
    if (apparition) {
        if (introHero.x < 0)
            introHero.x += 100 * modifier;
        if (introHero.x >= 0)
            apparition = false;
    }

    if (!apparition) {
        if (bulle1.x < 200) {
            bulle1.x += 100 * modifier;
        } else {
            if (pause1 > 0) {
                pause1 -= 1;
            } else {
                if (bulle1.y > -330) {
                    bulle1.y -= 100 * modifier;
                }
                if (bulle2.x < 200) {
                    bulle2.x += 100 * modifier;
                } else {
                    if (pause2 > 0) {
                        pause2 -= 1;
                    } else {
                        if (bulle2.y > -330) {
                            bulle2.y -= 100 * modifier;
                        }
                        if (introHero.x > -200) {
                            introHero.x -= 100 * modifier;
                        } else if (bulle2.y <= -330) {
                            introduction = false;
                            playing = true;
                        }
                    }
                }
            }
        }
    }

}




/********************************************************
UPDATE AND MOVE OBJECTS
********************************************************/

// Move hero
var moveHero = function (modifier) {

    if (38 in keysDown) { // Player holding up
        if (isInMap(hero, heroImage, 'y', -1)) {
            hero.y -= hero.speed * modifier;
        }
    }
    if (40 in keysDown) { // Player holding down
        if (isInMap(hero, heroImage, 'y', 1)) {
            hero.y += hero.speed * modifier;
        }
    }
    if (37 in keysDown) { // Player holding left
        if (isInMap(hero, heroImage, 'x', -1)) {
            hero.x -= hero.speed * modifier;
        }
    }
    if (39 in keysDown) { // Player holding right
        if (isInMap(hero, heroImage, 'x', 1)) {
            hero.x += hero.speed * modifier;
        }
    }
};



// Move Guards
var moveGuard = function (guard, modifier) {

    if (guard.direction == 0) {
        guard.direction = Math.floor(Math.random() * 4) + 1;
    }

    switch (guard.direction) {
        case 1:
            if (isInMap(guard, guardImage, 'y', 1)) {
                guard.y += guard.speed * modifier;
            } else {
                guard.direction = 0;
            }
            break;
        case 2:
            if (isInMap(guard, guardImage, 'x', 1)) {
                guard.x += guard.speed * modifier;
            } else {
                guard.direction = 0;
            }
            break;
        case 3:
            if (isInMap(guard, guardImage, 'y', -1)) {
                guard.y -= guard.speed * modifier;
            } else {
                guard.direction = 0;
            }
            break;
        case 4:
            if (isInMap(guard, guardImage, 'x', -1)) {
                guard.x -= guard.speed * modifier;
            } else {
                guard.direction = 0;
            }
    }
};



//Check for borders and walls
function isInMap(gameObject, gameImage, coordinate, direction) {
    var x = gameObject.x + gameImage.width / 2;
    var y = gameObject.y + gameImage.height / 2;

    if (coordinate === 'x') {
        if (direction === 1 && x + gameImage.width / 2 + DISTANCE_TO_BORDER > canvas.width)
            return false;
        else if (direction === -1 && x - gameImage.width / 2 - DISTANCE_TO_BORDER < 0)
            return false;
        else {
            x += direction * (gameImage.width / 2 + DISTANCE_TO_BORDER);

            var y1 = gameObject.y;
            var y2 = gameObject.y + gameImage.height;

            var top = ctx.getImageData(x, y1, canvas.width, canvas.height).data;
            var middle = ctx.getImageData(x, y, canvas.width, canvas.height).data;
            var bottom = ctx.getImageData(x, y2, canvas.width, canvas.height).data;

            if ((top[0] === 51 && top[1] === 0 && top[2] === 0) ||
                (middle[0] === 51 && middle[1] === 0 && middle[2] === 0) ||
                (bottom[0] === 51 && bottom[1] === 0 && bottom[2] === 0)) {
                return false;
            } else {
                return true;
            }
        }
    } else {
        if (direction === 1 && y + gameImage.height / 2 + DISTANCE_TO_BORDER > canvas.height)
            return false;
        else if (direction === -1 && y - gameImage.height / 2 - DISTANCE_TO_BORDER < 0)
            return false;
        else {
            y += direction * (gameImage.height / 2 + DISTANCE_TO_BORDER);

            var x1 = gameObject.x;
            var x2 = gameObject.x + gameImage.width;

            var left = ctx.getImageData(x1, y, canvas.width, canvas.height).data;
            var middle = ctx.getImageData(x, y, canvas.width, canvas.height).data;
            var right = ctx.getImageData(x2, y, canvas.width, canvas.height).data;

            if ((left[0] === 51 && left[1] === 0 && left[2] === 0) ||
                (middle[0] === 51 && middle[1] === 0 && middle[2] === 0) ||
                (right[0] === 51 && right[1] === 0 && right[2] === 0)) {
                return false;
            } else {
                return true;
            }
        }
    }
}



//Check for guards catching hero because he is too close and there is no wall between
function checkProximity(guard, hero) {

    var attrape = false;

    var posxmin;
    var posxmax;

    var posymin;
    var posymax;

    if (guard.x - hero.x < 80 && guard.x - hero.x > -80 && guard.y - hero.y < 80 && guard.y - hero.y > -80) {

        attrape = true;

        if (guard.x < hero.x) {
            posxmin = guard.x;
            posxmax = hero.x;
        } else {
            posxmin = hero.x;
            posxmax = guard.x
        }

        if (guard.y < hero.y) {
            posymin = guard.y;
            posymax = hero.y;
        } else {
            posymin = hero.y;
            posymax = guard.y;
        }

        while (posxmin < posxmax || posymin < posymax) {
            var imageData = ctx.getImageData(posxmin, posymin, canvas.width, canvas.height).data;

            if (imageData[0] === 51 && imageData[1] === 0 && imageData[2] === 0) {
                attrape = false;
            }

            posxmin += 5;
            posymin += 5;
        }
    }

    if (attrape == true) {
        reset();
    }
}





/********************************************************
DRAW EVERYTHING
********************************************************/

// Reset positions
var reset = function () {
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;
    guard1.x = 333;
    guard1.y = 500;
    guard2.x = 160;
    guard2.y = 46;
    guard3.x = 914;
    guard3.y = 132;
    key.x = 32 + (Math.random() * (canvas.width - 64));
    key.y = 32 + (Math.random() * (canvas.height - 64));

};


// Draw
var render = function () {

    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }

    if (heroReady) {
        ctx.drawImage(heroImage, hero.x, hero.y);
    }

    if (guardReady) {
        ctx.drawImage(guardImage, guard1.x, guard1.y);
        ctx.drawImage(guardImage, guard2.x, guard2.y);
        ctx.drawImage(guardImage, guard3.x, guard3.y);
    }

    if (keyReady) {
        ctx.drawImage(keyImage, key.x, key.y);
    }

    if (introHeroReady) {
        ctx.drawImage(introHeroImage, introHero.x, introHero.y);
    }

    if (bulle1Ready) {
        ctx.drawImage(bulle1Image, bulle1.x, bulle1.y);
    }

     if (bulle2Ready) {
        ctx.drawImage(bulle2Image, bulle2.x, bulle2.y);
    }

};






/********************************************************
MAIN LOOP
********************************************************/
var main = function () {
    var now = Date.now();
    var delta = now - then;

    var modifier = delta / 1000;

    if (introduction) {
        startAnimation(delta / 200);
    }


    if (playing) {
        update(modifier);
    }

    render();


    then = now;
    // Request to do this again ASAP
    requestAnimationFrame(main);
};


var update = function (modifier) {
    moveGuard(guard1, modifier);
    moveGuard(guard2, modifier);
    moveGuard(guard3, modifier);

    moveHero(modifier);

    checkProximity(guard1, hero);
    checkProximity(guard2, hero);
    checkProximity(guard3, hero);
}



/********************************************************
Cross-browser support for requestAnimationFrame
********************************************************/
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;





/********************************************************
PLAY
********************************************************/

function launchGame(level) {
    switch (level) {
        case "level1":
            level1 = true;
            heroImage.src = "images/hero1.png";
            introHeroImage.src = "images/selection_hero1.png";
            bulle1Image.src = "images/hero1_bulle1.png";
            bulle2Image.src = "images/hero1_bulle2.png";
            break;
        case "level2":
            level2 = true;
            heroImage.src = "images/hero2.png";
            introHeroImage.src = "images/selection_hero2.png";
            bulle1Image.src = "images/hero2_bulle1.png";
            bulle2Image.src = "images/hero2_bulle2.png";
            break;
        case "level3":
            level3 = true;
            heroImage.src = "images/hero3.png";
            introHeroImage.src = "images/selection_hero3.png";
            bulle1Image.src = "images/hero3_bulle1.png";
            bulle2Image.src = "images/hero3_bulle2.png";
            break;
    }

    document.getElementById("game").style.display = "";
    document.getElementById("mainmenu").style.display = "none";
    document.getElementById("levelselection").style.display = "none";

    introduction = true;
    apparition = true;
}


function startGame(level) {
    playing = true;
}


var then = Date.now();
reset();
main();
