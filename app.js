const CLIENT_ID = "515935803707-v7qshp425m1b4h5ru6jcmmmu99qbikgq.apps.googleusercontent.com";
// const DEVELOPER_KEY = "AIzaSyCl6PFx1jCh7xjc0HrEZbgAhkF7zRGU1Nw";
// const SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

let accessToken = "";
const sheetIndex = {
  "California/Elk Grove/USA": {
    id: "1D-er6wHw6VJwLl1Vy7GXVi1KekxcAW6lR2-zgcxs4Yg",
    range: "Sheet1!A3:AM5"
  },
  "California/Riverside/USA": {
    id: "1iygvJ-hGlaBT23zKlVJksdUcU3xOMtZ10wFvgUa5MnA",
    range: "Riverside!A8:AM10"
  }
};

const metricLabels = [
  "Weekly Booklet Reading",
  "Pious Deeds Booklet",
  "Waking up for fajr",
  "Tafseer Session",
  "Madani Qafila",
  "Dars",
  "Madrasah Balighan",
  "Madani Courses",
  "Individual Efforts",
  "Weekly Ijtima",
  "Madani Muzakara",
  "Area Visit",
  "A Day / Other Languages",
  "Readers & Listener",
  "Distributed",
  "Total Participants",
  "Received",
  "Sub Unit Places",
  "3 Days Quantity",
  "In Masjid",
  "3 Days Travellers",
  "Home Dars",
  "12 Days Quantity",
  "Chowk / Area Dars",
  "12 Days Travellers",
  "Total Dars",
  "1 Month Quantity",
  "In Masjid",
  "1 Month Travellers",
  "Total Participants",
  "Total Qafila",
  "At Other Places",
  "Total Participants Qafila",
  "Total Participants",
  "Total Madani Courses",
  "Total Madaris",
  "Total Course Participants",
  "Daily Participants",
  "Monthly Participants",
  "Total Ijtema",
  "Ijtema Participants",
  "Night Etikaf",
  "Etikaf Sub Units",
  "Etikaf Participants",
  "Etikaf Times",
  "Etikaf Total Participants",
  "Times (A Day)",
  "Times (Other Lang)",
  "Participants (Other Lang)"
];

const getAuthToken = () => {
  // Your OAuth token logic here — ideally loaded from localStorage or a secure flow
  return "Bearer YOUR_OAUTH_TOKEN";
};

async function fetchSheetData(regionKey) {
  const { id, range } = sheetIndex[regionKey];
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${id}/values/${range}`;

  const response = await fetch(url, {
    headers: {
      Authorization: getAuthToken(),
      Accept: "application/json"
    }
  });

  const data = await response.json();
  return data.values || [];
}

function parseVerticalMetrics(values) {
  return values.map((row, index) => {
    const label = row[0] || `Metric Row ${index + 1}`;
    const metrics = row.slice(1).map((value, i) => ({
      category: metricLabels[i] || `Metric ${i + 1}`,
      value: Number(value || 0).toFixed(2)
    }));
    return { label, metrics };
  });
}

function renderDashboard(regionKey) {
  fetchSheetData(regionKey).then(values => {
    const parsed = parseVerticalMetrics(values);
    const container = document.getElementById("metrics");
    container.innerHTML = "";

    parsed.forEach(section => {
      const title = document.createElement("h3");
      title.textContent = section.label;
      container.appendChild(title);

      const ul = document.createElement("ul");
      section.metrics.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.category}: ${item.value}`;
        ul.appendChild(li);
      });

      container.appendChild(ul);
    });
  }).catch(err => {
    console.error("Error fetching sheet data:", err);
    document.getElementById("metrics").innerHTML = `<p>Error loading data</p>`;
  });
}

// Trigger initial load (example)
renderDashboard("California/Elk Grove/USA");

// Optionally listen for region change
document.getElementById("regionSelector").addEventListener("change", e => {
  renderDashboard(e.target.value);
});
