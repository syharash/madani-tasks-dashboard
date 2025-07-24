// table-render.js
export function renderTable(data, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = ''; // Clear previous render

  const table = document.createElement('table');
  table.className = 'styled-table';

  const thead = document.createElement('thead');
  const headers = Object.keys(data[0]);
  const headerRow = document.createElement('tr');
  headers.forEach(key => {
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
    headers.forEach(key => {
      const td = document.createElement('td');
      td.textContent = row[key] ?? ''; // Handle empty cells
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  container.appendChild(table);
}
