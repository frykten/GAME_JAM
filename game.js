var randCanvas = $("#rand-game"),
	spaceCanvas = $("#space-game");
var stage, w, h, loader;
var ship, cube, laser, expl;

var timer;
var attack, speed, fuel, score, bestScore;
var enemiesLeft;

var randNum, chosNum;

var isWon = false;
var isLost = false;


function init() {
	ship = $("#ship");
	cube = $("#cube");
	timer = 3;
	fuel = 15;
	score = 0;
	bestScore = 0;
	enemiesLeft = 5;
	enemies(5 - enemiesLeft);
	randNum = Math.floor(Math.random() * 10);
	
	buttons();
	renderCube();
//	renderShip();
	modal();
	
	console.log();
};

function clear() {
	chosNum = null;
	randNum = Math.floor(Math.random() * 10);
	time();
	isWon = false;
	isLost = false;
	
	$(".btn-img").attr("src", "assets/2D/panels/btn.png");
	cube.css("visibility", "visible");
	cube.attr("src", "assets/2D/cube/cube_01.png");
	
	
	speak("We warp time, ya stupid. Let's go back? Just click");
}


function time() {
	timer = timer -1;

	if (isWon || isLost)
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

function chgScore() {
	if (isWon) 	score++;
	if (isLost)	score = 0;
	
	bestScore = bestScore < score ? score : bestScore;
	
	$("#score").text("Score: " + score);
	$("#best-score").text("Best Score: " + bestScore);
}

function enemies(num) {
	enemiesLeft = enemiesLeft + num;
	$("#enemies-left").empty();
	
	for (let i = 0; i < enemiesLeft; i++) {
		let img = $("<img>").attr("src", "assets/2D/cube/cube_01.png").addClass("mini-cube");
		$("#enemies-left").append(img);
	}
}


function lose() {
	isLost = true;
	squirrels();
	speak("Lol! Ya're all squirrels now!");
	refuel(15 - fuel)
	chgScore();
	enemies(5 - enemiesLeft);
	
	setTimeout(() => {
		clear();
	}, 2500);
}

function win() {
	isWon = true;
	chgScore();
	enemies(-1);
	
	speak("You won, jackass... Damnit.");
	window.setTimeout(() => {
		speak("Russian roulette! Wanna try again?")
	}, 2000)
}


function buttons() {
	let btns = $("#btns");
	
	for (let i = 0; i < 10; i++) {
		let div = $("<div>")
			.addClass("btn-div");
		let img = $("<img>")
			.attr("src", "assets/2D/panels/btn.png")
			.addClass("btn-img");
		
		let btn = $("<button>");
		btn
			.attr("data-num", i)
			.addClass("btn numbers text-in-panel")
			.text(i)
			.click(chooseNum);
		
		div.append(img);
		div.append(btn);
		btns.append(div);
	}
}

function chooseNum() {
	let tBtn = $(this);
	chosNum = tBtn.data("num");
	let bg = tBtn.closest("div").find("img");
	
	if (isWon) {
		return clear();
	}
	
	if (isLost)
		return;
	
	if (chosNum == randNum) {
		win();
		bg.attr("src", "assets/2D/panels/btn_true.png");
	}
	else if (chosNum < randNum) {
		bg.attr("src", "assets/2D/panels/btn_false.png");
		speak("Ya shoot with ur dick? Cuz it's too small!!!");
	}
	else {
		bg.attr("src", "assets/2D/panels/btn_false.png");
		speak("Stop stomping on the buttons... Butthead.");
	}
	
	shootLaser();
	
	if (!isWon)
		time();
}


function shootLaser() {
	laser = $("<img>").attr("src", "assets/2D/laser/laser_01.png").addClass("laser");
	$("#ship-cont").append(laser);
	
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
	
	squir.each(() => { $("#laughs").append("<p class='laugh'>Hihi") });
	
	for (let i = 0; i <= 18; i++) {
		nod = (i % 3) + 1;
		
		(function(j, k){
			setTimeout(function timer() {
				src = "assets/2D/squirrel/squirrel_0" + j + ".png";
				squir.attr("src", src);
				if (k * 75 == 18 * 75)
					$("#laughs").empty();
			}, k * 75);
		})( nod, i );
	}
}

function renderCube() {
	let src;
	let i = 1;
	
	setInterval(function timer() {
		if (i > 5)
			i = 1;
		
		src = "assets/2D/cube/cube_0" + i + ".png";
		cube.attr("src", src);
		i++;
	}, 500);
};

function renderShip() {
	let src;
	let i = 1;
	
	setInterval(function timer() {
		if (i > 5)
			i = 1;
		
		src = "assets/2D/ship/ship_0" + i + ".png";
		ship.attr("src", src);
		i++;
	}, 1000);
};

function modal() {
	let modal = $("#modal");
	let span = $("#close");
	
	function close() {
		modal.css("display", "none");
		squirrels();
		speak("Stupid fat-jelly hairy hobbit!");
	}
	
	span.click(function() {
		close();
	});
	
	window.onclick = function(event) {
		if (event.target == modal[0]) {
			close();
		}
	};
}


function speak(sentence) {
	let speaker = $("#speaker");
	let secretSpeaker = $("#secret-speaker");
	
	speaker.text(sentence);
	
	if 			(isWon) secretSpeaker.text(randNum);
	else if 	(timer == 0) secretSpeaker.text(randNum);
	else 		secretSpeaker.text("??");
}