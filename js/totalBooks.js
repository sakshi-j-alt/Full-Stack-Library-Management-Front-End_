const searchInput = document.getElementById("searchInput");
let allBooks = [];
let AuthorName = [];
const tableBody = document.getElementById("tableBody");
const editButton = document.getElementById("editButton");
const editavailableCopies = document.getElementById("editavailableCopies");
const edittitle = document.getElementById("edittitle");
const edittotalCopies = document.getElementById("edittotalCopies");

async function fetchData() {
  try {
    const [bookRes, authorRes] = await Promise.all([
      fetch(`${url}/books` ,  {
  headers: { "Authorization": `Bearer ${token}` }
}),
      fetch(`${url}/authors`,  {
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

function displayBooks(bookList) {
  tableBody.innerHTML = "";

  bookList.forEach((book) => {
    const eachAuthor = AuthorName.find((a) => String(a.id) === String(book.authorId));
    const authorName = eachAuthor ? eachAuthor.name : "Unknown";

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${book.id}</td>
      <td>${book.title}</td>
      <td>${authorName}</td>
      <td>${book.totalCopies}</td>
      <td>${book.availableCopies}</td>
      <td class="text-center action-btns">
        <button class="btn btn-sm btn-warning p-1 edit-btn" data-id="${book.id}">
          <i class="fas fa-edit"></i> Edit
        </button>
        <button class="btn btn-sm btn-danger p-1 delete-btn" data-id="${book.id}">
          <i class="fas fa-trash-alt"></i> Delete
        </button>
      </td>
    `;
    tableBody.appendChild(row);
    
  });
  document.querySelectorAll(".delete-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        deleteBook(id);
    });
});

document.querySelectorAll(".edit-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const id = btn.getAttribute("data-id");
    openEditForm(id);
  });
});

}


function openEditForm(id) {
  const book = allBooks.find(b => b.id == id);
  if (!book) return;

  document.querySelector(".form-card").style.display = "block";
  edittitle.value = book.title;
  editavailableCopies.value = book.availableCopies;
  edittotalCopies.value = book.totalCopies;
  editId = id;
}


editButton.addEventListener("click", async (e) => {
  e.preventDefault(); // prevent form submission

  const updatedBook = {
    title: edittitle.value,
    availableCopies: Number(editavailableCopies.value),
    totalCopies: Number(edittotalCopies.value)
    // Note: You're missing authorId if needed
  };

  try {
    const response = await fetch(`${url}/books/edit/${editId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" ,
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(updatedBook)
    });

    if (response.ok) {
      document.querySelector(".form-card").style.display = "none";
      fetchData();
    } else {
      alert("Failed to update book.");
    }
  } catch (err) {
    console.error("Error updating book", err);
  }
});


searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filtered = allBooks.filter((book) =>
    book.title.toLowerCase().includes(searchTerm)
  );
  displayBooks(filtered);
});


function deleteBook(id) {
  if (confirm("Are you sure you want to delete this book?")) {
      fetch(`${url}/books/${id}`, {
          method: "DELETE",
           headers: {
        "Authorization": `Bearer ${token}`
      }

      }).then(() => 
        fetchData());
  }
}

// Initial data load
fetchData();
