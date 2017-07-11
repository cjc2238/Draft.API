var ENTER_KEY_EVENT = 13

function OnSubmitClicked() {
	window.open("index.html", "_self")
}

document.getElementById('password-input').onkeydown = function(e){
	if(e.keyCode == ENTER_KEY_EVENT){
		OnSubmitClicked()
	}
};