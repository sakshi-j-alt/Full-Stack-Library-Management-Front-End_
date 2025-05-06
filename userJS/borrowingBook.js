const searchInput = document.getElementById("searchInput");
let borrowedBooks = [];
let allLibaryBooks = [];
// const urlBorrowedBooks = "http://localhost:3001/BorrowRecords";
const bookId = document.getElementById("bookId");
const borrowDate = document.getElementById("borrowDate");
const inputReturnDate = document.getElementById("returnDate");
const form = document.getElementById("borrowForm");
const submitBtn = document.getElementById("submitBorrowBtn");


// Initialize
document.addEventListener('DOMContentLoaded', () => {
    fetchBooks();
});


// async function fetchBooks() {
//     try {
//       const [bookRes, borrowedres] = await Promise.all([
//         fetch(urlAllBooks),
//         fetch(urlBooks),
//       ]);
  
//       AllLibaryBooks = await bookRes.json();
//       borrowedBooks = await borrowedres.json();
  
//       displayBooks(borrowedBooks);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   }

async function fetchBooks() {
  try {
    const [bookRes, borrowedres] = await Promise.all([
      fetch(`${url}/books`),
      fetch(`${url}/borrowrecords`),
    ]);

    AllLibaryBooks = await bookRes.json();
    const allBorrowed = await borrowedres.json();

    // Filter to current user
    borrowedBooks = allBorrowed.filter((record) => record.userID === currentUser.id);

  } catch (error) {
    console.error("Error fetching data:", error);
  }
}



function handleFormSubmit(e) {
    e.preventDefault();
    
    const borrowed = {
      userID: currentUser.id,
      bookID: bookId.value.trim(),
      borrowDate: borrowDate.value.trim(),
      returnDate: inputReturnDate.value.trim(),
      status: "Not Returned"
    };
    const book = AllLibaryBooks.find(b => b.id === parseInt(borrowed.bookID));

    const id = book.id;
      fetch(`${url}/borrowrecords`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(borrowed)
      })
      .then(() => {
        
        return fetch(`${url}/books/availableCount/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ availableCopies: book.availableCopies - 1 })
        });
      })
      .then(() => {
        fetchBooks();
        resetForm();
      });
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



form.addEventListener("submit", handleFormSubmit);
 

// Initial data load
fetchBooks();