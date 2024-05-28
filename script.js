const countriesContainer = document.querySelector(".countries-container");
const filter = document.querySelector(".filter");
const input = document.querySelector(".input");
const themechange = document.querySelector(".theme-change");
const icon = document.querySelector("#icon");
const span = document.querySelector(".theme-change span");

let allCountryData;

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    render(data);
    allCountryData = data;
    // console.log(allCountryData);
  });

filter.addEventListener("change", (e) => {
  fetch(`https://restcountries.com/v3.1/region/${e.target.value}`)
    .then((res) => res.json())
    .then(render);
});

function render(data) {
  countriesContainer.innerHTML = "";
  data.forEach((country) => {
    // console.log(country);

    const card = document.createElement("a");
    card.classList.add("country-card");
    card.href = `/country.html?name=${country.name.common}`;

    const cardHTML = `<img src=${country.flags.svg} alt="${
      country.name.common
    } flag" />
                      <div class="card-text">
                        <h3 class="card-title">${country.name.common}</h3>
                        <p><b>Population: </b>${country.population.toLocaleString(
                          "en-IN"
                        )}</p>
                        <p><b>Region: </b>${country.region}</p>
                        <p><b>Capital: </b>${country.capital?.[0]}</p>
                      </div>`;

    card.innerHTML = cardHTML;
    countriesContainer.append(card);
  });
}

input.addEventListener("input", (e) => {
  const filteredcountry = allCountryData.filter((country) =>
    country.name.common.toLowerCase().includes(e.target.value.toLowerCase())
  );

  // console.log(filteredcountry);

  render(filteredcountry);
});

themechange.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  icon.classList.toggle("fa-sun");

  if (span.innerText == "Dark Mode") {
    icon.classList.remove("fa-moon");
    span.innerText = "Light Mode";
  } else if (span.innerText == "Light Mode") {
    icon.classList.add("fa-moon");
    span.innerText = "Dark Mode";
  }
});
