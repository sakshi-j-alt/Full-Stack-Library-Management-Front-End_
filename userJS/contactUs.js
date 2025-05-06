 const Name = document.getElementById('name');
 const userId = document.getElementById('userId');
 const subject = document.getElementById('subject');
 const message = document.getElementById('message');
 document.getElementById('queryForm').addEventListener('submit', async function (e) {
            e.preventDefault();

            
            const jsonData = {
                name: Name.value,
                userId: userId.value,
                subject: subject.value,
                message: message.value
            };
            

            const response = await fetch('http://localhost:8080/api/query', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(jsonData)
            })
            ;

            if (response.ok) {
                alert("Query submitted successfully!");
            } else {
                alert("Error submitting query.");
            }
        });