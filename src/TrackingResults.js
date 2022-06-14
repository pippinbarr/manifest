var trackResultsTrackButton;
var trackResultsMainButton;
var scanner;

var trackResultsAttemptsLabel;
var trackResultsSuccessLabel;
var trackResultsMatchLabel;
var trackResultsStatusLabel;

var trackResultsFeedbackText;

var trackingResultDesiron;

BasicGame.TrackingResults = function (game) {

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


BasicGame.TrackingResults.prototype = {

	create: function () {

        this.time.events.add(Phaser.Timer.SECOND * TINT_TIMER_SPEED, tintTimerUpdate, this);

        tintables = [];
        bgIsLight = true;
        bgIsTinted = true;

        this.game.stage.backgroundColor = theLightTint;

        scanner = this.add.sprite(0,0,'pixel-16');
        scanner.tint = theDarkTint;
        scanner.nonRandomTint = true;
        scanner.scale.y = 640/16;
        this.time.events.add(Phaser.Timer.SECOND * 0.05, this.moveScanner, this);

        tintables.push(scanner);


        trackingResultDesiron = createDesiron(480/2 - (6*20)/2,20*3,20,currentTrackDesironArray,currentTrackDesironName,true,true);

        if (currentTrackDesironName == "SEX")
        {
            trackResultsFeedbackText = createText(16*4,16*14,16,22,sexFeedback);
        }
        else if (currentTrackDesironName == "POWER")
        {
            trackResultsFeedbackText = createText(16*4,16*14,16,22,powerFeedback);
        }
        else if (currentTrackDesironName == "LOVE")
        {
            trackResultsFeedbackText = createText(16*4,16*14,16,22,loveFeedback);
        }
        else if (currentTrackDesironName == "PEACE")
        {
            trackResultsFeedbackText = createText(16*4,16*14,16,22,peaceFeedback);
        }
        else if (currentTrackDesironName == "WEALTH")
        {
            trackResultsFeedbackText = createText(16*4,16*14,16,22,wealthFeedback);
        }
        else if (currentTrackDesironName == "HEALTH")
        {
            trackResultsFeedbackText = createText(16*4,16*14,16,22,healthFeedback);
        }
        else if (currentTrackDesironName == "WISDOM")
        {
            trackResultsFeedbackText = createText(16*4,16*14,16,22,wisdomFeedback);
        }
        else if (currentTrackDesironName == "JOY")
        {
            trackResultsFeedbackText = createText(16*4,16*14,16,22,joyFeedback);
        }
        else if (currentTrackDesironName == "FAMILY")
        {
            trackResultsFeedbackText = createText(16*4,16*14,16,22,familyFeedback);
        }

        attempts = localStorage.getItem(currentTrackDesironName + "_ATTEMPTS");
        if (isNaN(attempts) || attempts == null) attempts = 0;
        trackResultsAttemptsLabel = createTextLabel(16*2,16*26,"ATTEMPTS:    " + attempts,16);


        storedSuccesses = localStorage.getItem(currentTrackDesironName + "_SUCCESSES");
        if (isNaN(storedSuccesses) || storedSuccesses == null) storedSuccesses = 0;
        trackResultsSuccessLabel = createTextLabel(16*2,16*28,"SUCCESSES:   " + storedSuccesses,16);

        storedMatches = localStorage.getItem(currentTrackDesironName + "_MATCHES");
        if (isNaN(storedMatches) || storedMatches == null) storedMatches = 0;
        avgMatch = Math.round(storedMatches/(attempts*6*6) * 100);
        if (attempts == 0) avgMatch = 0;
        trackResultsMatchLabel = createTextLabel(16*2,16*30,"AVG. MATCH:  " + avgMatch + "%",16);

        trackResultsStatusLabel = createTextLabel(16*2,16*32,"STATUS:      " + localStorage.getItem(currentTrackDesironName + "_STATUS"),16);

        trackResultsTrackButton = createTextButton(16*2,40*14,"TRACK",40,'TrackMenu',this.onButtonDown,this.onButtonUp,this.onButtonOver,this.onButtonOut);
        trackResultsMainButton = createTextButton(480-40*4-16*2,40*14,"MAIN",40,'MainMenu',this.onButtonDown,this.onButtonUp,this.onButtonOver,this.onButtonOut);
    },


    moveScanner: function () {
        scanner.x += 16;
        if (scanner.x >= 480) scanner.x = 0;
        this.time.events.add(Phaser.Timer.SECOND * 0.05, this.moveScanner, this);
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

            b.game.state.start(b.state);
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

        trackResultsTrackButton.destroy();
        trackResultsMainButton.destroy();

        scanner.destroy();

        trackResultsAttemptsLabel.destroy();
        trackResultsSuccessLabel.destroy();
        trackResultsMatchLabel.destroy();
        trackResultsStatusLabel.destroy();

        trackResultsFeedbackText.destroy();

        trackingResultDesiron.destroy();
    },


    quitGame: function (pointer) {

		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.

		//	Then let's go back to the main menu.
		this.state.start('MainMenu');

	}

};


var sexFeedback = "The sex desiron calls across the cosmos and we have always known it [Romanov 22.487] ";
var powerFeedback = "Power is as easy to take as any object, you must simply take it [Romanov 010.003] ";
var healthFeedback = "Many days I have the feeling that I will never weaken, never die [Romanov 180.023] ";
var wealthFeedback = "Wealth has no moral value, but I do not find I mind having it at all [Romanov 812.150] ";
var familyFeedback = "My family multiplies before me and so I know I will live forever [Romanov 552.030] ";
var joyFeedback = "There is joy everywhere of course, but there is also a cosmic joy [Romanov 155.012] ";
var peaceFeedback = "I could not find peace wherever I went, even space, but now I have it [Romanov 880.102] ";
var wisdomFeedback = "Without a single grey hair I find I know more than the oldest man [Romanov 442.929] ";
var loveFeedback = "I manifest the love desiron each day, and so love has always found me [Romanov 118.041] ";



