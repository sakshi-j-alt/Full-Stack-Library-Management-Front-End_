
  function loadWishlist() {
   
    const wishlistKey = `user_${getUserId()}_wishlist`;
    const wishlist = JSON.parse(sessionStorage.getItem(wishlistKey)) || [];
    
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
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', function() {
    const searchTerm = this.value.trim();
    filterWishlist(searchTerm);
  });
  function filterWishlist(searchTerm) {
    const wishlistKey = `user_${getUserId()}_wishlist`;
    const wishlist = JSON.parse(sessionStorage.getItem(wishlistKey)) || [];
    if (!searchTerm) {
      displayBooks(wishlist);
      return;
    }
   
     const filtered = wishlist.filter(book => 
  (book.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
  (book.author || '').toLowerCase().includes(searchTerm.toLowerCase())
);

      displayBooks(filtered);
  }
  
  function removeFromWishlist(bookId) {
    if (!confirm('Are you sure you want to remove this book from your wishlist?')) {
      return;
    }
    const userId = getUserId();
    if (!userId) {
      alert('User not logged in!');
      return;
    }
    const wishlistKey = `user_${userId}_wishlist`;
    let wishlist = JSON.parse(sessionStorage.getItem(wishlistKey)) || [];
    wishlist = wishlist.filter(book => book.id.toString() !== bookId.toString());
    sessionStorage.setItem(wishlistKey, JSON.stringify(wishlist));
    updateWishlistCount(wishlist.length);
    displayBooks(wishlist);
    alert('Book removed from your wishlist!');
  }
  
  function updateWishlistCount(count) {
    const countElement = document.getElementById('wishlistCount');
    countElement.textContent = `${count} ${count === 1 ? 'book' : 'books'}`;
  }
  loadWishlist();