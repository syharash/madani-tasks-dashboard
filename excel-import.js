// excel-import.js
import * as XLSX from 'xlsx';

export function parseExcel(file, onParsed) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const json = XLSX.utils.sheet_to_json(sheet);
    onParsed(json);
  };
  reader.readAsArrayBuffer(file);
}
