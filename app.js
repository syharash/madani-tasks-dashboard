const CLIENT_ID = "515935803707-v7qshp425m1b4h5ru6jcmmmu99qbikgq.apps.googleusercontent.com";
const API_KEY = "AIzaSyCl6PFx1jCh7xjc0HrEZbgAhkF7zRGU1Nw"; // Replace with actual API key
let accessToken = "";

// const DEVELOPER_KEY = "AIzaSyCl6PFx1jCh7xjc0HrEZbgAhkF7zRGU1Nw";
// const SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";


const sheetIndex = {
  "California/Elk Groove/USA": {
    id: "1-YP4QqW4wmfqwgRMXmbEtURiyw2pi3nkYLGbc0sQlT4",
    range: "Sheet1!A1:D41"
  },
  "California/Riverside/USA": {
    id: "1iygvJ-hGlaBT23zKlVJksdUcU3xOMtZ10wFvgUa5MnA",
    range: "Sheet1!A1:D41"
  },
  "California/Sacramento/USA": {
    id: "148TnNDI74ZQg5CX4lukFaK_lbVjnG-TaVVJEdN3s_ok",
    range: "Sheet1!A1:D41"
  },
  "California/Woodland/USA": {
    id: "1Dr4mbBqPkTvKR6OBfpCiHvz7CJsUxlzw-rtu-cXjRlA",
    range: "Sheet1!A1:D41"
  },
  "California/Yuba City/USA": {
    id: "1264Z5C0il28XgXsXf_49wZ4QhcDRD2LGUeb0aOhL7mk",
    range: "Sheet1!A1:D41"
  },
  "Florida/Miami/USA": {
    id: "1PXMZO1LGWo4TQU2k3D45unvQN7fhZ9GDT6d1ox6tI8Y",
    range: "Sheet1!A1:D41"
  },
  "Georgia/Lilburn/USA": {
    id: "10JI4HWahbH3H9b4WjjA6oMCt6fjpIdcsXLpo58ZuCz4",
    range: "Sheet1!A1:D41"
  },
  "Illinois/Bloomington/USA": {
    id: "173tvkXPDyX1wUa6W7hPRbXxhwKxzmLSYqAFBmq4ZvnI",
    range: "Sheet1!A1:D41"
  },
  "Illinois/Chicago/USA": {
    id: "1vOI4y7A0SfbkrcFPjyQ5cgydGTGrycrwglbs0yvxIRw",
    range: "Sheet1!A1:D41"
  },
  "Illinois/Lombard/USA": {
    id: "1MQN_oKrmy92tTYpXoTbJG78tNKM-ENzCCeMDs4__Gro",
    range: "Sheet1!A1:D41"
  },
  "Illinois/Schaumburg/USA": {
    id: "1NP35gD_FGznqtI1-SzLvJ4mkwCcagNGvQPCvAdLI_wM",
    range: "Sheet1!A1:D41"
  },
  "Illinois/Skokie/USA" : {
    id: "1piIR4er7HwXN00iFNzOkbGrgaQAVb_rxIGy8za89UhY",
    range: "Sheet1!A1:D41"
  },
  "Maryland/Baltimore/USA" : {
    id: "1zAh1Vbg82heZCviFknrdKSoC-PMjptrE5JBWEm-T5oE",
    range: "Sheet1!A1:D41"
  },
  "Maryland/Ellicot City/USA" : {
    id: "1LwhIQaM50PrJfkr4r6U964iwC1pJnq1dP_k0cAEPqKw",
    range: "Sheet1!A1:D41"
  },
  "Maryland/Langhorne/USA" : {
    id: "1zDniVeYL_dTZpvGS18pmklmmVDaCF0WGd3gX4yM9Y8A",
    range: "Sheet1!A1:D41"
  },
  "Maryland/Woodbridge/USA" : {
    id: "1pOkArNYjQWyD-qRWG_-VxDRTH9AAoxX_GcnlPfnTJB8",
    range: "Sheet1!A1:D41"
  },
  "New York/Bronx/USA" : {
    id: "19flAXbGnWQBTV9-GWTNokrQvEpgAJ83g2eoIKI-Fpek",
    range: "Sheet1!A1:D41"
  },
  "New York/Brooklyn/USA" : {
    id: "1olu4ln0OKYtsbWPIjtGerpbkUZqbxnePfUOjJ0D6eG4",
    range: "Sheet1!A1:D41"
  },
  "New York/Queens/USA" : {
    id: "1I6yvtg-XLON4TDbLRufS92_R58BAdpErP_KB3Wn7uEE",
    range: "Sheet1!A1:D41"
  },
  "New York/Valley Stream/USA" : {
    id: "1nTAnMynDiNJ05HhbfWieqz4a7nVgh6iRYD33n02R2og",
    range: "Sheet1!A1:D41"
  },
  "Texas/New Orleans/USA" : {
    id: "1XMJtXTPCGDrtHmoz8xgx_qoeSfylDUDP8l1iTZs9PlI",
    range: "Sheet1!A1:D41"
  },
  "Texas/Sugar Land/USA" : {
    id: "1YGC_xaiFWDI31SJhF5oa6gmFTOzktgGtKLpOoh02xIs",
    range: "Sheet1!A1:D41"
  },
  "Texas/Wylie/USA" : {
    id: "1JBhROkoHG09HzvaQxCO0WUjtUgHO8m7tySSZlxJFVCE",
    range: "Sheet1!A1:D41"
  },
  "Washington/Lynwood/USA" : {
    id: "1PAXcYLnUw-zKTuExtg6vAA84tPI29bZrNVdh_9UtOSw",
    range: "Sheet1!A1:D41"
  },
  "California/USA" : {
    id: "14LBe2hZvwx4lBik9k1jkPJvIrKoV_7X-RcYazHrnyrg",
    range: "Sheet1!A1:D41"
  },
  "Florida/USA" : {
    id: "1YAljj_sVKMp4fr7ShpFfy4EtSK1Dk_vqOXyS24KQ4kM",
    range: "Sheet1!A1:D41"
  },
  "Georgia/USA" : {
    id: "1asCNMkGvJcPqe6uSoPmdyNmgnfroMtQIvf7wzXDLQ6Q",
    range: "Sheet1!A1:D41"
  },
  "Illinois/USA" : {
    id: "12HPghBjP6v8LCvFIJ_Pe1TXAnQdaEgfjaJRBFR27cEQ",
    range: "Sheet1!A1:D41"
  },
  "Maryland/USA" : {
    id: "1ssgqClME3RbZxGqNfdQeT7bbZSwVk-fx-xWGJcLLh78",
    range: "Sheet1!A1:D41"
  },
  "New York/USA" : {
    id: "1znKOsK3qW8sfJGsnkuKGiiuMJ9rvRRTxr4RWjw9kZAw",
    range: "Sheet1!A1:D41"
  },
  "Texas/USA" : {
    id: "1wC4XLsWbAKiciLpIOKU6WeurEjEQpngXdgBI051_Iec",
    range: "Sheet1!A1:D41"
  },
  "Washington/USA" : {
    id: "1NQSfiwuRitYZkeBM7f6iF-ivrzpxAZpTo65Vh2Y50BM",
    range: "Sheet1!A1:D41"
  },
  "USA" : {
    id: "15sKA8JESDMKYD0t0Qc0INMOSKds7oKJ9Funok4TvFbs",
    range: "Sheet1!A1:D41"
  }
};

const metricLabels = [
  "Waking up for Fajr",
  "Tafseer",
  "Dars in Masjid",
  "Home Dars",
  "Area Dars",
  "Total Dars",
  "Madarsa in Home",
  "Participants in Home",
  "Madarsa at other places",
  "Participants at other places",
  "Total Madaris",
  "Total Students",
  "Daily Individual Efforts",
  "Monthly Individual Efforts",
  "Ijtema Qty",
  "Participants in Ijtema",
  "Participants in Night Etikaf",
  "Madani Muzakaras",
  "Madani Muzakara Participants",
  "How Many Times Area Visit",
  "Total Participants in Area Visit",
  "How-many-Times (A Day in the Path of the Almighty)",
  "How-many-Times (Session in other Languages)",
  "Total Participants (Session in other Languages)",
  "Numbers of Readers & Listener of Weekly Booklet",
  "Pious Booklet Distributed",
  "Pious Booklet Received",
  "Qafilah 3 Days Quantity",
  "Qafilah 3 Days Travellers",
  "Qafilah 12 Days Quantity",
  "Qafilah 12 Days Travellers",
  "Qafilah 1 Month Quantity",
  "Qafilah 1 Month Travellers",
  "Total Number Qafilas",
  "Total Participants Qafilas",
  "Total Number Madani Courses",
  "Total Number of Participants",
 ];

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
  const regionKey = e.target.value;
  const config = sheetIndex[regionKey];
  if (!accessToken) return alert("⚠️ Please sign in first.");
  if (!config) return showError("⚠️ Region not configured.");
  try {
    const rows = await fetchSheetData(config);
    renderTable(rows);
  } catch (err) {
    console.error("Sheet fetch failed:", err);
    showError("❌ Failed to load sheet data.");
  }
});
async function fetchSheetData(config) {
  const rawRange = `'${config.range.split("!")[0]}'!${config.range.split("!")[1]}`; // wrap only sheet name
  const res = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${config.id}/values/${rawRange}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  const data = await res.json();
  return data.values || [];
}


function renderTable(rows) {
  const container = document.getElementById("tableContainer");
  if (!container || !rows || rows.length === 0) return;

  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  const headers = ["12 Madani Tasks", "2024 Avg", "2025 Avg", "Difference between 2024 and 2025"];
  const headRow = document.createElement("tr");
  headers.forEach(header => {
    const th = document.createElement("th");
    th.textContent = header;
    headRow.appendChild(th);
  });
  thead.appendChild(headRow);

  rows.forEach(row => {
    const tr = document.createElement("tr");
    const [task, avg2024, avg2025] = row;

    const diff = (parseFloat(avg2025) - parseFloat(avg2024)).toFixed(2);
    [task, avg2024, avg2025, diff].forEach(cell => {
      const td = document.createElement("td");
      td.textContent = cell ?? "";
      tr.appendChild(td);
    });

    tbody.appendChild(tr);
  });

  table.appendChild(thead);
  table.appendChild(tbody);
  container.innerHTML = "";
  container.appendChild(table);
}

function showError(msg) {
  const container = document.getElementById("tableContainer");
  if (container) container.textContent = msg;
}

fetchSheetData();

