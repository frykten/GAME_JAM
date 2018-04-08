var randCanvas = $("#rand-canvas"),
	spaceCanvas = $("#space-canvas");
var stage, w, h, loader;
var ship;

/*
var data = {
        images: ["./assets/2D/test.png"],
        frames: {width:64, height:64, count:5}
    };

var init = () => {
	stage = new createjs.StageGL("space-canvas");
	
	w = stage.canvas.width = spaceCanvas.width();
	h = stage.canvas.height = spaceCanvas.height();
	
	handleComplete();
};

function handleComplete() {
	let spriteShip = new createjs.SpriteSheet({
        images: ["./assets/2D/test.png"],
        frames: {width:64, height:64, count:5},
		framerate: 5,
		"animations": {
			"normal": [0, 5, "normal", 0.5]
		}
    });
	
	ship = new createjs.Sprite(spriteShip);
	ship.y = 0;
	
	stage.addChild(ship);
	createjs.Ticker.addEventListener("tick", tick);
}

function tick(event) {
	
	stage.update(event);
}
*/
var init = () => {};

var config = {
        width: spaceCanvas.width(),
        height: spaceCanvas.height(),
        scene: {
            create: create
        }
    };

var game = new Phaser.Game(config);

function create ()
    {
        var logo = this.add.image(400, 100, './assets/2D/test.png');
console.warn("smurf?");
    };