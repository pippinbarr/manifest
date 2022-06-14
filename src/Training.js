
var trainingLabel1;
var trainingLabel2;

var trainingDesiron;
var trainingLabel;
var trainingMatchLabel;
var changeRate = 0.1;
var changesMade = 0;
var trainingFrames = 0;
var completed = false;

var resultingDesironArray = [];


BasicGame.Training = function (game) {

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


BasicGame.Training.prototype = {

	create: function () {

        this.time.events.add(Phaser.Timer.SECOND * TINT_TIMER_SPEED, tintTimerUpdate, this);

        tintables = [];
        bgIsLight = false;
        bgIsTinted = true;

        this.game.stage.backgroundColor = theDarkTint;
        
        trainingLabel1 = createTextLabel(16*3,16*2,"MANIFEST THE DESIRON",16);
        trainingLabel2 = createTextLabel(16*3,16*4,"WITH YOUR MIND",16);

        trainingDesiron = createDesiron(480/2 - (6*64)/2,20*5,64,randomDesiron,'RANDOM',false);

        trainingLabel = createTextLabel(16*3,16*32,adviceArray[Math.floor(Math.random() * adviceArray.length)],16);
        this.time.events.add(Phaser.Timer.SECOND * (Math.random() * 2) + Phaser.Timer.SECOND * 1, this.updateAdvice, this);

        changesMade = 0;
        trainingFrames = 0;
        resultingDesironArray = [];
    },


    updateAdvice: function () {

        if (!completed)
        {
            trainingLabel.destroy();
            trainingLabel = createTextLabel(16*3,16*32,adviceArray[Math.floor(Math.random() * adviceArray.length)],16);
            this.time.events.add(Phaser.Timer.SECOND * (Math.random() * 2) + Phaser.Timer.SECOND * 1, this.updateAdvice, this);
        }
    },


    update: function () {

        if (changesMade == 36) return;

        trainingFrames++;
        if (trainingFrames == 100) trainingFrames = 0;

        // 2 is about 
        // 10 is about 15 seconds
        // modifier = 20; // 20 is a wee while
        if (currentDesironWillMatch >= 1)
        {
            modifier = 0.5 + (10 * Math.random());
        }
        else if (Math.random() < (currentDesironWillMatch))
        {
            modifier = 4 + (Math.random() * 10);
        }
        else
        {
            modifier = 8 + (Math.random() * 10);
        }

        for (xx = 0; xx < 6; xx++)
        {
            for (yy = 0; yy < 6; yy++)
            {
                loc = yy + 6*xx;

                if (trainingDesiron.desironArray[loc].tint == 0x000000 ||
                    trainingDesiron.desironArray[loc].tint == 0xffffff)
                {
                    continue;
                }


                if (trainingFrames % 5 != 0) continue;
                if (Math.random() > 0.5) continue;



                if (Math.random() > 0.5) 
                {
                    trainingDesiron.desironArray[loc].tint = 0x000001;
                }
                else 
                {
                    trainingDesiron.desironArray[loc].tint = 0xfffffe;      
                }


                fix = (Math.random() < (changesMade+1)/37/modifier);

                if (fix)
                {
                    if (Math.random() < currentDesironWillMatch)
                    {
                        if (currentDesironArray[loc] == 1) trainingDesiron.desironArray[loc].tint = 0x000000;
                        else trainingDesiron.desironArray[loc].tint = 0xffffff;
                    }
                    else
                    {
                        if (Math.random() > 0.5) trainingDesiron.desironArray[loc].tint = 0x000000;
                        else trainingDesiron.desironArray[loc].tint = 0xffffff;                             
                    }  

                    changesMade++;   
                }



            }
        }

        if (changesMade == 36)
        {
            bgIsLight = true;
            this.game.stage.backgroundColor = theLightTint;

            for (i = 0; i < trainingDesiron.desironArray.length; i++)
            {
                if (trainingDesiron.desironArray[i].tint == 0x000000)
                {
                    resultingDesironArray.push(1);
                }
                else
                {
                    resultingDesironArray.push(0);
                }
            }

            var matches = 0;
            for (i = 0; i < currentDesironArray.length; i++)
            {
                if (currentDesironArray[i] == resultingDesironArray[i]) matches++;
            }

            trainingMatchLabel = createTextLabel(16*3,20*26, Math.floor(matches/36*100) + "% MATCH",40);


            trainingLabel.destroy();
            completed = true;

            this.time.events.add(Phaser.Timer.SECOND * 2, this.nextState, this);

        }

        updateTint();
    },


    nextState: function () {

        this.game.state.start('TrainingResults');

    },

    shutdown: function () {
        trainingDesiron.destroy();
        trainingLabel.destroy();
        trainingMatchLabel.destroy();

        trainingLabel1.destroy();
        trainingLabel2.destroy();
    },

};






var adviceArray = [
"SOYUZ TM-5",
"SOYUZ TM-7",
"SOYUZ TM-11",
"SOYUZ TM-17",
"LYAKHOV",
"SOLOVIEV",
"BALANDIN",
"KVANT-2",
"EVA",
"PROGRESS M-7",
"MIR",
"KRISTALL MODULE",
"LAZUTKIN",
"TSIBLIEV",
"SPEKTR MODULE",
"BAIKONUR",
"SALYUT-7",
"COSMOS-1686",
"EO-2",
"ROMANENKO",
"LAVEIKIN",
"PROGRESS-28",
"KVANT-1",
"VIKTORENKO",
"LEVCHENKO",
"EO-3",
"TITOV",
"MANAROV"
];