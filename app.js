const CLIENT_ID = "515935803707-v7qshp425m1b4h5ru6jcmmmu99qbikgq.apps.googleusercontent.com";
const API_KEY = "AIzaSyCl6PFx1jCh7xjc0HrEZbgAhkF7zRGU1Nw"; // Replace with actual API key
let accessToken = "";

// const DEVELOPER_KEY = "AIzaSyCl6PFx1jCh7xjc0HrEZbgAhkF7zRGU1Nw";
// const SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";


const sheetIndex = {
  "California/Elk Groove/USA": {
    id: "1RfkwD3PvC-nwV3tHVM8I706RMVzdBpWs4T0vOTnqZR4",
    range: "Sheet1!A5:D41"
  },
  "California/Riverside/USA": {
    id: "17dNm5PDmomzXkRooiQbOe-GEivFCM-mbRnbKjcLIpeU",
    range: "Sheet1!A5:D41"
  },
  "California/Sacramento/USA": {
    id: "1UBqdC7lbBOlxSSIi3-Cva826jam6B2JbAtNFuWpTbg8",
    range: "Sheet1!A5:D41"
  },
  "California/Woodland/USA": {
    id: "12zzwPmOSIAUAEyWet1MKfvrqp-4NAHnWWrG5JvnoeNI",
    range: "Sheet1!A5:D41"
  },
  "California/Yuba City/USA": {
    id: "1YQH5S0lxUr37VwaZBzhOCUjoL6bRJ6lC-nBREkobNF8",
    range: "Sheet1!A5:D41"
  },
  "Florida/Miami/USA": {
    id: "1llr7vVUIZW9QME8RGm4FE-7m267TgYS7Ultw_7QncVI",
    range: "Sheet1!A5:D41"
  },
  "Georgia/Lilburn/USA": {
    id: "15UWcv2eVAyYzvedfg4EfhmRjyuoppd2b-j6PjvPAPn4",
    range: "Sheet1!A5:D41"
  },
  "Illinois/Bloomington/USA": {
    id: "17nhZd9fMoxtaDLRVMIHqI8caskFc40XjQciC7F1vFpE",
    range: "Sheet1!A5:D41"
  },
  "Illinois/Chicago/USA": {
    id: "13E1CISmTfkGL73ASN5J0TaOSclo0SbZLRPZqQw-8W_k",
    range: "Sheet1!A5:D41"
  },
  "Illinois/Lombard/USA": {
    id: "1OIUTzrD2_DY8l1I5QzbOkmtLQZfJGrNJL9zzG4ks7zI",
    range: "Sheet1!A5:D41"
  },
  "Illinois/Schaumburg/USA": {
    id: "1WB49Iv0EXyQGjz9oYMrD2usbRMTgJjV5t9iBui5wdT8",
    range: "Sheet1!A5:D41"
  },
  "Illinois/Skokie/USA" : {
    id: "1ea8qSaisxImAkng3tTKa-U0ETXm9WsC4cJ5w42UslZo",
    range: "Sheet1!A5:D41"
  },
  "Maryland/Baltimore/USA" : {
    id: "1D-er6wHw6VJwLl1Vy7GXVi1KekxcAW6lR2-zgcxs4Yg",
    range: "Sheet1!A5:D41"
  },
  "Maryland/Ellicot City/USA" : {
    id: "1nVQpqXs6yMuZgVwbyZJXblx4Yye7nMABcBAXIK8z9KI",
    range: "Sheet1!A5:D41"
  },
  "Maryland/Langhorne/USA" : {
    id: "1LGrmCa-XaKWekiGMQiKDdGdyiH5Z75ozpR03pFjjSdc",
    range: "Sheet1!A5:D41"
  },
  "Maryland/Woodbridge/USA" : {
    id: "1it9kwrkmtllzSi7fwRD1kt4g__gYHDu8epFY3rtvZME",
    range: "Sheet1!A5:D41"
  },
  "New York/Bronx/USA" : {
    id: "1_FPyNfoRvDuU_-V3snv1_lu4LY7VWgKG5Ai-ifFDneQ",
    range: "Sheet1!A5:D41"
  },
  "New York/Brooklyn/USA" : {
    id: "1XZKeCe7TiSltyYBOvVZOiNrQ9vQByjjpSexh5NhITtY",
    range: "Sheet1!A5:D41"
  },
  "New York/Queens/USA" : {
    id: "1J8DSpXU5VtyRvIqiSLbMYlfZAAChM4Kt89wsQwBMpAk",
    range: "Sheet1!A5:D41"
  },
  "New York/Valley Stream/USA" : {
    id: "1t2QkPU66O9VxdLG9cvy0U0LJyfaxJ56SSrP5ItOsPc8",
    range: "Sheet1!A5:D41"
  },
  "Texas/New Orleans/USA" : {
    id: "1vU1LFaUqW0m1slHKVIAdCUT1zgLiwLAJ072w-I3zJM4",
    range: "Sheet1!A5:D41"
  },
  "Texas/Sugar Land/USA" : {
    id: "1eTZ6yseR7zaqbVRQK82NaFA5qxGzhtQHkUo-3WgMYFk",
    range: "Sheet1!A5:D41"
  },
  "Texas/Wylie/USA" : {
    id: "1KjioDwq3G28fx59fTCBMP8uZ8yeLWnAsMq8ZCwbQ8ws",
    range: "Sheet1!A5:D41"
  },
  "Washington/Lynwood/USA" : {
    id: "1bMMaZrx7JtNyu2Gymvw9GTrwKBzsV_ORw9hyrrpvw9Y",
    range: "Sheet1!A5:D41"
  },
  "California/USA" : {
    id: "1RlMjNlQ6MGuD2Ys2tTtCLQwdvPffs2SknqsoVOmZTdo",
    range: "Sheet1!A5:D41"
  },
  "Florida/USA" : {
    id: "1Ou5Z159QAkXIoL5HeHeNd8MiKaXiO7ihL5crHawd53g",
    range: "Sheet1!A5:D41"
  },
  "Georgia/USA" : {
    id: "1wpmACw4kp3-TkCSpLcEKluiyPEggaoh7Nx5IE5Trank",
    range: "Sheet1!A5:D41"
  },
  "Illinois/USA" : {
    id: "1zAlkC-PJVtAzhBTI7iIVwuLwxB8fDa_Q4wBuzDSiu6g",
    range: "Sheet1!A5:D41"
  },
  "Maryland/USA" : {
    id: "1WN1DdDte__4SqTJrOaAHQZihp_OkIncO_Od3_ENm8C8",
    range: "Sheet1!A5:D41"
  },
  "New York/USA" : {
    id: "1-UwhJEWsq4XrWcgH_6TBDTEVzMjNFB6wsA_RKuWcr_A",
    range: "Sheet1!A5:D41"
  },
  "Texas/USA" : {
    id: "1iP72PvYvGBZ9J-gNEItweKLY85f_gI-4tzI8ojAMiKg",
    range: "Sheet1!A5:D41"
  },
  "Washington/USA" : {
    id: "1FyvZMhrpWSBcwc7qtMloChB6r9aYcuHSL7IarS-4ZGw",
    range: "Sheet1!A5:D41"
  },
  "USA" : {
    id: "1elFQ7EojnR-7mfbG430HU83zP-q62TIgKAWiNo9zo9s",
    range: "Sheet1!A5:D41"
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

document.addEventListener("DOMContentLoaded", () => {
  setupSignIn();
  setupRegionSelector(); // updated below
});

function setupSignIn() {
  document.getElementById("signin-btn").onclick = () => {
    const tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: "https://www.googleapis.com/auth/spreadsheets.readonly https://www.googleapis.com/auth/drive.metadata.readonly",
      callback: (tokenResponse) => {
        accessToken = tokenResponse.access_token;
        alert("✅ Signed in successfully!");
      }
    });
    tokenClient.requestAccessToken();
  };
}

function setupRegionSelector() {
  const countrySelect = document.getElementById("country-select");
  const stateSelect = document.getElementById("state-select");
  const cityInput = document.getElementById("city-input");

  cityInput.addEventListener("input", async () => {
    const country = countrySelect.value;
    const state = stateSelect.value;
    const city = cityInput.value;
    if (!country || !state || !city) return;

    const regionKey = `${country}/${state}/${city}`.replace(/\s+/g, " ").trim();
    const config = sheetIndex[regionKey];

    if (!accessToken) return alert("⚠️ Please sign in first.");
    if (!config) return showError(`⚠️ Region not found: ${regionKey}`);

    try {
      const rows = await fetchSheetData(config);
      renderTable(rows);
    } catch (err) {
      console.error("Sheet fetch failed:", err);
      showError("❌ Failed to load sheet data.");
    }
  });
}

async function fetchSheetData(config) {
  const rawRange = `'${config.range.split("!")[0]}'!${config.range.split("!")[1]}`;
  const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${config.id}/values/${rawRange}`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  const data = await res.json();
  return data.values || [];
}

function renderTable(rows) {
  const container = document.getElementById("tableContainer");
  if (!container || !rows || rows.length === 0) return;

  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

  const headers = ["12 Madani Tasks", "2024 Avg", "2025 Avg", "Difference"];
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

    const num2024 = parseFloat(avg2024 || 0);
    const num2025 = parseFloat(avg2025 || 0);

    [task, avg2024, avg2025].forEach(cell => {
      const td = document.createElement("td");
      td.textContent = cell ?? "";
      tr.appendChild(td);
    });

    const diffTd = document.createElement("td");
    diffTd.className = "diff-cell";

    if (num2024 !== 0) {
      const percentChange = ((num2025 - num2024) / num2024) * 100;
      const changeRounded = percentChange.toFixed(2);
      const diffClass =
        percentChange > 0 ? "positive" :
        percentChange < 0 ? "negative" :
        "neutral";

      const barWidth = Math.min(Math.abs(percentChange), 100);

      diffTd.innerHTML = `
        <div class="bar-cell">
          <div class="bar ${diffClass}" style="width: ${barWidth}%"></div>
          <span class="bar-label">${percentChange > 0 ? "+" : ""}${changeRounded}%</span>
        </div>
      `;
    } else {
      diffTd.textContent = "–";
    }

    tr.appendChild(diffTd);
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
