
// const borrowurl ="http://localhost:3001/BorrowRecords";
let borrowed=[];
// const urlAllBoooks = "http://localhost:3001/Books";
let availableBooks = [];
 
function fetchBorrowedBooks() {
  fetch(`${url}/borrowrecords`,{
    headers: { "Authorization": `Bearer ${token}` }
  })
    .then(response => response.json() )
    .then(data => {
        
      borrowed = data.filter(record => record.userID === getUserId() && record.status === 'Not Returned');
    
      displayBorrowed(borrowed);
    })
    .catch(error => console.error('Error fetching borrowed books:', error));
}
function fetchAllBooks() {
    fetch(`${url}/books`, {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(response => response.json())
      .then(data => {
        availableBooks = data;
      })
      .catch(error => console.error('Error fetching all books:', error));
}

function displayBorrowed(){
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = ''; // Clear existing rows
    
    borrowed.forEach(record => {
        const eachBook = availableBooks.find((a) => String(a.id) === String(record.bookID));
        const bookName = eachBook ? eachBook.title : "Unknown";
        const row = document.createElement('tr')
        let isOverdue = false;
        if (record.returnDate && new Date(record.returnDate) < new Date())  {
          isOverdue = true;
          }
          if (isOverdue) {
              row.classList.add('table-danger');
          };
        row.innerHTML = 
        `<td>${record.id}</td>
        <td>${record.bookID}</td>
         <td>${bookName}</td>
        <td>${record.borrowDate}</td>
         <td>${record.returnDate}</td>
       
        `;
        tableBody.appendChild(row);
    });
}

fetchAllBooks();
fetchBorrowedBooks();
