var Enemy = function(x, y, velocity) {
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
    this.x += this.velocity * dt;
    if (this.x >= 500) {
        this.x = -50;
    };
    checkObjectCollision(player, this);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y, velocity) {
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.sprite = 'images/char-boy.png';
};
Player.prototype.update = function() {
    if (player.y + 63 <= 44) {
        scorepoint();
    }
    this.x = bindObjectToBounds(this.x, 400, 10);
    this.y = bindObjectToBounds(this.y, 380, 0);
};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(keypress) {
    if (keypress == 'left') {
        player.x -= player.velocity;
    }
    if (keypress == 'up') {
        player.y -= player.velocity;
    }
    if (keypress == 'down') {
        player.y += player.velocity;
    }
    if (keypress == 'right') {
        player.x += player.velocity;
    }
};
Player.prototype.resetPosition = function() {
    this.x = 200;
    this.y = 380;
};

// Increases the number of enemies in the stage
var levelUp = function() {
    allEnemies.length = 0;
    for (var i = 0; i <= level; i++) {
        var enemy = new Enemy(Math.random() * 400, Math.random() * 184 + 50, Math.random() * 300);
        allEnemies.push(enemy);
    };
    level++;
    console.log("Advanced to level " + level);
    return level;
};

// Awards player a point for reaching water and returns him to start location
var scorepoint = function() {
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 505, 171);
    levelUp();
    player.resetPosition();
};

// Sets movement boundary to an object
var bindObjectToBounds = function(object, max, min) {
    if (object <= min) {
        return min;
    } else if (object >= max) {
        return max;
    };
    return object;
};

// Checks if an object collides with another object
var checkObjectCollision = function(firstobject, secondobject) {
     if (
        firstobject.y + 139 >= secondobject.y + 90
        && firstobject.x + 18 <= secondobject.x + 88
        && firstobject.y + 100 <= secondobject.y + 135
        && firstobject.x + 84 >= secondobject.x + 11){
        console.log('You collided with an object');
        firstobject.resetPosition();
        };
};

//Initialize Player and Enemies
var player = new Player(200, 380, 50);
var allEnemies = [];
var level = 0;
levelUp();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});