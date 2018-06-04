let player = {

	body: [ { x: 0, y: 0, }, { x: 0, y: 1, }, { x: 0, y: 2, }, { x: 0, y: 3, }, ],

	get isAvailables() {

		return 0;

	},

};

class Display {

	constructor(game) {

		this.game = game;

		this.block_size = 15;
		this.offset = 2;

		this.canvas = document.createElement("canvas");
		this.context = canvas.getContext("2d");

		canvas.width = this.Size(game.width);
		canvas.height = this.Size(game.height);

		document.body.appendChild(canvas);

	}

	DrawPlayer() {



	}

	Size(size) { return size * (this.block_size + this.offset); }

}

class Player {

	constructor(game) {

		this.game = game;

		this.body = [ { x: 0, y: 0, }, { x: 0, y: 1, }, { x: 0, y: 2, }, { x: 0, y: 3, }, { x: 1, y: 3, }, ];

		this.dx = 1;
		this.dy = 0;

	}

	get NewHead() { return { x: this.body[0].x + this.dx, y: this.body[0].y + this.dy }; }
	get SnakeBody() { return this.body.map(z => z.x + z.y * this.game.width); }

	Move() {

		this.body.unshift( { x: this.NewHead.x, y: this.NewHead.y } );
		this.body.pop();

	}

}

class Fruit {

	constructor() {

		this.x, this.y;

	}



}

class Game {

	constructor() {

		this.player = new Player(this);
		this.fruit = new Fruit();

		this.width = 10;
		this.height = 10;

	}

	get Board() { return Array(this.width * this.height); }
	get Empty() {

		let array;

		array = this.Board.filter(x => this.player.SnakeBody.contains(x));
		console.log(array);

		return array;

	}

}

let main = () => {

	let game = new Game();
	// let display = new Display(game);

	

}

main();