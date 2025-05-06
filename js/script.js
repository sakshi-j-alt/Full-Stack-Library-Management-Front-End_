function loadPage(page) {
    fetch(`${page}`)
        .then(response => response.text())
        .then(data => {
            document.getElementById('main-content').innerHTML = data;

            if (page.includes("addBook.html")) {
                const script = document.createElement("script");
                script.src = "/js/addBook.js";
                document.body.appendChild(script);
            }
            
            else if (page.includes("totalBooks.html")) {
                const script = document.createElement("script");
                script.src = "/js/totalBooks.js";
                document.body.appendChild(script);
            }

            else if (page.includes("authorRegister.html")) {
                const script = document.createElement("script");
                script.src = "/js/authorRegister.js";
                document.body.appendChild(script);
            }

            else if (page.includes("bookList.html")) {
                const script = document.createElement("script");
                script.src = "/userJS/bookList.js";
                document.body.appendChild(script);
            }
            else if (page.includes("wishList.html")) {
                const script = document.createElement("script");
                script.src = "/userJS/wishList.js";
                document.body.appendChild(script);
            }
            else if (page.includes("memberList.html")) {
                const script = document.createElement("script");
                script.src = "/js/memberList.js";
                document.body.appendChild(script);
            }
            else if (page.includes("issueBooks.html")) {
                const script = document.createElement("script");
                script.src = "/js/issueBooks.js";
                document.body.appendChild(script);
            }
            else if (page.includes("history.html")) {
                const script = document.createElement("script");
                script.src = "/js/history.js";
                document.body.appendChild(script);
            }
            else if (page.includes("borrowedBooks.html")) {
                const script = document.createElement("script");
                script.src = "/userJS/borrowedBooks.js";
                document.body.appendChild(script);
            }
            else if (page.includes("userHistory.html")) {
                const script = document.createElement("script");
                script.src = "/userJS/userHistory.js";
                document.body.appendChild(script);
            }
            else if (page.includes("profile.html")) {
                const script = document.createElement("script");
                script.src = "/userJS/profile.js";
                document.body.appendChild(script);
            }
            else if (page.includes("borrowingBook.html")) {
                const script = document.createElement("script");
                script.src = "/userJS/borrowingBook.js";
                document.body.appendChild(script);
            }
            else if (page.includes("contactUs.html")) {
                const script = document.createElement("script");
                script.src = "/userJS/contactUs.js";
                document.body.appendChild(script);
            }
            else if (page.includes("nonResolvedQueries.html")) {
                const script = document.createElement("script");
                script.src = "/js/nonResolvedQueries.js";
                document.body.appendChild(script);
            }
            else if (page.includes("resolvedQueries.html")) {
                const script = document.createElement("script");
                script.src = "/js/resolvedQueries.js";
                document.body.appendChild(script);
            }
           
        })
        .catch(err => {
            document.getElementById('main-content').innerHTML = '<p class="text-danger">Failed to load content.</p>';
        });
}     


  