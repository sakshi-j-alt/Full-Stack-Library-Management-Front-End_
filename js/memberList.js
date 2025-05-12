const searchInput = document.getElementById("searchInput");
let allUsers = [];


const Userurl = "http://localhost:8080/api/users";
const tableBody = document.getElementById("tableBody");

function fetchData() {
    fetch(Userurl ,{
        headers: { "Authorization": `Bearer ${token}`}})
    .then((res)=> res.json())
    .then((data)=>{
        allUsers=data;
        displayUsers(data);
    })
}

function displayUsers(allUsers) {
  tableBody.innerHTML = "";

  allUsers.forEach((user) => {
    const row = document.createElement("tr");
    if(user.userType !== "Admin"){
    row.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.phone}</td>
     <td><button class="btn btn-sm btn-danger p-1" onclick="deleteBook(${user.id})">
          <i class="fas fa-trash-alt"></i> Delete
        </button>
        </td>
    `;
    tableBody.appendChild(row);
    }
  });
}

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filtered = allUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm)
  );
  displayUsers(filtered);
});



function deleteBook(id) {
  if (confirm("Are you sure you want to delete this user?")) {
      fetch(`${Userurl}/${id}`, {
          method: "DELETE",
          headers: { "Authorization": `Bearer ${token}`}
      }).then(() => 
        fetchData());
  }
}

// Initial data load
fetchData();
