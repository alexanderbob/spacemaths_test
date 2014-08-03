module Spacemaths {
    enum EngineerActionState { IDLE, MOVE_IN, MOVE_OUT };

    export class Engineer extends Phaser.Sprite {
        private action_state = EngineerActionState.IDLE;
        constructor(game: Phaser.Game, x: number, y: number) {
            super(game, x, y, 'engineer', 0);
            //this.anchor.setTo(0.5, 0);
            this.game.physics.arcade.enableBody(this);
            game.add.existing(this);
        }
        update() {
            switch (this.action_state)
            {
                case EngineerActionState.MOVE_IN:
                    break;
                case EngineerActionState.MOVE_OUT:
                    break;
                default:
                    break;
            }

            this.body.velocity.x = 0;
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
            {
                this.body.velocity.x = -150;
                this.animations.play('walk');
                if (this.scale.x == 1)
                {
                    this.scale.x = -1;
                }
            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
            {
                this.body.velocity.x = 150;
                this.animations.play('walk');
                if (this.scale.x == -1)
                {
                    this.scale.x = 1;
                }
            }
            else
            {
                this.animations.frame = 0;
            }
        }
    }
}

