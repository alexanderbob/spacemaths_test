window.onload = function () {
    var game = new Spacemaths.Game();
};
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Spacemaths;
(function (Spacemaths) {
    var Boot = (function (_super) {
        __extends(Boot, _super);
        function Boot() {
            _super.apply(this, arguments);
        }
        Boot.prototype.preload = function () {
            this.load.image('preloadBar', 'assets/loader.png');
        };
        Boot.prototype.create = function () {
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
            if (this.game.device.desktop) {
                //  If you have any desktop specific settings, they can go in here
                //this.scale.pageAlignHorizontally = true;
            } else {
                //  Same goes for mobile settings.
            }
            this.game.physics.enable(this, Phaser.Physics.ARCADE);
            this.game.state.start('Preloader', true, false);
        };
        return Boot;
    })(Phaser.State);
    Spacemaths.Boot = Boot;
})(Spacemaths || (Spacemaths = {}));
var Spacemaths;
(function (Spacemaths) {
    var EngineerActionState;
    (function (EngineerActionState) {
        EngineerActionState[EngineerActionState["IDLE"] = 0] = "IDLE";
        EngineerActionState[EngineerActionState["MOVE_IN"] = 1] = "MOVE_IN";
        EngineerActionState[EngineerActionState["MOVE_OUT"] = 2] = "MOVE_OUT";
    })(EngineerActionState || (EngineerActionState = {}));
    ;

    var Engineer = (function (_super) {
        __extends(Engineer, _super);
        function Engineer(game, x, y) {
            _super.call(this, game, x, y, 'engineer', 0);
            this.action_state = 0 /* IDLE */;

            //this.anchor.setTo(0.5, 0);
            this.game.physics.arcade.enableBody(this);
            game.add.existing(this);
        }
        Engineer.prototype.update = function () {
            switch (this.action_state) {
                case 1 /* MOVE_IN */:
                    break;
                case 2 /* MOVE_OUT */:
                    break;
                default:
                    break;
            }

            this.body.velocity.x = 0;
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                this.body.velocity.x = -150;
                this.animations.play('walk');
                if (this.scale.x == 1) {
                    this.scale.x = -1;
                }
            } else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                this.body.velocity.x = 150;
                this.animations.play('walk');
                if (this.scale.x == -1) {
                    this.scale.x = 1;
                }
            } else {
                this.animations.frame = 0;
            }
        };
        return Engineer;
    })(Phaser.Sprite);
    Spacemaths.Engineer = Engineer;
})(Spacemaths || (Spacemaths = {}));
var Spacemaths;
(function (Spacemaths) {
    var Game = (function (_super) {
        __extends(Game, _super);
        function Game() {
            var utils = Spacemaths.Utils.getInstance(), sizes = utils.getGameSizes();

            //super(480, 800, Phaser.AUTO, 'content', null);
            _super.call(this, sizes.w, sizes.h, Phaser.AUTO, 'content', null);

            this.state.add('Boot', Spacemaths.Boot, false);
            this.state.add('Preloader', Spacemaths.Preloader, false);

            //this.state.add('MainMenu', MainMenu, false);
            this.state.add('StageOffice', Spacemaths.StageOffice, false);

            this.state.start('Boot');
        }
        return Game;
    })(Phaser.Game);
    Spacemaths.Game = Game;
})(Spacemaths || (Spacemaths = {}));
var Spacemaths;
(function (Spacemaths) {
    //не используется
    var MainMenu = (function (_super) {
        __extends(MainMenu, _super);
        function MainMenu() {
            _super.apply(this, arguments);
        }
        MainMenu.prototype.create = function () {
            this.background = this.add.sprite(0, 0, 'titlepage');
            this.background.alpha = 0;

            this.logo = this.add.sprite(this.world.centerX, -300, 'logo');
            this.logo.anchor.setTo(0.5, 0.5);

            this.add.tween(this.background).to({ alpha: 1 }, 2000, Phaser.Easing.Bounce.InOut, true);
            this.add.tween(this.logo).to({ y: 220 }, 2000, Phaser.Easing.Elastic.Out, true, 2000);

            this.input.onDown.addOnce(this.fadeOut, this);
        };
        MainMenu.prototype.fadeOut = function () {
            this.add.tween(this.background).to({ alpha: 0 }, 2000, Phaser.Easing.Linear.None, true);
            var tween = this.add.tween(this.logo).to({ y: 800 }, 2000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startGame, this);
        };
        MainMenu.prototype.startGame = function () {
            this.game.state.start('Level1', true, false);
        };
        return MainMenu;
    })(Phaser.State);
    Spacemaths.MainMenu = MainMenu;
})(Spacemaths || (Spacemaths = {}));
var Spacemaths;
(function (Spacemaths) {
    var Preloader = (function (_super) {
        __extends(Preloader, _super);
        function Preloader() {
            _super.apply(this, arguments);
        }
        Preloader.prototype.preload = function () {
            //  Set-up our preloader sprite
            var sizes = Spacemaths.Utils.getInstance().getGameSizes(), bar_img = this.game.cache.getImage('preloadBar'), cx = (sizes.w - bar_img.width) * 0.5, cy = (sizes.h - bar_img.height) * 0.5;
            this.preloadBar = this.add.sprite(cx, cy, 'preloadBar');
            this.load.setPreloadSprite(this.preloadBar);

            //  Load our actual games assets
            this.load.image('table_clock', 'assets/clock.png');
            this.load.image('table_clock_arrow', 'assets/clock_arrow.png');
            this.load.image('engineer', 'assets/engineer.png');
            this.load.image('hand_left', 'assets/hand_left.png');
            this.load.image('hand_right', 'assets/hand_right.png');
            this.load.image('paper', 'assets/paper.png');
            this.load.image('wall_picture', 'assets/picture.png');
            this.load.image('wall_picture_frame', 'assets/picture_frame.png');
            this.load.image('table', 'assets/table.png');
            this.load.image('wall', 'assets/wall.png');
            this.load.image('floor', 'assets/floor.png');
            this.load.image('battery', 'assets/battery.png');
            this.load.image('computer', 'assets/computer.png');
            this.load.spritesheet('door', 'assets/door.png', 272, 650, 2);
            /*this.load.audio('music', 'assets/title.mp3', true);
            this.load.spritesheet('simon', 'assets/simon.png', 58, 96, 5);
            this.load.image('level1', 'assets/level1.png');*/
        };

        Preloader.prototype.create = function () {
            var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);
        };

        Preloader.prototype.startMainMenu = function () {
            //this.game.state.start('MainMenu', true, false);
            this.game.state.start('StageOffice', true, false);
        };
        return Preloader;
    })(Phaser.State);
    Spacemaths.Preloader = Preloader;
})(Spacemaths || (Spacemaths = {}));
var Spacemaths;
(function (Spacemaths) {
    var StageOffice = (function (_super) {
        __extends(StageOffice, _super);
        function StageOffice() {
            _super.apply(this, arguments);
        }
        //background: Phaser.Sprite;
        //music: Phaser.Sound;
        //player: Spacemaths.Player;
        StageOffice.prototype.create = function () {
            var wall = this.game.cache.getImage('wall'), floor = this.game.cache.getImage('floor'), frame = this.game.cache.getImage('wall_picture_frame'), battery = this.game.cache.getImage('battery'), door = this.game.cache.getImage('door'), wall_h = wall.height, floor_h = floor.height, frame_h = frame.height;
            this.background = {
                wall: this.add.sprite(0, 0, 'wall'),
                floor: this.add.sprite(0, wall_h, 'floor'),
                table: this.add.sprite(0, wall_h + floor_h, 'table'),
                battery: this.add.sprite(128, wall_h - battery.height, 'battery')
            };
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
            };
            this.clock.arrow.anchor.x = 1;

            var eng = this.game.cache.getImage('engineer');
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
            };
            var sizes = Spacemaths.Utils.getInstance().getGameSizes();
            this.shadow = new Phaser.Rectangle(0, 0, sizes.w, sizes.h);

            //this.background = this.add.sprite(0, 0, 'level1');
            /*this.music = this.add.audio('music', 1, false);
            this.music.play();
            this.player = new Player(this.game, 130, 284);*/
            this.spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        };
        StageOffice.prototype.render = function () {
        };
        StageOffice.prototype.update = function () {
            if (this.spaceKey.isDown) {
                this.door.play('open');
                this.picture.rotation = 0.1;
                this.engineer.exists = true;
            } else {
                this.door.play('closed');
                this.picture.rotation = 0;
                this.engineer.exists = false;
            }
        };
        return StageOffice;
    })(Phaser.State);
    Spacemaths.StageOffice = StageOffice;
})(Spacemaths || (Spacemaths = {}));
var Spacemaths;
(function (Spacemaths) {
    var Utils = (function () {
        function Utils() {
            if (Utils.self === null) {
                Utils.self = this;
            }
            this.game_w = 1080 * window.devicePixelRatio;
            this.game_h = 1920 * window.devicePixelRatio;
        }
        Utils.getInstance = function () {
            if (this.self === null) {
                Utils.self = new Utils();
            }
            return this.self;
        };
        Utils.prototype.getGameSizes = function () {
            return { w: this.game_w, h: this.game_h };
        };
        Utils.self = null;
        return Utils;
    })();
    Spacemaths.Utils = Utils;
})(Spacemaths || (Spacemaths = {}));
//# sourceMappingURL=game.js.map
