let borrowed=[];
let availableBooks = [];
 
function fetchBorrowedBooks() {
  fetch(`${url}/borrowrecords`,{
    headers: { "Authorization": `Bearer ${token}` }
  })
    .then(response => response.json())
    .then(data => {
        
      borrowed = data.filter(record => record.userID === getUserId() && record.status === 'Returned');
    
      displayBorrowed(borrowed);
    })
    .catch(error => console.error('Error fetching borrowed books:', error));
}
function fetchAllBooks() {
    fetch(`${url}/books`,{
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
        const row = document.createElement('tr');
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
