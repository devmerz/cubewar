Candy.Preloader = function(game){
	// define width and height of the game
	Candy.GAME_WIDTH = 640;
	Candy.GAME_HEIGHT = 960;
};
Candy.Preloader.prototype = {
	preload: function(){
		// set background color and preload image
		this.stage.backgroundColor = '#000';
		this.preloadBar = this.add.sprite((Candy.GAME_WIDTH-311)/2, (Candy.GAME_HEIGHT-27)/2, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);
		// load images
		this.load.image('background', 'img/background.png');
		this.load.image('floor', 'img/floor.png');
		this.load.image('monster-cover', 'img/monster-cover.png');
		this.load.image('title', 'img/title.png');
		this.load.image('game-over', 'img/gameover.png');
		this.load.image('score-bg', 'img/score-bg.png');
		this.load.image('button-pause', 'img/button-pause.png');
		// load spritesheets
		this.load.spritesheet('candy', 'img/candy.png', 82, 98);
		this.load.spritesheet('monster-idle', 'img/monster-idle.png', 103, 131);
		this.load.spritesheet('button-start', 'img/button-start.png', 401, 143);


		//mioooo
		this.load.image("phaser" , "assets/phaser.png");
    // aguja
		this.load.image("aguja" , "assets/aguja.png");
		this.load.image("aguja2" , "assets/aguja2.png");
		this.load.image("aguja3" , "assets/aguja3.png");
		this.load.image("aguja4" , "assets/aguja4.png");

    //botones de direccion
		this.load.image("btnDer" , "assets/der.png");
		this.load.image("btnIzq" , "assets/izq.png");

    // Background
		this.stage.backgroundColor = "000";
		this.load.image ("background" , "assets/sandy.png");


		//audio
		this.load.audio("okAudio" , "audio/col.mp3");
	},
	create: function(){
		// start the MainMenu state
		this.state.start('MainMenu');
	}
};
