const countryInput = document.querySelector('.form-control'),
    showData = document.getElementById('show__statistics'),
    showDate = document.getElementById('Date'),
    failMessage = document.getElementById('message'),
    searchInput = document.getElementById('search');




searchInput.addEventListener('click', () => {

    const countryName = countryInput.value;
    const matchingName = () => {
        return countryName.charAt(0).toUpperCase() + countryName.slice(1)
    }
    const finalName = matchingName();

    fetch("https://api.covid19api.com/summary")
        .then(response => response.json())
        .then(data => {
            console.log(data)
            data["Countries"].shift(0)
            console.log(data)
            data["Countries"].forEach(({ Country, NewConfirmed, TotalConfirmed, NewDeaths, TotalDeaths, NewRecovered, TotalRecovered }) => {
                if (Country.toUpperCase() === finalName.toUpperCase()) {
                    showData.innerHTML = `				
				<td>${Country}</td>
				<td>${TotalConfirmed}</td>
				<td>${NewConfirmed}</td>
				<td>${NewDeaths}</td>
				<td>${TotalDeaths}</td>
				<td>${NewRecovered}</td>
				<td>${TotalRecovered}</td>
				`;
                    // failMessage.textContent = 'Country Found'
                    const date = data["Date"];
                    const newDate = date.slice(0, 10)
                    console.log(newDate)
                    showDate.textContent = `The Date of this Statistics (${newDate})`
                } else {
                    // failMessage.textContent = "Country Not Found"
                }
            })

        })

})