const btnGo = document.getElementById("btn-go");
const characterId = document.getElementById("characterId");
const content = document.getElementById("content");
const image = document.getElementById("img");

const fetchApi = async (value) => {
  const response = await fetch(
    `https://rickandmortyapi.com/api/character/${value}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      return data;
    });
  return response;
};

const keys = [
  "name",
  "status",
  "species",
  "gender",
  "origin",
  "image",
  "episode",
];

const buildResult = (response) => {
  const newObject = {};
  keys
    .map((key) => document.getElementById(key))
    .map((elem) => {
      elem.checked && (newObject[elem.name] = response[elem.name]);
    });

  return newObject;
};

btnGo.addEventListener("click", async (e) => {
  e.preventDefault();
  const response = await fetchApi(characterId.value);
  //content.textContent = `${JSON.stringify(response, undefined, 2)}`;
  image.src = `${response.image}`;
});
