// === CONFIG ===
const CLIENT_ID = "515935803707-v7qshp425m1b4h5ru6jcmmmu99qbikgq.apps.googleusercontent.com";
const DEVELOPER_KEY = "AIzaSyCl6PFx1jCh7xjc0HrEZbgAhkF7zRGU1Nw";
const APP_ID = "dashboard-466918";

const SCOPES = [
  "https://www.googleapis.com/auth/drive.readonly",
  "https://www.googleapis.com/auth/spreadsheets.readonly",
];

let pickerApiLoaded = false;
let oauthToken;

// === INIT ===
function onApiLoad() {
  gapi.load("client:auth2", initAuth);
  gapi.load("picker", () => (pickerApiLoaded = true));
}

function initAuth() {
  gapi.auth2
    .init({ client_id: CLIENT_ID, scope: SCOPES.join(" ") })
    .then(() =>
      gapi.auth2.getAuthInstance().signIn().then((user) => {
        oauthToken = user.getAuthResponse().access_token;
      })
    );
}

window.addEventListener("DOMContentLoaded", onApiLoad);

// === PICKER ===
function openPicker() {
  if (pickerApiLoaded && oauthToken) {
    const view = new google.picker.View(google.picker.ViewId.SPREADSHEETS);
    const picker = new google.picker.PickerBuilder()
      .enableFeature(google.picker.Feature.SIMPLE_UPLOAD_ENABLED)
      .setAppId(APP_ID)
      .setOAuthToken(oauthToken)
      .addView(view)
      .setDeveloperKey(DEVELOPER_KEY)
      .setCallback(pickerCallback)
      .build();
    picker.setVisible(true);
  }
}

function pickerCallback(data) {
  if (data.action === google.picker.Action.PICKED) {
    const docId = data.docs[0].id;
    const range = "Sheet1"; // adjust if needed

    gapi.client.sheets.spreadsheets.values
      .get({ spreadsheetId: docId, range })
      .then((res) => {
        const rows = res.result.values;
        const header = rows[0];
        const dataRows = rows.slice(1);
        const parsed = parseMetrics(dataRows);
        window._allMetrics = parsed;
        populateRegionTypeDropdown(parsed);
        filterAndRender();
      })
      .catch((err) => console.error("Sheet fetch failed:", err));
  }
}

// === METRIC LOGIC ===
function parseMetrics(rows) {
  return rows
    .map((row) => {
      const label = row[0];
      const val2024 = parseFloat(row[1]);
      const val2025 = parseFloat(row[2]);
      const regionType = row[3];
      const regionName = row[4];

      if (!label || isNaN(val2024) || isNaN(val2025)) return null;

      const diff = val2025 - val2024;
      const pctRaw = val2024 !== 0 ? (diff / val2024) * 100 : null;

      return {
        label,
        val2024: val2024.toFixed(2),
        val2025: val2025.toFixed(2),
        diff: diff.toFixed(2),
        pct: pctRaw !== null ? pctRaw.toFixed(1) + "%" : "—",
        pctRaw,
        regionType,
        regionName,
      };
    })
    .filter(Boolean);
}

function populateRegionTypeDropdown(metrics) {
  const regionTypeSelect = document.getElementById("regionType");
  regionTypeSelect.innerHTML = `
    <option value="All">All</option>
    <option value="City">City</option>
    <option value="State">State</option>
    <option value="Country">Country</option>
  `;
  regionTypeSelect.disabled = false;

  regionTypeSelect.onchange = () => {
    populateRegionNameDropdown(metrics);
    filterAndRender();
  };

  populateRegionNameDropdown(metrics);
}

function populateRegionNameDropdown(metrics) {
  const regionType = document.getElementById("regionType").value;
  const regionNameSelect = document.getElementById("regionName");
  regionNameSelect.innerHTML = "";

  if (regionType === "All") {
    regionNameSelect.disabled = true;
    regionNameSelect.innerHTML = `<option value="All">All</option>`;
    return;
  }

  const regionSet = new Set(
    metrics
      .filter((m) => m.regionType === regionType)
      .map((m) => m.regionName)
  );

  regionNameSelect.disabled = false;
  regionNameSelect.innerHTML = `<option value="All">All ${regionType}s</option>`;
  [...regionSet].sort().forEach((name) => {
    const opt = document.createElement("option");
    opt.value = name;
    opt.textContent = name;
    regionNameSelect.appendChild(opt);
  });

  regionNameSelect.onchange = filterAndRender;
}

function filterAndRender() {
  const allMetrics = window._allMetrics || [];
  const regionType = document.getElementById("regionType").value;
  const regionName = document.getElementById("regionName").value;

  let filtered = allMetrics;
  if (regionType !== "All" && regionName !== "All") {
    filtered = allMetrics.filter(
      (m) => m.regionType === regionType && m.regionName === regionName
    );
  }

  renderMetrics(filtered);
}

function renderMetrics(metrics) {
  const tbody = document.querySelector("#metrics-table tbody");
  tbody.innerHTML = "";

  metrics.forEach(({ label, val2024, val2025, diff, pct, pctRaw }) => {
    const row = document.createElement("tr");

    let pctClass =
      pctRaw === null
        ? "neutral"
        : pctRaw > 0
        ? "positive"
        : pctRaw < 0
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
