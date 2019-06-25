class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload() {



    }

    create() {
	    emitter = new Phaser.Events.EventEmitter();
	    controller = new Controller();
        var mediaManager = new MediaManager({ scene: this });
        mediaManager.setBackgroundMusic("backgroundMusic");

       
       
	    this.playerHealth = 100;
	    model.playerWon = true;
	    this.bulletHit = false;

	    //adding imgs and sprites
	   
	    this.player = this.physics.add.sprite(game.config.width / 2, game.config.height / 2, "player");



        this.input.on('pointerdown', this.onDown, this);
            
        

	    this.player.body.collideWorldBounds = true;

        this.physics.world.setBounds(0, 0, 1600, 1600);

	    this.bulletGroup = this.physics.add.group();
	    this.eBulletGroup = this.physics.add.group();
	    this.alienGroup = this.physics.add.group();


	    this.makeAliens();

	    let mappy = this.add.tilemap("mappy");
	    let terrain = mappy.addTilesetImage("terrain_atlas", "terrain");

		//layers
	    let botLayer = mappy.createStaticLayer("bot", terrain, 0, 0).setDepth(-2);
		let collideLayer = mappy.createStaticLayer("collide", terrain, 0, 0).setDepth(-1);
		let topLayer = mappy.createStaticLayer("top", terrain, 0, 0).setDepth(-1);
		let top2Layer = mappy.createStaticLayer("top over top", terrain, 0, 0).setDepth(-1);
		let collide2Layer = mappy.createStaticLayer("collide 2", terrain, 0, 0).setDepth(-1);

		//map collisions
		this.physics.add.collider(this.player, collideLayer);
		this.physics.add.collider(this.player, collide2Layer);
		collideLayer.setCollisionByProperty({collides:true});
		collide2Layer.setCollisionByProperty({collides:true});


        //camera config
        this.cameras.main.setBounds(0, 0, 1600, 1600);
        this.cameras.main.startFollow(this.player, true);


        //player anims
        this.anims.create({
            key: 'walk-down',
            frames: this.anims.generateFrameNumbers('player',
                {
                    start: 0,
                    end: 3,
                }),

            frameRate: 8,

        });

        this.anims.create({
            key: 'walk-right',
            frames: this.anims.generateFrameNumbers('player',
                {
                    start: 4,
                    end: 7,
                }),

            frameRate: 8,

        });

        this.anims.create({
            key: 'walk-up',
            frames: this.anims.generateFrameNumbers('player',
                {
                    start: 8,
                    end: 11,
                }),

            frameRate: 8,

        });

        this.anims.create({
            key: 'walk-left',
            frames: this.anims.generateFrameNumbers('player',
                {
                    start: 12,
                    end: 15,
                }),

            frameRate: 8,

        });

        //alien anims
        this.anims.create({
            key: 'alien-down',
            frames: this.anims.generateFrameNumbers('alien',
                {
                    start: 0,
                    end: 3,
                }),

            frameRate: 8,
            
        });

        this.anims.create({
            key: 'alien-right',
            frames: this.anims.generateFrameNumbers('alien',
                {
                    start: 4,
                    end: 7,
                }),

            frameRate: 8,

        });

        this.anims.create({
            key: 'alien-up',
            frames: this.anims.generateFrameNumbers('alien',
                {
                    start: 8,
                    end: 11,
                }),

            frameRate: 8,

        });

        this.anims.create({
            key: 'alien-left',
            frames: this.anims.generateFrameNumbers('alien',
                {
                    start: 12,
                    end: 15,
                }),

            frameRate: 8,

        });

        // explosion anim 
        var frameNames = this.anims.generateFrameNumbers('exp');
        var f2 = frameNames.slice();
        f2.reverse();

        var f3 = f2.concat(frameNames);

        this.anims.create({
            key: 'boom',
            frames: f3,
            frameRate: 48,
            repeat: false
        });


        // keyCodes 
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

        this.setColliders();
        this.makeInfo();



    }

    getTimer() {
        var d = new Date();
        return d.getTime();
    }

    
    fireEBullet(child) {
        var elapsed = Math.abs(this.lastEBullet - this.getTimer());
        if (elapsed < 500) {
           return;
        }

        this.lastEBullet = this.getTimer();
        var eBullet = this.physics.add.sprite(child.x, child.y, "bullet");
        this.eBulletGroup.add(eBullet);
        eBullet.body.angularVelocity = 0;
        eBullet.angle = angle;
        this.physics.moveTo(eBullet, this.player.x, this.player.y, 100);
        mediaManager.playSound("zap1");
    }

    moveAlien() {
        for (let child of this.alienGroup.children.entries) {
            var distX = Math.abs(this.player.x - child.x);
            var distY = Math.abs(this.player.y - child.y);

            if (distX < 150 && distY < 150) {
                this.physics.moveTo(child, this.player.x, this.player.y, 30);




                if (angle == 180) {
                    child.play('alien-left', true);

                }
                if (angle == 360) {
                    child.play('alien-right', true);
                }
                if (angle == -270) {
                    child.play('alien-down', true);
                }
                if (angle == 270) {
                    child.play('alien-up', true);
                }
            } else if (child.bulletHit == true) {
                this.physics.moveTo(child, this.player.x, this.player.y, 60);




                if (angle == 180) {
                    child.play('alien-left', true);

                }
                if (angle == 360) {
                    child.play('alien-right', true);
                }
                if (angle == -270) {
                    child.play('alien-down', true);
                }
                if (angle == 270) {
                    child.play('alien-up', true);
                }
            }



            if (distX >= 200 && distY >= 200) {
                child.body.setVelocity(0, 0);

            }
        }
    }
    

    makeInfo() {
        this.text1 = this.add.text(0, 0, "Health\n100", { fontSize: game.config.width / 30, align: "center", backgroundColor: '#000000' });
        this.text2 = this.add.text(0, 0, "EnemyCount\n10", { fontSize: game.config.width / 30, align: "center", backgroundColor: '#000000' });
        this.text1.setOrigin(0.5, 0.5);
        this.text2.setOrigin(0.5, 0.5);
        this.uiGrid = new AlignGrid({ scene: this, rows: 11, cols: 11 });
        this.uiGrid.placeAtIndex(2, this.text1)
        this.uiGrid.placeAtIndex(8, this.text2)
       //this.uiGrid.showNumbers();

        this.text1.setScrollFactor(0);
        this.text2.setScrollFactor(0);
    }

    damagePlayer(player, ebullet) {
        this.playerHealth--
        this.player.body.setVelocity(0, 0);
        var explosion = this.add.sprite(player.x, player.y, 'exp');
        explosion.setScale(0.7);
        explosion.play('boom');
        this.text1.setText("Health\n" + this.playerHealth);
        if (this.playerHealth == 0) {
            this.scene.start('SceneOver');
            model.playerWon = false;
        }
        ebullet.destroy();
        mediaManager.playSound("exp");
    }

    damageAlien(alienGroup, bullet) {
        alienGroup.hitCount++;
        var explosion = this.add.sprite(alienGroup.x, alienGroup.y, 'exp');
        explosion.setScale(0.7);
        explosion.play('boom');

        alienGroup.bulletHit = true;
        if (alienGroup.hitCount == 3) {
            
            alienGroup.destroy();
            alienGroup.hitCount = 0;
        }
        this.text2.setText("EnemyCount\n" + this.alienGroup.getChildren().length);
        if (this.alienGroup.getChildren().length == 0) {
            this.scene.start('SceneOver');
            model.playerWon = true;
        }
        bullet.destroy();
        mediaManager.playSound("exp");

    }

    makeAliens() {
        if (this.alienGroup.getChildren().length == 0) {
            this.alienGroup = this.physics.add.group({
                key: 'alien',
                frame: [0,],
                frameQuantity: 10,
                bounceX: 0,
                bounceY: 0,
                angularVelocity: 0,
                collideWorldBounds: true,

            });
            this.alienGroup.hitCount = 0;
            this.alienGroup.children.iterate(function (child) {
                var xx = Math.floor(Math.random() * 1600);
                var yy = Math.floor(Math.random() * 1600);
                child.hitCount = 0;
                child.x = xx;
                child.y = yy;
                child.bulletHit = false
                

                



            }.bind(this));

        }
    }



    setColliders() {
        this.physics.add.collider(this.alienGroup, this.bulletGroup, this.damageAlien, null, this);
        this.physics.add.collider(this.alienGroup, this.alienGroup);
        this.physics.add.collider(this.player, this.alienGroup);
        this.physics.add.collider(this.player, this.eBulletGroup, this.damagePlayer, null, this);

    }






    onDown() {
        this.makeBullet();
       
    }

    makeBullet() {
        var dirObj = this.getDirFromAngle(angle);
        var bullet = this.physics.add.sprite(this.player.x + dirObj.tx * 30, this.player.y + dirObj.ty * 30, "bullet");
        this.bulletGroup.add(bullet);
        bullet.angle = angle;
        bullet.body.setVelocity(dirObj.tx * 400, dirObj.ty * 400);
        mediaManager.playSound("zap1")
    }

    getDirFromAngle(angle) {
        var rads = angle * Math.PI / 180;
        var tx = Math.cos(rads);
        var ty = Math.sin(rads);
        return { tx, ty }
    }

    toDegrees(angle) {
        return angle * (180 / Math.PI);
    }

    update() {
        if (this.keyA.isDown) {
            this.player.x -= 2;

            
            this.player.play('walk-left', true);

            angle = 180;
        }

        if (this.keyD.isDown) {
            this.player.x += 2;
           
            this.player.play('walk-right', true);

            angle = 360;
        }

        if (this.keyW.isDown) {
            this.player.y -= 2;
            
            this.player.play('walk-up', true);

            angle = 270;
        }

        if (this.keyS.isDown) {
            this.player.y += 2;
            
            this.player.play('walk-down', true);

            angle = -270;
        }

        this.moveAlien();
        for (let child of this.alienGroup.children.entries) {
            var distX = Math.abs(this.player.x - child.x);
            var distY = Math.abs(this.player.y - child.y);
            if (distX < game.config.width / 5 && distY < game.config.height / 5) {
                this.fireEBullet(child);
            }
        }



    }
}