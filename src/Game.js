Candy.Game = function(game){
	// define needed variables for Candy.Game
	this._player = null;
	this._candyGroup = null;
	this._spawnCandyTimer = 0;
	this._fontStyle = null;
	// define Candy variables to reuse them in Candy.item functions
	Candy._scoreText = null;
	Candy._score = 0;
	Candy._health = 0;

	this.counter = 0;
};
Candy.Game.prototype = {
	create: function(){

		this.add.sprite(0, 0, 'background');

		this.globe = this.add.sprite(this.world.width/2,this.world.height-200,"phaser");
		this.physics.arcade.enable(this.globe);
    this.globe.body.gravity.x = 40;

		this.agujas1 = this.add.group();
		this.agujas1.enableBody = true;
		this.agujas1.createMultiple(20 , "aguja");

		this.agujas2 = this.add.group();
		this.agujas2.enableBody = true;
		this.agujas2.createMultiple(20 , "aguja2");

		this.agujas3 = this.add.group();
		this.agujas3.enableBody = true;
		this.agujas3.createMultiple(20 , "aguja3");

		this.agujas4 = this.add.group();
		this.agujas4.enableBody = true;
		this.agujas4.createMultiple(20 , "aguja4");

		//Keyboard
    this.cursor = this.input.keyboard.createCursorKeys();

    //timer
    this.time.events.loop(Phaser.Timer.SECOND * 1, this.generateNeedle, this);


    //viento
    this.time.events.loop(Phaser.Timer.SECOND * 3, this.changeWind, this);

		this.windText = this.add.text(0, 0, "0", {
       font: "55px Arial",
       fill: "#000",
       align: "center"
    });


		this.auColision = this.add.audio("okAudio");


		this.btnDer = this.add.sprite(0 , this.world.height -130 , "btnDer");
    this.btnIzq = this.add.sprite(this.world.width -140 ,  this.world.height -140, "btnIzq");

    this.btnDer.inputEnabled = true;
    this.btnIzq.inputEnabled = true;

		this.btnDer.scale.set(2,2);
    this.btnIzq.scale.set(2,2);

    this.btnDer.events.onInputDown.add(this.onDownDer, this);
    this.btnIzq.events.onInputDown.add(this.onDownIzq, this);

	},
	onDownDer:function(){
    this.globe.body.velocity.x = -250;
  },
  onDownIzq:function(){
    this.globe.body.velocity.x = 250;
  },
	generateNeedle:function(){

    var numberRnd = this.rnd.integerInRange(100,200);
    var aguja;


    //
    if(numberRnd % 2 == 0){
      if(numberRnd < 10){
        aguja = this.agujas4.getFirstDead().reset(0,0);
      }
      else{
        aguja = this.agujas2.getFirstDead().reset(450, 0);
      }
    }
    else{
      if(numberRnd < 10){
        aguja = this.agujas3.getFirstDead().reset(0 , 0);
      }
      else{
        aguja = this.agujas1.getFirstDead().reset(0 , 0);
      }

    }

		aguja.scale.set(this.rnd.integerInRange(1,2) ,this.rnd.integerInRange(1,2) );
    aguja.body.velocity.y = 200;

    aguja.checkWorldBounds = true;
    aguja.outOfBoundsKill = true;


		if(!aguja.inWorld){
			this.counter = this.counter + 1;
			this.windText.setText(this.counter);
			console.log("salio");
			this.auColision.play();
		}


  },
	windFlag : ["=>" , "<="],
	changeWind:function(){
    var wind = [50 , 80 , 100 , 130 , 150 , -100 , -90 , -100 ,- 140 ,-160 , -200];

    var velocityWind = wind[this.rnd.integerInRange(0,10)]-400;

    var currentWind = velocityWind;


    this.globe.body.gravity.x = currentWind;

    // if(velocityWind >= 0 )
    //   this.windText.setText(this.windFlag[0]);
    // else
    //   this.windText.setText(this.windFlag[1]);
  },
	managePause: function(){

	},
	update: function(){
		//this.globe.body.velocity.x = 0;
    //Cursors
    if(this.cursor.right.isDown)
        this.globe.body.velocity.x = 250;
    if(this.cursor.left.isDown)
        this.globe.body.velocity.x = -250;
    if(this.cursor.up.isDown)
            this.globe.body.velocity.y = -250;
    //Out world
    if(!this.globe.inWorld)
      this.outWorld();

    //Impact Push !
    this.physics.arcade.overlap(this.globe , this.agujas1 , this.impacto , null , this);
    this.physics.arcade.overlap(this.globe , this.agujas2 , this.impacto , null , this);
    this.physics.arcade.overlap(this.globe , this.agujas3 , this.impacto , null , this);
    this.physics.arcade.overlap(this.globe , this.agujas4 , this.impacto , null , this);
	},
	impacto:function(glob , aguj){

		this.globe.body.gravity.y = 1000;

		var over = this.add.sprite(20,200 , "game-over");
		over.inputEnabled = true;
		over.events.onInputDown.add(this.restart, this);


  },
	restart:function(glob){
		console.log("impacto");
	},
  outWorld:function(){
    this.state.start("Game");
  },
};
