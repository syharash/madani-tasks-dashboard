const CLIENT_ID = "515935803707-v7qshp425m1b4h5ru6jcmmmu99qbikgq.apps.googleusercontent.com";
const API_KEY = "AIzaSyCl6PFx1jCh7xjc0HrEZbgAhkF7zRGU1Nw"; // Replace with actual API key
let accessToken = "";
const regionData = {
  "USA": {
      "California": ["Elk Grove", "Riverside", "Sacramento", "Woodland", "Yuba City"],
      "Florida": ["Miami"],
      "Georgia": ["Lilburn"],
      "Illinois": ["Bloomington", "Chicago", "Lombard", "Schaumburg", "Skokie"],
      "Maryland": ["Baltimore", "Ellicot City", "Langhorne", "Woodbridge"],
      "New York": ["Bronx", "Brooklyn", "Queens", "Valley Stream"],
      "Texas": ["New Orleans", "Sugar Land", "Wylie"],
      "Washington": ["Lynwood"],
      "States": ["California", "Florida", "Georgia", "Illinois", "Maryland", "New York", "Texas", "Washington"],
      "USA": ["USA"]
     }
};
// const DEVELOPER_KEY = "AIzaSyCl6PFx1jCh7xjc0HrEZbgAhkF7zRGU1Nw";
// const SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";


const sheetIndex = {
  "USA/California/Elk Grove": {id: "1RfkwD3PvC-nwV3tHVM8I706RMVzdBpWs4T0vOTnqZR4", range: "Sheet1!A1:D41"},
  "USA/California/Riverside": {id: "17dNm5PDmomzXkRooiQbOe-GEivFCM-mbRnbKjcLIpeU", range: "Sheet1!A5:D41"},
  "USA/California/Sacramento": {id: "1UBqdC7lbBOlxSSIi3-Cva826jam6B2JbAtNFuWpTbg8", range: "Sheet1!A5:D41"},
  "USA/California/Woodland": {id: "12zzwPmOSIAUAEyWet1MKfvrqp-4NAHnWWrG5JvnoeNI", range: "Sheet1!A5:D41"},
  "USA/California/Yuba City": {id: "1YQH5S0lxUr37VwaZBzhOCUjoL6bRJ6lC-nBREkobNF8", range: "Sheet1!A5:D41"},
  "USA/Florida/Miami": {id: "1llr7vVUIZW9QME8RGm4FE-7m267TgYS7Ultw_7QncVI", range: "Sheet1!A5:D41"},
  "USA/Georgia/Lilburn": {id: "15UWcv2eVAyYzvedfg4EfhmRjyuoppd2b-j6PjvPAPn4", range: "Sheet1!A5:D41"},
  "USA/Illinois/Bloomington": {id: "17nhZd9fMoxtaDLRVMIHqI8caskFc40XjQciC7F1vFpE", range: "Sheet1!A5:D41"},
  "USA/Illinois/Chicago": {id: "13E1CISmTfkGL73ASN5J0TaOSclo0SbZLRPZqQw-8W_k", range: "Sheet1!A5:D41"},
  "USA/Illinois/Lombard": {id: "1OIUTzrD2_DY8l1I5QzbOkmtLQZfJGrNJL9zzG4ks7zI", range: "Sheet1!A5:D41"},
  "USA/Illinois/Schaumburg": {id: "1WB49Iv0EXyQGjz9oYMrD2usbRMTgJjV5t9iBui5wdT8", range: "Sheet1!A5:D41"},
  "USA/Illinois/Skokie" : {id: "1ea8qSaisxImAkng3tTKa-U0ETXm9WsC4cJ5w42UslZo", range: "Sheet1!A5:D41"},
  "USA/Maryland/Baltimore" : {id: "1D-er6wHw6VJwLl1Vy7GXVi1KekxcAW6lR2-zgcxs4Yg", range: "Sheet1!A5:D41"},
  "USA/Maryland/Ellicot City" : {id: "1nVQpqXs6yMuZgVwbyZJXblx4Yye7nMABcBAXIK8z9KI", range: "Sheet1!A5:D41"},
  "USA/Maryland/Langhorne" : {id: "1LGrmCa-XaKWekiGMQiKDdGdyiH5Z75ozpR03pFjjSdc", range: "Sheet1!A5:D41"},
  "USA/Maryland/Woodbridge" : {id: "1it9kwrkmtllzSi7fwRD1kt4g__gYHDu8epFY3rtvZME", range: "Sheet1!A5:D41"},
  "USA/New York/Bronx" : {id: "1_FPyNfoRvDuU_-V3snv1_lu4LY7VWgKG5Ai-ifFDneQ", range: "Sheet1!A5:D41"},
  "USA/New York/Brooklyn" : {id: "1XZKeCe7TiSltyYBOvVZOiNrQ9vQByjjpSexh5NhITtY", range: "Sheet1!A5:D41"},
  "USA/New York/Queens" : {id: "1J8DSpXU5VtyRvIqiSLbMYlfZAAChM4Kt89wsQwBMpAk", range: "Sheet1!A5:D41"},
  "USA/New York/Valley Stream" : {id: "1t2QkPU66O9VxdLG9cvy0U0LJyfaxJ56SSrP5ItOsPc8", range: "Sheet1!A5:D41"},
  "USA/Texas/New Orleans" : {id: "1vU1LFaUqW0m1slHKVIAdCUT1zgLiwLAJ072w-I3zJM4", range: "Sheet1!A5:D41"},
  "USA/Texas/Sugar Land" : {id: "1eTZ6yseR7zaqbVRQK82NaFA5qxGzhtQHkUo-3WgMYFk", range: "Sheet1!A5:D41"},
  "USA/Texas/Wylie" : {id: "1KjioDwq3G28fx59fTCBMP8uZ8yeLWnAsMq8ZCwbQ8ws", range: "Sheet1!A5:D41"},
  "USA/Washington/Lynwood" : {id: "1bMMaZrx7JtNyu2Gymvw9GTrwKBzsV_ORw9hyrrpvw9Y", range: "Sheet1!A5:D41"},
  "USA/States/California" : {id: "1RlMjNlQ6MGuD2Ys2tTtCLQwdvPffs2SknqsoVOmZTdo", range: "Sheet1!A5:D41"},
  "USA/States/Florida" : {id: "1Ou5Z159QAkXIoL5HeHeNd8MiKaXiO7ihL5crHawd53g", range: "Sheet1!A5:D41"},
  "USA/States/Georgia" : {id: "1wpmACw4kp3-TkCSpLcEKluiyPEggaoh7Nx5IE5Trank", range: "Sheet1!A5:D41"},
  "USA/States/Illinois" : {id: "1zAlkC-PJVtAzhBTI7iIVwuLwxB8fDa_Q4wBuzDSiu6g", range: "Sheet1!A5:D41"},
  "USA/States/Maryland" : {id: "1WN1DdDte__4SqTJrOaAHQZihp_OkIncO_Od3_ENm8C8", range: "Sheet1!A5:D41"},
  "USA/States/New York" : {id: "1-UwhJEWsq4XrWcgH_6TBDTEVzMjNFB6wsA_RKuWcr_A", range: "Sheet1!A5:D41"},
  "USA/States/Texas" : {id: "1iP72PvYvGBZ9J-gNEItweKLY85f_gI-4tzI8ojAMiKg", range: "Sheet1!A5:D41"},
  "USA/States/Washington" : {id: "1FyvZMhrpWSBcwc7qtMloChB6r9aYcuHSL7IarS-4ZGw", range: "Sheet1!A5:D41"},
  "USA" : {id: "1elFQ7EojnR-7mfbG430HU83zP-q62TIgKAWiNo9zo9s", range: "Sheet1!A5:D41"}
};

const metricLabels = ["Waking up for Fajr", "Tafseer", "Dars in Masjid", "Home Dars", "Area Dars", "Total Dars", "Madarsa in Home","Participants in Home",
  "Madarsa at other places", "Participants at other places", "Total Madaris", "Total Students", "Daily Individual Efforts", "Monthly Individual Efforts",
  "Ijtema Qty", "Participants in Ijtema", "Participants in Night Etikaf", "Madani Muzakaras", "Madani Muzakara Participants", "How Many Times Area Visit",
  "Total Participants in Area Visit", "How-many-Times (A Day in the Path of the Almighty)", "How-many-Times (Session in other Languages)", "Total Participants (Session in other Languages)",
  "Numbers of Readers & Listener of Weekly Booklet", "Pious Booklet Distributed", "Pious Booklet Received", "Qafilah 3 Days Quantity", "Qafilah 3 Days Travellers",
  "Qafilah 12 Days Quantity", "Qafilah 12 Days Travellers", "Qafilah 1 Month Quantity", "Qafilah 1 Month Travellers", "Total Number Qafilas", "Total Participants Qafilas",
  "Total Number Madani Courses", "Total Number of Participants",];

// 🚀 Initialize after DOM ready
document.addEventListener("DOMContentLoaded", () => {
  setupSignIn();
  //setupRegionDropdowns();
  restorePreviousSelection();
  setupRegionFilters();
  bindCityInput();
  bindClearButton();
});

// 🔐 Sign-in logic
function setupSignIn() {
  const btn = document.getElementById("signin-btn");
  btn.onclick = () => {
    const tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: "https://www.googleapis.com/auth/spreadsheets.readonly https://www.googleapis.com/auth/drive.metadata.readonly",
      callback: (resp) => {
        accessToken = resp.access_token;
        alert("✅ Signed in successfully!");
        clearError();
      }
    });
    tokenClient.requestAccessToken();
  };
}

// 🧭 Region logic
//function setupRegionDropdowns() {
//  const regionData = {
  //  "USA": {
    //  "California": ["Elk Grove", "Riverside", "Sacramento", "Woodland", "Yuba City"],
      //"Florida": ["Miami"],
      //"Georgia": ["Lilburn"],
      //"Illinois": ["Bloomington", "Chicago", "Lombard", "Schaumburg", "Skokie"],
      //"Maryland": ["Baltimore", "Ellicot City", "Langhorne", "Woodbridge"],
      //"New York": ["Bronx", "Brooklyn", "Queens", "Valley Stream"],
      //"Texas": ["New Orleans", "Sugar Land", "Wylie"],
      //"Washington": ["Lynwood"],
      //"States": ["California", "Florida", "Georgia", "Illinois", "Maryland", "New York", "Texas", "Washington"],
      //"USA": ["USA"]
   // }
  //};

  const countrySelect = document.getElementById("country-select");
  const stateSelect = document.getElementById("state-select");
  const cityInput = document.getElementById("city-input");
  const cityOptions = document.getElementById("city-options");

  Object.keys(regionData).forEach(country => {
    countrySelect.add(new Option(country, country));
  });

  countrySelect.addEventListener("change", () => {
    const country = countrySelect.value;
    stateSelect.innerHTML = '<option value="">-- Choose a state --</option>';
    cityInput.disabled = true;
    cityOptions.innerHTML = "";
    stateSelect.disabled = !regionData[country];

    if (regionData[country]) {
      Object.keys(regionData[country]).forEach(state => {
        stateSelect.add(new Option(state, state));
      });
    }
  });

  stateSelect.addEventListener("change", () => {
    const country = countrySelect.value;
    const state = stateSelect.value;
    const cities = regionData[country]?.[state] || [];

    let labelText = "City:";
    let placeholderText = "Start typing a city...";
    let showCity = true;

    if (state === "USA") {
      labelText = "Country:";
      placeholderText = "Select a country...";
      showCity = false;
    } else if (state === "States") {
      labelText = "State:";
      placeholderText = "Select a state...";
      showCity = false;
    }

    setLocationContext(labelText, placeholderText, cities, showCity);
  });

  cityInput.addEventListener("input", async () => {
    clearError();
    const country = countrySelect.value;
    const state = stateSelect.value;
    const city = cityInput.value;
    if (!country || !state || !city) return;

    const regionKey = `${country}/${state}/${city}`.replace(/\s+/g, " ").trim();
    const config = sheetIndex[regionKey];
    localStorage.setItem("regionKey", regionKey);

    if (!accessToken) {
      showError("⚠️ You need to sign in to view data.");
      return;
    }
    if (!config) return showError(`❌ Region not found: ${regionKey}`);

    try {
      const rows = await fetchSheetData(config);
      renderTable(rows);
      cityInput.setAttribute("placeholder", city);
      cityInput.value = "";
    } catch (err) {
      console.error("Sheet fetch failed:", err);
      showError("❌ Failed to load sheet data.");
    }
  });
}

// 🧩 Modular location handler
function setLocationContext(labelText, placeholderText, options = [], enableInput = true) {
  const label = document.querySelector('label[for="city-input"]');
  const input = document.getElementById("city-input");
  const datalist = document.getElementById("city-options");
  const regionNote = document.getElementById("region-note");
  const clearBtn = document.getElementById("clearBtn");
  const cityInputGroup = input.closest('.selector-group') || input;

  if (label) label.textContent = labelText;
  input.placeholder = placeholderText;
  input.value = "";
  datalist.innerHTML = "";
  input.disabled = !enableInput;

  options.forEach(opt => {
    const el = document.createElement("option");
    el.value = opt;
    datalist.appendChild(el);
  });

  const guidance = {
    "Country:": "Select the country for Country Summary Metrics.",
    "State:": "Select a state for summary metrics.",
    "City:": ""
  };

  if (regionNote) {
    regionNote.textContent = guidance[labelText] || "";
    regionNote.classList.remove("visible");
    void regionNote.offsetWidth;
    regionNote.classList.add("visible");
  }

  if (cityInputGroup) cityInputGroup.classList.toggle("hidden", !enableInput);
  if (clearBtn) clearBtn.style.display = enableInput ? "inline-block" : "none";
}

// 💾 Restore previous selection
function restorePreviousSelection() {
  const savedKey = localStorage.getItem("regionKey");
  if (!savedKey) return;

  const [country, state, city] = savedKey.split("/");
  const countrySelect = document.getElementById("country-select");
  const stateSelect = document.getElementById("state-select");
  const cityInput = document.getElementById("city-input");

  countrySelect.value = country;
  countrySelect.dispatchEvent(new Event("change"));

  setTimeout(() => {
    stateSelect.value = state;
    stateSelect.dispatchEvent(new Event("change"));

    setTimeout(() => {
      cityInput.value = city;
      cityInput.dispatchEvent(new Event("input"));
    }, 300);
  }, 300);
}

function setupRegionFilters() {
  const countryDropdown = document.getElementById("countryDropdown");
  const stateDropdown = document.getElementById("stateDropdown");
  const cityInput = document.getElementById("city-input");
  const cityOptions = document.getElementById("city-options");

  Object.keys(regionData).forEach(country => {
    const opt = document.createElement("option");
    opt.value = country;
    opt.textContent = country;
    countryDropdown.appendChild(opt);
  });

  countryDropdown.addEventListener("change", () => {
    const selectedCountry = countryDropdown.value;
    const states = Object.keys(regionData[selectedCountry] || {});

    stateDropdown.innerHTML = '<option value="">-- Choose a state --</option>';
    cityInput.disabled = true;
    cityOptions.innerHTML = "";
    stateDropdown.disabled = !states.length;

    states.forEach(state => {
      const opt = document.createElement("option");
      opt.value = state;
      opt.textContent = state;
      stateDropdown.appendChild(opt);
    });
  });

  stateDropdown.addEventListener("change", () => {
    const selectedCountry = countryDropdown.value;
    const selectedState = stateDropdown.value;
    const cities = regionData[selectedCountry]?.[selectedState] || [];

    cityOptions.innerHTML = "";
    cityInput.disabled = cities.length === 0;

    cities.forEach(city => {
      const opt = document.createElement("option");
      opt.value = city;
      cityOptions.appendChild(opt);
    });

    document.getElementById("region-note").textContent = cities.length
      ? `Now enter a city from ${selectedState}.`
      : `No cities found for ${selectedState}.`;
  });
}

function getStatesForCountry(code) {
  switch (code) {
    case "USA":
      return [
        { code: "CA", name: "California" },
        { code: "NY", name: "New York" },
        { code: "TX", name: "Texas" },
        // More states
      ];
    case "CAN":
      return [
        { code: "ON", name: "Ontario" },
        { code: "BC", name: "British Columbia" },
        { code: "QC", name: "Quebec" }
      ];
    case "MEX":
      return [
        { code: "CMX", name: "Mexico City" },
        { code: "JAL", name: "Jalisco" },
        { code: "NL", name: "Nuevo León" }
      ];
    default:
      return [];
  }
}

function bindCityInput() {
  const input = document.getElementById("city-input");
  const note = document.getElementById("region-note");

  input.addEventListener("input", () => {
    const value = input.value.trim();
    if (value.length > 0) {
      note.style.opacity = 1;
      note.textContent = `Filtering data for "${value}"…`;
    } else {
      note.style.opacity = 0;
      note.textContent = "";
    }
  });
}

function bindClearButton() {
  const input = document.getElementById("city-input");
  const note = document.getElementById("region-note");

  document.getElementById("clearBtn").addEventListener("click", () => {
    input.value = "";
    input.disabled = true;
    note.style.opacity = 0;
    note.textContent = "";
  });
}

// 📡 Fetch from Sheets
async function fetchSheetData(config) {
  const [sheetName, rangePart] = config.range.split("!");
  const range = `'${sheetName}'!${rangePart}`;
  const res = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${config.id}/values/${range}`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  const data = await res.json();
  return data.values || [];
}

// 📊 Table renderer
function renderTable(rows) {
  const container = document.getElementById("tableContainer");
  if (!container || !rows || rows.length === 0) return;

  const headers = ["12 Madani Tasks", "2024 Avg", "2025 Avg", "Difference"];
  const table = document.createElement("table");
  const thead = document.createElement("thead");
  const tbody = document.createElement("tbody");

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
      const diffClass = percentChange > 0 ? "positive" : percentChange < 0 ? "negative" : "neutral";
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

  const status = document.getElementById("statusBanner");
  if (status) {
    status.textContent = msg;
    status.classList.add("error");
  }
}

function clearError() {
  const container = document.getElementById("tableContainer");
  if (container) container.textContent = "";
}
