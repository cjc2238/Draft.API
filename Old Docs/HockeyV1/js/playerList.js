$( document ).ready(function() {
    AddFilterWidget()
	PopulateListItems()
});

function PopulateListItems() {
	var dataArray = GetAllPlayerData();
	filteredDataArray = {}
	for (var key in dataArray)
	{
		if(dataArray.hasOwnProperty(key))
		{	
			var string = document.getElementById("name-input").value
			if( 	
					string == "" ||
					dataArray[key].firstName.toLowerCase().indexOf(string.toLowerCase()) !== -1 ||
					dataArray[key].lastName.toLowerCase().indexOf(string.toLowerCase()) !== -1
				) {
				filteredDataArray[key] = dataArray[key]		
			}
		}
	}
	
	for (var key in filteredDataArray)
	{
		if(filteredDataArray.hasOwnProperty(key))
		{
			AddPlayerCard(filteredDataArray[key]);
		}
	}
}

function RefreshPlayerCards() {
	document.getElementById("playerList").innerHTML = ""
	PopulateListItems()
}

function AddFilterWidget()
{
	var template = `<button id="action-{{category}}" onclick=SetDropdownCategoryText("{{category}}")>{{category}}</button>`
	
	categories = GetStatCategories();
	var firstValue = true
	for( var key in categories) {
		
		if(firstValue)
		{
			firstValue = false;
			SetDropdownCategoryText(categories[key]);
		}
		
		var player = {
			category:	categories[key]
		};
		
		var html = Mustache.to_html(template, player)
		var htmlNode = document.createElement('li')
		htmlNode.innerHTML = html
		document.getElementById("category-filter-dropdown").appendChild(htmlNode);
	}
}

function AddPlayerCard(data) {
	
	var player = {
	id:			data.id,
    rank:		data.rank,
	firstName: 	data.firstName,
    lastName: 	data.lastName,
	position:	data.position,
	salary:		data.salary,
	img:		data.img
};

var template = `
	<div class="playerCard" id="playerCard{{id}}">
		<div class="row">
			<div class="col-sm-3 col-md-3 col-lg-3">#{{rank}}</div>
			<div class="col-sm-9 col-md-9 col-lg-9">{{firstName}} {{lastName}}</div>
		</div>
		<div class="row">
			<div class="col-sm-1 col-md-1 col-lg-1">{{position}}</div>
			<div class="centered-image-container col-sm-2 col-md-2 col-lg-2"><img class="centered-image" src="img/{{img}}"></div>
			<div class="col-sm-1 col-md-1 col-lg-1">\${{salary}}</div>
			<div class="col-sm-8 col-md-8 col-lg-8">
				<button class="btn btn-info btn-stats" role="button" onclick=OnStatsButtonClicked({{id}})>Stats</button>
			</div>
		</div>
	</div
	`;
	
	var html = Mustache.to_html(template, player)
	var htmlNode = document.createElement('div')
	htmlNode.innerHTML = html
	document.getElementById("playerList").appendChild(htmlNode);
}

function OnStatsButtonClicked(id) {
	localStorage.setItem("playerId", id);
	window.open("playerCard.html", "_self")
}

jQuery("#action-1").click(function(e){
	alert("hi")
	e.preventDefault();
});

function OnFilterSubmitClicked() {
	RefreshPlayerCards()
}

function SetDropdownCategoryText(category) {
	document.getElementById("dropdown-category-text").innerHTML = category;
}