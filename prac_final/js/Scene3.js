var isPaused = false;
var isGameOver = false;

function runGame(){
    if (condicio_mort){
        clearInterval(interval);
        gameOver();
        return;
    }
}

document.addEventListener('keyup', function(e)
{
    if(e.which == 32 && isGameOver == false){
        if(isPaused) resumeGame();
        else pauseGame()
    }
});

function pauseGame(){
    clearInterval(interval);
    isPaused = true;
    canvas.style.opacity = 0.5;
    canvasContext.font = "90px tahoma";
    canvasContext.fillStyle = "white";
    canvasContext.textAlign = "center";
    canvasContext.textBaseline = "middle";
    canvasContext.fillText("Game Paused", 400, 250);
}

function resumeGame(){
    isPaused = false;
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    canvas.style.opacity = 1;
    interval = setInterval(runGame, 20);
}

function gameOver(){
    isGameOver = true;
    canvas.style.opacity = 0.5;
    canvasContext.font = "90px tahoma";
    canvasContext.fillStyle = "white";
    canvasContext.textAlign = "center";
    canvasContext.textBaseline = "middle";
    canvasContext.fillText("Game Over", 400, 170);
    canvasContext.fillText("You Scored" + score, 400, 330);
}

var config = {
    type: Phaser.AUTO,
    width: 799,
    height: 600,
    parent: 'phaser-example',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var platforms;
var cursors;
var movingPlatform;
var counter = 0;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('sky', '/prac_final/assets/sky.png');
    this.load.image('ground', '/prac_final/assets/block1.png');
    this.load.image('dude', '/prac_final/assets/robotiko.png' );
    this.load.image('meatball', '/prac_final/assets/meatball.png');
}

function create ()
{
    this.add.image(400, 400, 'sky').setScale(0.5);

    platforms = this.physics.add.staticGroup();

    platforms.create(0, 568, 'ground').setScale(2).refreshBody();
    platforms.create(42*2, 568, 'ground').setScale(2).refreshBody();
    platforms.create(42*4, 568, 'ground').setScale(2).refreshBody();
    platforms.create(42*6, 568, 'ground').setScale(2).refreshBody();
    platforms.create(42*8, 568, 'ground').setScale(2).refreshBody();
    platforms.create(42*10, 568, 'ground').setScale(2).refreshBody();
    platforms.create(42*12, 568, 'ground').setScale(2).refreshBody();
    platforms.create(42*14, 568, 'ground').setScale(2).refreshBody();
    platforms.create(42*16, 568, 'ground').setScale(2).refreshBody();
    platforms.create(42*18, 568, 'ground').setScale(2).refreshBody();

    platforms.create(600, 400, 'ground').setScale(2).refreshBody();
    platforms.create(100, 250, 'ground').setScale(2).refreshBody();
    platforms.create(750, 250, 'ground').setScale(2).refreshBody();

    movingPlatform = this.physics.add.image(400, 400, 'ground');
    movingPlatform2 = this.physics.add.image(200, 300, 'ground');

    movingPlatform.setImmovable(true);
    movingPlatform.body.allowGravity = false;
    movingPlatform.setVelocityX(50);
    movingPlatform2.setImmovable(true);
    movingPlatform2.body.allowGravity = false;
    movingPlatform2.setVelocityX(50);

    player = this.physics.add.sprite(200, 450, 'dude');

    player.setBounce(0.0);
    player.setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();

    let x = Math.random()*450;
    let x2 = Math.random()*799;
    meatball = this.physics.add.image(x, 10, 'meatball');
    meatball2 = this.physics.add.image(x2, 10, 'meatball');
    movingPlatform2.setImmovable(true);
    movingPlatform2.body.allowGravity = false;
    movingPlatform2.setVelocityX(30);

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(player, movingPlatform);
    this.physics.add.collider(player, movingPlatform2);

    this.physics.add.overlap(meatball, player, collision);
    this.physics.add.overlap(meatball2, player, collision);
}



function update ()
{
    //move to the sides
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);
    }
    else
    {
        player.setVelocityX(0);
    }

    //jump
    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-320);
    }

    if (cursors.down.isDown) 
    {
        player.setVelocityY(420);
    }

    if (movingPlatform.x >= 500)
    {
        movingPlatform.setVelocityX(-50);
    }
    else if (movingPlatform.x <= 300)
    {
        movingPlatform.setVelocityX(50);
    }

    if (movingPlatform2.x >= 600)
    {
        movingPlatform2.setVelocityX(-50);
    }
    else if (movingPlatform2.x <= 200)
    {
        movingPlatform2.setVelocityX(50);
    }

    //bat movement
    if (meatball.x >= player.x)
    {
        meatball.setVelocityX(-75);
    }
    else if (meatball.x <= player.x)
    {
        meatball.setVelocityX(75);
    }
    if (meatball.y >= player.y)
    {
        meatball.setVelocityY(-65);
    }
    else if (meatball.y <= player.y)
    {
        meatball.setVelocityY(65);
    }

    //bat2
    if (meatball2.x >= player.x)
    {
        meatball2.setVelocityX(-100);
    }
    else if (meatball2.x <= player.x)
    {
        meatball2.setVelocityX(100);
    }
    if (meatball2.y >= player.y)
    {
        meatball2.setVelocityY(-80);
    }
    else if (meatball2.y <= player.y)
    {
        meatball2.setVelocityY(80);
    }

    //contador d'enemics
    if (counter >= 2)
        game_over()
}

function collision(bat, player) {
    if (cursors.down.isDown && player.body.touching.down == false) 
    {
        bat.disableBody(true, true)
        counter += 1;
    }
    else{
        player.disableBody(true, true);
        loadpage("./index.html")
    }
}


function game_over(){
    loadpage("./phasergame3.html")
}