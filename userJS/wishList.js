
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

  function loadWishlist(userId) {
   
    const wishlistKey = `user_${userId}_wishlist`;
    const wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];
    
    updateWishlistCount(wishlist.length);
    displayBooks(wishlist);
   
  }
  
  function displayBooks(bookList) {
   
    const tableBody = document.getElementById('tableBody');
    const emptyWishlist = document.getElementById('emptyWishlist');
    
    if (bookList.length === 0) {
      tableBody.innerHTML = '';
      emptyWishlist.style.display = 'block';
      return;
    }
    
    emptyWishlist.style.display = 'none';
    tableBody.innerHTML = '';
    
    bookList.forEach((book, index) => {
      const row = document.createElement('tr');
      const availability = book.availableCopies > 0 
        ? `<span class="badge bg-success">Available (${book.availableCopies})</span>`
        : `<span class="badge bg-danger">Out of stock</span>`;
      
      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${availability}</td>
        <td class="action-btns">
          <button class="btn btn-sm btn-danger" onclick="removeFromWishlist('${book.id}')">
            <i class="fas fa-trash-alt"></i> Remove
          </button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }
  
  function filterWishlist(searchTerm) {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser) return;
    
    const wishlistKey = `user_${currentUser.id}_wishlist`;
    const wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];
    
    if (!searchTerm) {
      displayBooks(wishlist);
      return;
    }
    
    const filtered = wishlist.filter(book => 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    displayBooks(filtered);
  }
  
  function removeFromWishlist(bookId) {
    if (!confirm('Are you sure you want to remove this book from your wishlist?')) {
      return;
    }
    
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser) return;
    
    const wishlistKey = `user_${currentUser.id}_wishlist`;
    let wishlist = JSON.parse(localStorage.getItem(wishlistKey)) || [];
    
    // Filter out the book to be removed
    wishlist = wishlist.filter(book => book.id.toString() !== bookId.toString());
  
    
    // Save back to localStorage
    localStorage.setItem(wishlistKey, JSON.stringify(wishlist));
    
    // Update the display
    updateWishlistCount(wishlist.length);
    displayBooks(wishlist);
    
    // Optional: Show a confirmation message
    alert('Book removed from your wishlist!');
  }
  
  function updateWishlistCount(count) {
    const countElement = document.getElementById('wishlistCount');
    countElement.textContent = `${count} ${count === 1 ? 'book' : 'books'}`;
  }
  loadWishlist(currentUser.id);