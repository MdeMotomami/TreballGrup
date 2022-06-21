function start_game(){
	name = prompt("User name");
	
	sessionStorage.setItem("username", name);
	
	loadpage("./html/game.html");
}

function SceneMain(){
	loadpage("../html/phasergame.html");
}

function Scene2(){
	loadpage("../html/phasergame2.html");
}

function exit (){
	if (name != ""){
		alert("Leaving " + name + "'s game");
	}
	name = "";
}

function options(){
	loadpage("./html/options.html");
}

function load(){
	loadpage("./load.html");
}

function GoToMenu(){
	loadpage("./index.html");
}

