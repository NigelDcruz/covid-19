// Gets All global cases

let allCaseNo = document.getElementById("allCaseNo");
let recoveredCaseNo = document.getElementById("recoveredCaseNo");
let deathCaseNo = document.getElementById("deathCaseNo");

(async () => {
	let data = await fetch("https://corona.lmao.ninja/all");

	let all = await data.json();

	let allCases = all.cases;
	let allDeaths = all.deaths;
	let allRecovered = all.recovered;

	allCaseNo.innerText = allCases;
	recoveredCaseNo.innerText = allRecovered;
	deathCaseNo.innerText = allDeaths;
})();
