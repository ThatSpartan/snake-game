var canvas = document.createElement('canvas');
canvas.width = 600;
canvas.height = 600;
document.body.appendChild(canvas);

const fps = 5;

var context = canvas.getContext('2d');

let controller = {

    select: 'right',

    KeyPressed : (event) => {

		switch (event.keyCode) {

			case 65: // left key
				controller.select = 'left';
				break;

			case 87: // up key
				controller.select = 'up';
				break;

			case 68: // right key
				controller.select = 'right';
                break;
                
            case 83: // down key
                controller.select = 'down';
                break;

		}

    },

};

let fruit = {

    x: 4,
    y: 6,

    NewFruit: () => {

        let x, y, min, max;

        min = 0;
        max = 9;

        x = Math.floor(Math.random() * (max - min + 1)) + min;
        y = Math.floor(Math.random() * (max - min + 1)) + min;

        fruit.x = x;
        fruit.y = y;

    }

};

let player = {

    width : 30,
    height : 30,

    body : [
        { x: 0, y: 0 },
        { x: 0, y: 1 },
        { x: 0, y: 2 },
    ]

};

function wall(x, y) { // wall or player or fruit
    console.log('wall');
    console.log(x + ' . ' + y);

    if (x >= 10 || y >= 10 || x < 0 || y < 0) { // check wall colliion
        console.log('return true');

        return true;

    }

    for (let index = 0; index < player.body.length; index++) { // check body collision
        const body = player.body[index];
        
        if (body.x == x && body.y == y) {
            
            return true;

        }

    }

    let p_head = player.body[0];
    if (x == fruit.x && y == fruit.y) {
        
        fruit.NewFruit();

        player.body.unshift({ x: x, y: y, });

        return true;

    }

    return false;

}

function main_loop() {

    let x, y;

    switch (controller.select) {

        case 'right':

            // console.log('right');

            x = player.body[0].x;
            y = player.body[0].y;

            if (wall(x+1, y)) {
                console.log('true');
                break;
            }

            x++;
            
            player.body.unshift({   x: x, 
                                    y: y, });

            player.body.pop();

            break;

        case 'down':

            // console.log('down');

            x = player.body[0].x;
            y = player.body[0].y;

            if (wall(x, y+1)) {
                break;
            }

            y++;
            
            player.body.unshift({   x: x, 
                                    y: y, });

            player.body.pop();

            break;

        case 'left':

            // console.log('left');

            x = player.body[0].x;
            y = player.body[0].y;

            if (wall(x-1, y)) {
                break;
            }

            x--;
            
            player.body.unshift({   x: x, 
                                    y: y, });

            player.body.pop();

            break;

        case 'up':

            // console.log('down');

            x = player.body[0].x;
            y = player.body[0].y;

            if (wall(x, y-1)) { // wall or player
                break;
            }

            y--;
            
            player.body.unshift({   x: x, 
                                    y: y, });

            player.body.pop();

            break;

    }


    context.fillStyle = '#868686'; // empty color
    context.fillRect(0, 0, 30, 30); // test

    for (let row = 0; row < 10; row++) {
        for (let column = 0; column < 10; column++) {

            context.fillRect(row * 32, column * 32, 30, 30); // space * (box width + offset)
            
        }
    }

    for (let index = 0; index < player.body.length; index++) {
        const body = player.body[index];

        if (index == 0) {
            context.fillStyle = '#ff7f00'; // snake head color
        } else {
            context.fillStyle = '#ffa500'; // snake body color
        }

        context.fillRect(body.x * 32, body.y * 32, 30, 30);
        
    }

    context.fillStyle = '#ff6ff2';
    context.fillRect(fruit.x * 32, fruit.y * 32, 30, 30);

    setTimeout(() => {
        // console.log('new frame');
        window.requestAnimationFrame(main_loop);
    }, 1000 / fps);

}

window.addEventListener('keydown', controller.KeyPressed);
window.addEventListener('keyup', controller.KeyPressed);
window.requestAnimationFrame(main_loop);