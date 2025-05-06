const searchInput = document.getElementById("searchInput");
let bBooks = [];

const tableBody = document.getElementById("tableBody");


// Initialize
document.addEventListener('DOMContentLoaded', () => {
    fetchBooks();
});

function fetchBooks() {
    fetch(`${url}/borrowrecords`)
        .then(response => response.json())
        .then((data) => {
            bBooks = data;
            displayBooks(data);
        })
       
}

function displayBooks(bBooks) {
    tableBody.innerHTML = "";

    bBooks.forEach((book) => {
        if (book.status === "Returned" || book.Status === "Returned") {
            const row = document.createElement("tr");
            

            row.innerHTML = `
                <td>${ book.id}</td>
                <td>${book.userID}</td>
                <td>${book.bookID}</td>
                <td>${book.borrowDate}</td>
                <td>${book.returnDate}</td>
                <td>${book.status}</td>
                
            `;
            tableBody.appendChild(row);
        }
    });

   
}

function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const filtered = bBooks.filter((book) =>
        book.id.toLowerCase().includes(searchTerm) ||
        book.userid.toLowerCase().includes(searchTerm)
    );
    displayBooks(filtered);
}

searchInput.addEventListener("input", handleSearch);


fetchBooks();