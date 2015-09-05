Candy.MainMenu = function(game){
	var gl = null;
};
Candy.MainMenu.prototype = {
	create: function(){
		// display images
		this.add.sprite(0, 0, 'background');
		gl = this.add.sprite(-130, Candy.GAME_HEIGHT-514, 'monster-cover');
		this.add.sprite((Candy.GAME_WIDTH-395)/2, 60, 'title');
		this.physics.enable(gl);
		// add the button that will start the game
		this.add.button(Candy.GAME_WIDTH-401-10, Candy.GAME_HEIGHT-143-10, 'button-start', this.startGame, this, 1, 0, 2);
	},
	update:function(){
		gl.body.gravity.y = -20;

	},
	startGame: function() {
		// start the Game state
		this.state.start('Game');
	}
};
