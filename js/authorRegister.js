
    const Authorform = document.getElementById("authorRegistrationForm");

    Authorform.addEventListener("submit", function (e) {
      e.preventDefault();

      const newAuthor = {
        name: document.getElementById("newAuthorName").value.trim(),
        bio: document.getElementById("newAuthorBio").value.trim()
      };

      fetch(`${url}/authors`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
           "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(newAuthor)
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to add author.");
          }
          return response.json();
        })
        .then(() => {
        // loadPage('/adminPages/addBook.html');
        alert("Author added successfully!");
          Authorform.reset();

        })
        .catch((error) => {
          alert("Error: " + error.message);
        });
    });