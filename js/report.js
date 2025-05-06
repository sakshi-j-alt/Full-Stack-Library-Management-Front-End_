function loadChartJS() {
    return new Promise((resolve, reject) => {
      if (typeof Chart !== 'undefined') {
        return resolve();
      }
  
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/chart.js';
      script.onload = resolve;
      script.onerror = () => reject(new Error('Failed to load Chart.js'));
      document.head.appendChild(script);
    });
  }
  
  const urlsBook = "http://localhost:8080/api/books";
  
  function showLoading(container) {
    container.innerHTML = `
      <div class="text-center p-5" role="status" aria-live="polite">
        <div class="spinner-border text-primary" role="status"></div>
        <p class="mt-2">Loading chart data...</p>
      </div>`;
  }
  
  function showError(container, message) {
    container.innerHTML = `
      <div class="alert alert-danger" role="alert">
        <h4 class="alert-heading">Oops! Something went wrong.</h4>
        <p>${message}</p>
        <hr>
        <button class="btn btn-outline-danger mt-3" onclick="fetchAndRenderChart()">Try Again</button>
      </div>`;
  }
  
  function generateRandomColor() {
    const r = Math.floor(Math.random() * 156 + 100);
    const g = Math.floor(Math.random() * 156 + 100);
    const b = Math.floor(Math.random() * 156 + 100);
    return `rgba(${r}, ${g}, ${b}, 0.7)`;
  }
  
  function getGenreColors(count) {
    const presetColors = [
      'rgba(255, 99, 132, 0.7)', 'rgba(54, 162, 235, 0.7)', 'rgba(255, 206, 86, 0.7)',
      'rgba(75, 192, 192, 0.7)', 'rgba(153, 102, 255, 0.7)', 'rgba(255, 159, 64, 0.7)',
      'rgba(199, 199, 199, 0.7)', 'rgba(83, 102, 255, 0.7)', 'rgba(40, 159, 64, 0.7)',
      'rgba(210, 99, 132, 0.7)'
    ];
    const colors = [...presetColors];
    while (colors.length < count) {
      colors.push(generateRandomColor());
    }
    return colors.slice(0, count);
  }
  
  function renderChart(container, genres, counts, backgroundColors) {
    container.innerHTML = '<canvas id="genreChart" height="400"></canvas>';
    const ctx = document.getElementById('genreChart').getContext('2d');
    const total = counts.reduce((a, b) => a + b, 0);
  
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: genres,
        datasets: [{
          data: counts,
          backgroundColor: backgroundColors,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: 'right' },
          title: {
            display: true,
            text: 'Book Distribution by Genre',
            font: { size: 18 }
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                const value = context.raw;
                const percentage = ((value / total) * 100).toFixed(1);
                return `${context.label}: ${value} books (${percentage}%)`;
              }
            }
          }
        }
      }
    });
  }
  
  function renderSummary(container, genres, counts, backgroundColors) {
    const total = counts.reduce((sum, count) => sum + count, 0);
    const summaryDiv = document.createElement('div');
    summaryDiv.className = 'mt-4 p-3 bg-light rounded';
  
    let summaryHTML = '<h6 class="mb-3">Genre Summary:</h6><ul class="list-group">';
    genres.forEach((genre, i) => {
      const percentage = Math.round((counts[i] / total) * 100);
      summaryHTML += `
        <li class="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <span class="badge rounded-pill me-2" style="background-color: ${backgroundColors[i]};">&nbsp;</span>
            ${genre}
          </div>
          <span class="badge bg-primary rounded-pill">${counts[i]} (${percentage}%)</span>
        </li>`;
    });
  
    summaryHTML += `
      <li class="list-group-item d-flex justify-content-between align-items-center active">
        <strong>Total Books</strong>
        <span class="badge bg-light text-dark rounded-pill">${total}</span>
      </li>
    </ul>`;
  
    summaryDiv.innerHTML = summaryHTML;
    container.appendChild(summaryDiv);
  }
  
  async function fetchAndRenderChart() {
    const chartContainer = document.getElementById("chartContainer");
    showLoading(chartContainer);
  
    try {
      await loadChartJS();
  
      const response = await fetch(urlsBook);
      if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      const booksData = await response.json();
  
      const genreCounts = {};
      booksData.forEach(({ genre }) => {
        genreCounts[genre] = (genreCounts[genre] || 0) + 1;
      });
  
      const genres = Object.keys(genreCounts);
      const counts = Object.values(genreCounts);
      const backgroundColors = getGenreColors(genres.length);
  
      renderChart(chartContainer, genres, counts, backgroundColors);
      renderSummary(chartContainer, genres, counts, backgroundColors);
  
    } catch (error) {
      console.error('Chart Render Error:', error);
      showError(chartContainer, error.message || "Unknown error occurred while loading the chart.");
    }
  }
  
  fetchAndRenderChart();
  