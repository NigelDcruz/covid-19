// Gets All global cases
let allCaseNo = document.getElementById("allCaseNo");
let recoveredCaseNo = document.getElementById("recoveredCaseNo");
let deathCaseNo = document.getElementById("deathCaseNo");

// Get the CovidChart canvas element
let covidChart = document.getElementById("covidCasesChart").getContext("2d");


// Helper Functions ================================================================

function numberWithCommas(x) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

// ==================================================================================

//Replace Valuse
let handleReplaceAllCasesValues = (all, recovered, death) => {
  all = numberWithCommas(all)
  recovered = numberWithCommas(recovered)
  death = numberWithCommas(death)

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
      datasets: [{
        label: "Covid-19 Cases",
        borderColor: "rgba(0,0,0)",
        backgroundColor: [
          "#86c6be",
          "#a6c64c",
          "#c80003",
        ],
        data: [all, recovered, death]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,

      //changing legends styles
      legend: {
        labels: {
          fontSize: 25,
          padding: 20
        }
      },
      //tooltips styles
      tooltips: {
        bodyFontSize: 25
      }
    }
  });
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