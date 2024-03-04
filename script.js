const btnGo = document.getElementById("btn-go");
const btnClean = document.getElementById("btn-clean");
const characterId = document.getElementById("characterId");
const containerResult = document.getElementById("result-style");
const content = document.getElementById("content");
const image = document.getElementById("img");

const fetchApi = (value) => {
  const result = fetch(`https://rickandmortyapi.com/api/character/${value}`)
  .then((res) => res.json())
  .then((data) => {
    return data;
  });
  
  return result;
}

const keys = ["name", "status", "species", "gender", "origin", "episode"];

const newKeys = {
  name: 'Nome',
  status: 'Status',
  species: 'Espécie',
  gender: 'Gênero',
  origin: 'Planeta de origem',
  episode: 'Episódios',
}

const buildResult = (result) => {
  return keys.map((key) => document.getElementById(key))
    .map((elem) => {
      if(elem.checked === true && (Array.isArray(result[elem.name])) === true){
        const arrayResult = result[elem.name].join('\r\n');
        const newElem = document.createElement('p');
        newElem.innerHTML = `${newKeys[elem.name]}: ${arrayResult}`;
        content.appendChild(newElem);
      } else if(elem.checked == true && (elem.name === 'origin')){
        const newElem = document.createElement("p");
        newElem.innerHTML = `${newKeys[elem.name]}: ${result[elem.name].name}`;
        content.appendChild(newElem);
      } else if(elem.checked == true && typeof(result[elem.name]) !== 'object'){
        const newElem = document.createElement("p");
        newElem.innerHTML = `${newKeys[elem.name]}: ${result[elem.name]}`;
        content.appendChild(newElem);
      }
    });    
}

btnGo.addEventListener('click', async (e) => {
  e.preventDefault();

  if(characterId.value === ''){
    return content.innerHTML = 'É necessário fazer um filtro';
  }

  const result = await fetchApi(characterId.value);
  if(content.firstChild === null){
    containerResult.className = 'result-style';
    image.src = `${result.image}`;
    buildResult(result);
  } else {
    content.innerHTML = '';
    containerResult.className = 'result-style';
    image.src = `${result.image}`;
    buildResult(result);
  }  
});

btnClean.addEventListener('click', () => location.reload());
