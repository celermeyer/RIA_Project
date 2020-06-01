/**********************************************************
VARIABLES
**********************************************************/

const DISTANCE_TO_BORDER = 5;
var introduction = false;
var apparition = false;
var playing = false;
var level1 = false;
var level2 = false;
var level3 = false;

var heroIsCaught = false;
var heroCaughtX = 0;
var heroCaughtY = 0;
var attempts = 3;

var pause1 = 200;
var pause2 = 200;

var timer = 0;



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

    if (key1.x - hero.x < 50 && key1.x - hero.x > -50 && key1.y - hero.y < 50 && key1.y - hero.y > -50) {
        dragok = true;
        key1.isDragging = true;
    } else if (key2.x - hero.x < 50 && key2.x - hero.x > -50 && key2.y - hero.y < 50 && key2.y - hero.y > -50) {
        dragok = true;
        key2.isDragging = true;
    }

    startX = mx;
    startY = my;
}


// handle mouseup events
function myUp(e) {
    e.preventDefault();
    e.stopPropagation();

    dragok = false;
    key1.isDragging = false;
    key2.isDragging = false;

    var key1x = key1.x + keyImage.width / 2;
    var key1y = key1.y + keyImage.height / 2;

    var key2x = key2.x + keyImage.width / 2;
    var key2y = key2.y + keyImage.height / 2;

    if (key1x > hero.x && key1x < hero.x + heroImage.width && key1y > hero.y && key1y < hero.y + heroImage.height) {
        soundKey.play();
        hero.key1 = true;
    } else if (key2x > hero.x && key2x < hero.x + heroImage.width && key2y > hero.y && key2y < hero.y + heroImage.height) {
        soundKey.play();
        hero.key2 = true;
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

        if (key1.isDragging && key1.x - hero.x < 50 && key1.x - hero.x > -50 && key1.y - hero.y < 50 && key1.y - hero.y > -50) {
            key1.x += dx;
            key1.y += dy;
        } else if (key2.isDragging && key2.x - hero.x < 50 && key2.x - hero.x > -50 && key2.y - hero.y < 50 && key2.y - hero.y > -50) {
            key2.x += dx;
            key2.y += dy;
        }

        render();

        startX = mx;
        startY = my;

    }
}



/********************************************************
GAME OBJECTS AND SOUNDS
********************************************************/

//SOUNDS
var soundGame = new Audio("sounds/game_fond.wav");
soundGame.volume = 0.4;
var soundCaught = new Audio("sounds/caughtbyguard.wav");
var soundWin = new Audio("sounds/applaudissements.wav");
var soundLost = new Audio("sounds/lost.wav");
var soundKey = new Audio("sounds/whoosh.wav");
var soundIntro = new Audio("sounds/voixintro.ogg");
var endFalse = new Audio("sounds/false.wav")

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
    key1: false,
    key2: false,
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
guardImage.src = "images/guard_normal.png";


//Guard angry
var guardAngryReady = false;
var guardAngryImage = new Image();
guardAngryImage.onload = function () {
    guardAngryReady = true;
};
guardAngryImage.src = "images/guard_angry.png";


//Guard
function Guard() {
    this.x;
    this.y;
    this.speed = 64;
    this.direction = false;

    this.setPosition = function (x, y) {
        this.x = x;
        this.y = y;
    }
}

var guard1 = new Guard();
var guard2 = new Guard();
var guard3 = new Guard();
var guard4 = new Guard();



//Heart
var heartReady = false;
var heartImage = new Image();
heartImage.onload = function () {
    heartReady = true;
};
heartImage.src = "images/heart.png";


//Key
var keyReady = false;
var keyImage = new Image();
keyImage.onload = function () {
    keyReady = true;
}
keyImage.src = "images/key.png";

var key1 = {};
key1.isDragging = false;

var key2 = {};
key2.isDragging = false;



/********************************************************
BEFORE THE GAME
********************************************************/

//Start introduction animation
function startAnimation(modifier) {
    if (apparition) {
        if (introHero.x < 0)
            introHero.x += 100 * modifier;
        if (introHero.x >= 0)
            apparition = false;
    }

    if (!apparition) {
        if (bulle1.x < 200) {
            bulle1.x += 100 * modifier;
            soundIntro.play();
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
                            skipAnimation();
                        }
                    }
                }
            }
        }
    }

}

function skipAnimation() {
    introduction = false;
    soundIntro.pause();
    soundIntro.currentTime = 0;
    document.getElementById("buttonSkip").style.display = "none";
    playing = true;
}



/********************************************************
UPDATE AND MOVE OBJECTS
********************************************************/

// Move hero
function moveHero(modifier) {

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
function moveGuard(guard, modifier) {

    if (!guard.direction) {
        guard.direction = Math.floor(Math.random() * 4) + 1;
    }

    switch (guard.direction) {
        case 1:
            if (isInMap(guard, guardImage, 'y', 1)) {
                guard.y += guard.speed * modifier;
            } else {
                guard.direction = false;
            }
            break;
        case 2:
            if (isInMap(guard, guardImage, 'x', 1)) {
                guard.x += guard.speed * modifier;
            } else {
                guard.direction = false;
            }
            break;
        case 3:
            if (isInMap(guard, guardImage, 'y', -1)) {
                guard.y -= guard.speed * modifier;
            } else {
                guard.direction = false;
            }
            break;
        case 4:
            if (isInMap(guard, guardImage, 'x', -1)) {
                guard.x -= guard.speed * modifier;
            } else {
                guard.direction = false;
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

    if (guard.x - hero.x < 80 && guard.x - hero.x > -80 && guard.y - hero.y < 80 && guard.y - hero.y > -80) {

        var startX = guard.x + guardImage.width / 2;
        var startY = guard.y + guardImage.height / 2;

        var endX = hero.x + heroImage.width / 2;
        var endY = hero.y + heroImage.height / 2;

        var directionX;
        var directionY;

        if (startX < endX)
            directionX = 1;
        else
            directionX = -1;

        if (startY < endY)
            directionY = 1;
        else
            directionY = -1;

        var deltaX = Math.abs(endX - startX);
        var deltaY = Math.abs(endY - startY);

        var ratioX;
        var ratioY;

        var nbEtapes;

        if (deltaX > deltaY) {
            nbEtapes = deltaX / 5;
            ratioX = 1;
            ratioY = deltaY / deltaX;
        } else {
            nbEtapes = deltaY / 5;
            ratioY = 1;
            ratioX = deltaX / deltaY;
        }


        while (nbEtapes > 0) {
            var imageData = ctx.getImageData(startX, startY, canvas.width, canvas.height).data;

            if (imageData[0] === 51 && imageData[1] === 0 && imageData[2] === 0) {
                return;
            }

            startX += directionX * 5 * ratioX;
            startY += directionY * 5 * ratioY;

            nbEtapes--;
        }

        heroCaught(guard);
    }

}


function setPlaying(bool) {
    playing = bool;
}


function heroCaught(guard) {
    heroIsCaught = true;
    heroCaughtX = guard.x;
    heroCaughtY = guard.y;
    setPlaying(false);
    attempts--;
    if (attempts === 0) {
        stopGame("lose");
    } else {
        soundCaught.play();
        setTimeout(reset, 3000);
        setTimeout(setPlaying, 3000, true);
    }
}




/********************************************************
DRAW EVERYTHING
********************************************************/

// Reset positions
function reset() {
    heroIsCaught = false;
    hero.key1 = false;
    hero.key2 = false;
    hero.x = 75;
    hero.y = 460;

    guard1.setPosition(333, 500);
    guard2.setPosition(160, 46);
    guard3.setPosition(720, 220);
    guard4.setPosition(680, 20);

    key1.x = 15;
    key1.y = 180;
    key2.x = 740;
    key2.y = 10;
};


// Draw
function render() {

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
        if (level3)
            ctx.drawImage(guardImage, guard4.x, guard4.y);
    }

    if (keyReady) {
        if (level2 || level3) {
            if (!hero.key1) {
                ctx.drawImage(keyImage, key1.x, key1.y);
            }
        }
        if (level3) {
            if (!hero.key2) {
                ctx.drawImage(keyImage, key2.x, key2.y);
            }
        }
    }

    if (introduction) {
        if (introHeroReady) {
            ctx.drawImage(introHeroImage, introHero.x, introHero.y);
        }

        if (bulle1Ready) {
            ctx.drawImage(bulle1Image, bulle1.x, bulle1.y);
        }

        if (bulle2Ready) {
            ctx.drawImage(bulle2Image, bulle2.x, bulle2.y);
        }
    }


    if (heroIsCaught) {
        ctx.drawImage(guardAngryImage, heroCaughtX, heroCaughtY);
    }

    drawAttempts();

    drawTimer(timer);

};


function drawAttempts() {
    if (heartReady) {
        var x = 10;
        var i;
        for (i = 0; i < attempts; i++) {
            ctx.drawImage(heartImage, x, 2);
            x += 25;
        }
    }
}

function drawTimer(timer) {

    var minutes = timer / 60000;
    var secondes = (minutes - Math.floor(minutes)) * 60;

    ctx.font = "30px Arial";
    ctx.fillStyle = "white";

    if (Math.floor(secondes) < 10)
        ctx.fillText(Math.floor(minutes) + ":0" + Math.floor(secondes), 10, 50);
    else
        ctx.fillText(Math.floor(minutes) + ":" + Math.floor(secondes), 10, 50);
}


/********************************************************
MAIN LOOP
********************************************************/
function main() {
    var now = Date.now();
    var delta = now - then;

    var modifier = delta / 1000;

    if (playing) {
        soundGame.play();
        update(modifier);

        //incrémenter le timer
        timer += delta;

        var minutes = timer / 60000;

    }

    if (introduction) {
        startAnimation(delta / 200);
    }


    render();

    then = now;
    // Request to do this again ASAP
    requestAnimationFrame(main);
};


function update(modifier) {

    moveGuard(guard1, modifier);
    moveGuard(guard2, modifier);
    moveGuard(guard3, modifier);

    moveHero(modifier);

    if (hero.x >= 855 && hero.y <= 55) {

        if (level1)
            stopGame("victory");
        if (level2) {
            if (hero.key1) {
                stopGame("victory");
            }
            else{
                endFalse.play();
            }
        }
        if (level3) {
            if (hero.key1 && hero.key2) {
                stopGame("victory");
            }
            else{
                endFalse.play();
            }
        }
    }

    checkProximity(guard1, hero);
    checkProximity(guard2, hero);
    checkProximity(guard3, hero);

    if (level3) {
        moveGuard(guard4, modifier);
        checkProximity(guard4, hero);
    }
};



/********************************************************
Cross-browser support for requestAnimationFrame
********************************************************/
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;





/********************************************************
PLAY AND STOP
********************************************************/


function restartGame() {
    setPlaying(true);

    document.getElementById("game").style.display = "";
    document.getElementById("lose").style.display = "none";
    document.getElementById("win").style.display = "none";
}

function launchGame(level) {
    level1 = false;
    level2 = false;
    level3 = false;

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

    document.getElementById("buttonSkip").style.display = "";

}


function stopGame(statut) {
    setPlaying(false);

    soundGame.pause();

    if (statut === "victory") {
        soundWin.play();
        document.getElementById("game").style.display = "none";
        document.getElementById("lose").style.display = "none";
        document.getElementById("win").style.display = "";
    } else if (statut === "lose") {
        soundLost.play();
        document.getElementById("game").style.display = "none";
        document.getElementById("win").style.display = "none";
        document.getElementById("lose").style.display = "";
    } else if (statut === "abort") {
        soundIntro.pause();
        soundIntro.currentTime = 0;
        document.getElementById("mainmenu").style.display = "";
        document.getElementById("game").style.display = "none";
        introduction = false;
        //displayMenu();
    }

    pause1 = 200;
    pause2 = 200;

    window.localStorage.setItem("escapethejail-score", timer);
    if (level1)
        window.localStorage.setItem("escapethejail-level", 1);
    else if (level2)
        window.localStorage.setItem("escapethejail-level", 2);
    else
        window.localStorage.setItem("escapethejail-level", 3);

    timer = 0;

    bulle1.x = -450;
    bulle1.y = 100;

    bulle2.x = -450;
    bulle2.y = 100;

    attempts = 3;

    hero.key1 = false;
    hero.key2 = false;

    reset();
}


var then = Date.now();
reset();
main();
