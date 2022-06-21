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
    this.load.image('spider', '/prac_final/assets/spider.png');
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

    player = this.physics.add.sprite(200, 450, 'dude');

    player.setBounce(0.0);
    player.setCollideWorldBounds(true);

    cursors = this.input.keyboard.createCursorKeys();

    let x = Math.random()*799;
    spider = this.physics.add.image(x, 10, 'spider');

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(spider, platforms);

    this.physics.add.overlap(spider, player, collision);
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
    if (spider.x >= player.x)
    {
        spider.setVelocityX(-50);
    }
    else if (spider.x <= player.x)
    {
        spider.setVelocityX(50);
    }
    if (spider.y >= player.y)
    {
        spider.setVelocityY(-50);
    }
    else if (spider.y <= player.y)
    {
        spider.setVelocityY(50);
    }

    //contador d'enemics
    if (counter >= 1)
        game_over()
}

function collision(spider, player) {
    if (cursors.down.isDown) 
    {
        if (player.body.touching.down){
            counter=counter;
        }
        else{
            spider.disableBody(true, true)
            counter += 1;
        }
    }
    else{
        player.disableBody(true, true);
        loadpage("./index.html")
    }
}

function game_over(){
    loadpage("./phasergame4.html")
}