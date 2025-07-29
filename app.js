const CLIENT_ID = "515935803707-v7qshp425m1b4h5ru6jcmmmu99qbikgq.apps.googleusercontent.com";
// const DEVELOPER_KEY = "AIzaSyCl6PFx1jCh7xjc0HrEZbgAhkF7zRGU1Nw";
// const SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

let accessToken = "";

const sheetIndex = {
  "California/Elk Groove/USA": {
    id: "1-YP4QqW4wmfqwgRMXmbEtURiyw2pi3nkYLGbc0sQlT4",
    range: "Elk-Groove-YrWise-2024-2025!A7:AM10"
  },
  "California/Riverside/USA": {
    id: "1iygvJ-hGlaBT23zKlVJksdUcU3xOMtZ10wFvgUa5MnA",
    range: "Riverside-YrWise-2024-2025!A7:AM10"
  },
  "California/Sacramento/USA": {
    id: "148TnNDI74ZQg5CX4lukFaK_lbVjnG-TaVVJEdN3s_ok",
    range: "Sacramento-YrWise-2024-2025!A7:AM10"
  },
  "California/Woodland/USA": {
    id: "1Dr4mbBqPkTvKR6OBfpCiHvz7CJsUxlzw-rtu-cXjRlA",
    range: "Woodland-YrWise-2024-2025!A7:AM10"
  },
  "California/Yuba City/USA": {
    id: "1264Z5C0il28XgXsXf_49wZ4QhcDRD2LGUeb0aOhL7mk",
    range: "Yuba City-YrWise-2024-2025!A7:AM10"
  },
  "Florida/Miami/USA": {
    id: "1PXMZO1LGWo4TQU2k3D45unvQN7fhZ9GDT6d1ox6tI8Y",
    range: "Miami-YrWise-2024-2025!A7:AM10"
  },
  "Georgia/Lilburn/USA": {
    id: "10JI4HWahbH3H9b4WjjA6oMCt6fjpIdcsXLpo58ZuCz4",
    range: "Lilburn-YrWise-2024-2025!A7:AM10"
  },
  "Illinois/Bloomington/USA": {
    id: "173tvkXPDyX1wUa6W7hPRbXxhwKxzmLSYqAFBmq4ZvnI",
    range: "Bloomington-YrWise-2024-2025!A7:AM10"
  },
  "Illinois/Chicago/USA": {
    id: "1vOI4y7A0SfbkrcFPjyQ5cgydGTGrycrwglbs0yvxIRw",
    range: "Chicago-YrWise-2024-2025!A7:AM10"
  },
  "Illinois/Lombard/USA": {
    id: "1MQN_oKrmy92tTYpXoTbJG78tNKM-ENzCCeMDs4__Gro",
    range: "Lombard-YrWise-2024-2025!A7:AM10"
  },
  "Illinois/Schaumburg/USA": {
    id: "1NP35gD_FGznqtI1-SzLvJ4mkwCcagNGvQPCvAdLI_wM",
    range: "Schaumburg-YrWise-2024-2025!A7:AM10"
  },
  "Illinois/Skokie/USA" : {
    id: "1piIR4er7HwXN00iFNzOkbGrgaQAVb_rxIGy8za89UhY",
    range: "Skokie-YrWise-2024-2025!A7:AM10"
  },
  "Maryland/Baltimore/USA" : {
    id: "1zAh1Vbg82heZCviFknrdKSoC-PMjptrE5JBWEm-T5oE",
    range: "Baltimore-YrWise-2024-2025!A7:AM10"
  },
  "Maryland/Ellicot City/USA" : {
    id: "1LwhIQaM50PrJfkr4r6U964iwC1pJnq1dP_k0cAEPqKw",
    range: "Ellicot-City-YrWise-2024-2025!A7:AM10"
  },
  "Maryland/Langhorne/USA" : {
    id: "1zDniVeYL_dTZpvGS18pmklmmVDaCF0WGd3gX4yM9Y8A",
    range: "Langhorne-YrWise-2024-2025!A7:AM10"
  },
  "Maryland/Woodbridge/USA" : {
    id: "1pOkArNYjQWyD-qRWG_-VxDRTH9AAoxX_GcnlPfnTJB8",
    range: "Woodbridge-YrWise-2024-2025!A7:AM10"
  },
  "New York/Bronx/USA" : {
    id: "19flAXbGnWQBTV9-GWTNokrQvEpgAJ83g2eoIKI-Fpek",
    range: "Bronx-YrWise-2024-2025!A7:AM10"
  },
  "New York/Brooklyn/USA" : {
    id: "1olu4ln0OKYtsbWPIjtGerpbkUZqbxnePfUOjJ0D6eG4",
    range: "Brooklyn-YrWise-2024-2025!A7:AM10"
  },
  "New York/Queens/USA" : {
    id: "1I6yvtg-XLON4TDbLRufS92_R58BAdpErP_KB3Wn7uEE",
    range: "Queens-YrWise-2024-2025!A7:AM10"
  },
  "New York/Valley Stream/USA" : {
    id: "1nTAnMynDiNJ05HhbfWieqz4a7nVgh6iRYD33n02R2og",
    range: "Valley Stream-YrWise-2024-2025!A7:AM10"
  },
  "Texas/New Orleans/USA" : {
    id: "1XMJtXTPCGDrtHmoz8xgx_qoeSfylDUDP8l1iTZs9PlI",
    range: "New Orleans-YrWise-2024-2025!A7:AM10"
  },
  "Texas/Sugar Land/USA" : {
    id: "1YGC_xaiFWDI31SJhF5oa6gmFTOzktgGtKLpOoh02xIs",
    range: "Sugar Land-YrWise-2024-2025!A7:AM10"
  },
  "Texas/Wylie/USA" : {
    id: "1JBhROkoHG09HzvaQxCO0WUjtUgHO8m7tySSZlxJFVCE",
    range: "Wylie-YrWise-2024-2025!A7:AM10"
  },
  "Washington/Lynwood/USA" : {
    id: "1PAXcYLnUw-zKTuExtg6vAA84tPI29bZrNVdh_9UtOSw",
    range: "Lynnwood-YrWise-2024-2025!A7:AM10"
  },
  "California/USA" : {
    id: "14LBe2hZvwx4lBik9k1jkPJvIrKoV_7X-RcYazHrnyrg",
    range: "California-YrWise-2024-2025!A7:AM10"
  },
  "Florida/USA" : {
    id: "1YAljj_sVKMp4fr7ShpFfy4EtSK1Dk_vqOXyS24KQ4kM",
    range: "Florid-YrWise-2024-2025!A7:AM10"
  },
  "Georgia/USA" : {
    id: "1asCNMkGvJcPqe6uSoPmdyNmgnfroMtQIvf7wzXDLQ6Q",
    range: "Georgia-YrWise-2024-2025!A7:AM10"
  },
  "Illinois/USA" : {
    id: "12HPghBjP6v8LCvFIJ_Pe1TXAnQdaEgfjaJRBFR27cEQ",
    range: "Illinois-YrWise-2024-2025!A7:AM10"
  },
  "Maryland/USA" : {
    id: "1ssgqClME3RbZxGqNfdQeT7bbZSwVk-fx-xWGJcLLh78",
    range: "Maryland-YrWise-2024-2025!A7:AM10"
  },
  "New York/USA" : {
    id: "1znKOsK3qW8sfJGsnkuKGiiuMJ9rvRRTxr4RWjw9kZAw",
    range: "New York-YrWise-2024-2025!A7:AM10"
  },
  "Texas/USA" : {
    id: "1wC4XLsWbAKiciLpIOKU6WeurEjEQpngXdgBI051_Iec",
    range: "Texas-YrWise-2024-2025!A7:AM10"
  },
  "Washington/USA" : {
    id: "1NQSfiwuRitYZkeBM7f6iF-ivrzpxAZpTo65Vh2Y50BM",
    range: "Washington-YrWise-2024-2025!A7:AM10"
  },
  "USA" : {
    id: "15sKA8JESDMKYD0t0Qc0INMOSKds7oKJ9Funok4TvFbs",
    range: "USA-YrWise-2024-2025!A7:AM10"
  }
};

// 🔒 Wrap and encode sheet name + range safely
function getEncodedRange(rangeStr) {
  const [sheetName, cellRange] = rangeStr.split("!");
  return encodeURIComponent(`'${sheetName}'!${cellRange}`);
}

// ✅ Optional: check if ID is a valid Sheet
async function validateGoogleSheetId(fileId) {
  const res = await fetch(
    `https://www.googleapis.com/drive/v3/files/${fileId}?fields=mimeType`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  const data = await res.json();
  return data.mimeType === "application/vnd.google-apps.spreadsheet";
}

async function fetchSheetData(config) {
  const encodedRange = getEncodedRange(config.range);
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${config.id}/values/${encodedRange}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  const data = await res.json();
  return data.values || [];
}

document.getElementById("signin-btn").onclick = () => {
  const tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope:
      "https://www.googleapis.com/auth/spreadsheets.readonly https://www.googleapis.com/auth/drive.metadata.readonly",
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
    const isValid = await validateGoogleSheetId(config.id);
    if (!isValid) throw new Error("Invalid Sheet ID");

    const rows = await fetchSheetData(config);
    const parsed = convertRowsToObjects(rows);
    renderDashboard(parsed);
  } catch (err) {
    console.error("Sheet fetch failed:", err);
    document.getElementById("dashboard").innerHTML =
      "<p style='color:red;'>❌ Failed to load sheet data.</p>";
  }
});

// 🧠 Auto-detect header row
function findHeaderRow(rows) {
  return rows.find(row =>
    Array.isArray(row) &&
    row.length > 0 &&
    row.some(cell => typeof cell === "string" && cell.trim() !== "")
  );
}

// 🔄 Convert row data to objects
function convertRowsToObjects(rows) {
  const headerRow = findHeaderRow(rows);
  if (!headerRow) return [];

  const headerIndex = rows.indexOf(headerRow);
  return rows.slice(headerIndex + 1).map(row => {
    return headerRow.reduce((obj, header, i) => {
      obj[header.trim()] = row[i] || "";
      return obj;
    }, {});
  });
}

// 🖼️ Render dashboard or fallback
function renderDashboard(data) {
  const container = document.getElementById("dashboard");
  container.innerHTML = "";

  if (!data.length) {
    container.innerHTML = "<p style='text-align:center;'>📭 No data available for this region.</p>";
    return;
  }

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
