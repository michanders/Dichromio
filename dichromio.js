const GAMEBOX = document.getElementById('gamebox');
const SPIN = document.getElementById('spin');
const ENDGAME = document.getElementById('endgame');
const HLEVEL = document.getElementById('hLevel');
const EASY = document.getElementById('easy');
const MEDIUM = document.getElementById('medium');
const HARD = document.getElementById('hard');
var flashTime = 1500;
var count = 0;
var level = 1;
var cdown = 6;
var boxes = [];
var flashes = [];


function addGameboxEvent(){
	GAMEBOX.addEventListener('mousedown', checkClick);
}

function removeGameboxEvent(){
	GAMEBOX.removeEventListener('mousedown', checkClick);
}

function checkClick(e){
	removeGameboxEvent();
	var box = document.getElementById('b'+flashes[count]);
	var square = e.target;
	((box.id === square.id) ? blue(square):red(square));
}

function blue(obj){
	addGameboxEvent();
	obj.style.backgroundColor = 'blue';
	(count === flashes.length-1) ? nextGame():count++;
}

function red(obj){
	removeGameboxEvent();
	obj.style.backgroundColor = 'red';
	endGame();
}

function newGrid(){
	SPIN.addEventListener('mousedown', pickSquare);
	HLEVEL.innerHTML = 'Level: ' + level;
	if (boxes.length === 0){
		for(var i=1; i<=25; i++){
			var box = document.createElement('div');
			box.id = 'b'+i;
			GAMEBOX.appendChild(box);
			boxes.push(box);
		};
	};
}

function yellowBack(){
	for(var i=0; i<flashes.length; i++){
		var box = document.getElementById('b'+flashes[i]);
		box.style.backgroundColor = 'yellow';
	}
}

function pickSquare(){
	SPIN.removeEventListener('mousedown', pickSquare);
	SPIN.style.display = 'none';
	while(flashes.length < level+1){
		var f = (Math.floor(Math.random() * 25)+1);
		var box = document.getElementById('b'+f);
		if(!flashes.includes(f) && box != null){
			flashes.push(f);
			box.style.backgroundColor = 'red';
			setTimeout(pickSquare, flashTime);
			setTimeout(yellowBack, (flashTime/2));
			break;
		}
	}
	if(flashes.length === (level+1)){
		setTimeout(addGameboxEvent, 1000);
	}
}

function nextGame(){
	removeGameboxEvent();
	while(GAMEBOX.firstChild){
		GAMEBOX.removeChild(GAMEBOX.firstChild);
	}
	flashes.length = 0;
	boxes.length = 0;
	count = 0;
	level++;
	newGrid();
	nextGameDisplay();
}

function nextGameDisplay(){
	ENDGAME.style.display = 'block';
	ENDGAME.innerHTML = "Nice Job!!!" + "<br />" + "Click for Level: " + level;
	$("#endgame").click(function(){
		ENDGAME.style.display = 'none';
		SPIN.style.display = 'block';
	});
}

function reload() {
  window.location.reload(true);
}

function endGame(){
	removeGameboxEvent();
	$("#endgame").off();
	display();
	setInterval(display, 1000);
	setTimeout(reload, 5000);
}

function display() {
	ENDGAME.style.display = 'block';
	if(cdown >= 1){
		cdown--;
	}
	ENDGAME.innerHTML = "Game Over!!!" + "<br />" + "Level Reached: " + level + "<br />" + "New Game in... " + cdown;
}


$("#easy").click(function(){
	flashTime = 1500;
	EASY.style.border = '4px solid #1bff1b';
	MEDIUM.style.border = 'none';
	HARD.style.border = 'none';
	document.body.style.background = 'white';
	GAMEBOX.style.opacity = 1;
});
$("#medium").click(function(){
	flashTime = 1000;
	EASY.style.border = 'none';
	MEDIUM.style.border = '4px solid yellow';
	HARD.style.border = 'none';
	document.body.style.backgroundImage = "url('images/background.png')";
	GAMEBOX.style.opacity = 1;
});
$("#hard").click(function(){
	flashTime = 500;
	EASY.style.border = 'none';
	MEDIUM.style.border = 'none';
	HARD.style.border = '4px solid red';
	document.body.style.backgroundImage = "url('images/background.png')";
	GAMEBOX.style.opacity = .6;
});


newGrid();
