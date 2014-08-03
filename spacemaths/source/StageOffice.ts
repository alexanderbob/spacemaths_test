module Spacemaths {

    export class StageOffice extends Phaser.State {
        picture: Phaser.Group;
        door: Phaser.Sprite;
        clock: {
            base: Phaser.Sprite;
            arrow: Phaser.Sprite;
        };
        hands: {
            left: Phaser.Sprite;
            right: Phaser.Sprite;
        };
        background: {
            table: Phaser.Sprite;
            wall: Phaser.Sprite;
            floor: Phaser.Sprite;
            battery: Phaser.Sprite;
        }
        engineer: Phaser.Sprite;
        paper: Phaser.Sprite;
        computer: Phaser.Sprite;
        spaceKey: Phaser.Key;
        shadow: Phaser.Rectangle;
        //background: Phaser.Sprite;
        //music: Phaser.Sound;
        //player: Spacemaths.Player;
        create() {
            var wall = <HTMLImageElement>this.game.cache.getImage('wall'),
                floor = <HTMLImageElement>this.game.cache.getImage('floor'),
                frame = <HTMLImageElement>this.game.cache.getImage('wall_picture_frame'),
                battery = <HTMLImageElement>this.game.cache.getImage('battery'),
                door = <HTMLImageElement>this.game.cache.getImage('door'),
                wall_h = wall.height,
                floor_h = floor.height,
                frame_h = frame.height;
            this.background = {
                wall: this.add.sprite(0, 0, 'wall'),
                floor: this.add.sprite(0, wall_h, 'floor'),
                table: this.add.sprite(0, wall_h + floor_h, 'table'),
                battery: this.add.sprite(128, wall_h - battery.height, 'battery')
            }
            this.picture = this.add.group();
            this.picture.z = 1;
            this.picture.x = 320;
            this.picture.y = 241;

            this.picture.create(0, 0, 'wall_picture_frame');
            this.picture.create(10, 134, 'wall_picture');
            this.picture.setAll('anchor.x', 0.5);
            this.picture.setAll('anchor.y', 0);

            this.clock = {
                base: this.add.sprite(824, 1372, 'table_clock'),
                //-217 из-за anchor.x == 1
                arrow: this.add.sprite(824 + 217, 1372, 'table_clock_arrow')
            }
            this.clock.arrow.anchor.x = 1;

            var eng = <HTMLImageElement>this.game.cache.getImage('engineer');
            this.engineer = this.add.sprite(710, wall_h - eng.height, 'engineer');
            this.engineer.exists = false;
            this.engineer.z = 3;

            this.computer = this.add.sprite(21, 1097, 'computer');
            this.door = this.add.sprite(710, wall_h - door.height + 68, 'door', 0);
            this.door.z = 2;
            this.door.animations.add('open', [1]);
            this.door.animations.add('closed', [0]);

            this.hands = {
                left: this.add.sprite(200, 1523, 'hand_left'),
                right: this.add.sprite(630, 1542, 'hand_right')
            }
            var sizes = Utils.getInstance().getGameSizes();
            this.shadow = new Phaser.Rectangle(0, 0, sizes.w, sizes.h);
            //this.background = this.add.sprite(0, 0, 'level1');
            /*this.music = this.add.audio('music', 1, false);
            this.music.play();
            this.player = new Player(this.game, 130, 284);*/
            this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        }
        render() {

        }
        update() {
            if (this.spaceKey.isDown)
            {
                this.door.play('open');
                this.picture.rotation = 0.1;
                this.engineer.exists = true;
            }
            else
            {
                this.door.play('closed');
                this.picture.rotation = 0;
                this.engineer.exists = false;
            }
        }
    }
}

