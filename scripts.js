let select = document.createElement("select");

const cities = {
    709930: 'Dnipro',
    703448: 'Kyiv',
    2643743: 'London',
    6359304: 'Madrid',
    4164138: 'Miami',
    5128581: 'New York',
    2968815: 'Paris',
    3169070: 'Rome',
    6167865: 'Toronto'
}

for (let key in cities){
    let option = document.createElement('option');
    option.value = key;
    option.textContent = cities[key];
    select.append(option);
}

document.querySelector('.select-block').append(select);
select.id = 'city';
select.style.margin = "20px";
select.style.fontSize = "16px";

const param = {
	"url" : "https://api.openweathermap.org/data/2.5/",
	"appid" : "448ad8375750c4abfd2b2d245f048735"
}

function getWeather (){
    const cityId = document.querySelector('#city').value;

    fetch(`${param.url}weather?id=${cityId}&units=metric&APPID=${param.appid}`)
    .then(weather => {
            return weather.json();
        }).then(showWeather);
    }

function showWeather (data){
    console.log(data);

    document.querySelector('#city').onchange = getWeather;
    document.querySelector('.cityName-out').textContent = data.name;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '&deg;';
    document.querySelector('.icon-out').innerHTML = `<img src = "https://openweathermap.org/img/wn/${data.weather[0]['icon']}@2x.png">`;
    document.querySelector('.description-out').innerHTML = data.weather[0]["description"].toUpperCase();

    let windDegree = data.wind.deg;
    console.log(windDegree);

    let out = document.querySelector('.wind-deg');

    switch (true){
        case windDegree == 0 || windDegree == 360:
            out.innerHTML = "North";
            break;
        case windDegree > 0 && windDegree < 90:
            out.innerHTML = "North-East";
            break;
        case windDegree == 90:
            out.innerHTML = "East";
            break;
        case windDegree > 90 && windDegree < 180:
            out.innerHTML = "South-East";
            break;
        case windDegree == 180:
            out.innerHTML = "South";
            break;
        case windDegree > 180 && windDegree < 270:
            out.innerHTML = "South-West";
            break;
        case windDegree == 270:
            out.innerHTML = "West";
            break;
        case windDegree > 270 && windDegree < 360:
            out.innerHTML = "North-West";
    }

    document.querySelector('.wind-speed').innerHTML = `${data.wind.speed} km/h`;
    document.querySelector('.pressure').innerHTML = `${data.main.pressure} mbar`;
}

getWeather ();