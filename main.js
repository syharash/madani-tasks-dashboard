function parseExcel(file, callback) {
  const reader = new FileReader();
  reader.onload = function (e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json(firstSheet);
    callback(json);
  };
  reader.readAsArrayBuffer(file);
}

function renderTable(data, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = ''; // Clear previous table

  if (!data.length) {
    container.textContent = 'No data to display.';
    return;
  }

  const table = document.createElement('table');
  table.className = 'styled-table';

  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  Object.keys(data[0]).forEach(key => {
    const th = document.createElement('th');
    th.textContent = key;
    th.setAttribute('scope', 'col');
    headerRow.appendChild(th);
  });
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  data.forEach(row => {
    const tr = document.createElement('tr');
    Object.keys(data[0]).forEach(key => {
      const td = document.createElement('td');
      td.textContent = row[key] ?? '';
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  container.appendChild(table);
}

document.getElementById('excelInput').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    parseExcel(file, (data) => renderTable(data, 'tableContainer'));
  }
});
