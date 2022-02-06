
const form=document.querySelector("form");
const input=document.querySelector("input");
const msg = document.querySelector(".msg");
const list = document.querySelector(" .cities");
let map1=new Map();


document.querySelector("form").addEventListener("submit", function(e){
    

   
    e.preventDefault() /* To prevent the default loading of the page */
     const inputVal = document.querySelector("input").value;
     console.log(inputVal);
 // Check if the weather for entered city already exists
    if(map1.has(inputVal)){
       console.log("Already in map");
        msg.textContent = "You already have the weather for this city";
        form.reset();
        input.focus();
    }
    else{
         
     
        var URLPart = "http://api.openweathermap.org/data/2.5/weather?q=";
        var apiPart = "&appid=3ee83ed0e986497cbc7abb8c5b7cf867";
        var unitPart="&units=metric";
       
        var url = URLPart.concat(inputVal,apiPart,unitPart);
        
         // now fetching the api
         
         let fetchRes=fetch(url);
            fetchRes.then(response => response.json())
            
            .then(data => {
                map1.set(inputVal,"true");
                console.log(map1);
                const { main, name, sys, weather } = data; // Inside the curly braces, used same name as returned by the api
                /* Now creating a card for the fetched data */
                const icon = `https://openweathermap.org/img/wn/${
            weather[0]["icon"]
          }@2x.png`;
    
                var node = document.createElement("li");
                const cityNewTemp=Math.round(main.temp);
                node.classList.add("city");
                const markup = `
                        <h2 class="city-name" 
                            <span>${name}</span>
                            <sup>${sys.country}</sup>
                            
                        </h2>
                        <div class="city-temp">${main.temp}<sup>C</sup>
                        </div>
                        <figure>
                            <img class="city-icon" src=${icon} alt={weather[0]["main"]}>
                            <figcaption>${weather[0].description}</figcaption>
                        </figure>
                        `;
                node.innerHTML = markup;
                list.appendChild(node);
                document.querySelector("ul").appendChild(node);
            })
            //Now if there is any error we will catch it and display the following message
            fetchRes.catch((error) => {
                
                //textContent is used to change the text content of an element
                msg.textContent= "Please search for a valid city";
            });
            //After a city's temperature is displayed, clearing the input box and the error message
            msg.textContent = "";
            form.reset();
            input.focus();
    }
 
    
  });

  

  