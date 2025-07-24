document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('excelInput');
  const tableContainer = document.getElementById('metricsTable');

  if (!input || !tableContainer) {
    console.error("Missing required elements in the HTML.");
    return;
  }

  input.addEventListener('change', async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (event) {
      try {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheet = workbook.Sheets["Sheet1"];
        const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        // 🌐 Locate key rows using relaxed matching
        const row2024 = rows.find(row =>
          row.some(cell => typeof cell === 'string' && cell.toLowerCase().includes("2024 avg"))
        );
        const row2025 = rows.find(row =>
          row.some(cell => typeof cell === 'string' && cell.toLowerCase().includes("2025 avg"))
        );
        const labelRow = rows.find(row =>
          row.some(cell => typeof cell === 'string' && cell.toLowerCase().includes("waking up for fajr"))
        );

        if (!row2024 || !row2025 || !labelRow) {
          console.warn("Could not locate 2024 Avg, 2025 Avg, or starting label row");
          tableContainer.innerHTML = `<p>No recognizable metrics found. Please check your Excel file.</p>`;
          return;
        }

        // 🧠 Build metrics starting from "Waking up for fajr"
        const startColIndex = labelRow.findIndex(cell =>
          typeof cell === 'string' && cell.toLowerCase().includes("waking up for fajr")
        );

        const metrics = [];
        for (let i = startColIndex; i < labelRow.length; i++) {
          const label = labelRow[i];
          const val2024 = row2024[i];
          const val2025 = row2025[i];

          if (typeof val2024 === 'number' && typeof val2025 === 'number') {
            const diff = val2025 - val2024;
            const pct = val2024 !== 0 ? ((diff / val2024) * 100).toFixed(1) : '—';
            metrics.push({ label, val2024, val2025, diff, pct });
          }
        }

        renderMetrics(metrics);
      } catch (err) {
        console.error("Error processing Excel file:", err);
        tableContainer.innerHTML = `<p>Unable to process file. Please try again or use a different sheet.</p>`;
      }
    };

    reader.readAsArrayBuffer(file);
  });

  // 🖼️ Display the metrics in a table
  function renderMetrics(metrics) {
    tableContainer.innerHTML = '';

    const table = document.createElement('table');
    table.className = 'styled-table';

    const thead = document.createElement('thead');
    thead.innerHTML = `
      <tr>
        <th>Activity</th>
        <th>2024 Avg</th>
        <th>2025 Avg</th>
        <th>Change (%)</th>
      </tr>
    `;
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    metrics.forEach(({ label, val2024, val2025, pct }) => {
      const tr = document.createElement('tr');
      const trendClass = pct === '—' ? '' : (parseFloat(pct) >= 0 ? 'gain' : 'loss');

      tr.innerHTML = `
        <td>${label}</td>
        <td>${val2024.toFixed(2)}</td>
        <td>${val2025.toFixed(2)}</td>
        <td class="${trendClass}">${pct}</td>
      `;
      tbody.appendChild(tr);
    });

    table.appendChild(tbody);
    tableContainer.appendChild(table);
  }
});
