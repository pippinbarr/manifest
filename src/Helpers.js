createTextLabel = function (x, y, textString, size) {

	var group = new Phaser.Group(theGame);

	var bg = new Phaser.Sprite(theGame,x,y,'pixel-' + size);
	bg.scale.x = textString.length;

	group.add(bg);

	for (i = 0; i < textString.length; i++)
	{
		var text = textString[i];

		var t = new Phaser.BitmapText(theGame, x + i*size, y, 'font', text, size*0.75)

		t.x += (size/2 - t.textWidth/2);
		t.y += (size/2 - t.textHeight/4);

		if (text == '-' || text == '.' || text == ',') t.y -= size/size;

		group.add(t);	
	}

	return group;
};



createTextButton = function (x, y, textString, size, theState, down, up, over, out) {

	var group = new Phaser.Group(theGame);

	var bg = new Phaser.Sprite(theGame,x,y,'pixel-' + size);
	bg.scale.x = textString.length;

	bg.inputEnabled = true;
	bg.events.onInputDown.add(down);
	bg.events.onInputUp.add(up);
	bg.events.onInputOver.add(over);
	bg.events.onInputOut.add(out);
	
	bg.state = theState;
	bg.over = false;
	bg.down = false;
	bg.tinted = false;

	group.add(bg);

	for (i = 0; i < textString.length; i++)
	{
		var text = textString[i];

		var t = new Phaser.BitmapText(theGame, x + i*size, y, 'font', text, size*0.75)

		t.x += (size/2 - t.textWidth/2);
		t.y += (size/2 - t.textHeight/4);

		if (text == '-' || text == '.' || text == ',') t.y -= size/size;

		group.add(t);	
	}

	return group;
};


createText = function (x, y, size, width, textArray) {

	var group = new Phaser.Group(theGame);

	var startIndex = 0;
	var endIndex = width;

	while (startIndex < textArray.length)
	{
		while (textArray[endIndex] != " ")
		{
			endIndex--;
		}

		var sub = textArray.substring(startIndex,endIndex);
		
		t = createTextLabel(x,y,sub.toUpperCase(),size);

		startIndex = endIndex + 1;
		endIndex = startIndex + width;

		y += size*2;

		group.add(t);
	}

	return group;
};



createDesiron = function (x,y,size,desiron,name,hasLabel,labelAbove) {

	var group = new Phaser.Group(theGame);

	var bg = new Phaser.Sprite(theGame,x,y,'pixel-' + size);

	bg.scale.x = 6;
	bg.scale.y = 6;

	group.add(bg);

	group.desironArray = [];

	for (yy = 0; yy < 6; yy++)
	{
		for (xx = 0; xx < 6; xx++)
		{
			loc = yy*6 + xx;

			var s = new Phaser.Sprite(theGame,x+xx*size,y+yy*size,'pixel-' + size);

			if (desiron[loc] == 1 || (desiron[loc] == -1 && Math.random() > 0.5))
			{
				s.tint = 0x000001;
			}
			else
			{
				s.tint = 0xfffffe;
			}

			group.add(s);
			group.desironArray.push(s);
		}
	}

	if (hasLabel)
	{
		if (!labelAbove)
		{
			var label = createTextLabel(x,y + size*7,name,size);
		}
		else
		{
			var label = createTextLabel(x,y - size*2,name,size);			
		}

		group.add(label);
	}

	// group.desiron = desiron.slice(0);

	return group;
};


createDesironButton = function (x,y,size,desiron,name, down, up, over, out) {

	var group = new Phaser.Group(theGame);

	var bg = new Phaser.Sprite(theGame,x,y,'pixel-' + size);

	bg.scale.x = 6;
	bg.scale.y = 6;

	bg.inputEnabled = true;
	bg.events.onInputDown.add(down);
	bg.events.onInputUp.add(up);
	bg.events.onInputOver.add(over);
	bg.events.onInputOut.add(out);
	
	bg.name = name;
	bg.desiron = desiron;

	bg.over = false;
	bg.down = false;
	bg.tinted = false;

	bg.desiron = desiron;

	group.add(bg);

	for (yy = 0; yy < 6; yy++)
	{
		for (xx = 0; xx < 6; xx++)
		{
			loc = yy*6 + xx;
			if (desiron[loc] == 1) 
			{
				loc = yy*6 + xx;

				var s = new Phaser.Sprite(theGame,x+xx*size,y+yy*size,'pixel-' + size);

				if (desiron[loc] == 1 || (desiron[loc] == -1 && Math.random() > 0.5))
				{
					s.tint = 0x000001;
				}
				else
				{
					s.tint = 0xfffffe;
				}

				group.add(s);
			}
		}
	}

	var label = createTextLabel(x,y + 20*7,name,size);

	group.add(label);

	return group;

};



var tints = [
[0x00ff00,0x007700],
[0xff00ff,0x770077],
[0xffff00,0x777700],
[0x00ffff,0x007777],
[0x0000ff,0x000077],
[0xff0000,0x770000]
];

var currentTint = 0;
var tintables;
var bgIsTinted;
var bgIsLight;



updateTint = function () {

	for (p = 0; p < tintables.length; p++)
	{
		if (Math.random() < 0.05) tintPixel(tintables[p]);
	}

	return;

	if (Math.random() < 0.0005)
	{
		newTint = currentTint;
		while(newTint == currentTint)
		{
			newTint = Math.floor(Math.random() * tints.length);
		}

		currentTint = newTint;

		theLightTint = tints[currentTint][0];
		theDarkTint = tints[currentTint][1];

		if (bgIsTinted)
		{
			if (bgIsLight)
			{
				theGame.stage.backgroundColor = theLightTint;
			}
			else
			{
				theGame.stage.backgroundColor = theDarkTint;
			}
		}

		for (p = 0; p < tintables.length; p++)
		{
			tintPixel(tintables[p]);
		}
	}

	

	
	
};


tintTimerUpdate = function () {

	var newTint = currentTint;
	
	while (newTint == currentTint)
	{
		newTint = Math.floor(Math.random() * tints.length);
	}

	currentTint = newTint;

	theLightTint = tints[currentTint][0];
	theDarkTint = tints[currentTint][1];

	if (bgIsTinted)
	{
		if (bgIsLight)
		{
			theGame.stage.backgroundColor = theLightTint;
		}
		else
		{
			theGame.stage.backgroundColor = theDarkTint;
		}
	}

	for (p = 0; p < tintables.length; p++)
	{
		tintPixel(tintables[p]);
	}

	theGame.time.events.add(Phaser.Timer.SECOND * 7, tintTimerUpdate, theGame);
}


tintPixel = function (pixel) {

	if (Math.random() < 0.5 && !pixel.nonRandomTint)
	{
		pixel.tint = theLightTint;
	}
	else
	{
		pixel.tint = theDarkTint;
	}
};