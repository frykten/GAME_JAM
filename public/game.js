var randCanvas = $("#rand-game"),
	spaceCanvas = $("#space-game");
var stage, w, h, loader;
var ship, cube, laser, expl;

var timer;
var attack, speed, fuel;

var randNum, chosNum;

var isWon = false;

function buttons() {
	let btns = $("#btns");
	
	for (let i = 0; i < 10; i++) {
		let btn = $("<button>");
		btn
			.attr("data-num", i)
			.addClass("btn numbers")
			.text(i)
			.click(chooseNum);
		
		btns.append(btn);
	}
}


function init() {
	ship = $("#ship");
	cube = $("#cube");
	timer = 3;
	fuel = 15;
	randNum = parseInt(Math.random() * 10);
	
	buttons();
	
	console.log();
};

function clear() {
	chosNum = null;
	randNum = parseInt(Math.random() * 10);
	time();
	isWon = false;
	
	$(".btn").removeClass("true false");
	
	speak("Let's do it again...");
}

function time() {
	timer = timer -1;
	
	if (isWon || !chosNum)
		timer = 3;
	if (timer == 0)
		lose();
	else if (!isWon)
		refuel(-1);
	
	$("#timer").text("Timer: " + timer);
}

function refuel(num) {
	fuel = fuel + num;
	if (fuel == 0) {
		lose();
	}
	
	$("#fuel").text("Fuel: " + fuel);
}

function lose() {
	squirrels();
	speak("Lol! U suck!");
	refuel(15 - fuel)
	return window.setTimeout(() => {
			clear()
		}, 2000);
}

function chooseNum() {
	let tBtn = $(this);
	chosNum = tBtn.data("num");

	if (isWon) {
		return clear();
	}
	
	if (chosNum == randNum) {
		isWon = true;
		tBtn.addClass("true");
		speak("You won, jackass...");
		window.setTimeout(() => {
			speak("Click a button if you dare!")
		}, 2000)
	}
	else if (chosNum < randNum) {
		tBtn.addClass("false");
		speak("Try bigger guns, ya smurf!");
	}
	else {
		tBtn.addClass("false");
		speak("Nay... Don't think u're better than us.");
	}
	
	shootLaser();
	
	if (!isWon)
		time();
}

function shootLaser() {
	laser = $("<img>").attr("src", "assets/2D/laser/laser_01.png").addClass("laser");
	spaceCanvas.append(laser);
	
	laser.position({
		at: "left",
		of: ship,
		using: (e, ui) => {
			laser.css({
				top: e.top,
				left: e.left,
			});
		}
	});
	
	renderLaser();
}

function renderLaser() {
	new Promise( (resolve, rej) => {
		let pos;
		if (isWon) 
			pos = "+=70vh";
		else
			pos = "+=90vh";
		laser.animate({top: pos}, 1000, "linear");
		
		resolve("Sent");
	}).then(() => {
		window.setTimeout(() => {
			laser.remove();
		}, 1000);
	}); 
	
	if (isWon)
		explosion();
}

function explosion() {
	let expl = $("#expl");
	expl.css("display", "block");
	let src;
	
	for (let i = 1; i <= 6; i++) {
		(function(j){
			setTimeout(function timer() {
				src = "assets/2D/expl/expl_0" + j + ".png";
				if (j == 3)
					cube.css("visibility", "hidden");
				expl.attr("src", src);
			}, j * 300);
		})( i );
	}
}

function squirrels() {
	let squir = $(".squirrel");
	let src;
	let nod = 1;
	
	for (let i = 0; i <= 18; i++) {
		nod = (i % 3) + 1;
		
		(function(j, k){
			setTimeout(function timer() {
				src = "assets/2D/squirrel/squirrel_0" + j + ".png";
				squir.attr("src", src);
			}, k * 100);
		})( nod, i );
	}
}

function speak(sentence) {
	let speaker = $("#speaker");
	let secretSpeaker = $("#secret-speaker");
	
	speaker.text(sentence);
	
	if (isWon)
		secretSpeaker.text(randNum);
	else
		secretSpeaker.text("??");
}