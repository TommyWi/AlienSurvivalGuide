class SceneLoad extends Phaser.Scene {
    constructor() {
        super('SceneLoad');
    }

    preload() {
        this.bar = new Bar({ scene: this, x: game.config.width / 2, y: game.config.height / 2 });
        this.progText = this.add.text(game.config.width / 2, game.config.height / 2, "0%", { color: '#ffffff', fontSize: game.config.width / 20 });
        this.progText.setOrigin(0.5, 0.5);
        this.load.on('progress', this.onProgress, this);

       

        //this.load.audio('backgroundMusic', ["audio/background.mp3", "audio/background.ogg"]);

        this.load.image("toggleBack", "images/ui/toggles/1.png");
        this.load.image("sfxOff", "images/ui/icons/sfx_off.png");
        this.load.image("sfxOn", "images/ui/icons/sfx_on.png");
        this.load.image("musicOn", "images/ui/icons/music_on.png");
        this.load.image("musicOff", "images/ui/icons/music_off.png");
        this.load.image("background", "images/background.jpg");
        this.load.image("bullet", "images/bullet.png");
        this.load.image("title", "images/ui/Xenocide.png");
		this.load.image('alienface', "images/Alienface.png");
		this.load.image("terrain", "images/terrain_atlas.png");
		this.load.tilemapTiledJSON("map", "maps/mappy.json");
        this.load.spritesheet("player", "images/sprites/MechanicMale.png", { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet("alien", "images/sprites/Higan.png", { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('exp', "images/exp.png", { frameWidth: 64, frameHeight: 64 });
      
    }

    onProgress(value) {
        this.bar.setPercent(value);
        var per = Math.floor(value * 100);
        this.progText.setText(per + "%");
    }

    create() {
        this.scene.start("SceneTitle");
    }
}