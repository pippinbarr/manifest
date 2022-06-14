var currentTrackDesironArray;
var currentTrackDesironName;

BasicGame.TrackMenu = function (game) {

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

var wealthTrackButton;
var healthTrackButton;
var loveTrackButton;
var powerTrackButton;
var familyTrackButton;
var joyTrackButton;
var peaceTrackButton;
var sexTrackButton;
var wisdomTrackButton;

var trackMenuLabel1;
var trackMenuLabel2;

BasicGame.TrackMenu.prototype = {

	create: function () {

        this.time.events.add(Phaser.Timer.SECOND * TINT_TIMER_SPEED, tintTimerUpdate, this);

        tintables = [];
        bgIsLight = false;
        bgIsTinted = false;

        this.game.stage.backgroundColor = 0x666666;
        
        trackMenuLabel1 = createTextLabel(20*2,20*1,"SELECT DESIRON TO",20);
        trackMenuLabel2 = createTextLabel(20*2,20*3,"VIEW STATISTICS",20);

        wealthTrackButton = createDesironButton(20*2,20*5,20,wealthDesiron,"WEALTH",this.onButtonDown,this.onButtonUp,this.onButtonOver,this.onButtonOut);
        healthTrackButton = createDesironButton(20*9,20*5,20,healthDesiron,"HEALTH",this.onButtonDown,this.onButtonUp,this.onButtonOver,this.onButtonOut);
        loveTrackButton = createDesironButton(20*16,20*5,20,loveDesiron,"LOVE",this.onButtonDown,this.onButtonUp,this.onButtonOver,this.onButtonOut);
        powerTrackButton = createDesironButton(20*2,20*14,20,powerDesiron,"POWER",this.onButtonDown,this.onButtonUp,this.onButtonOver,this.onButtonOut);
        familyTrackButton = createDesironButton(20*9,20*14,20,familyDesiron,"FAMILY",this.onButtonDown,this.onButtonUp,this.onButtonOver,this.onButtonOut);
        joyTrackButton = createDesironButton(20*16,20*14,20,joyDesiron,"JOY",this.onButtonDown,this.onButtonUp,this.onButtonOver,this.onButtonOut);
        peaceTrackButton = createDesironButton(20*2,20*23,20,peaceDesiron,"PEACE",this.onButtonDown,this.onButtonUp,this.onButtonOver,this.onButtonOut);
        sexTrackButton = createDesironButton(20*9,20*23,20,sexDesiron,"SEX",this.onButtonDown,this.onButtonUp,this.onButtonOver,this.onButtonOut);
        wisdomTrackButton = createDesironButton(20*16,20*23,20,wisdomDesiron,"WISDOM",this.onButtonDown,this.onButtonUp,this.onButtonOver,this.onButtonOut);
    },

    onButtonDown: function (b) {

        b.tint = theDarkTint;
        b.over = true;
        b.down = true;
        b.tinted = true;
    },


    onButtonUp: function (b) {

        b.tint = 0xffffff;
        b.down = false;
        b.tinted = false;

        if (b.over)
        {
            b.over = false;

            currentTrackDesironName = b.name;
            currentTrackDesironArray = b.desiron;

            b.game.state.start('TrackingResults');
        }

    },


    onButtonOut: function (b) {

        b.tint = 0xffffff;
        b.over = false;
        b.tinted = false;
    },


    onButtonOver: function (b) {

        if (b.down)
        {
            b.tint = theDarkTint;
            b.over = true;
        }
    },


    update: function () {


    },


    shutdown: function () {

        trackMenuLabel1.destroy();
        trackMenuLabel2.destroy();

        wealthTrackButton.destroy();
        healthTrackButton.destroy();
        loveTrackButton.destroy();
        powerTrackButton.destroy();
        familyTrackButton.destroy();
        joyTrackButton.destroy();
        peaceTrackButton.destroy();
        sexTrackButton.destroy();
        wisdomTrackButton.destroy();
    },

    quitGame: function (pointer) {

		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.

		//	Then let's go back to the main menu.
		this.state.start('MainMenu');

	}

};
