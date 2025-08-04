export function resolveRegionKey({ country, state, city }) {
  // Normalize spacing
  const normalize = str => (str || "").replace(/\s+/g, " ").trim();

  country = normalize(country);
  state = normalize(state);
  city = normalize(city);

  // Handle full country summary
  if (state === "USA" && city === "USA") {
    return country; // "USA"
  }

  // Handle state-level summary (e.g., "USA/States/California")
  if (state === "States" && city) {
    return `${country}/States/${city}`;
  }

  // Handle city-level summary
  if (country && state && city) {
    return `${country}/${state}/${city}`;
  }

  // Fallback
  return null;
}
