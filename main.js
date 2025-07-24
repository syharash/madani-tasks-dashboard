import { parseExcel } from './excel-import.js';
import { renderTable } from './table-render.js';

document.getElementById('excelInput').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    parseExcel(file, (data) => renderTable(data, 'tableContainer'));
  }
});
