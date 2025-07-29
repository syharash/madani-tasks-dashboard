const CLIENT_ID = "515935803707-v7qshp425m1b4h5ru6jcmmmu99qbikgq.apps.googleusercontent.com";
const DEVELOPER_KEY = "AIzaSyCl6PFx1jCh7xjc0HrEZbgAhkF7zRGU1Nw";
const SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

let accessToken = "";

const sheetIndex = {
  "California/Sacramento/USA": {
    id: "YOUR_SHEET_ID_1",
    range: "Sheet1!A1:Z100"
  },
  "Texas/Houston/USA": {
    id: "YOUR_SHEET_ID_2",
    range: "Sheet1!A1:Z100"
  },
  "New York/New York/USA": {
    id: "YOUR_SHEET_ID_3",
    range: "Sheet1!A1:Z100"
  }
};

document.getElementById("signin-btn").onclick = () => {
  const tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: 'https://www.googleapis.com/auth/spreadsheets.readonly',
    callback: (tokenResponse) => {
      accessToken = tokenResponse.access_token;
      alert("✅ Signed in successfully!");
    }
  });
  tokenClient.requestAccessToken();
};

document.getElementById("region-select").addEventListener("change", async (e) => {
  const key = e.target.value;
  const config = sheetIndex[key];
  if (!accessToken) return alert("⚠️ Please sign in first.");
  if (!config) return alert("⚠️ Region not found.");

  try {
    const res = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${config.id}/values/${config.range}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    );
    const data = await res.json();
    const rows = data.values || [];
    const parsed = convertRowsToObjects(rows);
    renderDashboard(parsed);
  } catch (err) {
    console.error("Sheet fetch failed:", err);
    document.getElementById("dashboard").innerHTML =
      "<p style='color:red;'>❌ Failed to load sheet data.</p>";
  }
});

function convertRowsToObjects(rows) {
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
      <h3>${entry.City || entry.Region || "Unnamed"}</h3>
      <p><strong>${entry["2024 Avg"] ? "2024:" : ""}</strong> ${entry["2024 Avg"] || "—"}</p>
      <p><strong>${entry["2025 Avg"] ? "2025:" : ""}</strong> ${entry["2025 Avg"] || "—"}</p>
    `;
    container.appendChild(card);
  });
}
