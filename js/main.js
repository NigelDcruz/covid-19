// Gets All global cases
let allCaseNo = document.getElementById("allCaseNo");
let recoveredCaseNo = document.getElementById("recoveredCaseNo");
let deathCaseNo = document.getElementById("deathCaseNo");
let dataFor = document.getElementById("dataFor");
let byGraphdata = document.getElementById("byGraphdata");

// Form inputs
let selectCountry = document.getElementById("selectCountry");
let submitCountry = document.getElementById("submitCountry");
// let selectCountryOpptions = document.getElementsByClassName("selectCountryOpptions");

// Table
let tableRow = document.getElementById("table-row");
let LoadingDiv = document.getElementById("LoadingDiv");

// Get the CovidChart canvas element
let chartContainer = document.getElementById("chart-container");


// Helper Functions ================================================================


function numberWithCommas(amount) {
	var delimiter = ","; // replace comma if desired

	amount = amount + '.00'

	var a = amount.split('.', 2)
	var d = a[1];
	var i = parseInt(a[0]);
	if (isNaN(i)) {
		return '';
	}
	var minus = '';
	if (i < 0) {
		minus = '-';
	}
	i = Math.abs(i);
	var n = new String(i);
	var a = [];
	while (n.length > 3) {
		var nn = n.substr(n.length - 3);
		a.unshift(nn);
		n = n.substr(0, n.length - 3);
	}
	if (n.length > 0) {
		a.unshift(n);
	}
	n = a.join(delimiter);
	if (d.length < 1) {
		amount = n;
	} else {
		amount = n + '.' + d;
	}
	amount = minus + amount;

	var a = amount.split('.', 2)
	return a[0];
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

let handleReplaceDataFor = (dataForText) => {
	dataFor.innerText = dataForText;
	byGraphdata.innerText = dataForText;
}

//   Search FAQs Filter
$("#accordion_search_bar").on("keyup", function () {
	var value = $(this).val().toLowerCase();

	if(value.length <= 1){
		$(this).removeClass('show');
	}
	
	$("#accordion .card").filter(function () {
		console.log($(this).text().toLowerCase().indexOf(value) > -1);

		if($(this).text().toLowerCase().indexOf(value) > -1){
			
			$(this).show().addClass('there');
			
		} else {
			$(this).hide().removeClass('there');
			
		}
		
		// $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
	});

	if($("#accordion .card.there").length < 1){
		$('.noRelult').addClass('show')
	}else{
		$('.noRelult').removeClass('show');
	}
	
	
});

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
$(".navbar-nav .nav-link").on("click", function () {
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
				barPercentage: 0.5,
				label: "",
				borderColor: "rgba(0,0,0)",
				backgroundColor: ["#40ffc3", "#c9f941", "#f93030", "blue"],
				data: [all, recovered, death, todayCases]
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			Bar: 0.8,
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

						// console.log()
						return numberWithCommas(tooltipItem.yLabel);
					},
					title: function () {}
				},
				displayColors: false
			},
			scales: {
				// xAxes: [{
				// 	gridLines: {
				// 		display: false
				// 	},
				// 	ticks: {
				// 		fontStyle: "bold"
				// 	}
				// }],
				yAxes: [{
					gridLines: {
						display: false,
					},
					ticks: {
						fontStyle: "bold"
					}
				}]
			}
		}
	});

}

function generateAnyChart(all, recovered, death, todayCases, type) {

	clearChart();
	let covidChart = document.getElementById("covidCasesChart").getContext("2d");
	//Covid Chart
	let chart = new Chart(covidChart, {
		// The type of chart we want to create
		type: `${type}`,

		// The data for our dataset
		data: {
			labels: ["All Cases", "Recovered Cases", "Death Cases", "Added Today"],
			datasets: [{
				barPercentage: 0.5,
				label: "",
				borderColor: "rgba(0,0,0)",
				backgroundColor: ["#86c6be", "#a6c64c", "#c80003", "blue"],
				data: [all, recovered, death, todayCases]
			}]
		},
		options: {
			responsive: true,
			maintainAspectRatio: false,
			Bar: 0.8,
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

						// console.log()
						return numberWithCommas(tooltipItem.yLabel);
					},
					title: function () {}
				},
				displayColors: false
			},
			scales: {
				// xAxes: [{
				// 	gridLines: {
				// 		display: false
				// 	},
				// 	ticks: {
				// 		fontStyle: "bold"
				// 	}
				// }],
				yAxes: [{
					gridLines: {
						display: false,
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
	initChart(all, recovered, death, todayCases);
};

// Clear Chart Container

let clearChart = () => {
	chartContainer.innerHTML = "";
	chartContainer.innerHTML = '<canvas id="covidCasesChart"></canvas>';
};

//Populate Countries List

function populateCountries(countryName) {

	// console.log( $('option').length == 210);

	if ($('option').length == 210) {
		return;
	}


	// creates option tag
	let option = document.createElement("option");

	let attrClass = document.createAttribute("class"); // Create a "class" attribute
	attrClass.value = "selectCountryOpptions"; // Set the value of the class attribute
	option.setAttributeNode(attrClass); // Add the class attribute

	let attrValue = document.createAttribute("value"); // Create a "class" attribute
	attrValue.value = `${countryName}`; // Set the value of the class attribute
	option.setAttributeNode(attrValue); // Add the class attribute



	// Adds country name in option tag
	let country = document.createTextNode(`${countryName}`);

	// Appends country neme to the option tag
	option.appendChild(country);

	// Appends Option tag with list of countries to the select tag in the HTML file
	selectCountry.appendChild(option);
}

// Populate Tables
function populateTable(countryName, allCases, recovered, death, todayCases, flagUrl) {

	tableRow.innerHTML = "";
	setTimeout(() => {
		let tableTemplate = `<tr>
								<td> <img src="${flagUrl}" alt="${countryName}"/>${countryName}</td>
								<td class="color-neutral">${numberWithCommas(allCases)}</td>
								<td class="color-green">${numberWithCommas(recovered)}</td>
								<td class="color-red">${numberWithCommas(death)}</td>
								<td class="color-today">${numberWithCommas(todayCases)}</td>
							</tr>`

		// Appends 
		// tableRow.insertAdjacentHTML("afterend",tableTemplate);
		tableRow.innerHTML += tableTemplate;
	}, 0);
}

// ==================================================================================

// Fetch data for all covid-19 cases
async function loadInitialData() {
	let dataFor = 'All Countries'
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
		populateTable(data.country, data.cases, data.recovered, data.deaths, data.todayCases, data.countryInfo.flag );
		addedTodayArray.push(data.todayCases);
		addedToday = sum(addedTodayArray);
	});

	//Replace the dom values
	handleReplaceAllCasesValues(allCases, allRecovered, allDeaths);

	//Replace Data For
	handleReplaceDataFor(dataFor);

	//Draw Chart
	renderCovidChart(allCases, allRecovered, allDeaths, addedToday);

	var date = new Date(all.updated);

	const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

	let year = date.getFullYear();
	let month = monthNames[date.getMonth()];;
	let todayDate = date.getDate();

	let time = new Intl.DateTimeFormat('default',
	{
		hour12: true,
		hour: 'numeric',
		minute: 'numeric'
	}).format(date);


	document.getElementById("lastUpdated").innerHTML = `${todayDate } ${month } ${year} at ${time}`;


	// loops and populates options in the dropdown
	all2.forEach(data => {
		populateCountries(data.country);
	});


};

loadInitialData();

//=========================================================================

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
	populateTable(countryName, allCases, allRecovered, allDeaths, todayCases, all.countryInfo.flag);


}


// Filter results on select option
$('#selectCountry').on('change', function () {

	if (selectCountry.value == 'All') {
		let dataFor = 'All Countries'
		loadInitialData();
		handleReplaceDataFor(dataFor);
		return;
	}
	handleReplaceDataFor(selectCountry.value)
	renderNewData(selectCountry.value);

});