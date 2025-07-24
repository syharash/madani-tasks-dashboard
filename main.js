document.getElementById("excelInput").addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function (event) {
    const data = new Uint8Array(event.target.result);
    const workbook = XLSX.read(data, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    const metrics = parseMetrics(rows.slice(1));
    renderMetrics(metrics);
  };
  reader.readAsArrayBuffer(file);
});

function parseMetrics(dataRows) {
  const metrics = [];

  dataRows.forEach((row) => {
    const label = row[0];
    const val2024 = row[1];
    const val2025 = row[2];

    if (typeof label !== "string") return;
    if (typeof val2024 === "number" && typeof val2025 === "number") {
      const diff = val2025 - val2024;
      const pct = val2024 !== 0 ? ((diff / val2024) * 100).toFixed(1) : "—";

      metrics.push({
        label,
        val2024: val2024.toFixed(2),
        val2025: val2025.toFixed(2),
        diff: diff.toFixed(2),
        pct: pct + "%",
      });
    }
  });

  return metrics;
}

function renderMetrics(metrics) {
  const tbody = document.querySelector("#metrics-table tbody");
  tbody.innerHTML = "";

  metrics.forEach(({ label, val2024, val2025, diff, pct }) => {
    const row = document.createElement("tr");

    // Parse numeric part of % for reliable comparison
    let pctValue = pct === "—" ? null : parseFloat(pct);
    let pctClass =
      pctValue === null
        ? "neutral"
        : pctValue > 0
        ? "positive"
        : pctValue < 0
        ? "negative"
        : "neutral";

    row.innerHTML = `
      <td>${label}</td>
      <td>${val2024}</td>
      <td>${val2025}</td>
      <td>${diff}</td>
      <td class="${pctClass}">${pct}</td>
    `;
    tbody.appendChild(row);
  });
}
