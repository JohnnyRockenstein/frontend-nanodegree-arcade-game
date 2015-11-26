// Enemies our player must avoid
var Enemy = function(x, y, velocity) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.velocity * dt;
    if (this.x >= 500) {
        this.x = -50;
    };

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(x, y, velocity){
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.sprite = 'images/char-boy.png';
};
    Player.prototype.update = function(){
        if (this.y + 63 <= 44 ){
            scorepoint();
        }
        player.checkBounds();
    };
    Player.prototype.render = function(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

    };
    Player.prototype.handleInput = function(keypress){
        if (keypress == 'left'){
            player.x -= player.velocity;
        }
        if (keypress == 'up'){
            player.y -= player.velocity;
        }
        if (keypress == 'down'){
            player.y += player.velocity;
        }
        if (keypress == 'right'){
            player.x += player.velocity;
        }

    };
    Player.prototype.checkBounds = function(){
        if (player.x == 10){
            player.x = 10;
        };
    }


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player(200, 380, 50);
var allEnemies = [];
var level = 0;

var levelUP = function(){
    allEnemies.length  = 0;
    for (var i = 0; i <= level; i++) {
        var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 500);

        allEnemies.push(enemy);
    };
    level++;
    return level;
    console.log(level);
};

var scorepoint = function(){
    player.x = 200;
    player.y = 380;
    levelUP();
};

var player = new Player(200, 380, 50);
var allEnemies = [];
var level = 0;
levelUP();



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
