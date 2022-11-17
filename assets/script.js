const apiKey = 'e52c76c9089a7e5e7bc886dc73ea2beb';

const getFetch = (url, success) => {
    fetch(url, {
        method: 'GET', //GET is the default.
        credentials: 'same-origin', // include, *same-origin, omit
        redirect: 'follow', // manual, *follow, error
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            success(data);
        })
};

const getWeather = (city) => {
    if (localStorage)
    localStorage.setItem(`city-${localStorage.length}`, city);
    getFetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`,
        (geoData) => {
            if (geoData.length > 0) {
                getFetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${geoData[0].lat}&lon=${geoData[0].lon}&appid=${apiKey}`,
                    (weatherData) => {
                       populateSavedCityList();
                       console.log(weatherData);
                    });
            }
        });
};

const searchClick = () => {
    let city = $('#user-input').val();
    getWeather(city);
};

const populateSavedCityList = () => {
    let searchList = $('#search-list');
    let cityList = '';
    for (let index = 0; index < localStorage.length; index++) {
        const city = localStorage.getItem(`city-${index}`);
        cityList += `<button onclick="getWeather('${city}')">${city}</button>`;
    }
    searchList.html(cityList);
};

const init = () => {
    populateSavedCityList();
};

init();