class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload() {
        //
        //preload all imagaes
        //
        this.load.atlas("robotiko", "assets/robotiko.png", "assets/robotiko.json");
        this.load.atlas("block1", "assets/block1.png", "assets/block.json");
    }
    create() {
        //
        //add a physics group
        //
        this.brickGroup=this.physics.add.group();
        //
        //add the ninja
        //      
        this.ninja = this.physics.add.sprite(200, -100, "ninja");
        //
        //scale the ninja
        Align.scaleToGameW(this.ninja, .2);
        //
        //get the frame names       
        //
        var frameNames = this.textures.get('ninja').getFrameNames();
        // console.log(frameNames);
        // 
        // make the animations
        // 
        this.makeAnims();
        //play idle animation
        this.ninja.play("idle");
        window.ninja = this.ninja;
        //
        //
        //make an align grid
        this.aGrid = new AlignGrid({
            scene: this,
            rows: 11,
            cols: 11
        });        
        //
        //show the numbers
        //
        this.aGrid.showNumbers();        
        //
        //make the floor
        //
        this.makeFloor(88, 98, "brown");        
        //
        //add gravity to the ninja to make it fall
        //
        this.ninja.setGravityY(200);
        //
        //set a collider between the ninja and the floor
        //
        this.physics.add.collider(this.ninja,this.brickGroup);
    }
    
    placeBlock(pos, key) {
        //
        //add the block to the scene. Position is not important yet
        //
        let block = this.physics.add.sprite(0, 0, key);
        this.brickGroup.add(block);
        //
        //place the group
        //
        this.aGrid.placeAtIndex(pos, block);
        //
        //make the block immovable
        //
        block.setImmovable();
        //
        //add the block to the group
        //
        Align.scaleToGameW(block, .1);
        
    }
    makeFloor(fromPos, toPos, key) {
        for (var i = fromPos; i < toPos + 1; i++) {
            this.placeBlock(i, key);
        }
    }
    makeAnims() {
        this.anims.create({
            key: 'attack',
            frames: this.makeAnim('ninja', 'Attack__00'),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'jump',
            frames: this.makeAnim('ninja', 'Jump__00'),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'slide',
            frames: this.makeAnim('ninja', 'Slide__00'),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'jumpAttack',
            frames: this.makeAnim('ninja', "Jump_Attack__00"),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'jumpThrow',
            frames: this.makeAnim('ninja', "Jump_Throw__00"),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'idle',
            frames: this.makeAnim('ninja', "Idle__00"),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'dead',
            frames: this.makeAnim('ninja', "Dead__00"),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'run',
            frames: this.makeAnim('ninja', "Run__00"),
            frameRate: 8,
            repeat: -1
        });
    }
    makeAnim(key, frameName) {
        let myArray = [];
        for (var i = 0; i < 8; i++) {
            let fn = frameName + i + ".png";
            myArray.push({
                key: key,
                frame: fn
            })
        }
        return myArray;
    }
    update() {}
}