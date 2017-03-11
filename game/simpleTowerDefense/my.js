// constants
const TILE_H = 10;
const TILE_W = 10;
const MAP_H = 10; // block
const MAP_W = 10; // block

const MOVE_N = 0;
const MOVE_E = 1;
const MOVE_S = 2;
const MOVE_W = 3;

///////////////////// EVENT HANDLER WRAPPERS
function listenEvent(eventTarget,eventType,eventHandler)
{
	if(eventTarget.addEventListener)
	{
		eventTarget.addEventListener(eventType,eventHandler,false);
	}
	else if(eventTarget.attachEvent)
	{
		eventType = "on" + eventType;
		eventTarget.attachEvent(eventType,eventHandler);
	}
	else
	{
		eventTarget["on" + eventType] = eventHandler;
	}
}

function cancelEvent(event)
{
	if(event.preventDefault)
	{
		event.preventDefault();
	}
	else
	{
		event.returnValue = false;
	}
}

function cancelPropogation(event)
{
	if(event.stopPropogation)
	{
		event.stopPropogation();
	}
	else
	{
		event.cancelBubble = true;
	}
}
///////////////////// END EVENT HANDLER WRAPPERS

var levelMap = [
	{
		data: [
			[' ', 'R', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
			[' ', 'R', ' ', 'R', 'R', 'R', 'R', 'R', 'R', ' '],
			[' ', 'R', ' ', 'R', ' ', ' ', ' ', ' ', 'R', ' '],
			[' ', 'R', 'R', 'R', ' ', ' ', ' ', ' ', 'R', ' '],
			[' ', ' ', ' ', ' ', ' ', 'R', 'R', 'R', 'R', ' '],
			[' ', ' ', ' ', ' ', ' ', 'R', ' ', ' ', ' ', ' '],
			[' ', 'R', 'R', 'R', 'R', 'R', ' ', ' ', ' ', ' '],
			[' ', 'R', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
			[' ', 'R', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
			[' ', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'R', 'E'],
		],
	},
];

function levelIsRoad(l, r, c) {
	block = levelMap[l].data[r][c];

	if (block == 'R') {
		return true;
	}

	return false;
}

function drawMap() {
	// create map
	for (var r = 0; r < MAP_H; r++) {
		for (var c = 0; c < MAP_W; c++) {
			var mapzone = document.createElement('div');
			mapzone.setAttribute("class","mapzone");
			mapzone.style.top = TILE_H * r + 'px';
			mapzone.style.left = TILE_W * c + 'px';
			if (levelIsRoad(0, r, c)) {
				mapzone.style.backgroundColor = "#1E90FF";
			}
			document.body.appendChild(mapzone);
		}
	}

	// put a start button on
	var startbutton = document.createElement("div");
	startbutton.setAttribute("id", "startbutton");
	startbutton.setAttribute("class", "startbutton");
	startbutton.innerHTML = "<p> Start! </p>";
	listenEvent(startbutton, "click", startwave);
	document.body.appendChild(startbutton);
}

function startwave() {
	var movex = 0;
	var movey = 0;
	var currDir = MOVE_S;
	var i =0;

	var minion = {
		id: 'minion0',
		top: 0, // Y
		left: 1, // X
		directionOpp: MOVE_N,
	};

	makeMinion(minion);
	//console.log(minion);

	interval_id = setInterval(function() {
		moveAhead(minion);
	}, 200);
	//console.log(minion);
}

function makeMinion(obj) {
	var minion = document.createElement("div");
	minion.setAttribute("id", obj.id);
	minion.setAttribute("class", "minion");
	document.body.appendChild(minion);
}

function updateMinion(obj) {
	var minion = document.getElementById(obj.id);
	minion.style.left = obj.left * TILE_W + 'px';
	minion.style.top = obj.top * TILE_H + 'px';
}

function moveAhead(obj) {
	// try each direction except the opposite of the current one.
	for (var dir = 0; dir < 4; dir++) {
		if (obj.directionOpp == dir) {
			continue;
		}

		var x = obj.left;
		var y = obj.top;

		if (dir == MOVE_N) {
			if (moveY(obj, -1) == true) {
				obj.directionOpp = MOVE_S;
				break;
			}
		} else if (dir == MOVE_E) {
			if (moveX(obj, 1) == true) {
				obj.directionOpp = MOVE_W;
				break;
			}
		} else if (dir == MOVE_S) {
			if (moveY(obj, 1) == true) {
				obj.directionOpp = MOVE_N;
				break;
			}
		} else if (dir == MOVE_W) {
			if (moveX(obj, -1) == true) {
				obj.directionOpp = MOVE_E;
				break;
			}
		}
	}

	console.log(obj);
	updateMinion(obj);
}

function moveX(obj, x) {
	var tmpX = obj.left + x;

	if (tmpX >= 0 && tmpX < MAP_W
		&& levelMap[0].data[obj.top][tmpX] == 'R') {
		obj.left += x;
		return true;
	}

	return false;
}

function moveY(obj, y) {
	var tmpY = obj.top + y;

	if (tmpY >= 0 && tmpY < MAP_H
		&& levelMap[0].data[tmpY][obj.left] == 'R') {
		obj.top += y;
		return true;
	}

	return false;
}

window.onload = function() {
	drawMap();
}
