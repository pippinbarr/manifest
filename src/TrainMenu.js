var currentDesironArray;
var currentDesironName;
var currentDesironChance;

BasicGame.TrainMenu = function (game) {

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

var wealthTrainButton;
var healthTrainButton;
var loveTrainButton;
var powerTrainButton;
var familyTrainButton;
var joyTrainButton;
var peaceTrainButton;
var sexTrainButton;
var wisdomTrainButton;

var trainMenuLabel1;
var trainMenuLabel2;

BasicGame.TrainMenu.prototype = {

	create: function () {
        this.time.events.add(Phaser.Timer.SECOND * TINT_TIMER_SPEED, tintTimerUpdate, this);


        this.game.stage.backgroundColor = 0x666666;
        
        bgIsTinted = false;

        trainMenuLabel1 = createTextLabel(20*2,20*1,"SELECT DESIRON TO",20);
        trainMenuLabel2 = createTextLabel(20*2,20*3,"TRAIN WITH",20);

        wealthTrainButton = createDesironButton(20*2,20*5,20,wealthDesiron,"WEALTH",this.onButtonDown,this.onButtonUp,this.onButtonOver,this.onButtonOut);
        healthTrainButton = createDesironButton(20*9,20*5,20,healthDesiron,"HEALTH",this.onButtonDown,this.onButtonUp,this.onButtonOver,this.onButtonOut);
        loveTrainButton = createDesironButton(20*16,20*5,20,loveDesiron,"LOVE",this.onButtonDown,this.onButtonUp,this.onButtonOver,this.onButtonOut);
        powerTrainButton = createDesironButton(20*2,20*14,20,powerDesiron,"POWER",this.onButtonDown,this.onButtonUp,this.onButtonOver,this.onButtonOut);
        familyTrainButton = createDesironButton(20*9,20*14,20,familyDesiron,"FAMILY",this.onButtonDown,this.onButtonUp,this.onButtonOver,this.onButtonOut);
        joyTrainButton = createDesironButton(20*16,20*14,20,joyDesiron,"JOY",this.onButtonDown,this.onButtonUp,this.onButtonOver,this.onButtonOut);
        peaceTrainButton = createDesironButton(20*2,20*23,20,peaceDesiron,"PEACE",this.onButtonDown,this.onButtonUp,this.onButtonOver,this.onButtonOut);
        sexTrainButton = createDesironButton(20*9,20*23,20,sexDesiron,"SEX",this.onButtonDown,this.onButtonUp,this.onButtonOver,this.onButtonOut);
        wisdomTrainButton = createDesironButton(20*16,20*23,20,wisdomDesiron,"WISDOM",this.onButtonDown,this.onButtonUp,this.onButtonOver,this.onButtonOut);
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

            currentDesironName = b.name;
            currentDesironArray = b.desiron;

            currentDesironSpecificSkill = parseFloat(localStorage.getItem(currentDesironName + '_SKILL'));
            if (isNaN(currentDesironSpecificSkill)) currentDesironSpecificSkill = 0.05;

            currentDesironGeneralSkill = parseFloat(localStorage.getItem('GENERAL_SKILL'));
            if (isNaN(currentDesironGeneralSkill)) currentDesironGeneralSkill = 0.05;

            currentDesironWillMatch = currentDesironSpecificSkill + currentDesironGeneralSkill;
            // currentDesironWillMatch = 1;

            b.game.state.start('Training');
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

        updateTint();

    },



    shutdown: function () {
        wealthTrainButton.destroy();
        healthTrainButton.destroy();
        loveTrainButton.destroy();
        powerTrainButton.destroy();
        familyTrainButton.destroy();
        joyTrainButton.destroy();
        peaceTrainButton.destroy();
        sexTrainButton.destroy();
        wisdomTrainButton.destroy();

        trainMenuLabel1.destroy();
        trainMenuLabel2.destroy();
    },

};
