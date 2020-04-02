let countrySearchButton = document.getElementById("countrySearchButton");
let userCountryInput = document.getElementById("userCountryInput");

countrySearchButton.onclick = () => {
	let countryName = userCountryInput.value;
	countryName = countryName.toLowerCase();
	// alert(countryName);
};
