// Gets All global cases
let allCaseNo = document.getElementById("allCaseNo");
let recoveredCaseNo = document.getElementById("recoveredCaseNo");
let deathCaseNo = document.getElementById("deathCaseNo");

// Form inputs
let selectCountry = document.getElementById("selectCountry");
let submitCountry = document.getElementById("submitCountry");

// Table
let tableRow = document.getElementById("table-row");
let LoadingDiv = document.getElementById("LoadingDiv");

// Get the CovidChart canvas element
let chartContainer = document.getElementById("chart-container");


// Helper Functions ================================================================

function numberWithCommas(x) {
	return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

//Calculats the sum of an array
function sum(input) {

	if (toString.call(input) !== "[object Array]")
		return false;

	var total = 0;
	for (var i = 0; i < input.length; i++) {
		if (isNaN(input[i])) {
			continue;
		}
		total += Number(input[i]);
	}
	return total;
}

// Sorting array based on the countries
function compare(a, b) {

	// Use toUpperCase() to ignore character casing
	const bandA = a.country.toUpperCase();
	const bandB = b.country.toUpperCase();

	let comparison = 0;
	if (bandA > bandB) {
		comparison = 1;
	} else if (bandA < bandB) {
		comparison = -1;
	}

	return comparison;
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


// Smooth Scroll to sections

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
			behavior: 'smooth'
        });
    });
});


//Navigation Active class toggle
$(".navbar-nav .nav-link").on("click", function(){
	$(".navbar-nav").find(".active").removeClass("active");
	$(this).addClass("active");
  });

// Init Chart

function initChart(all, recovered, death, todayCases) {
	clearChart();
	let covidChart = document.getElementById("covidCasesChart").getContext("2d");
	//Covid Chart
	let donut = new Chart(covidChart, {
		// The type of chart we want to create
		type: "bar",

		// The data for our dataset
		data: {
			labels: ["All Cases", "Recovered Cases", "Death Cases", "Added Today"],
			datasets: [{
				label: "",
				borderColor: "rgba(0,0,0)",
				backgroundColor: ["#86c6be", "#a6c64c", "#c80003", "blue"],
				data: [all, recovered, death, todayCases]
			}]
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
					label: function (tooltipItem) {
						return Number(tooltipItem.yLabel) + " Cases";
					},
					title: function () {}
				},
				displayColors: false
			},
			scales: {
				xAxes: [{
					gridLines: {
						display: false
					},
					ticks: {
						fontStyle: "bold"
					}
				}]
			}
		}
	});

}

// Render Chart
let renderCovidChart = (all, recovered, death, todayCases) => {


	setTimeout(() => {

		initChart(all, recovered, death, todayCases);

	}, 10);

};

// Clear Chart Container

let clearChart = () => {
	chartContainer.innerHTML = "";
	chartContainer.innerHTML = '<canvas id="covidCasesChart"></canvas>';
};

//Populate Countries List

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

// Populate Tables

function populateTable(countryName, allCases, recovered, death, todayCases) {

	tableRow.innerHTML = "";
	setTimeout(() => {
		let tableTemplate = `<tr>
								<td>${countryName}</td>
								<td>${allCases}</td>
								<td>${recovered}</td>
								<td>${death}</td>
								<td>${todayCases}</td>
							</tr>`

		// Appends 
		// tableRow.insertAdjacentHTML("afterend",tableTemplate);
		tableRow.innerHTML += tableTemplate;
	}, 0);
}

// ==================================================================================

// Fetch data for all covid-19 cases
async function loadInitialData() {
	let data = await fetch("https://corona.lmao.ninja/all");

	let all = await data.json();

	let data2 = await fetch(`https://corona.lmao.ninja/countries`);
	let all2 = await data2.json();

	let allCases = all.cases;
	let allDeaths = all.deaths;
	let allRecovered = all.recovered;



	// All countries
	let addedTodayArray = [];
	let addedToday;

	all2.sort(compare);

	// Calculate Casses Added today
	all2.forEach(data => {
		//Render Table
		populateTable(data.country, data.cases, data.recovered, data.deaths, data.todayCases);
		addedTodayArray.push(data.todayCases);
		addedToday = sum(addedTodayArray);
	});

	//Replace the dom values
	handleReplaceAllCasesValues(allCases, allRecovered, allDeaths);

	//Draw Chart
	renderCovidChart(allCases, allRecovered, allDeaths, addedToday);

	var date = new Date(all.updated);
	document.getElementById("lastUpdated").innerHTML = date.toString();

};

loadInitialData();

async function fetchAndPopulateCountries() {
	// fetch new data as per country

	let data = await fetch(`https://corona.lmao.ninja/countries`);

	let all = await data.json();

	all.sort(compare);

	// loops and populates options in the dropdown
	all.forEach(data => {
		populateCountries(data.country);
	});


	// loops and populates Tables
	all.forEach((data, i) => {
		populateCountries(data.country);
		populateTable(data.country, data.cases, data.recovered, data.deaths, data.todayCases);
	});
}

fetchAndPopulateCountries();

// Loads All Countries on click
async function renderNewData(country) {
	// fetch new data as per country

	let data = await fetch(`https://corona.lmao.ninja/countries/${country}`);

	let all = await data.json();

	// console.log(all);

	let countryName = all.country;
	let allCases = all.cases;
	let allDeaths = all.deaths;
	let allRecovered = all.recovered;
	let todayCases = all.todayCases;

	//Draw Chart
	renderCovidChart(allCases, allRecovered, allDeaths, todayCases);

	//Render Table
	populateTable(countryName, allCases, allRecovered, allDeaths, todayCases);


}

//=========================================================================

// Filter Results on click
submitCountry.addEventListener("click", () => {

	if (selectCountry.value == 'All') {
		loadInitialData();
		return;
	}
	// clearChart();
	renderNewData(selectCountry.value);
});