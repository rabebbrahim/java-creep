const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");
const apiKey = "d912dbbeb92d8a4f923fd6e7b6a81045";

form.addEventListener("submit", e => {
    e.preventDefault();
    const inputVal = input.value;

      //check if there's already a city
  const listItems = list.querySelectorAll(".ajax-section .city");
  const listItemsArray = Array.from(listItems);

    if (listItemsArray.length > 0) {
        const filteredArray = listItemsArray.filter(el => {
          let content = "";
          //athens,gr
          if (inputVal.includes(",")) {
            //athens,grrrrrr->invalid country code, so we keep only the first part of inputVal
            if (inputVal.split(",")[1].length > 2) {
              inputVal = inputVal.split(",")[0];
              content = el
                .querySelector(".city-name span")
                .textContent.toLowerCase();
            } else {
              content = el.querySelector(".city-name").dataset.name.toLowerCase();
            }
          } else {
            //athens
            content = el.querySelector(".city-name span").textContent.toLowerCase();
          }
          return content == inputVal.toLowerCase();
        });
    
        if (filteredArray.length > 0) {
          msg.textContent = `You already know the weather for ${
            filteredArray[0].querySelector(".city-name span").textContent
          } ...otherwise be more specific by providing the country code as well 😉`;
          form.reset();
          input.focus();
          return;
        }
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;


fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);

        const { main, name, sys, weather , wind } = data;
        const icon = `https://openweathermap.org/img/wn/${weather[0]["icon"]}@4x.png`;

        const li = document.createElement("li");
        li.classList.add("city");
        const markup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
            <span>${name}</span>
            <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round(main.temp)}<sup><span id="celsius">°C</span></sup></div>
        <div class="feels-like">Ressenti : ${Math.round(main.feels_like)}<sup><span id="celsius">°C</span></sup></div>
        <figure>
            <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
            <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
        <div id="windspeed"><br>Vents: ${wind.speed}m/s</div>
        <div id="compass_div">
        
          <div class="compass" style="transform: rotate(${wind.deg}deg)"></div>
        
        </div>
        <div id="humidity"><br>Humidité: ${main.humidity}%</div>

        `;
        
        

        
        li.innerHTML = markup;
        list.appendChild(li);

         
        
        // do stuff with the data
    })
    .catch(() => {
        msg.textContent = "Please search for a valid city 😩";
    });

    /*var img = document.getElementById('arrow');
    img.style.transform ='rotate(180deg)'*/
    //$("#arrow").rotate(75);
    msg.textContent = "";
    form.reset();
    input.focus();
});







