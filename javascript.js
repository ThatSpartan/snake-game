class Controller {

	constructor() {

		this.direction = 'right';

		document.addEventListener('keydown', this.KeyPressed);

	}

	KeyPressed(event) {

		switch (event.keyCode) {

			case 87: this.direction = 'up'; break; // up
			case 83: this.direction = 'down'; break; // down
			case 68: this.direction = 'right'; break; // right
			case 65: this.direction = 'left'; break; // left

		}

	}

}

class Display {

	constructor(game) {

		this.game = game;

		this.block_size = 15;
		this.offset = 2;

		this.canvas = document.createElement("canvas");
		this.context = this.canvas.getContext("2d");

		this.canvas.width = this.Size(game.width);
		this.canvas.height = this.Size(game.height);

		document.body.appendChild(this.canvas);

	}

	DrawSquare(x, y, color) {

		this.context.fillStyle = color;
		this.context.fillRect( this.Size(x), this.Size(y), this.block_size, this.block_size);

	}

	DrawBoard() {

		for (let row = 0; row < this.game.width; row++) {
			for (var column = 0; column < this.game.height; column++) {

				this.DrawSquare(row, column, '#709faf');

			}
		}

	}

	DrawPlayer() {

		this.DrawSquare( this.game.player.body[0].x, this.game.player.body[0].y, '#46a4ff' );

		for (let index = 1; index < this.game.player.body.length; index++) {

			this.DrawSquare( this.game.player.body[index].x, this.game.player.body[index].y, '#204a87' );

		}

	}

	DrawFruit() {

		this.DrawSquare( this.game.fruit.x, this.game.fruit.y, '#31f288');

	}

	Size(size) { return size * (this.block_size + this.offset); }

}

class Player {

	constructor(game) {

		this.game = game;

		this.body = [];

		this.dx = 1;
		this.dy = 0;

	}

	Reset() {

		this.body = [ { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2, }, { x: 0, y: 3, }, { x: 1, y: 3, } ];

		this.dx = 1;
		this.dy = 0;

	}

	get NewHead() { return { x: this.body[0].x + this.dx, y: this.body[0].y + this.dy }; }
	get SnakeBody() { return this.body.map(z => z.x + z.y * this.game.width); }

	Move() {

		this.body.unshift( { x: this.NewHead.x, y: this.NewHead.y } );
		this.body.pop();

	}

	Eat() {

		this.body.unshift( { x: this.NewHead.x, y: this.NewHead.y } );

	}

}

class Fruit {

	constructor() {

		this.x = 0;
		this.y = 0;

	}

	get location() { return this.x + ' . ' + this.y; }

	NewFruit(coord) {

		this.x = coord.x;
		this.y = coord.y;

	}

}

class Collision {

	ColliedWithWall(player, game_dimention) {

		return (player.NewHead.x == game_dimention.x && player.NewHead.y == game_dimention.y);

	}

	ColliedWithBody(player) {

		for (let index = 0; index < player.body.length; index++) {

			if (player.NewHead.x == player.body[index].x && player.NewHead.y == player.body[index].y) { return true; }

		}

		return false;

	}

	ColliedWithFruit(player, fruit) {

		return (player.NewHead.x == fruit.x && player.NewHead.y == fruit.y);

	}

}

class Game {

	constructor() {

		this.width = 10;
		this.height = 10;

		this.player = new Player(this);
		this.fruit = new Fruit();
		this.display = new Display(this);
		this.controller = new Controller();
		this.collision = new Collision();

	}

	NewGame() {

		this.player.Reset();
		this.fruit.NewFruit( this.GetEmptyCoord );

		this.loop();

	}

	get GetEmptyCoord() {

		let x, y;

		do {

			x = this.GetInt(this.width);
			y = this.GetInt(this.height);

		} while (!this.Empty( { x: x, y: y } ));

		return { x: x, y: y };

	}

}

Game.prototype.Empty = function(coord) {

	let el = this.player.body;	

	for (var i = 0; i < el.length; i++) {

		if (el[i].x == coord.x && el[i].y == coord.y) {
			return false;
		}

	}

	return true;

};

Game.prototype.GetInt = function(max=0, min=0) {

	return Math.floor(Math.random() * (max - min)) + min;

};

Game.prototype.SetDirection = function() {

	switch (this.controller.direction) {

		case 'up':
			this.player.dx = 0;
			this.player.dy = -1;
			break;
	
		case 'down':
			this.player.dx = 0;
			this.player.dy = 1;
			break;

		case 'right':
			this.player.dx = 1;
			this.player.dy = 0;
			break;

		case 'left':
			this.player.dx = -1;
			this.player.dy = 0;
			break;
		
	}

};

Game.prototype.loop = function() {
console.log('hey');
	this.display.DrawBoard();
	this.display.DrawPlayer();
	this.display.DrawFruit();

	this.SetDirection();

	if ( !this.collision.ColliedWithWall( this.player, { x: this.width, y: this.height } ) || !this.collision.ColliedWithBody( this.player ) ) {

		if ( this.collision.ColliedWithFruit( this.player, this.fruit ) ) {

			this.player.Eat();
			this.fruit.NewFruit(this.GetEmptyCoord);

		} else {

			this.player.Move();

		}

	}

	window.requestAnimationFrame( () => { this.loop(); } );	

};

let main = () => {

	let game = new Game();

	game.NewGame();

};

main();