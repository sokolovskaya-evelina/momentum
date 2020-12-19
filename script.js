// DOM Elements

const clock = document.querySelector(".clock"),
      date = document.querySelector(".date"),
      greeting = document.querySelector(".greeting"),
      name = document.querySelector(".name"),
      focus = document.querySelector(".focus"),
      weatherIcon = document.querySelector(".weather-icon"),
      temperature = document.querySelector(".temperature"),
      weatherDescription = document.querySelector(".weather-discription"),
      city = document.querySelector(".city"),
      windSpeed = document.querySelector(".windSpeed"),
      humidity = document.querySelector(".humidity"); 
const Months = {
    0: "Января",
    1: "Февраля",
    2: "Марта",
    3: "Апреля",
    4: "Мая",
    5: "Июня",
    6: "Июля",
    7: "Августа",
    8: "Сентября",
    9: "Октября",
    10: "Ноября",
    11: "Декабря",
      };
      
const Days = {
    1: "Понедельник",
    2: "Вторник",
    3: "Среда",
    4: "Четверг",
    5: "Пятница",
    6: "Суббота",
    0: "Воскресенье",
      };

//--------Загрузка-------

let loader = document.querySelector(".loader");

window.addEventListener("load", () => {
  loader.classList.add("hide");
  setTimeout(() => {
    loader.remove();
  }, 600);
});

//-------Дата и время-----
const hours = document.querySelector(".hours");
const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");

function showTime() {
  let today = new Date(),
    year = today.getFullYear(),
    month = today.getMonth(),
    day = today.getDay(),
    dayOfMonth = today.getDate(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  if (min == 0 && sec == 0) setTimeout(setBgImage, 1000);

  // Output Time
  date.innerHTML = `${Days[day]}, ${dayOfMonth} ${Months[month]} ${year}`;
  hours.innerHTML = `${addZero(hour)}<span>:</span>`;
  minutes.innerHTML = `${addZero(min)}<span>:</span>`;
  seconds.innerHTML = `${addZero(sec)}`;
  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? "0" : "") + n;
}


// -----------------Создвние фона-------------------

//---Функции для создания массива фонов---

//Получение названия изображения
function getRandomImg() {
  let imgNum = Math.floor(Math.random() * 20) + 1; //получениие рандомного числа
  if(imgNum >= 10) { 
    return imgNum = `${imgNum}.jpg` //Если число вышло больше 10, то вернуть просто его
  } else {
    return imgNum = `0${imgNum}.jpg` //Если число меньше 10, то спереди добавить 0
  }
}

//Получение пути фонового изображения

let imgData = []; 
async function createImgData() {
  const base = "assets/images/"; //начало каждого пути
  //let imageSrc = '';
  for (let i = 0; i < 24; i++) { //От 0 до 24(сколько часов в сутках)
    if (i < 6) imgData[i] = base + "night/" + getRandomImg(); //до 6 утра ночные фоны
    else if (i < 12) imgData[i] = base + "morning/" + getRandomImg(); //с 6ти до 12ти утренние фоны
    else if (i < 18) imgData[i] = base + "day/" + getRandomImg(); //с 12ти до 18ти дневные фоны
    else imgData[i] = base + "evening/" + getRandomImg(); // с 18ти и до 0 вечерние фоны
  }
}
createImgData();


//Вставка фона
function setBgImage() {
  let today = new Date(),
    hour = today.getHours(); //В today передастся текущий час
  let src = imgData[hour]; 
  const img = document.createElement("img");
  img.src = src;
  img.onload = () => {
    document.body.style.backgroundImage = `url(${src})`;
  };
}

//--------------Создание кнопок-----------------

const btnNext = document.querySelector(".btnNext");
const btnLast = document.querySelector(".btnLast");
let index = new Date();
let numOfImg = index.getHours();

//Создание слайдера вперёд

btnNext.onclick = function () {    
  if (numOfImg < imgData.length - 1) { 
    let src = imgData[numOfImg + 1];
    const img = document.createElement("img");
    img.src = src;
    img.onload = () => {
      document.body.style.backgroundImage = `url(${src})`;
    };
    numOfImg++;
  } else {
    numOfImg = -1;
    let src = imgData[numOfImg + 1];
    const img = document.createElement("img");
    img.src = src;
    img.onload = () => {
      document.body.style.backgroundImage = `url(${src})`;
    };
  }
};

//Создание слайдера назад

btnLast.onclick = function () {
  if (numOfImg > 0) {
    let src = imgData[numOfImg - 1];
    const img = document.createElement("img");
    img.src = src;
    img.onload = () => {
      document.body.style.backgroundImage = `url(${src})`;
    };
    numOfImg--;
  } else {
    numOfImg = 24;
    let src = imgData[numOfImg - 1];
    const img = document.createElement("img");
    img.src = src;
    img.onload = () => {
      document.body.style.backgroundImage = `url(${src})`;
    };
    numOfImg--;
  }
};


//------------Создание приветствия в течении суток-------------
function setGreet() {
  let today = new Date();
  hour = today.getHours();
  if (hour < 6) {
    greeting.textContent = "Спокойной ночи, ";
  } else if (hour < 12) {
    greeting.textContent = "Доброе утро, ";
  } else if (hour < 18) {
    greeting.textContent = "Добрый день, ";
  } else {
    greeting.textContent = "Добрый вечер, ";
  }
}

//---------------Функции для работы с именем и целью-----------
//Получение имени

function getName() {
  if (localStorage.getItem("name") === null) {
    name.textContent = "[Введите имя]";
  } else {
    name.textContent = localStorage.getItem("name");
  }
}

//Очищение строки по щелчку 

let nameStorage = "";

function hiddenName(e) {
  localStorage.setItem("name", e.target.innerText);
  nameStorage = localStorage.getItem("name");
  if (e.type === "click") {
    name.textContent = "";
  }
}

// Работа с именем
function setName(e) {
  if (e.type === "keypress") {
    // Убеждаемся, что Enter нажат
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem("name", e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem("name", e.target.innerText);
  }
  if (localStorage.getItem("name") === "") {
    localStorage.setItem("name", e.target.innerText);
    name.textContent = nameStorage;
    localStorage.removeItem("name");
  }
}

// Получение цели

function getFocus() {
  if (localStorage.getItem("focus") === null) {
    focus.textContent = "[Введите цель]";
  } else {
    focus.textContent = localStorage.getItem("focus");
  }
}

//Очицение строки по щелчку

let focusStorage = "";

function hiddenFocus(e) {
  localStorage.setItem("focus", e.target.innerText);
  focusStorage = localStorage.getItem("focus");
  if (e.type === "click") {
    focus.textContent = "";
  }
}

// Работа с целью

function setFocus(e) {
  if (e.type === "keypress") {
    //Убеждаемся что нажат Enter
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem("focus", e.target.innerText);
      focus.blur();
    }
  } else {
    localStorage.setItem("focus", e.target.innerText);
  }
  if (localStorage.getItem("focus") === "") {
    localStorage.setItem("focus", e.target.innerText);
    focus.textContent = focusStorage;
    localStorage.removeItem("focus");
  }
}

//----------Цитаты----------

const blockquote = document.querySelector("blockquote");
const btn = document.querySelector(".btn");

//Вращение кнопки
btn.onclick = function () {
  let start = Date.now();

  let timer = setInterval(function () {
    let timePassed = Date.now() - start;

    btn.style.transform = `rotate(${timePassed}deg)`;

    if (timePassed > 180) clearInterval(timer);
  }, 20);
};

//Получение цитаты

async function getQuote() {  
  const url = `https://cors-anywhere.herokuapp.com/https://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=ru`;
  const res = await fetch(url);
  const data = await res.json(); 
  blockquote.textContent = data.quoteText;
}
document.addEventListener('DOMContentLoaded', getQuote);
btn.addEventListener('click', getQuote);

//-------------Погода----------

//Ввод города

function getCity() {
  if (
    localStorage.getItem("city") === null ||
    localStorage.getItem("city") == "[Введите город]"
  ) {
    city.textContent = "[Введите город]";
  } else {
    city.textContent = localStorage.getItem("city");
    getWeather();
  }
}

//Очищение поля при нажатии

let cityStorage = "";

function hiddenCity(e) {
  localStorage.setItem("city", e.target.innerText);
  cityStorage = localStorage.getItem("city");
  if (e.type === "click") {
    city.textContent = "";
  }
}

// Работа с локацией
function setCity(e) {
  if (e.code === "Enter") {
    localStorage.setItem("city", e.target.innerText);
    city.blur();
    getWeather();
  }
}

city.onblur = function () {
  getWeather();
};

//Получение прогноза погоды

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=ru&appid=5c8d78e2b51b8bf6f8fed60c4b31605d&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  if (city.textContent == "") {
    localStorage.setItem("city", cityStorage);
    city.textContent = localStorage.getItem("city");
  } else if (data.cod != 200) {
    alert("Пожалуйста, введите правильное название города");
    city.textContent = "[Введите город]";
    weatherIcon.className = "weather-icon owf";
    temperature.textContent = ``;
    weatherDescription.textContent = "";
    humidity.textContent = ``;
    windSpeed.textContent = ``;
  } else {
    weatherIcon.className = "weather-icon owf";
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.trunc(data.main.temp)}°C`;
    city.textContent = data.name;
    weatherDescription.textContent = data.weather[0].description;
    humidity.textContent = `Влажность ${data.main.humidity}%`;
    windSpeed.textContent = `Скорость ветра: ${data.wind.speed}м/с`;
  }
}

city.addEventListener("click", hiddenCity);
city.addEventListener("keypress", setCity);
city.addEventListener("blur", setCity);
name.addEventListener("click", hiddenName);
name.addEventListener("keypress", setName);
name.addEventListener("blur", setName);
focus.addEventListener("keypress", setFocus);
focus.addEventListener("blur", setFocus);
focus.addEventListener("click", hiddenFocus);

// Запуск функций
setBgImage();
setGreet();
showTime();
getName();
getFocus();
getCity();