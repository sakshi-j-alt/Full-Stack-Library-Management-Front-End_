
function fetchData() {
fetch(`${url}/query/status/Resolved`)
      .then(response => response.json())
      .then(data => {
        const tableBody = document.getElementById('queryTableBody');
        tableBody.innerHTML = "";

        data.forEach((query, index) => {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${index + 1}</td>
            <td>${query.name}</td>
            <td>${query.userId}</td>
            <td>${query.subject}</td>
            <td>${query.message}</td>
           
          
          `;
          tableBody.appendChild(row);
        });
      });
    }
     
    fetchData();