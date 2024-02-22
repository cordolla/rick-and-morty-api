const btnGo = document.getElementById("btn-go");
const btnClean = document.getElementById("btn-Clean");
const characterId = document.getElementById("characterId");
const containerResult = document.getElementById("result-style");
const content = document.getElementById("content");
const image = document.getElementById("img");

const fetchApi = (value) => {
  const result = fetch(`https://rickandmortyapi.com/api/character/${value}`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    return data;
  });

  return result;
}

const keys = ["name", "status", "species", "gender", "origin", "episode"];

const buildResult = (result) => {
  return keys.map((key) => document.getElementById(key))
    .map((elem) => {
      if(elem.checked && typeof(result[elem.name]) !== 'object'){
        const newElem = document.createElement("p");
        newElem.innerHTML = `${elem.name}: ${result[elem.name]}`;
        content.appendChild(newElem);
      }
    });    
}

btnGo.addEventListener('click', async (e) => {
  e.preventDefault();
  const result = await fetchApi(characterId.value);
  image.src = `${result.image}`;
  buildResult(result);
  
});
