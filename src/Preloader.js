
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {

		r = '?' + Math.floor(Math.random() * 1000);

		//	These are the assets we loaded in Boot.js
		//	A nice sparkly background and a loading progress bar
		// this.background = this.add.sprite(0, 0, 'preloaderBackground');
		this.preloadBar = this.add.sprite(16, 400, 'pixel-loader');

		this.preloadBar.tint = tints[Math.floor(Math.random() * tints.length)][0];

		//	This sets the preloadBar sprite as a loader sprite.
		//	What that does is automatically crop the sprite from 0 to full-width
		//	as the files below are loaded in.
		this.load.setPreloadSprite(this.preloadBar);

		//	Here we load the rest of the assets our game needs.
		//	As this is just a Project Template I've not provided these assets, the lines below won't work as the files themselves will 404, they are just an example of use.
		
		this.load.bitmapFont('font', 'fonts/font.png', 'fonts/font.xml');

		this.load.image('pixel-40', 'images/pixel-40.png' + r);
		this.load.image('pixel-64', 'images/pixel-64.png' + r);
		this.load.image('pixel-20', 'images/pixel-20.png' + r);
		this.load.image('pixel-16', 'images/pixel-16.png' + r);
	},

	create: function () {

		//	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
		this.preloadBar.cropEnabled = false;

	},

	update: function () {

		//	You don't actually need to do this, but I find it gives a much smoother game experience.
		//	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
		//	You can jump right into the menu if you want and still play the music, but you'll have a few
		//	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
		//	it's best to wait for it to decode here first, then carry on.
		
		//	If you don't have any music in your game then put the game.state.start line into the create function and delete
		//	the update function completely.
		


		if (this.ready == false)
		{
			this.ready = true;
			this.state.start('MainMenu');
		}

	}

};
