﻿module Spacemaths {
    export class Boot extends Phaser.State {
        preload() {
            this.load.image('preloadBar', 'assets/loader.png');
        }
        create() {
            //  Unless you specifically need to support multitouch I would recommend setting this to 1
            this.input.maxPointers = 1;
            //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
            this.stage.disableVisibilityChange = true;

            this.game.scale.forcePortrait = true;
            this.game.scale.minWidth = 480;
            this.game.scale.minHeight = 800;
            this.game.scale.maxHeight = 1920;
            this.game.scale.maxWidth = 1080;
            this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            this.game.scale.pageAlignHorizontally = true;
            this.game.scale.pageAlignVertically = true;
            this.game.scale.refresh();
            //this.game.scale.setScreenSize(true);
            if (this.game.device.desktop)
            {
                //  If you have any desktop specific settings, they can go in here
                //this.scale.pageAlignHorizontally = true;
            }
            else
            {
                //  Same goes for mobile settings.
            }
            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.game.state.start('Preloader', true, false);
        }
    }
}