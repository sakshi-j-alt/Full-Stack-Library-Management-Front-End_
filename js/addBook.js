
let allListedAuthors = [];
const authorSelect = document.getElementById("authorSelect");
const form = document.getElementById("bookRegistrationForm");
const newAuthorName = document.getElementById("newAuthorName");
const newAuthorBio = document.getElementById("newAuthorBio");
const title= document.getElementById("title");
const genre = document.getElementById("genre");
const totalCopies=document.getElementById("totalCopies");
const availableCopies=document.getElementById("availableCopies");

// Load authors
function fetchAuthors() {
  fetch(`${url}/authors`)
    .then((res) => res.json())
    .then((authors) => {
      allListedAuthors = authors;
      displayAuthors();
    });
}

function displayAuthors() {
  authorSelect.innerHTML = "";
  const defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "-- Select Author --";
  authorSelect.appendChild(defaultOption);

  allListedAuthors.forEach((author) => {
    const option = document.createElement("option");
    option.value = author.id;
    option.textContent = `${author.id} - ${author.name}`;
    authorSelect.appendChild(option);
  });

  const otherOption = document.createElement("option");
  otherOption.value = "other";
  otherOption.textContent = "Other (Add New Author)";
  authorSelect.appendChild(otherOption);
}

authorSelect.addEventListener("change", function () {
  if (authorSelect.value === "other") {
    loadPage('adminPages/authorRegister.html');
  } 
});

form.addEventListener("submit", function (e){
  e.preventDefault();
  const newBook = {
    title: title.value.trim(),
    authorId: parseInt(authorSelect.value), 
    genre: genre.value.trim(),
    totalCopies: parseInt(totalCopies.value.trim()),
    availableCopies: parseInt(availableCopies.value.trim())
  };

fetch(`${url}/books` ,{
  method :"POST",
  headers :{"content-type":"application/json"},
  body :JSON.stringify(newBook),
}).then(()=>{

  alert("Registration successful!"); 
  form.reset();
  
})})


fetchAuthors();