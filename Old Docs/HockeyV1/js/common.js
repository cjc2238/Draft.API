var playerDataArray = {}
var playerStatsArray = {}

function MakeStruct(names) {
	var names = names.split(' ');
	var count = names.length;
	function constructor() {
		for (var i = 0; i < count; i++) {
			this[names[i]] = arguments[i];
		}
	}
	return constructor;
}

function MakePlayerData(id, rank, firstName, lastName, position, handedness, salary, height, weight, dob, hometown, img)
{
	var Item = MakeStruct("id rank firstName lastName position handedness salary height weight dob hometown img");
	var row = new Item(id, rank, firstName, lastName, position, handedness, salary, height, weight, dob, hometown, img);
	return row;
}

function MakeStatsData(id, goals, assists, penalties, onetimers)
{
	var Item = MakeStruct("id goals assists penalties onetimers");
	var row = new Item(id, goals, assists, penalties, onetimers);
	return row;
}

function GetStatCategories()
{
	return ["Goals", "Assists", "Penalties", "One-timers"];
}

function CachePlayerDataFromServer()
{
	playerDataArray[0] = (MakePlayerData(0, 1, "Tucker", "Paxton", 	"RW",	"Right Shot",	"1000", "5'10", 170, "February 16, 1993", 	"McKinney", 		"test.png"));
	playerDataArray[1] = (MakePlayerData(1, 2, "Joe", 	"Jonson",	"C",	"Left Shot",	"100",	"6'2", 	185, "March 12, 1984", 		"Philly",			"test.png"));
	playerDataArray[2] = (MakePlayerData(2, 3, "Clay", 	"Moe",		"CW",	"Right Shot",	"150",	"6'0", 	160, "June 1, 2005", 		"San Francisco",	"test.png"));
}

function CachePlayerStatsFromServer(id)
{
	playerStatsArray[id] = []
	playerStatsArray[id].push((MakeStatsData("2015", 1,2, 3, 4)))
	playerStatsArray[id].push((MakeStatsData("2015PO", 1,2, 3, 4)))
	playerStatsArray[id].push((MakeStatsData("2016", 1,2, 3, 4)))
	playerStatsArray[id].push((MakeStatsData("2016PO", 1,2, 3, 4)))
	playerStatsArray[id].push((MakeStatsData("2017", 1,2, 3, 4)))
	playerStatsArray[id].push((MakeStatsData("2017PO", 1,2, 3, 4)))
}

function GetObjectSize(myObject) {
	var count=0
	for (var key in myObject)
	{
		if(myObject.hasOwnProperty(key))
		{
			count++
		}
	}
	return count
}

function GetAllPlayerData() {
	var size = GetObjectSize(playerDataArray)
	if(size == 0)
	{
		CachePlayerDataFromServer()
	}
	return playerDataArray
}

function GetPlayerData(id)
{
	var size = GetObjectSize(playerDataArray)
	if(size == 0)
	{
		CachePlayerDataFromServer()
	}
	return playerDataArray[id];
}

function GetPlayerStats(id)
{
	var size = GetObjectSize(playerStatsArray)
	if(size == 0)
	{
		CachePlayerStatsFromServer(id)
	}
	return playerStatsArray[id]
}





