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
    scene:{
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
var keyP;
var isPaused = false;
var isGameOver = false;

var game = new Phaser.Game(config);


function preload ()
{
    this.load.image('sky', '../assets/sky.png');
    this.load.image('ground', '../assets/block1.png');
    this.load.image('dude', '../assets/robotiko.png' );
    this.load.image('bat', '../assets/bat.png');
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
    keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

    let x = Math.random()*799;
    bat = this.physics.add.image(x, 10, 'bat');
    movingPlatform2.setImmovable(true);
    movingPlatform2.body.allowGravity = false;
    movingPlatform2.setVelocityX(30);

    this.physics.add.collider(player, platforms);
    this.physics.add.collider(player, movingPlatform);
    this.physics.add.collider(player, movingPlatform2);

    this.physics.add.overlap(bat, player, collision);
}

function update ()
{
    
    if(keyP.isDown) {
        if (!isPaused){
            pauseGame();
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
    if (bat.x >= player.x)
    {
        bat.setVelocityX(-50);
    }
    else if (bat.x <= player.x)
    {
        bat.setVelocityX(50);
    }
    if (bat.y >= player.y)
    {
        bat.setVelocityY(-50);
    }
    else if (bat.y <= player.y)
    {
        bat.setVelocityY(50);
    }

    //contador d'enemics
    if (counter >= 1) canvi_fase();
    
}

function collision(bat, player) {
    if (cursors.down.isDown) 
    {
        bat.disableBody(true, true)
        counter += 1;
    }
    else{
        player.disableBody(true, true);
        loadpage("./gameover.html")
    }
}

function canvi_fase(){
    loadpage("./phasergame2.html")
}

function pauseGame() {
    isPaused = true;
    this.scene.pause();
    this.scene.launch('sceneB');
}

function resumeGame(){
    isPaused = false;
    this.scene.resume();
}

