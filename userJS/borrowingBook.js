const searchInput = document.getElementById("searchInput");
let borrowedBooks = [];
let AllLibaryBooks = [];
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


async function fetchBooks() {
  try {
    const [bookRes, borrowedres] = await Promise.all([
      fetch(`${url}/books`, {
        headers: { "Authorization": `Bearer ${token}` }
      }),
      fetch(`${url}/borrowrecords`, {
        headers: { "Authorization": `Bearer ${token}` }
      }),
    ]);

    AllLibaryBooks = await bookRes.json();
    const allBorrowed = await borrowedres.json();

    // Filter to current user
    borrowedBooks = allBorrowed.filter((record) => record.userID === getUserId());

  } catch (error) {
    console.error("Error fetching data:", error);
  }
}



function handleFormSubmit(e) {
    e.preventDefault();
    
    const borrowed = {
      userID: getUserId(),
      bookID: bookId.value.trim(),
      borrowDate: borrowDate.value.trim(),
      returnDate: inputReturnDate.value.trim(),
      status: "Not Returned"
    };
    const book = AllLibaryBooks.find(b => b.id === parseInt(borrowed.bookID));

    const id = book.id;
      fetch(`${url}/borrowrecords`,  {
        method: "POST",
        headers: { "Content-Type": "application/json", 
           "Authorization": `Bearer ${token}`
         },
        body: JSON.stringify(borrowed)
      })
      .then(() => {
        alert("Book borrowed successfully!");
        
        return fetch(`${url}/books/availableCount/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" ,
             "Authorization": `Bearer ${token}`
          },
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