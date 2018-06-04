var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");

const fps = 3;


let controller = {

    select: 'right',

    KeyPressed: event => {

    // console.log(event.keyCode);

        switch (event.keyCode) {

            case 65: // left key
                controller.select = "left";
                break;

            case 87: // up key
                controller.select = "up";
                break;

            case 68: // right key
                controller.select = "right";
                break;

            case 83: // down key
                controller.select = "down";
                break;

            case 32: // space for testing
                main_loop();
                break;

        }

    }

};

let display = {

    colors: {
        head: '#ff7f00',
        body: '#ffa500',
        empty: '#868686',
        fruit: '#ff6ff2',
    },

    block_size: 15,
    space: 2,

    Length(amount) { return amount * (this.block_size + this.space); },

    DrawSquare(x, y, size, color) {

        context.fillStyle = color;
        context.fillRect(x, y, size, size);

    },

    DrawBoard(width, height) {

        for(let row = 0; row < width; row++) {
            for(let column = 0; column < height; column++) {

                this.DrawSquare(this.Length(row), this.Length(column), this.block_size, this.colors.empty);

            }
        }
        
    },

    DrawPlayer(player) {

        this.DrawSquare(this.Length(player.body[0].x), this.Length(player.body[0].y), this.block_size, this.colors.head);

        for(let p = 1; p < player.body.length; p++) {
            
            let piece = player.body[p];

            this.DrawSquare(this.Length(piece.x), this.Length(piece.y), this.block_size, this.colors.body);

        }

    },

    DrawFruit(fruit) {

        this.DrawSquare(this.Length(fruit.x), this.Length(fruit.y), this.block_size, this.colors.fruit);

    },

};

let game = {

    width: 10,
    height: 10,

};

let fruit = {

    max_height: 0,
    max_width: 0,

    x: 0,
    y: 0,

    NewFruit() {

        fruit.x = this.NewLoc(this.max_width);
        fruit.y = this.NewLoc(this.max_height);

    },

    NewLoc(max, min=0) {

        return Math.floor(Math.random() * (max - min)) + min;

    },

};

let player = {

    dx: 0,
    dy: 0,

    body: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 0, y: 3 }, { x: 0, y: 4 }, { x: 0, y: 5 }, { x: 0, y: 6 },],

    get new_x() { return this.body[0].x + this.dx; },
    get new_y() { return this.body[0].y + this.dy; },
    get new_coords() { return { x: this.new_x, y: this.new_y }; },
    get x() { return this.body[0].x; },
    get y() { return this.body[0].y; },

    // get availables() { return }

    add() {
        this.body.unshift({ x: this.new_x, y: this.new_y });
    },

    remove() {
        this.body.pop();
    },

    move() {
        this.add();
        this.remove();
    },

    eat() {
        this.add();
        fruit.NewFruit();
    },

};

let collisions = {
    
    Main(player, game, fruit) {

        if (!collisions.Wall(player, game) && !collisions.Player(player)) {

            if (collisions.Fruit(player, fruit)) {
                player.eat();
            } else {
                player.move();
            }

        }

    },

    Fruit(player, fruit) {

        if (player.new_x == fruit.x && player.new_y == fruit.y) { return true; }

        return false;

    },

    Wall(player, game) {

        if (    player.new_x >= game.width ||
                player.new_x < 0 ||
                player.new_y >= game.height ||
                player.new_y < 0
        ) { return true; }

        return false;

    },

    Player(player) {

        let current;
        for(let index = 0; index < player.body.length; index++) {

            current = player.body[index];

            if (current.x == player.new_x && current.y == player.new_y) { return true; }

        }

        return false;

    },

};

function main_loop() {
    switch (controller.select) {
        case 'right':

            player.dx = 1;
            player.dy = 0;

            break;

        case 'left':

            player.dx = -1;
            player.dy = 0;
            
            break;
            
        case 'up':
            
            player.dx = 0;
            player.dy = -1;
            
            break;
            
        case 'down':
            
            player.dx = 0;
            player.dy = 1;
            
            break;
            
    }

    collisions.Main(player, game, fruit);

    display.DrawBoard(game.width, game.height);
    display.DrawPlayer(player);
    display.DrawFruit(fruit);

  setTimeout(() => {
      console.log('new frame');
      window.requestAnimationFrame(main_loop);
  }, 1000 / fps);
}

canvas.width = display.Length(game.width);
canvas.height = display.Length(game.height);
document.body.appendChild(canvas);

fruit.max_width = game.width;
fruit.max_height = game.height;
fruit.NewFruit();

window.addEventListener("keydown", controller.KeyPressed);
window.requestAnimationFrame(main_loop);
