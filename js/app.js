var allEnemies;
var player;
var level;

(function() {
    'use strict';

    /**
     * Creates a Base Player object with movement and sprite
     * @param {int} x
     * @param {int} y
     * @param {int} velocity
     * @param {string} sprite
     */
    var BasePlayer = function(x, y, velocity, sprite) {
        this.x = x;
        this.y = y;
        this.velocity = velocity;
        this.sprite = sprite;
    };

    /**
     * Draws the sprite to the Canvas
     */
    BasePlayer.prototype.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    /**
     * Creates an enemy that deligates to BasePlayer
     * @param {int} x
     * @param {int} y
     * @param {int} velocity
     * @param {string} sprite
     */
    var Enemy = function(x, y, velocity, sprite) {
        BasePlayer.call(this, x, y, velocity, sprite);
        this.enemyBoundary = {
            endOfMap: 500,
            enemyResetPosition: 50
        };
    };

    Enemy.prototype = Object.create(BasePlayer.prototype);

    /**
     * Update loop that moves the enemy across the screen, resets it and checks for collisions
     * @param  {int} dt
     */
    Enemy.prototype.update = function(dt) {
        this.x += this.velocity * dt;

        if (this.x >= this.enemyBoundary.endOfMap) {
            this.x = -this.enemyBoundary.enemyResetPosition;
        }

        checkObjectCollision(player, this);
    };

    /**
     * Creates a player that deligates to BasePlayer
     * @param {int}
     * @param {int}
     * @param {int}
     * @param {string}
     */
    var Player = function(x, y, velocity, sprite) {
        BasePlayer.call(this, x, y, velocity, sprite);
        this.playerBoundary = {
            xMaxBounds: 400,
            xMinBounds: 10,
            yMaxBounds: 380,
            yMinBounds: 0,
            winBounds: 44,
            playerHeight: 63
        };

    };

    Player.prototype = Object.create(BasePlayer.prototype);

    /**
     * Update loop that keeps the player from leaving the playable area.
     */
    Player.prototype.update = function() {
        if (this.y + this.playerBoundary.playerHeight <= this.playerBoundary
            .winBounds) {
            scorePoint();
        }
        this.x = bindObjectToBounds(this.x, this.playerBoundary.xMaxBounds,
            this.playerBoundary.xMinBounds);
        this.y = bindObjectToBounds(this.y, this.playerBoundary.yMaxBounds,
            this.playerBoundary.yMinBounds);
    };

    /**
     * Takes keypress input and moves the player by velocity amount
     */
    Player.prototype.handleInput = function(keypress) {
        if (keypress == 'left') {
            this.x -= this.velocity;
        }
        if (keypress == 'up') {
            this.y -= this.velocity;
        }
        if (keypress == 'down') {
            this.y += this.velocity;
        }
        if (keypress == 'right') {
            this.x += this.velocity;
        }
    };

    /**
     * Returns the player to starting position
     */
    Player.prototype.resetPosition = function() {
        this.x = 200;
        this.y = 380;
    };

    /**
     * Increases the difficulty by adding 1 more enemy
     */
    var levelUp = function() {
        var multipliers = {
            xPosition: 400,
            yPosition: 184,
            enemyHeight: 50,
            velocity: 300
        };
        allEnemies.length = 0;
        for (var i = 0; i <= level; i++) {
            var enemy = new Enemy(Math.random() * multipliers.xPosition,
                Math.random() *
                multipliers.yPosition + multipliers.enemyHeight,
                Math.random() *
                multipliers.velocity, 'images/enemy-bug.png');
            allEnemies.push(enemy);
        }
        level++;
        console.log('Advanced to level ' + level);
        return level;
    };

    /**
     * Increases difficulty and returns player to start location
     */
    var scorePoint = function() {
        levelUp();
        player.resetPosition();
    };

    /**
     * Applies movement restrictions to an object
     * @param  {object} object
     * @param  {int} max
     * @param  {int} min
     * @return {object} object
     */
    var bindObjectToBounds = function(object, max, min) {
        if (object <= min) {
            return min;
        } else if (object >= max) {
            return max;
        }
        return object;
    };

    /**
     * Checks to see if one object collides with another object
     * @param  {object} firstobject
     * @param  {object} secondobject
     */
    var checkObjectCollision = function(firstobject, secondobject) {
        var objectOutlines = {
            playerFeet: 139,
            playerHead: 100,
            playerRight: 84,
            playerLeft: 18,
            enemyFeet: 90,
            enemyHead: 135,
            enemyRight: 88,
            enemyLeft: 11
        };
        if (
            firstobject.y + objectOutlines.playerFeet >= secondobject.y +
            objectOutlines.enemyFeet && firstobject.x + objectOutlines.playerLeft <=
            secondobject.x + objectOutlines.enemyRight && firstobject.y +
            objectOutlines.playerHead <= secondobject.y +
            objectOutlines.enemyHead &&
            firstobject.x + objectOutlines.playerRight >= secondobject.x +
            objectOutlines.enemyLeft) {
            console.log('You collided with an object');
            firstobject.resetPosition();
        }
    };

    /**
     * Create new player and set game to level 1
     */
    player = new Player(200, 380, 50, 'images/char-boy.png');
    allEnemies = [];
    level = 0;
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
}());