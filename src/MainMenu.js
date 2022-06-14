var TINT_TIMER_SPEED = 7;

var theLightTint = 0xff00ff;
var theDarkTint = 0x770077;

var trainButton;
var trackButton;
var truthButton;

var mainMenuLabel1;
var mainMenuLabel2;

var mainMenuNextState;
var mainMenuInputEnabled = true;

var mainMenuPixels;

var theGame;

var firstTime = true;

BasicGame.MainMenu = function (game) {

	this.music = null;
	this.playButton = null;

};

BasicGame.MainMenu.prototype = {

	create: function () {

        this.time.events.add(Phaser.Timer.SECOND * TINT_TIMER_SPEED, tintTimerUpdate, this);

		tintables = [];
		bgIsLight = false;
		bgIsTinted = false;

		theGame = this.game;

		// this.music = this.add.audio('titleMusic');
		// this.music.play();

		// ADD THE BACKGROUND OF SHIFTING PIXELS

		mainMenuInputEnabled = true;
		mainMenuTransitionBar = null;
		mainMenuTransitioning = false;

		for (i = 0; i < desironNames.length; i++)
		{
			theName = desironNames[i];

			if (localStorage.getItem(theName + '_STATUS') == null)
			{
				localStorage.setItem(theName + '_STATUS','EMPTY');
			}
		}


		mainMenuPixels = [];
		for (x = 0; x < 12; x++)
		{
			for (y = 0; y < 16; y++)
			{	
				pixel = this.add.sprite(x*40, y*40, 'pixel-40');
				if (Math.random() < 0.5)
				{
					pixel.tint = theLightTint;
				}
				else
				{
					pixel.tint = theDarkTint;
				}

				mainMenuPixels.push(pixel);
				tintables.push(pixel);
			}
		}

		// ADD THE BUTTONS

		mainMenuLabel1 = createTextLabel(40*2,40*2,"MANI",40);
		mainMenuLabel2 = createTextLabel(40*3,40*3,"FEST",40);

		truthButton = createTextButton(40*2,40*9,"TRUTH",40,'Truth',this.onButtonDown,this.onButtonUp,this.onButtonOver,this.onButtonOut);
		trainButton = createTextButton(40*3,40*11,"TRAIN",40,'TrainMenu',this.onButtonDown,this.onButtonUp,this.onButtonOver,this.onButtonOut);
		trackButton = createTextButton(40*4,40*13,"TRACK",40,'TrackMenu',this.onButtonDown,this.onButtonUp,this.onButtonOver,this.onButtonOut);
	},


	onButtonDown: function (b) {

		if (!mainMenuInputEnabled) return;

		b.tint = theDarkTint;
		b.over = true;
		b.down = true;
		b.tinted = true;
	},


	onButtonUp: function (b) {

		if (!mainMenuInputEnabled) return;
		
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
		
		if (!mainMenuInputEnabled) return;
		
		b.tint = 0xffffff;
		b.over = false;
		b.tinted = false;
	},


	onButtonOver: function (b) {
		
		if (!mainMenuInputEnabled) return;
		
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

		mainMenuLabel1.destroy();
		mainMenuLabel2.destroy();

		for (i = 0; i < mainMenuPixels.length; i++)
		{
			mainMenuPixels[i].destroy();
		}

		trainButton.destroy();
		trackButton.destroy();
		truthButton.destroy();
	}

};



var wealthDesiron = 
[
1,1,0,0,1,1,
1,1,0,0,1,1,
0,1,1,1,1,0,
0,1,1,0,0,0,
0,0,1,1,0,0,
0,0,1,1,0,0
];

var healthDesiron = 
[
1,1,1,1,1,1,
1,1,0,1,1,1,
1,1,1,0,1,1,
0,1,1,1,1,1,
1,0,1,0,1,0,
1,1,1,1,1,1
];

var familyDesiron = 
[
1,0,0,0,0,0,
1,0,1,1,1,0,
1,1,1,1,1,1,
0,1,0,1,1,0,
0,1,0,1,0,0,
0,1,0,1,0,0
];

var loveDesiron = 
[
1,1,1,1,0,0,
1,1,1,1,1,0,
1,1,1,1,1,1,
1,1,1,1,1,0,
0,1,1,1,1,0,
0,1,1,1,0,0
];

var powerDesiron = 
[
1,0,0,0,1,0,
1,1,1,1,1,1,
1,0,0,0,1,0,
1,0,0,0,0,0,
1,1,1,1,1,0,
1,0,0,0,1,0
];

var wisdomDesiron = 
[
0,1,1,0,1,0,
0,1,1,1,1,0,
0,0,1,0,0,0,
1,1,1,1,1,0,
0,0,1,0,1,1,
0,0,1,0,0,0
];

var peaceDesiron = 
[
1,0,1,0,0,1,
1,1,1,1,0,1,
1,1,1,0,0,1,
0,1,1,1,0,1,
1,1,1,1,1,1,
0,1,0,1,1,1
];

var joyDesiron = 
[
1,1,1,0,0,0,
0,1,0,0,0,0,
1,1,1,0,0,0,
0,1,0,0,0,0,
1,1,1,1,1,1,
0,1,0,0,0,1
];

var sexDesiron = 
[
0,0,0,1,1,1,
0,0,0,1,0,1,
1,1,1,1,1,1,
0,0,0,1,0,1,
0,0,0,1,0,1,
0,0,0,1,0,1
];

var randomDesiron = 
[
-1,-1,-1,-1,-1,-1,
-1,-1,-1,-1,-1,-1,
-1,-1,-1,-1,-1,-1,
-1,-1,-1,-1,-1,-1,
-1,-1,-1,-1,-1,-1,
-1,-1,-1,-1,-1,-1
];

var desironNames = 
["LOVE","SEX","WISDOM","HEALTH","WEALTH","POWER","PEACE","JOY","FAMILY"];
