$( document ).ready(function() {
	var id = localStorage.getItem("playerId");
    PopulatePlayerCardDetailed(id);
});

function PopulatePlayerCardDetailed(id) {
	var playerData = GetPlayerData(id)
	var playerStats = GetPlayerStats(id)
	AddPlayerCardDetailed(playerData, playerStats)
}

function GetExpandedPositionName(position) {
	var mapping = {}
	mapping["RW"] = "Right Wing"
	mapping["CW"] = "Center Wing"
	mapping["C"] = "Center"
	
	return mapping[position]
}

function AddPlayerCardDetailed(data, stats) {
	var playerVars = {
		id:			data.id,
		rank:		data.rank,
		firstName: 	data.firstName,
		lastName: 	data.lastName,
		position:	GetExpandedPositionName(data.position),
		handedness:	data.handedness,
		img:		data.img,
		height:		data.height,
		weight:		data.weight,
		dob:		data.dob,
		hometown:	data.hometown
	};

	var playerCardTemplate = `
	<div class ="row" id="playerCard{{id}}">
		<div class="col-md6">
			<div class="row">
				<div col-sm-9 col-md-9 col-lg-9"><img class="centered-image-bordered" src="img/{{img}}"></div>
				<div class="col-sm-3 col-md-3 col-lg-3">{{firstName}} {{lastName}}</div>
			</div>
			<div class="row">{{position}}</div>
			<div class="row">{{handedness}}</div>
			<div class="row">{{height}}</div>
			<div class="row">{{weight}}lbs</div>
			<div class="row">{{dob}} - {{hometown}}</div>
		</div>
		<div class="col-md6">
			<div class="container stats-container">
				<table class="table table-bordered">
					<thead>
						<tr id="stats-table-categories">
							<th></th>
						</tr>
					</thead>
					<tbody id="stats-table-body"></tbody>
				</table>
			</div>
		</div>
	</div>
	`;
	
	var playerCardHtml = Mustache.to_html(playerCardTemplate, playerVars)
	var playerCardHtmlNode = document.createElement('div')
	playerCardHtmlNode.innerHTML = playerCardHtml
	document.getElementById("playerCard").appendChild(playerCardHtmlNode);
	
	// Stat categories
	statsCategoriesTemplate = `{{category}}`;
	categories = GetStatCategories();
	for( var key in categories)
	{
		// Populate Stats table
		var statsVars = {
			category: categories[key]
		};
		
		var categoriesHtml = Mustache.to_html(statsCategoriesTemplate, statsVars)
		var categoriesHtmlNode = document.createElement('th')
		categoriesHtmlNode.innerHTML = categoriesHtml
		document.getElementById("stats-table-categories").appendChild(categoriesHtmlNode);
	}
	
	// State data
	statsDataTemplate = `
	<tr>
		<th>{{year}}</th>
		<td>{{goals}}</td>
		<td>{{assists}}</td>
		<td>{{penalties}}</td>
		<td>{{onetimers}}</td>
	</tr>
	`;
	
	for( var key in stats)
	{
		// Populate Stats table
		var statsVars = {
			year:		stats[key].id,
			goals:		stats[key].goals,
			assists:	stats[key].assists,
			penalties:	stats[key].penalties,
			onetimers:	stats[key].onetimers
		};
		
		var statsDataHtml = Mustache.to_html(statsDataTemplate, statsVars)
		var statsDataHtmlNode = document.createElement('tr')
		statsDataHtmlNode.innerHTML = statsDataHtml
		document.getElementById("stats-table-body").appendChild(statsDataHtmlNode);
	}
}
