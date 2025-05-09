const searchInput1 = document.getElementById("searchInput");
const tableBody = document.getElementById("tableBody");
allBooks = [];
AuthorName = [];
async function fetchData() {
  try {
    const [bookRes, authorRes] = await Promise.all([
      fetch(`${url}/books`, {
        headers: { "Authorization": `Bearer ${token}` }
      }),
      fetch(`${url}/authors`, {
        headers: { "Authorization": `Bearer ${token}` }
      }),
    ]);

    allBooks = await bookRes.json();
    AuthorName = await authorRes.json();

    displayBooks(allBooks);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}



function displayBooks(allBooks) {
  tableBody.innerHTML = "";

  allBooks.forEach((book) => {
    const eachAuthor = AuthorName.find((a) => String(a.id) === String(book.authorId));
    const authorName = eachAuthor ? eachAuthor.name : "Unknown";
    const likedBook = {
      id: book.id,
      title: book.title,
      Author: authorName,
      availableCopies: book.availableCopies,
      totalCopies: book.totalCopies
    }
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${book.id}</td>
      <td>${book.title}</td>
      <td>${authorName}</td>
      <td>${book.totalCopies}</td>
      <td>${book.availableCopies}</td>
      <td class="text-center action-btns">
       <button class="btn btn-sm btn-warning p-1" onclick='addToWishlist(${JSON.stringify(likedBook)} )'>
         <i class="fa fa-heart fs-5"></i>Add to WishList
        </button>
      </td>
    `;
    tableBody.appendChild(row);
    
  });
}

searchInput1.addEventListener("input", () => {
  const searchTerm = searchInput1.value.toLowerCase();
  const filtered = allBooks.filter((book) =>
    book.title.toLowerCase().includes(searchTerm)
  );
  displayBooks(filtered);
});
  

fetchData();
