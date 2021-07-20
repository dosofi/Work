let dat = new Date();
let month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
let day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
console.log(dat);
console.log(day[dat.getDay()] + ' ' + dat.getFullYear() + ' ' + month[dat.getMonth()]);

//  ----------------ЛЕВАЯ СТОРОНА------------
document.querySelector('#city').addEventListener('change', getweather)
function getweather() {
    fetch(`http://api.openweathermap.org/data/2.5/weather?id=${this.value}&appid=f8fcf592269620f9a396ae213fbe2437`)
        .then(function (resp) { return resp.json() })
        .then(function (data) {
            console.log(data);
            //  -----------------ПОГОДА----------
            document.querySelector('.date').innerHTML = `${day[dat.getDay()]} ${dat.getDate()} ${month[dat.getMonth()]} ${dat.getFullYear()}`;
            document.querySelector('.temp').innerHTML = `<img src="https://img.icons8.com/clouds/50/000000/fahrenheit-symbol.png"/> ${Math.round(data.main.temp - 273)}&deg; TEMP`;
            document.querySelector('.description').innerHTML = `<img src="https://img.icons8.com/plasticine/50/000000/fog-night--v2.${data.weather[0]['icon']}.png"> ${data.weather[0]['description']}`;
            document.querySelector('.fell').innerHTML = `<img src="https://img.icons8.com/clouds/50/000000/fahrenheit-symbol.png"/> ${Math.round(data.main.feels_like - 273)}&deg; FELL LIKE`;
            document.querySelector('.pressure').innerHTML = `<img src="https://img.icons8.com/office/50/000000/barometer.png"/> ${Math.round(data.main.pressure * 0.75)} mmHg`;
            document.querySelector('.speedWind').innerHTML = `<img src="https://img.icons8.com/ultraviolet/50/000000/wind-speed-43-47.png"/> ${Math.round(data.wind.speed)} m/s`;
            let timeSunrise = new Date(data.sys.sunrise * 1000 + dat.getTimezoneOffset() * 60 * 1000 + data.timezone * 1000);
            document.querySelector('.sunrice').innerHTML = `<img src="https://img.icons8.com/doodle/50/000000/summer.png"/> ${timeSunrise.getHours().toString().padStart(2, 0)}:${timeSunrise.getMinutes().toString().padStart(2, 0)} SUNRICE`;
            let timeSunset = new Date(data.sys.sunset * 1000 + dat.getTimezoneOffset() * 60 * 1000 + data.timezone * 1000);
            document.querySelector('.sunset').innerHTML = `<img src="https://img.icons8.com/wired/50/000000/summer.png"/> ${timeSunset.getHours().toString().padStart(2, 0)}:${timeSunset.getMinutes().toString().padStart(2, 0)} SUNSET`;
            //   -------------------СТРЕЛКА------------------------
            let arrow = document.querySelector('.arrow');
            let div = document.createElement('div');
            div.innerHTML = `<img src="https://img.icons8.com/doodle/50/000000/thick-arrow-pointing-down.png"/>`;
            div.classList.add('ar');
            arrow.prepend(div);
            div.style.transform = wind(data.wind.deg);

        })
        .catch(function () {
            // catch any errors
        });
}
getweather.apply(document.querySelector('#city'));

// -------ХОТЕЛ СДЕЛАТЬ СЛАЙДЕР С ПРОГНОЗОМ НА 5 ДНЕЙ НО НЕ ПОЛУЧИЛОСЬ(((((((
document.querySelector('#city').addEventListener('change', forecast);
function forecast() {
    const cityIdSl = document.querySelector('#city').value;
    fetch(`http://api.openweathermap.org/data/2.5/forecast?id=${this.value}&appid=f8fcf592269620f9a396ae213fbe2437`)
        .then(function (resp) { return resp.json() })
        .then(function (data) {
            console.log(data);
            let tempTime;
            for (key in data.list) {
                if (key % 2 == 0) { slider[key].style.background = 'rgba(255, 255, 255, 0.26)' }
                tempTime = timeF(data.list[key].dt);
                document.querySelector('.sliderDay').innerHTML = `${tempTime.getDate().toString().padStart(2, 0)} ${monthMy[tempTime.getMonth()]}`;
                document.querySelector('.sliderTemp').innerHTML = `${Math.round(data.list[key].main.temp - 273)}&deg;`;
            }
            // -----------------SLIDER---------------
            let slider = document.querySelector('.slader-line');
            let buttonNext = document.createElement('button');
            buttonNext.textContent = 'NEXT';
            buttonNext.classList.add('carousel-control-next');
            slider.append(buttonNext);
            let buttonPrev = document.createElement('button');
            buttonPrev.textContent = 'Prev';
            buttonPrev.classList.add('carousel-control-prev');
            slider.prepend(buttonPrev)

            let offset = 0;
            const sliderLine = document.querySelector('.slider-line');
            document.querySelector('.carousel-control-next').addEventListener('click', function () {
                offset += 128;
                if (offset > 384) {
                    offset = 0;
                }
                sliderLine.style.left = -offset + 'px';
            })
            document.querySelector('.carousel-control-prev').addEventListener('click', function () {
                offset -= 128;
                if (offset < 0) {
                    offset = 384;
                }
                sliderLine.style.left = -offset + 'px';
            })


        })
        .catch(function () {
            // catch any errors
        });
}
forecast.apply(document.querySelector('#city'));

//   ------------------ПРАВАЯ СТОРОНА------------

function getweather2() {
    const cityId2 = document.querySelector('#city2').value;

    fetch(`http://api.openweathermap.org/data/2.5/weather?id=${cityId2}&appid=f8fcf592269620f9a396ae213fbe2437`)
        .then(function (resp) { return resp.json() })
        .then(function (data) {
            console.log(data);
            document.querySelector('.date2').innerHTML = `${day[dat.getDay()]} ${dat.getDate()} ${month[dat.getMonth()]} ${dat.getFullYear()}`;
            document.querySelector('.temp2').innerHTML = `<img src="https://img.icons8.com/clouds/50/000000/fahrenheit-symbol.png"/> ${Math.round(data.main.temp - 273)}&deg; TEMP`;
            document.querySelector('.description2').innerHTML = `<img src="https://img.icons8.com/plasticine/50/000000/fog-night--v2.${data.weather[0]['icon']}.png"> ${data.weather[0]['description']}`;
            document.querySelector('.fell2').innerHTML = `<img src="https://img.icons8.com/clouds/50/000000/fahrenheit-symbol.png"/> ${Math.round(data.main.feels_like - 273)}&deg; FELL LIKE`;
            document.querySelector('.pressure2').innerHTML = `<img src="https://img.icons8.com/office/50/000000/barometer.png"/> ${Math.round(data.main.pressure * 0.75)} mmHg`;
            document.querySelector('.speedWind2').innerHTML = `<img src="https://img.icons8.com/ultraviolet/50/000000/wind-speed-43-47.png"/> ${Math.round(data.wind.speed)} m/s`;
            let timeSunrise = new Date(data.sys.sunrise * 1000 + dat.getTimezoneOffset() * 60 * 1000 + data.timezone * 1000);
            document.querySelector('.sunrise2').innerHTML = `<img src="https://img.icons8.com/doodle/50/000000/summer.png"/> ${timeSunrise.getHours().toString().padStart(2, 0)}:${timeSunrise.getMinutes().toString().padStart(2, 0)} SUNRICE`;
            let timeSunset = new Date(data.sys.sunset * 1000 + dat.getTimezoneOffset() * 60 * 1000 + data.timezone * 1000);
            document.querySelector('.sunset2').innerHTML = `<img src="https://img.icons8.com/wired/50/000000/summer.png"/> ${timeSunset.getHours().toString().padStart(2, 0)}:${timeSunset.getMinutes().toString().padStart(2, 0)} SUNSET`;
            let arrow2 = document.querySelector('.arrow2');
            let div2 = document.createElement('div');
            div2.innerHTML = `<img src="https://img.icons8.com/doodle/50/000000/thick-arrow-pointing-down.png"/>`;
            div2.classList.add('ar2');
            arrow2.prepend(div2);
            div2.style.transform = wind(data.wind.deg);

        })
        .catch(function () {
            // catch any errors
        });
}
getweather2()
document.querySelector('#city2').onchange = getweather2;

function wind(deg) {
    return `rotate(${deg}deg)`;
}

function timeF(b) {
    return new Date(b * 1000)
}
