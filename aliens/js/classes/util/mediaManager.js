class MediaManager {
    constructor(config) {
        this.scene = config.scene;

        emitter.on(G.PLAY_SOUND, this.playSound, this);
        emitter.on(G.MUSIC_CHANGED, this.musicChanged, this);
    }

    musicChanged() {
        if (this.backgroundMusic) {

            if (model.musicOn == false) {
                this.backgroundMusic.stop();
            }
            else {
                this.backgroundMusic.play();
            }
           
        }
    }

    playSound(key) {
        if (model.soundOn == true) {
            var sound = this.scene.sound.add(key);
            sound.play();
        }
       
    }

    setBackgroundMusic(key) {
        if (model.musicOn == true) {
            this.backgroundMusic = this.scene.sound.add(key, { volume: 0.5, loop: true });
           this.backgroundMusic.play();
        }
        
    }
}