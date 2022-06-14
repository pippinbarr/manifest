
BasicGame.Truth = function (game) {

	//	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;		//	a reference to the currently running game
    this.add;		//	used to add sprites, text, groups, etc
    this.camera;	//	a reference to the game camera
    this.cache;		//	the game cache
    this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;		//	for preloading assets
    this.math;		//	lots of useful common math operations
    this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    this.stage;		//	the game stage
    this.time;		//	the clock
    this.tweens;	//	the tween manager
    this.world;		//	the game world
    this.particles;	//	the particle manager
    this.physics;	//	the physics manager
    this.rnd;		//	the repeatable random number generator

    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};


var truthTextIndex = 0;
var currentTruthTextLineStart = 0;
var currentTruthTextLineEnd = 0;

var truthText;

var truthPixels;
var inputText;
var truthMainMenuButton;

BasicGame.Truth.prototype = {

	create: function () {

        this.game.stage.backgroundColor = theLightTint;
        this.time.events.add(Phaser.Timer.SECOND * TINT_TIMER_SPEED, tintTimerUpdate, this);

        truthMainMenuButton = this.add.sprite(x,y,'pixel-' + 40);
        truthMainMenuButton.scale.x = 480/40;
        truthMainMenuButton.scale.y = 640/40;
        truthMainMenuButton.inputEnabled = true;
        truthMainMenuButton.events.onInputDown.add(this.onButtonDown);


        // truthScanner = this.add.sprite(0,0,'pixel-16');
        // truthScanner.tint = theDarkTint;
        // truthScanner.scale.x = 480/16;
        // this.time.events.add(Phaser.Timer.SECOND * 0.05, this.moveScanner, this);

        tintables = [];

        truthPixels = [];
        for (x = 0; x < 480/16; x++)
        {
            for (y = 0; y < 640/16; y++)
            {   
                pixel = this.add.sprite(x*16, y*16, 'pixel-64');
                if (Math.random() < 0.5)
                {
                    pixel.tint = theLightTint;
                }
                else
                {
                    pixel.tint = theDarkTint;
                }

                truthPixels.push(pixel);
                tintables.push(pixel);
            }
        }

        truthText = createText(16*1,16*1,16,28,truthString);

        if (this.game.device.desktop) inputString = "CLICK";
        else inputString = "TOUCH";

        inputText = createText(16*1,640-16*2,16,28,inputString + " TO RETURN ");
    },


    onButtonDown: function (b) {

        b.game.state.start('MainMenu');
    },

    update: function () {

        // if (this.input.activePointer.justPressed(50))
        // {
        //     this.state.start('MainMenu');
        // }


        updateTint();
    },


    shutdown: function () {

        truthMainMenuButton.destroy();
        truthText.destroy();
        inputText.destroy();

        for (i = 0; i < truthPixels.length; i++)
        {
            truthPixels[i].destroy();
        }
    },


    tintPixel: function (pixel) {
        if (Math.random() < 0.5)
        {
            pixel.tint = theLightTint;
        }
        else
        {
            pixel.tint = theDarkTint;
        }
    },
};

var truthString = "" +
"When Romanov found the patterns burned onto the hull of " +
"the Soyuz TM-5 after a routine orbit he found the truth about Mir. " +
"Deep focus on the patterns manifests one's desires " +
"in reality. Romanov named the patterns desirons and tried to " +
"keep them a secret. Now, the desirons are " +
"being shared with you in this application. " +
"Train yourself to manifest the desirons in the application " +
"then apply them to your own life and have everything you want, forever. ";










