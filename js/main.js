// Gets All global cases
(async () => {
	let data = await fetch("https://corona.lmao.ninja/all");

	let all = await data.json();

	let allCases = all.cases;
	let allDeaths = all.deaths;
	let allRecovered = all.recovered;

	document.getElementById("allCasesNo").innerHTML = allCases;
	document.getElementById("recoveredCasesNo").innerHTML = allRecovered;
	document.getElementById("deathCasesNo").innerHTML = allDeaths;

	console.log(allCases);
	console.log(allDeaths);
	console.log(allRecovered);
})();
