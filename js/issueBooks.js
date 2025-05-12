const searchInput = document.getElementById("searchInput");
let borrowedBooks = [];
let AllLibaryBooks = [];
const tableBody = document.getElementById("tableBody");
let editId = null;
const userId = document.getElementById("userId");
const bookId = document.getElementById("bookId");
const borrowDate = document.getElementById("borrowDate");
const inputReturnDate = document.getElementById("returnDate");
const inputStatus = document.getElementById("status");
const form = document.getElementById("borrowForm");
const submitBtn = document.getElementById("submitBorrowBtn");
const overdue = document.getElementById("overdue");

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    fetchBooks();
});


async function fetchBooks() {
    try {
      const [bookRes, borrowedres] = await Promise.all([
        fetch(`${url}/books`, { headers: {
    "Authorization": `Bearer ${token}`
  }}),
        fetch(`${url}/borrowrecords` ,  { headers: {
    "Authorization": `Bearer ${token}`
  }}),
      ]);
  
      AllLibaryBooks = await bookRes.json();
      borrowedBooks = await borrowedres.json();
  
      displayBooks(borrowedBooks);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }


function displayBooks(bookList) {
    tableBody.innerHTML = "";
    const sortedBooks = [...bookList].sort((a, b) => {
        return new Date(b.borrowDate) - new Date(a.borrowDate);
    });

    sortedBooks.forEach((book) => {
        if (book.status === "Not Returned" ) {
            const row = document.createElement("tr");
            let isOverdue = false;
            if (book.returnDate && new Date(book.returnDate) < new Date())  {
            isOverdue = true;
            }
            if (isOverdue) {
                row.classList.add('table-danger');
            }

            row.innerHTML = `
                <td>${book.id}</td>
                <td>${book.userID}</td>
                <td>${book.bookID}</td>
                <td>${formatDisplayDate(book.borrowDate)}</td>
                <td>${book.returnDate ? formatDisplayDate(book.returnDate) : 'Not returned'}</td>
                <td>${book.status}</td>
                <td class="text-center action-btns">
                    <button class="btn btn-sm btn-warning p-1 edit-btn" data-id="${book.id}" onclick="scrollToTop()">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                </td>
            `;
            tableBody.appendChild(row);
        }
    });

    // Add edit event listeners
    document.querySelectorAll(".edit-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = btn.getAttribute("data-id");
            loadBookForEdit(id);
        });
    });
}



searchInput.addEventListener("input", () => {
  const searchTerm = searchInput.value.toLowerCase();
  const filtered = borrowedBooks.filter((book) =>
    String(book.bookID).toLowerCase().includes(searchTerm)
  );
  displayBooks(filtered);
});
function FindOverDue() {
    const today = new Date();

    const filtered = borrowedBooks.filter((book) => {
        const returnDate = new Date(book.returnDate); 
        const isOverdue = returnDate < today;

        return isOverdue;
    });
    
    displayBooks(filtered);
}


function handleFormSubmit(e) {
    e.preventDefault();

    const borrowed = {
      userID: userId.value.trim(),
      bookID: parseInt(bookId.value),
      borrowDate: borrowDate.value.trim(),
      returnDate: inputReturnDate.value.trim(),
      status: inputStatus.value.trim()
    };

    const book = AllLibaryBooks.find(b => b.id === borrowed.bookID);
    if (!book) {
      alert("Book not found in the library records.");
      return;
    }

    if (editId) {
      // Only send the updated borrow record; backend will handle availableCopies
      fetch(`${url}/borrowrecords/${editId}`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(borrowed)
      })
      .then(res => {
        if (!res.ok) throw new Error("Failed to update record");
        return res.json();
      })
      .then(() => {
        fetchBooks();
        resetForm();
      })
      .catch(err => alert(err.message));
    } else {
      fetch(`${url}/borrowrecords`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(borrowed)
      })
      .then(res => {
        if (!res.ok) throw new Error("Failed to create record");
        return res.json();
      })
      .then(() => {
        fetchBooks();
        resetForm();
      })
      .catch(err => alert(err.message));
    }
}


function resetForm() {
    form.reset();
    editId = null;
    submitBtn.textContent = "Submit Borrow Record";
}

function formatDisplayDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
    });
}

function formatInputDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
}

function loadBookForEdit(id) {
    const bookToEdit = borrowedBooks.find(book => book.id === parseInt(id));
    if (bookToEdit) {
        userId.value = bookToEdit.userID;
        bookId.value = bookToEdit.bookID;
        borrowDate.value = formatInputDate(bookToEdit.borrowDate);
        inputReturnDate.value = formatInputDate(bookToEdit.returnDate);
        inputStatus.value = bookToEdit.status;
        editId = bookToEdit.id;
        submitBtn.textContent = "Update Record";

    }
}
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
form.addEventListener("submit", handleFormSubmit);
 overdue.addEventListener("click", FindOverDue);



fetchBooks();