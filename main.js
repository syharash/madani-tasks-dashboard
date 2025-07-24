document.getElementById('excelInput').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    const data = new Uint8Array(event.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheet = workbook.Sheets["Sheet1"];
    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    const labels = rows[13];      // Metric labels
    const avg2024 = rows[34];     // "2024 Avg"
    const avg2025 = rows[64];     // "2025 Avg"

    const metrics = [];
    for (let i = 1; i < labels.length; i++) {
      const label = labels[i];
      const val2024 = avg2024[i];
      const val2025 = avg2025[i];
      if (typeof val2024 === 'number' && typeof val2025 === 'number') {
        const diff = val2025 - val2024;
        const pct = val2024 !== 0 ? ((diff / val2024) * 100).toFixed(1) : '—';
        metrics.push({ label, val2024, val2025, diff, pct });
      }
    }

    renderMetrics(metrics);
  };
  reader.readAsArrayBuffer(file);
});

function renderMetrics(metrics) {
  const container = document.getElementById('metricsTable');
  container.innerHTML = '';

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
    const trendClass = pct === '—' ? '' : (pct >= 0 ? 'gain' : 'loss');

    tr.innerHTML = `
      <td>${label}</td>
      <td>${val2024.toFixed(2)}</td>
      <td>${val2025.toFixed(2)}</td>
      <td class="${trendClass}">${pct}</td>
    `;
    tbody.appendChild(tr);
  });

  table.appendChild(tbody);
  container.appendChild(table);
}
