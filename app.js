const CLIENT_ID = "515935803707-v7qshp425m1b4h5ru6jcmmmu99qbikgq.apps.googleusercontent.com";
// const DEVELOPER_KEY = "AIzaSyCl6PFx1jCh7xjc0HrEZbgAhkF7zRGU1Nw";
// const SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";
let access
const sheetIndex = {
  "California/Elk Groove/USA": {
    id: "1-YP4QqW4wmfqwgRMXmbEtURiyw2pi3nkYLGbc0sQlT4",
    range: "Sheet1!A8:AM10"
  },
  "California/Riverside/USA": {
    id: "1iygvJ-hGlaBT23zKlVJksdUcU3xOMtZ10wFvgUa5MnA",
    range: "Riverside!A8:AM10"
  },
  "California/Sacramento/USA": {
    id: "148TnNDI74ZQg5CX4lukFaK_lbVjnG-TaVVJEdN3s_ok",
    range: "Sacramento!A7:AM10"
  },
  "California/Woodland/USA": {
    id: "1Dr4mbBqPkTvKR6OBfpCiHvz7CJsUxlzw-rtu-cXjRlA",
    range: "Woodland!A7:AM10"
  },
  "California/Yuba City/USA": {
    id: "1264Z5C0il28XgXsXf_49wZ4QhcDRD2LGUeb0aOhL7mk",
    range: "YubaCity!A7:AM10"
  },
  "Florida/Miami/USA": {
    id: "1PXMZO1LGWo4TQU2k3D45unvQN7fhZ9GDT6d1ox6tI8Y",
    range: "Miami!A7:AM10"
  },
  "Georgia/Lilburn/USA": {
    id: "10JI4HWahbH3H9b4WjjA6oMCt6fjpIdcsXLpo58ZuCz4",
    range: "Lilburn!A7:AM10"
  },
  "Illinois/Bloomington/USA": {
    id: "173tvkXPDyX1wUa6W7hPRbXxhwKxzmLSYqAFBmq4ZvnI",
    range: "Bloomington!A7:AM10"
  },
  "Illinois/Chicago/USA": {
    id: "1vOI4y7A0SfbkrcFPjyQ5cgydGTGrycrwglbs0yvxIRw",
    range: "Chicago!A7:AM10"
  },
  "Illinois/Lombard/USA": {
    id: "1MQN_oKrmy92tTYpXoTbJG78tNKM-ENzCCeMDs4__Gro",
    range: "Lombard!A7:AM10"
  },
  "Illinois/Schaumburg/USA": {
    id: "1NP35gD_FGznqtI1-SzLvJ4mkwCcagNGvQPCvAdLI_wM",
    range: "Schaumburg!A7:AM10"
  },
  "Illinois/Skokie/USA" : {
    id: "1piIR4er7HwXN00iFNzOkbGrgaQAVb_rxIGy8za89UhY",
    range: "Skokie!A7:AM10"
  },
  "Maryland/Baltimore/USA" : {
    id: "1zAh1Vbg82heZCviFknrdKSoC-PMjptrE5JBWEm-T5oE",
    range: "Baltimore!A7:AM10"
  },
  "Maryland/Ellicot City/USA" : {
    id: "1LwhIQaM50PrJfkr4r6U964iwC1pJnq1dP_k0cAEPqKw",
    range: "EllicotCity!A7:AM10"
  },
  "Maryland/Langhorne/USA" : {
    id: "1zDniVeYL_dTZpvGS18pmklmmVDaCF0WGd3gX4yM9Y8A",
    range: "Langhorne!A7:AM10"
  },
  "Maryland/Woodbridge/USA" : {
    id: "1pOkArNYjQWyD-qRWG_-VxDRTH9AAoxX_GcnlPfnTJB8",
    range: "Woodbridge!A7:AM10"
  },
  "New York/Bronx/USA" : {
    id: "19flAXbGnWQBTV9-GWTNokrQvEpgAJ83g2eoIKI-Fpek",
    range: "Bronx!A7:AM10"
  },
  "New York/Brooklyn/USA" : {
    id: "1olu4ln0OKYtsbWPIjtGerpbkUZqbxnePfUOjJ0D6eG4",
    range: "Brooklyn!A7:AM10"
  },
  "New York/Queens/USA" : {
    id: "1I6yvtg-XLON4TDbLRufS92_R58BAdpErP_KB3Wn7uEE",
    range: "Queens!A7:AM10"
  },
  "New York/Valley Stream/USA" : {
    id: "1nTAnMynDiNJ05HhbfWieqz4a7nVgh6iRYD33n02R2og",
    range: "ValleyStream!A7:AM10"
  },
  "Texas/New Orleans/USA" : {
    id: "1XMJtXTPCGDrtHmoz8xgx_qoeSfylDUDP8l1iTZs9PlI",
    range: "NewOrleans!A7:AM10"
  },
  "Texas/Sugar Land/USA" : {
    id: "1YGC_xaiFWDI31SJhF5oa6gmFTOzktgGtKLpOoh02xIs",
    range: "SugarLand!A7:AM10"
  },
  "Texas/Wylie/USA" : {
    id: "1JBhROkoHG09HzvaQxCO0WUjtUgHO8m7tySSZlxJFVCE",
    range: "Wylie!A7:AM10"
  },
  "Washington/Lynwood/USA" : {
    id: "1PAXcYLnUw-zKTuExtg6vAA84tPI29bZrNVdh_9UtOSw",
    range: "Lynnwood!A7:AM10"
  },
  "California/USA" : {
    id: "14LBe2hZvwx4lBik9k1jkPJvIrKoV_7X-RcYazHrnyrg",
    range: "California!A7:AM10"
  },
  "Florida/USA" : {
    id: "1YAljj_sVKMp4fr7ShpFfy4EtSK1Dk_vqOXyS24KQ4kM",
    range: "Florid!A7:AM10"
  },
  "Georgia/USA" : {
    id: "1asCNMkGvJcPqe6uSoPmdyNmgnfroMtQIvf7wzXDLQ6Q",
    range: "Georgia!A7:AM10"
  },
  "Illinois/USA" : {
    id: "12HPghBjP6v8LCvFIJ_Pe1TXAnQdaEgfjaJRBFR27cEQ",
    range: "Illinois!A7:AM10"
  },
  "Maryland/USA" : {
    id: "1ssgqClME3RbZxGqNfdQeT7bbZSwVk-fx-xWGJcLLh78",
    range: "Maryland!A7:AM10"
  },
  "New York/USA" : {
    id: "1znKOsK3qW8sfJGsnkuKGiiuMJ9rvRRTxr4RWjw9kZAw",
    range: "NewYork!A7:AM10"
  },
  "Texas/USA" : {
    id: "1wC4XLsWbAKiciLpIOKU6WeurEjEQpngXdgBI051_Iec",
    range: "Texas!A7:AM10"
  },
  "Washington/USA" : {
    id: "1NQSfiwuRitYZkeBM7f6iF-ivrzpxAZpTo65Vh2Y50BM",
    range: "Washington!A7:AM10"
  },
  "USA" : {
    id: "15sKA8JESDMKYD0t0Qc0INMOSKds7oKJ9Funok4TvFbs",
    range: "USA!A7:AM10"
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
