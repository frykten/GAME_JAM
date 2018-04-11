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
	
//	if (isWon)
		explosion();
}

function explosion() {
	let expl = $("#expl");
	let src = "assets/2D/expl/expl_01.png";
	expl.css("display", "block");
	let i = 1;
	
	while (i <= 5) {
		window.setTimeout(() => {
			src = "assets/2D/expl/expl_0" + i + ".png";
			expl.attr("src", src);
			i++;
		}, 1000);
	}
}

function speak(sentence) {
	let speaker = $("#speaker");
	
	speaker.text(sentence);
}