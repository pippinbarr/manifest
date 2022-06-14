var resultsTrainButton;
var resultsMainButton;

var targetDesiron;
var resultDesiron;

var trainingResultsMatchLabel;
var trainingResultsSuccessPhrase;
var trainingResultsFailurePhrase;

BasicGame.TrainingResults = function (game) {

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


BasicGame.TrainingResults.prototype = {

	create: function () {

        this.time.events.add(Phaser.Timer.SECOND * TINT_TIMER_SPEED, tintTimerUpdate, this);

        tintables = [];
        bgIsLight = true;
        bgIsTinted = true;

        this.game.stage.backgroundColor = theLightTint;
        
        targetDesiron = createDesiron(20*4,20*2,20,currentDesironArray,"TARGET",true);
        resultDesiron = createDesiron(20*14,20*2,20,resultingDesironArray,"RESULT",true);
        
        var matches = 0;
        for (i = 0; i < currentDesironArray.length; i++)
        {
            if (currentDesironArray[i] == resultingDesironArray[i]) matches++;
        }

        trainingResultsMatchLabel = createTextLabel(20*4,20*11, Math.floor(matches/36*100) + "% MATCH",20);

        resultsTrainButton = createTextButton(40*1,40*14,"TRAIN",40,'TrainMenu',this.onButtonDown,this.onButtonUp,this.onButtonOver,this.onButtonOut);
        resultsMainButton = createTextButton(40*7,40*14,"MAIN",40,'MainMenu',this.onButtonDown,this.onButtonUp,this.onButtonOver,this.onButtonOut);


        if (matches >= 28)
        {
            phrase = Math.floor(Math.random() * successPhrases.length);
            trainingResultsSuccessPhrase = createText(16*2,20*15,16,26,successPhrases[phrase].toUpperCase());
        }
        else
        {
            phrase = Math.floor(Math.random() * failurePhrases.length);
            trainingResultsFailurePhrase = createText(16*2,20*15,16,26,failurePhrases[phrase].toUpperCase());           
        }

        this.updateTracking();
    },



    updateTracking: function () {

        var matches = 0;
        for (i = 0; i < currentDesironArray.length; i++)
        {
            if (currentDesironArray[i] == resultingDesironArray[i]) matches++;
        }

        var storedAttempts = parseInt(localStorage.getItem(currentDesironName + '_ATTEMPTS'));
        if (isNaN(storedAttempts) || storedAttempts == null) storedAttempts = 0;
        storedAttempts++;
        localStorage.setItem(currentDesironName + '_ATTEMPTS',''+storedAttempts);

        var storedMatches = parseInt(localStorage.getItem(currentDesironName + '_MATCHES'));
        if (isNaN(storedMatches) || storedMatches == null) storedMatches = 0;
        storedMatches+=matches;       
        localStorage.setItem(currentDesironName + '_MATCHES',''+storedMatches);
        
        if (matches == 36)
        {
            var storedSuccesses = parseInt(localStorage.getItem(currentDesironName + '_SUCCESSES'));
            if (isNaN(storedSuccesses) || storedSuccesses == null) storedSuccesses = 0;
            storedSuccesses++;            
            localStorage.setItem(currentDesironName + '_SUCCESSES',''+storedSuccesses);
        }


        var storedSpecificSkill = parseFloat(localStorage.getItem(currentDesironName + '_SKILL'));
        if (isNaN(storedSpecificSkill)) storedSpecificSkill = 0.1;

        var storedGeneralSkill = parseFloat(localStorage.getItem('GENERAL_SKILL'));
        if (isNaN(storedGeneralSkill)) storedGeneralSkill = 0.1;

        if (matches > 18)
        {
            storedSpecificSkill += (0.015 * matches/36);
            storedGeneralSkill += (0.015 * matches/36);
        }
        else
        {
            storedSpecificSkill += (0.0075 * matches/36);
            storedGeneralSkill += (0.0075 * matches/36);
        }

        localStorage.setItem(currentDesironName + '_SKILL',''+storedSpecificSkill);
        localStorage.setItem('GENERAL_SKILL',''+storedGeneralSkill);

        totalSkill = storedSpecificSkill + storedGeneralSkill;

        console.log("Total skill: " + totalSkill);

        var newStatus;

        if (totalSkill >= 1.0) 
        {
            newStatus = "ROMANOV";
        }
        else if (totalSkill >= 0.9)
        {
            newStatus = "COSMOS";
        }
        else if (totalSkill >= 0.8)
        {
            newStatus = "SOYUZ";
        }
        else if (totalSkill >= 0.7)
        {
            newStatus = "PROGRESS";
        }
        else if (totalSkill >= 0.6)
        {
            newStatus = "KVANT";
        }
        else if (totalSkill >= 0.5)
        {
            newStatus = "SPEKTR";
        }
        else if (totalSkill >= 0.4)
        {
            newStatus = "SUPERSONIC";
        }
        else if (totalSkill >= 0.3)
        {
            newStatus = "ASCENT";
        }
        else if (totalSkill >= 0.2)
        {
            newStatus = "IGNITION";
        }
        else if (totalSkill >= 0.1)
        {
            newStatus = "FUELLED";
        }

        localStorage.setItem(currentDesironName + '_STATUS',newStatus);


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

        resultsTrainButton.destroy();
        resultsMainButton.destroy();

        targetDesiron.destroy();
        resultDesiron.destroy();

        trainingResultsMatchLabel.destroy();

        if (trainingResultsSuccessPhrase) trainingResultsSuccessPhrase.destroy();
        if (trainingResultsFailurePhrase) trainingResultsFailurePhrase.destroy();
    },



    quitGame: function (pointer) {

		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.

		//	Then let's go back to the main menu.
		this.state.start('MainMenu');

	}

};


var successPhrases = [
"The connection between the Kristall module and mental clarity could not be denied [Romanov 144.124] ",
"What a joy to bond with the Soyuz TM-11 and see the patterns stamped in the stars [Romanov 190.090] ",
"That was when I knew the Progress M-7 was another key focus aid and added it to my chants [Romanov 843.104] ",
"I made contact with the Kristall module and my body was as electric as my mind was clear [Romanov 080.120] ",
"When I reached the Kvant-1 module the cosmos seemed to open up to me, and I to it [Romanov 440.301] ",
"Approaching the Kurz rendezvous, I felt the sadness of leaving space, but what a gift it had given me! [Romanov 942.012] ",
"Opening the EVA hatch in the Kvant-2 felt like a homecoming, but I was a new man [Romanov 010.012] ",
"I wanted to embrace the Lazutkin life support system and tell it of my new cosmic knowledge [Romanov 004.192] "
];

var failurePhrases = [
"The earliest steps were the most frustrating, my mind filled with noise and doubt [Romanov 013.119] ",
"I tried to remember the Laykhov countdowns as a way of clearing my thoughts and focusing [Romanov 884.121] ",
"Strangely, when the Soyuz was spinning I felt closer to the desirons, perhaps we must spin in life, as well [Romanov 324.080] ",
"Interference may come from anywhere and we must re-orbit ourselves like agile spacecraft [Romanov 422.19] ",
"Now I somehow knew it was crucial to redock with my mind, as I had just done in the Soyuz TM-11 [Romanov 001.120] ",
"As with the Spektr module, so with life, we are losing air constantly, but we cannot let this matter [Roamnov 108.118] ",
"My mind was as full of smoke as the multi-modules and I tried to vent it into space [Romanov 011.239] ",
"MIR herself was speaking to me, trying to calm me, and I tried in turn to listen to her wisdom [Romanov 420.101] "
];