let weather = {
    "apiKey": 'f5dbcbd1304d373c965e0201491e022d',
    fetchWeather: function (city){
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`)
        .then(response => response.json())
        .then(data => this.displayWeather(data));
    },
    displayWeather: function(data){
        const { name } = data;
        const { icon, description} = data.weather[0];
        const { temp, humidity} = data.main;
        const { speed } = data.wind;
        document.querySelector('.city').innerText = `Weather in ${name}`;
        document.querySelector('.icon').src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
        document.querySelector('.description').innerText = description;
        document.querySelector('.temp').innerText = `${temp}°C`;
        document.querySelector('.humidity').innerText = `Humidiy: ${humidity}%`;
        document.querySelector('.wind').innerText = `Wind speed: ${speed}km/h`;
        document.querySelector('.weather').classList.remove('loading');
        document.body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name}')`;
    },
    search: function(){
        this.fetchWeather(document.querySelector('.search-bar').value);
    }
}


document.querySelector('.search button').addEventListener('click', () => {
    weather.search()
});

document.querySelector('.search-bar').addEventListener('keyup', e => {
    if(e.key === 'Enter'){
        weather.search();
    }
})

weather.fetchWeather('New York');