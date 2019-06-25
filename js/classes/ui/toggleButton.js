class ToggleButton extends Phaser.GameObjects.Container {
    constructor(config) {
        super(config.scene);
        this.scene = config.scene; 

        this.back = this.scene.add.image(0, 0, config.backKey);
        this.onIcon = this.scene.add.image(0, 0, config.onIcon);
        this.offIcon = this.scene.add.image(0, 0, config.offIcon);

        Align.scaletoGameW(this.back, 0.1);
        Align.scaletoGameW(this.onIcon, 0.05);
        Align.scaletoGameW(this.offIcon, 0.05);

        this.add(this.back);
        this.add(this.onIcon);
        this.add(this.offIcon);


        if (!config.value) {
            config.value = true;
        }

        this.value = config.value;

        if (config.evemt) {
            this.event = config.event;
        }

        this.setIcons();

        this.back.setInteractive();
        this.back.on('pointerdown', this.toggle, this);

        if (config.x) {
            this.x = config.x;
        }

        if (config.y) {
            this.y = config.y;
        }
        this.setSize(this.back.displayWidth, this.back.displayHeight);

        this.scene.add.existing(this);

        
    }

    toggle() {
        this.value = !this.value;
        this.setIcons();
        if (this.event) {
            emitter.emit(this.event, this.value);
        }
    }

    setIcons() {
        if (this.value == true) {
            this.onIcon.visible = true;
            this.offIcon.visible = false;
        }
        else {
            this.onIcon.visible = false;
            this.offIcon.visible = true;
        }
    }
}