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

function decodeJWT(token) {
    if (!token) return null;

    const parts = token.split('.');
    if (parts.length !== 3) return null; const payload = parts[1];
    // Base64URL decode
    const decodedPayload = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));

    try {
        return JSON.parse(decodedPayload);
    } catch (e) {
        console.error("Invalid JWT payload:", e); return null;
    }
}

function getUserId() {
    const token = localStorage.getItem("token");
    if (!token)
        window.location.href = "index.html";
    const decoded = decodeJWT(token);
    return decoded.userid;
}

function getUserName() {
    const token = localStorage.getItem("token");
    if (!token)
        window.location.href = "index.html";
    const decoded = decodeJWT(token);
    return decoded.sub;
}
  
function getUserEmail() {
    const token = localStorage.getItem("token");
    if (!token)
        window.location.href = "index.html";;
    const decoded = decodeJWT(token);
    return decoded.email;
}

function getPhone() {
    const token = localStorage.getItem("token");
    if (!token)
        window.location.href = "index.html";;
    const decoded = decodeJWT(token);
    return decoded.phone;
}

function getName() {
    const token = localStorage.getItem("token");
    if (!token)
        window.location.href = "index.html";;
    const decoded = decodeJWT(token);
    return decoded.name;
}


function getUserType() {
    const token = localStorage.getItem("token");
    if (!token)
        window.location.href = "index.html";
    const decoded = decodeJWT(token);
    return decoded.usertype;
}

function getAuthorization() {
    const token = localStorage.getItem("token");
    if (!token)
        window.location.href = "index.html";
    const decoded = decodeJWT(token);
    return `Bearer ${token}`;
}

function logout() {
    localStorage.removeItem("token");
    localStorage.clear();
    window.location.href = "index.html";
}
