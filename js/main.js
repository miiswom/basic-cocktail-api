//Example fetch using pokemonapi.co
const title = document.querySelector("#title")
const instructions = document.querySelector("#instructions")
const image = document.querySelector("#cocktail-img")
const cocktailInfo = document.querySelector("#cocktail-info")
const searchBtn = document.querySelector("#search");
const ingredientsUl = document.querySelector("#ingredients")

searchBtn.addEventListener("click", getMatches)

const matches = document.querySelector("#matches")

let newArr = []
let idDrinkArr = []
let imgArr = []
let newImgArr = []


  fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic`) 
  .then(res => res.json())
  .then(data => {
    for(let i=0; i < data.drinks.length; i++) {
      newArr.push(data.drinks[i])
    }
    console.log(newArr);
  //  getDisplayed()
  })
  .catch(err => console.log(err))



function getMatches() {
  const userInput = document.querySelector("#user-input").value

  matches.innerHTML = ""
  
  for(let i=0; i < newArr.length; i++) {
  
    if(userInput.length > 0) {
      if(newArr[i].strDrink.toLowerCase().match(userInput.toLowerCase()) !== null) {
      
        //getDetails(Number(newArr[i].idDrink))
        console.log('yes');
        console.log(newArr[i])
        
        const image = document.createElement('img')
        matches.appendChild(image);
        image.src = newArr[i].strDrinkThumb;
        image.alt = newArr[i].idDrink
        //image.innerHTML = `<a href="https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${Number(newArr[i].idDrink)}"></a>`
        image.classList.add('img')
        image.classList.add("nodes")
        idDrinkArr.push(newArr[i].idDrink)
        console.log(idDrinkArr)
        //image.addEventListener("click", openModal(newArr[i].idDrink))
        imgArr = document.querySelectorAll(".nodes");
        newImgArr = [...imgArr]

        //addingEvent()
    }
    
    } else if(userInput.length = 0) {
      return
    }
  }
  addingEvent()
}

function addingEvent() {
  newImgArr.forEach((el) => {
    el.addEventListener("click", function getOk() {
      console.log(el.alt)
      fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${el.alt}`)
      .then(res => res.json())
      .then(data => {
        console.log(data.drinks[0].idDrink)
        console.log("ingredients" + data.drinks[0].strIngredient1)
        
        cocktailInfo.classList.toggle("modal") 
        //("hidden", "modal")

        let ingredientsArr = []
        for (let key in data.drinks[0]) {
          if(key.startsWith("strIngredient") && data.drinks[0][key] !== null) {
             console.log(data.drinks[0][key]);

             let item = document.createElement("li");
             ingredientsUl.appendChild(item);
             item.textContent = data.drinks[0][key]

             //ingredientsArr.push(data.drinks[0][key])
          }
        }


        instructions.textContent = data.drinks[0].strInstructions;
        title.textContent = data.drinks[0].strDrink
        image.src = data.drinks[0].strDrinkThumb
      })    })
  })
}

const closeModal = document.querySelector("#modal-close");
closeModal.addEventListener("click", closingModal);

function closingModal() {
  cocktailInfo.classList.toggle("modal") 
  //mainContainer.style.filter = "blur(0px)"
}

// ===== localStorage =====

const setSaveBtn = document.querySelector("#set-save");
const getSaveBtn = document.querySelector("#get-save")
setSaveBtn.addEventListener("click", setSavedCocktails )
getSaveBtn.addEventListener("click", getSavedCocktails)

const savedCocktailsList = document.querySelector("#saved-list")

function setSavedCocktails() {
  localStorage += localStorage.setItem(`${title.textContent}`, `${image.src}`)
}

function getSavedCocktails() {

  const hiding = ["length", "clear", "getItem", "key", "removeItem", "setItem"]

  for(let item in localStorage) {
    //const li = document.createElement(li)
    //savedCocktailsList.appendChild(li);
    if(!hiding.includes(String([item])) && savedCocktailsList.children.length < localStorage.length) {
      //console.log([item])
      const li = document.createElement("li");
      savedCocktailsList.appendChild(li);
      li.textContent = [item]
    }
  }
}

// create a saveForLater  section
// use localStorage to save favourites in saveForLater