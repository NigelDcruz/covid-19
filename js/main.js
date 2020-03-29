// Gets All global cases
let allCaseNo = document.getElementById("allCaseNo");
let recoveredCaseNo = document.getElementById("recoveredCaseNo");
let deathCaseNo = document.getElementById("deathCaseNo");

// Get the CovidChart canvas element
let covidChart = document.getElementById("covidCasesChart").getContext("2d");

// ==================================================================================

//Replace Valuse
let handleReplaceAllCasesValues = (all, recovered, death) => {
  allCaseNo.innerText = all;
  recoveredCaseNo.innerText = recovered;
  deathCaseNo.innerText = death;
};

// Renders All Cases
let renderCovidChart = (all, recovered, death) => {
  //Covid Chart
  let donut = new Chart(covidChart, {
    // The type of chart we want to create
    type: "doughnut",

    // The data for our dataset
    data: {
      labels: ["All Cases", "Recovered Cases", "Death Cases"],
      datasets: [
        {
          label: "Covid-19 Cases",
          borderColor: "rgba(0,0,0)",
          backgroundColor: [
            "rgba(136,136,136,1)",
            "rgba(0,255,0,1)",
            "rgba(255,0,0,1)"
          ],
          data: [all, recovered, death]
        }
      ]
    },
    options: {
      //changing legends styles
      legend: {
        labels: {
          fontSize: 25,
          padding: 50
        }
      },
      //tooltips styles
      tooltips: {
        bodyFontSize: 30
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
