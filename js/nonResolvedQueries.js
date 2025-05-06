fetch(`${url}/query/Not%20Resolved`)
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
           
            <td>
              <button class="btn btn-sm btn-success" onclick="markResolved(${query.id})">
                 Resolve
              </button>
            </td>
          `;
          tableBody.appendChild(row);
        });
      });

      function markResolved(id) {
        fetch(`${url}/query/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
        }).then(() => location.reload());
      
      
    }