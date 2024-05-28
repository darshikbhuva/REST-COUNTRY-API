const countryName = new URLSearchParams(location.search).get("name");
const flagImg = document.querySelector(".country-details img");
const countryheading = document.querySelector(".country-details h1");
const population = document.querySelector(".population");
const nativeName = document.querySelector(".native-name");
const region = document.querySelector(".region");
const subRegion = document.querySelector(".sub-region");
const capital = document.querySelector(".capital");
const currencies = document.querySelector(".currencies");
const languages = document.querySelector(".languages");
const TopLevelDomain = document.querySelector(".top-level-domain");
const borderCountry = document.querySelector(".border-countries");
const themechange = document.querySelector(".theme-change");
const icon = document.querySelector("#icon");
const span = document.querySelector(".theme-change span");

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
    console.log(country);
    flagImg.src = country.flags.svg;
    countryheading.innerText = country.name.common;
    population.innerText = country.population.toLocaleString("en-IN");
    region.innerText = country.region;
    TopLevelDomain.innerText = country.tld.join(", ");

    if (country.capital) {
      capital.innerText = country.capital?.[0];
    }

    if (country.subregion) {
      subRegion.innerText = country.subregion;
    }

    if (country.name.nativeName) {
      nativeName.innerText = Object.values(country.name.nativeName)[0].common;
    } else {
      nativeName.innerText = country.name.common;
    }

    if (country.currencies) {
      currencies.innerText = Object.values(country.currencies)
        .map((currency) => currency.name)
        .join(", ");
    }

    if (country.languages) {
      languages.innerText = Object.values(country.languages).join(", ");
    }

    if (country.borders) {
      country.borders.forEach((border) => {
        // console.log(border);
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountryName]) => {
            const borderCountriesTag = document.createElement("a");
            borderCountriesTag.innerText = borderCountryName.name.common;
            borderCountriesTag.href = `country.html?name=${borderCountryName.name.common}`;
            console.log(borderCountriesTag);
            borderCountry.append(borderCountriesTag);
          });
      });
    }
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
