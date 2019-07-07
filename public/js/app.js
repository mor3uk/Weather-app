let weatherForm = document.weather_form;
let locationInput = weatherForm.location;
let forecastMessage = document.getElementById('forecast');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    forecastMessage.textContent = 'Loading...';

    let location = locationInput.value;

    fetch(`/weather?adress=${location}`).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                return forecastMessage.textContent = data.error;
            }
            
            forecastMessage.innerHTML = data.location + '<br />' + data.forecast;
        });
    });
});