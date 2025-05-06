const searchInput = document.getElementById("searchInput");
const tableBody = document.getElementById("tableBody");

async function fetchData() {
  try {
    const [bookRes, authorRes] = await Promise.all([
      fetch(`${url}/books`),
      fetch(`${url}/authors`),
    ]);

    allBooks = await bookRes.json();
    AuthorName = await authorRes.json();

    displayBooks(allBooks);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function displayBooks(bookList) {
  tableBody.innerHTML = "";

  bookList.forEach((book) => {
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

searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filtered = allBooks.filter((book) =>
    book.title.toLowerCase().includes(searchTerm)
  );
  displayBooks(filtered);
});

function addToWishlist(book) {
  const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
  if (!currentUser) {
    alert('Please login first');
    return;
  }

  const wishlistKey = `user_${currentUser.id}_wishlist`;
  const wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];

  // Check if book already exists
  const exists = wishlist.some(b => b.id === book.id);
  if (exists) {
    alert("This book is already in your wishlist!");
    return;
  }

  wishlist.push(book);
  localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
  alert(`${book.title} added to your wishlist!`);
}

// Initial data load
fetchData();
