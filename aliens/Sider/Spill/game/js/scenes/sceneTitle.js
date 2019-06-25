class SceneTitle extends Phaser.Scene {
    constructor() {
        super('SceneTitle');
    }
    preload() {
        this.load.image("button1", "images/ui/buttons/2/red.png");
        
    }
    create() {
        emitter = new Phaser.Events.EventEmitter();
        controller = new Controller();

        this.alignGrid = new AlignGrid({ rows: 11, cols: 11, scene: this });
        //this.alignGrid.showNumbers();


        var title = this.add.image(0, 0, 'title');
        title.setOrigin(0.5, 0.5);
        Align.scaletoGameW(title, 0.8);
        this.alignGrid.placeAtIndex(27, title);
        console.log("SceneTtile!");

        var alienface = this.add.image(0, 0, 'alienface');
        alienface.setOrigin(0.5, 0.5);
        Align.scaletoGameW(alienface, 2);
        this.alignGrid.placeAtIndex(82, alienface);

        

        var btnStart = new FlatButton({ scene: this, key: 'button1', text: 'start', event: 'start_game' });
        this.alignGrid.placeAtIndex(93, btnStart);

        emitter.on('start_game', this.startGame, this);
        mediaManager = new MediaManager({ scene: this });
       // mediaManager.setBackgroundMusic("backgroundMusic");
        
    }

    startGame() {
        this.scene.start('SceneMain');
    }


    update() { }
}