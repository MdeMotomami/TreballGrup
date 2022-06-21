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
var keyP;
var isPaused = false;
var isGameOver = false;

var counter = 0;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('sky', '../assets/sky.png');
    this.load.image('ground', '../assets/block1.png');
    this.load.image('dude', '../assets/robotiko.png' );
    this.load.image('spider', '../assets/spider.png');
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
    keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

    spider = this.physics.add.image(700, 400, 'spider');


    this.physics.add.collider(player, platforms);
    this.physics.add.collider(spider, platforms);

    this.physics.add.overlap(spider, player, collision);
}



function update ()
{
    if(keyP.isDown) {
        if (!isPaused){
            pauseGame();
        }
        if (isPaused){
            resumeGame();
        }
    }    

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


    //bat movement
    if (spider.x >= player.x)
    {
        spider.setVelocityX(-70);
    }
    else if (spider.x <= player.x)
    {
        spider.setVelocityX(70);
    }
    if (spider.body.touching.down){
        spider.setVelocityY(-350);
    }


    //contador d'enemics
    if (counter >= 1) win()
}

function collision(spider, player) {
    if (cursors.down.isDown) 
    {
        spider.disableBody(true, true)
        counter += 1;
    }
    else{
        player.disableBody(true, true);
        loadpage("../html/gameover.html")
    }
}

function win(){
    loadpage("../html/final.html")
}

function pauseGame() {
    isPaused = true;
    this.scene.pause();
}

function resumeGame(){
    isPaused = false;
    this.scene.resume();
}
