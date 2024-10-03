// Weather Section
const myTown = document.querySelector("#town");
const myDescription = document.querySelector("#description");
const myTemperature = document.querySelector("#temperature");
const myGraphic = document.querySelector("#graphic");
const forecastList = document.querySelector("#forecast-list");

const myKey = "dfffe5cd679385389ccf74bd855f4f02";
const myLat = "-14.856789";
const myLong = "-40.840328";

// Current weather API URL
const myWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=metric`;

// 5-day forecast API URL
const myForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=metric`;

async function apiFetch() {
  try {
    // Fetch current weather data
    const weatherResponse = await fetch(myWeatherUrl);
    if (weatherResponse.ok) {
      const weatherData = await weatherResponse.json();
      console.log(weatherData);
      displayResults(weatherData);
    } else {
      throw Error(await weatherResponse.text());
    }

    // Fetch forecast data
    const forecastResponse = await fetch(myForecastUrl);
    if (forecastResponse.ok) {
      const forecastData = await forecastResponse.json();
      console.log(forecastData);
      displayForecast(forecastData);
    } else {
      throw Error(await forecastResponse.text());
    }
  } catch (error) {
    console.log(error);
  }
}

function capitalizeWords(str) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

function displayResults(data) {
  myTown.innerHTML = data.name;
  myDescription.innerHTML = capitalizeWords(data.weather[0].description);
  myTemperature.innerHTML = `${data.main.temp}°C`;
  const iconsrc = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  myGraphic.setAttribute("src", iconsrc);
  myGraphic.setAttribute("alt", capitalizeWords(data.weather[0].description));
}

function displayForecast(data) {
  forecastList.innerHTML = "";

  const dailyForecasts = data.list.filter((item) =>
    item.dt_txt.includes("12:00:00")
  ).slice(0, 3);

  dailyForecasts.forEach((forecast) => {
    const listItem = document.createElement("li");

    const date = new Date(forecast.dt_txt);
    const day = date.toLocaleDateString("en-US", { weekday: 'long' });
    const temp = `${forecast.main.temp}°C`;
    const iconSrc = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
    const description = capitalizeWords(forecast.weather[0].description);

    listItem.innerHTML = `
      <div class="forecast-card">
        <h4>${day}</h4>
        <img src="${iconSrc}" alt="${description}">
        <p>${description}</p>
        <p>${temp}</p>
      </div>
    `;

    forecastList.appendChild(listItem);
  });
}

apiFetch();

// Company Spotlights Section
const spotlightsContainer = document.querySelector("#company-spotlights");

// Fetch the JSON data from the file
async function loadCompanies() {
  try {
    const response = await fetch('data/members.json'); // Adjusted path and file name
    if (!response.ok) {
      throw new Error('Failed to load companies data');
    }
    const companies = await response.json();
    displaySpotlights(companies);
  } catch (error) {
    console.error('Error fetching companies data:', error);
  }
}

// Function to get a random subset of companies
function getRandomCompanies(companies, count) {
    const qualifiedCompanies = companies.filter(company => company.membershipLevel >= 2);
    const shuffled = [...qualifiedCompanies].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Function to display the company spotlights
function displaySpotlights(companies) {
    const randomCompanies = getRandomCompanies(companies, 3);

    randomCompanies.forEach(company => {
        const spotlight = document.createElement('div');
        spotlight.classList.add('spotlight');

        spotlight.innerHTML = `
            <h3>${company.name}</h3>
            <img src="${company.image}" alt="${company.name}">
            <p><strong>Phone:</strong> ${company.phone}</p>
            <p><strong>Address:</strong> ${company.address}</p>
            <p><strong>Membership Level:</strong> ${company.membershipLevel === 3 ? 'Gold' : 'Silver'}</p>
            <a href="${company.website}" target="_blank">Visit Website</a>
        `;

        spotlightsContainer.appendChild(spotlight);
    });
}

// Call the function to load and display companies
loadCompanies();
