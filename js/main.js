const countryInput = document.querySelector(".form-control"),
    showData = document.getElementById("show__statistics"),
    showDate = document.getElementById("Date"),
    failMessage = document.getElementById("message"),
    searchInput = document.getElementById("search");

searchInput.addEventListener("click", () => {
    const countryName = countryInput.value;
    fetch("https://api.covid19api.com/summary")
        .then(response => response.json())
        .then(data => {
            const date = data["Date"];
            const newDate = date.slice(0, 10);
            showDate.textContent = `The Date of this Statistics (${newDate})`;
        });

    fetch("https://corona.lmao.ninja/countries")
        .then(response => response.json())
        .then(data => {
            data.forEach(
                ({
                    country,
                    todayCases,
                    cases,
                    countryInfo,
                    todayDeaths,
                    deaths,
                    active,
                    recovered
                }) => {
                    if (country.toUpperCase() === countryName.toUpperCase()) {
                        showData.innerHTML = `				
				<td>${country} <img style= width = '30px' ; height = '30px' src="${
              countryInfo.flag
            }"/></td>
				<td>${cases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
				<td>${todayCases.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
				<td>${todayDeaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
				<td style="color: #F48FB1;">${deaths.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
				<td>${active.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
				<td>${recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                `;

                        // failMessage.textContent = "Country Found";
                    } else {
                        // failMessage.textContent = "Country Not Found";
                    }
                }
            );
        });
});