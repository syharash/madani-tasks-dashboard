const CLIENT_ID = "515935803707-v7qshp425m1b4h5ru6jcmmmu99qbikgq.apps.googleusercontent.com";
// const DEVELOPER_KEY = "AIzaSyCl6PFx1jCh7xjc0HrEZbgAhkF7zRGU1Nw";
// const SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

let accessToken = "";

const sheetIndex = {
  "California/Elk Groove/USA": {
    id: "199nKELI9fl5mUEv7JH8RfGa3BY3PXhq1",
    range: "'Elk Groove-YrWise-2024-2025'!A1:AM10"
  },
  "California/Riverside/USA": {
    id: "1SEkYpzNmAFDgDHIESHBefadLHrzSD81y",
    range: "'Riverside-YrWise-2024-2025'!A1:AM10"
  },
  "California/Sacramento/USA": {
    id: "19bVTRb53sDT0dyoZZl6w3Fllv6LglMcu",
    range: "Sacramento-YrWise-2024-2025!A1:AM10"
  },
  "California/Woodland/USA": {
    id: "1aLVbbFxHAGPwTTVB4mDykhXmvdfQRqOc",
    range: "Woodland-YrWise-2024-2025!A1:AM10"
  },
  "California/Yuba City/USA": {
    id: "1UT1d9ehxM-YG5pTDlvqJVhOA8Xb0u5f4",
    range: "Yuba City-YrWise-2024-2025!A1:AM10"
  },
  "Florida/Miami/USA": {
    id: "1Fuel8zEeFBWoOC7TusJ8_yYzdurrIMBc",
    range: "Miami-YrWise-2024-2025!A1:AM10"
  },
  "Georgia/Lilburn/USA": {
    id: "1BuIgKkWldPVbTa-6PlPF3VdoSSEyFa2N",
    range: "Lilburn-YrWise-2024-2025!A1:AM10"
  },
  "Illinois/Bloomington/USA": {
    id: "13rpc2f69T0UKgMM9tp9pIvi1-tK1z0AN",
    range: "Bloomington-YrWise-2024-2025!A1:AM10"
  },
  "Illinois/Chicago/USA": {
    id: "1Ahn0AXkCVP5JR0i9rhuuBjjgfVLdWqD_",
    range: "Chicago-YrWise-2024-2025!A1:AM10"
  },
  "Illinois/Lombard/USA": {
    id: "13AvHweTaP5My0Cf5uLrDaxzCU86LsIS_",
    range: "Lombard-YrWise-2024-2025!A1:AM10"
  },
  "Illinois/Schaumburg/USA": {
    id: "1U4npluXtW28Fr-6C5QMGoJmc-TV7wL2G",
    range: "Schaumburg-YrWise-2024-2025!A1:AM10"
  },
  "Illinois/Skokie/USA" : {
    id: "13xyuvYKQrJq-nQil8uo30H9byX8_STBD",
    range: "Skokie-YrWise-2024-2025!A1:AM10"
  },
  "Maryland/Baltimore/USA" : {
    id: "1m-ZEJfVIm6h4Bp9pM3qaHyZ2TzcVfzuM",
    range: "Baltimore-YrWise-2024-2025!A1:AM10"
  },
  "Maryland/Ellicot City/USA" : {
    id: "1LIiuwYtVryy1d6uB2boT7_yM2VEBgCie",
    range: "Ellicot-City-YrWise-2024-2025!A1:AM10"
  },
  "Maryland/Langhorne/USA" : {
    id: "1mm-BliR_zCJTWWdQF4FZ5xu9wayL4YC2",
    range: "Langhorne-YrWise-2024-2025!A1:AM10"
  },
  "Maryland/Woodbridge/USA" : {
    id: "1-YdA_zLyxVM-qxVeHKTqPvt75UxTTK6a",
    range: "Woodbridge-YrWise-2024-2025!A1:AM10"
  },
  "New York/Bronx/USA" : {
    id: "13M-AhU61gCMul_z8BMzFyOwX_T5YjtOr",
    range: "Bronx-YrWise-2024-2025!A1:AM10"
  },
  "New York/Brooklyn/USA" : {
    id: "19HvmEkYFnQNahg6_hLkjiNfqZMw9qldZ",
    range: "Brooklyn-YrWise-2024-2025!A1:AM10"
  },
  "New York/Queens/USA" : {
    id: "1LcqpUDfwQkbnY2KO5BbVrlJGqKUgDNc4",
    range: "Queens-YrWise-2024-2025!A1:AM10"
  },
  "New York/Valley Stream/USA" : {
    id: "1xLlpMA1Lu7aa7fO2PulT9bKoJv6guUep",
    range: "Valley Stream-YrWise-2024-2025!A1:AM10"
  },
  "Texas/New Orleans/USA" : {
    id: "1jiWGTOBvtUff45mXUv-7t_6MG0R0povg",
    range: "New Orleans-YrWise-2024-2025!A1:AM10"
  },
  "Texas/Sugar Land/USA" : {
    id: "1ntD4TUp-jSSwbwoYdN7Vx80blbYE6mja",
    range: "Sugar Land-YrWise-2024-2025!A1:AM10"
  },
  "Texas/Wylie/USA" : {
    id: "1foH8Xfu3Mntn5qVzrQuV7KnpiFJa1G5k",
    range: "Wylie-YrWise-2024-2025!A1:AM10"
  },
  "Washington/Lynwood/USA" : {
    id: "1w01xMO7R6dYPn0mTU5nRivB30o6P_ckl",
    range: "Lynnwood-YrWise-2024-2025!A1:AM10"
  },
  "California/USA" : {
    id: "1Ri6Bpz1DxU8S6mp0_pQzMKLCW2zOpMl5",
    range: "California-YrWise-2024-2025!A1:AM10"
  },
  "Florida/USA" : {
    id: "1LOy8VxPItttyNo_7vAMbnDDMA_9Mynqg",
    range: "Florid-YrWise-2024-2025!A1:AM10"
  },
  "Georgia/USA" : {
    id: "15P4bzUvdZI2QoOnzwoHcHYFBeVSHQ9E1",
    range: "Georgia-YrWise-2024-2025!A1:AM10"
  },
  "Illinois/USA" : {
    id: "1YPD6bXfUkRubbzUZD1e9-etjdqZhUbbl",
    range: "Illinois-YrWise-2024-2025!A1:AM10"
  },
  "Maryland/USA" : {
    id: "1iiyvNNG2NZ0Lybd8p7aHDranqkjLbhCu",
    range: "Maryland-YrWise-2024-2025!A1:AM10"
  },
  "New York/USA" : {
    id: "1CPxIeD4kTbJ2wws6IyT8vztK7eHEuUnr",
    range: "New York-YrWise-2024-2025!A1:AM10"
  },
  "Texas/USA" : {
    id: "1WoYZ8ZnJn5QgbXeNgjOpFFzoIIqMTJbQ",
    range: "Texas-YrWise-2024-2025!A1:AM10"
  },
  "Washington/USA" : {
    id: "1fDaHkPVXTBnXiMzY4mugTIr3Gc6u5him",
    range: "Washington-YrWise-2024-2025!A1:AM10"
  },
  "USA" : {
    id: "1ERQ4nMaLkFWVw649Kw777Wdm55wtX9Qf",
    range: "USA-YrWise-2024-2025!A1:AM10"
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
