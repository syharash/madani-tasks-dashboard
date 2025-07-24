import * as XLSX from "https://cdn.sheetjs.com/xlsx-0.20.0/package/xlsx.mjs";

function handleFileUpload(file) {
  const reader = new FileReader();
  reader.onload = function (e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];

    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    // Skip header row
    const metrics = parseMetrics(rows.slice(1));
    renderMetrics(metrics);
  };
  reader.readAsArrayBuffer(file);
}

function parseMetrics(dataRows) {
  const metrics = [];

  dataRows.forEach(row => {
    const label = row[0];       // First column: label
    const val2024 = row[1];     // Second column: 2024 avg
    const val2025 = row[2];     // Third column: 2025 avg

    if (typeof label !== 'string') return;

    if (typeof val2024 === 'number' && typeof val2025 === 'number') {
      const diff = val2025 - val2024;
      const pct = val2024 !== 0 ? ((diff / val2024) * 100).toFixed(1) : '—';

      metrics.push({
        label,
        val2024,
        val2025,
        diff,
        pct,
      });
    }
  });

  return metrics;
}

function renderMetrics(metrics) {
  const table = document.getElementById('metrics-table');
  table.innerHTML = '';

  metrics.forEach(({ label, val2024, val2025, diff, pct }) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${label}</td>
      <td>${val2024.toFixed(2)}</td>
      <td>${val2025.toFixed(2)}</td>
      <td>${diff.toFixed(2)}</td>
      <td>${pct}%</td>
    `;
    table.appendChild(row);
  });
}
