// Gets All global cases
let allCaseNo = document.getElementById("allCaseNo");
let recoveredCaseNo = document.getElementById("recoveredCaseNo");
let deathCaseNo = document.getElementById("deathCaseNo");

// Form inputs
let selectCountry = document.getElementById("selectCountry");
let submitCountry = document.getElementById("submitCountry");

// Get the CovidChart canvas element
let chartContainer = document.getElementById("chart-container");
let covidChart = document.getElementById("covidCasesChart").getContext("2d");

// Helper Functions ================================================================

function numberWithCommas(x) {
	return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

// ==================================================================================

//Replace Valuse
let handleReplaceAllCasesValues = (all, recovered, death) => {
	all = numberWithCommas(all);
	recovered = numberWithCommas(recovered);
	death = numberWithCommas(death);

	allCaseNo.innerText = all;
	recoveredCaseNo.innerText = recovered;
	deathCaseNo.innerText = death;
};

// Renders All Cases
let renderCovidChart = (all, recovered, death) => {
	//Covid Chart
	let donut = new Chart(covidChart, {
		// The type of chart we want to create
		type: "bar",

		// The data for our dataset
		data: {
			labels: ["All Cases", "Recovered Cases", "Death Cases"],
			datasets: [
				{
					label: "Covid-19 Cases",
					borderColor: "rgba(0,0,0)",
					backgroundColor: ["#86c6be", "#a6c64c", "#c80003"],
					data: [all, recovered, death]
				}
			]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,

			//changing legends styles
			legend: {
				labels: {
					fontSize: 25,
					padding: 20,
					boxWidth: 0
				}
			},
			//tooltips styles
			tooltips: {
				bodyFontSize: 25,
				callbacks: {
					label: function(tooltipItem) {
						return Number(tooltipItem.yLabel) + " Cases";
					},
					title: function() {}
				},
				displayColors: false
			},
			scales: {
				xAxes: [
					{
						gridLines: {
							display: false
						},
						ticks: {
							fontStyle: "bold"
						}
					}
				]
			}
		}
	});
};

// Clear Chart Container

let clearChart = () => {
	chartContainer.innerHTML = "";
	chartContainer.innerHTML = '<canvas id="covidCasesChart"></canvas>';
};

// ==================================================================================

// Fetch data for all covid-19 cases
(async () => {
	let data = await fetch("https://corona.lmao.ninja/all");

	let all = await data.json();

	let allCases = all.cases;
	let allDeaths = all.deaths;
	let allRecovered = all.recovered;

	//Replace the dom values
	handleReplaceAllCasesValues(allCases, allRecovered, allDeaths);

	//Draw Chart
	renderCovidChart(allCases, allRecovered, allDeaths);
})();

async function fetchAndPopulateCountries() {
	// fetch new data as per country

	let data = await fetch(`https://corona.lmao.ninja/countries`);

	let all = await data.json();

	console.log(all);

	function populateCountries(countryName) {
		// creates option tag
		let option = document.createElement("option");

		// Adds country name in option tag
		let country = document.createTextNode(`${countryName}`);

		// Appends country neme to the option tag
		option.appendChild(country);

		// Appends Option tag with list of countries to the select tag in the HTML file
		selectCountry.appendChild(option);
	}

	all.forEach(data => {
		populateCountries(data.country);
	});
}

fetchAndPopulateCountries();

async function renderNewData(country) {
	// fetch new data as per country

	let data = await fetch(`https://corona.lmao.ninja/countries/${country}`);

	let all = await data.json();

	console.log(all);

	let allCases = all.cases;
	let allDeaths = all.deaths;
	let allRecovered = all.recovered;

	//Draw Chart
	renderCovidChart(allCases, allRecovered, allDeaths);
}

//=========================================================================

submitCountry.addEventListener("click", () => {
	console.log(selectCountry.value);
	// clearChart();
	renderNewData(selectCountry.value);
});
