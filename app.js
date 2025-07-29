const CLIENT_ID = "515935803707-v7qshp425m1b4h5ru6jc0HrEZbgAhkF7zRGU1Nw.apps.googleusercontent.com";
const DEVELOPER_KEY = "AIzaSyCl6PFx1jCh7xjc0HrEZbgAhkF7zRGU1Nw";
const SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

const sheetIndex = {
  "California/Sacramento/USA": {
    id: "1ABCxyzSacSheetID", // replace with actual ID
    range: "Sheet1!A1:Z100"
  },
  "Texas/Houston/USA": {
    id: "1DEFxyzHouSheetID",
    range: "Sheet1!A1:Z100"
  },
  "New York/New York/USA": {
    id: "1XYZnycSheetID",
    range: "Sheet1!A1:Z100"
  }
};

function initApiClient() {
  gapi.load('client:auth2', () => {
    gapi.client.init({
      apiKey: DEVELOPER_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: ["https://sheets.googleapis.com/$discovery/rest?version=v4"],
      scope: SCOPES
    }).then(() => {
      gapi.auth2.getAuthInstance().signIn();
    });
  });
}

async function fetchSheetData(sheetId, range) {
  try {
    const res = await gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range
    });
    const rows = res.result.values;
    const data = convertRowsToObjects(rows);
    renderDashboard(data);
  } catch (err) {
    console.error("Error fetching sheet:", err);
    document.getElementById("dashboard").innerHTML = `<p style="color:red;">Failed to load data.</p>`;
  }
}

function convertRowsToObjects(rows) {
  if (!rows.length) return [];
  const headers = rows[0];
  return rows.slice(1).map(row => {
    return headers.reduce((obj, header, i) => {
      obj[header.trim()] = row[i] || "";
      return obj;
    }, {});
  });
}

function renderDashboard(data) {
  const container = document.getElementById("dashboard");
  container.innerHTML = "";
  data.forEach(entry => {
    const card = document.createElement("div");
    card.className = "region-card";
    card.innerHTML = `
      <h3>${entry.Region || "Unnamed Region"}</h3>
      <p><strong>Metric A:</strong> ${entry.MetricA || "N/A"}</p>
      <p><strong>Metric B:</strong> ${entry.MetricB || "N/A"}</p>
    `;
    container.appendChild(card);
  });
}

document.getElementById("region-select").addEventListener("change", (e) => {
  const key = e.target.value;
  const config = sheetIndex[key];
  if (config) fetchSheetData(config.id, config.range);
});

window.onload = initApiClient;
