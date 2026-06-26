let searchCity = document.querySelector(".search");
const key = "c6691f0b19e04e820ca9e69702923201";
let city,formatted_data;

searchCity.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        getWeather();
    }
});

function getWeather(){
    city = searchCity.value;
    searchCity.value = "";

    check();
  
}
let temperature;
async function check(){
    try
    {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;
        let reponse = await fetch(url);
        formatted_data = await reponse.json();
        if(formatted_data.cod == 404)
        {
            document.querySelector(".error_message").style.display = "flex";
            return;
        }
        temperature = formatted_data.main.temp;

        updateMainWeather();
        updateSunTimes();
        updateWeatherDetails();
        aqiWeather();
        next5days();
    }catch(error){
        console.log(error)
        
    }
    console.log(temperature);
}

async function aqiWeather() {
    let lon = formatted_data.coord.lon;
    let lat = formatted_data.coord.lat;
    try{
        const url = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${key}`;

        let data = await fetch(url);
        let proper_data = await data.json();
        if(proper_data.cod == 404)
        {
            document.querySelector(".error_message").style.display = "flex";
            return;
        }

        let co = proper_data.list[0].components.co;
        document.querySelector(".co_value").textContent = co;
        let so2 = proper_data.list[0].components.so2;
        document.querySelector(".so2_value").textContent = so2;
        let o3 = proper_data.list[0].components.o3;
        document.querySelector(".o3_value").textContent = o3 ;
        let no2 = proper_data.list[0].components.no2;
        document.querySelector(".no2_value").textContent = no2;
    }catch(error){
        console.log(error);
    }
}
async function next5days() {
    try {
        const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${key}`;
        const response = await fetch(url);
        const proper_data = await response.json();

        if (proper_data.cod == "404") {
            document.querySelector(".error_message").style.display = "flex";
            return;
        }

        const today = new Date().toISOString().split("T")[0];

const fiveDays = [];

for (const item of proper_data.list) {
    if (item.dt_txt.includes("12:00:00")) {
        fiveDays.push(item);
    }

    if (fiveDays.length === 5) break;
}

        const dayDetails = document.querySelectorAll(".daydetails");


        fiveDays.forEach((item, index) => {

            const icon = item.weather[0].icon;
            const temp = item.main.temp;
            const day = new Date(item.dt_txt).toLocaleDateString("en-US", {
                weekday: "long"
            });
            const date = item.dt_txt.split(" ")[0];

            dayDetails[index].querySelector(".daytemperature").textContent =
                `${temp.toFixed(1)} °C`;

            dayDetails[index].querySelector(".day").textContent = day;

            dayDetails[index].querySelector(".daydate").textContent = date;

            dayDetails[index].querySelector("img").src =
                `https://openweathermap.org/img/wn/${icon}@2x.png`;
        });


        // ---------- Today ----------
        const todayCards = document.querySelectorAll(".last_compoends");

        proper_data.list.slice(0, 5).forEach((item, index) => {

            const time = new Date(item.dt_txt).toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true
            });

            const [hour, period] = time.split(" ");

            todayCards[index].querySelector(".today_time").innerHTML =
                `${hour} <span>${period}</span>`;

            todayCards[index].querySelector(".today_temp").textContent =
                `${item.main.temp.toFixed(1)} °C`;

            todayCards[index].querySelector(".today_image img").src =
                `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`;
        });

    } catch (error) {
        console.log(error);
    }
}

function accept_cnf(){ //city not found
    document.querySelector(".error_message").style.display = "none";
}

function getDate(){
    let now = new Date();
    let date = now.toLocaleDateString();
    let time = now.toLocaleTimeString();

    document.querySelector("#date").textContent = date;
    document.querySelector("#time").textContent = time;
}

function convertUnixTime(unixTime) {
    return new Date(unixTime * 1000).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
    });
}

function updateMainWeather(){
    document.querySelector(".cityname").textContent = formatted_data.name;
    document.querySelector(".temperature").textContent = temperature + "°C";
    document.querySelector(".desc").textContent = formatted_data.weather[0].description;
}

function updateSunTimes(){
    let sunrise = convertUnixTime(formatted_data.sys.sunrise);
    document.querySelector(".rise_time").textContent = sunrise.split(" ")[0].slice(0,5);
    document.querySelector(".rise_period").textContent = sunrise.split(" ")[1];
    let sunset = convertUnixTime(formatted_data.sys.sunset);
    document.querySelector(".set_time").textContent =  sunset.split(" ")[0].slice(0,5);
    document.querySelector(".set_period").textContent = sunset.split(" ")[1];

}

function updateWeatherDetails(){
    
    let humidity = formatted_data.main.humidity;
    document.querySelector(".humidity_value").textContent = humidity + "%";
    let pressure = formatted_data.main.pressure;
    document.querySelector(".pressure_value").textContent = pressure + "hPa";
    let feels = formatted_data.main.feels_like;
    document.querySelector(".fl_value").textContent = feels.toFixed(1) + "°C";
    let visible_range = formatted_data.visibility / 1000;
    document.querySelector(".visible_value").textContent = visible_range + "Km";

}

//Main content👇
  getDate();
  setInterval(getDate, 1000); 