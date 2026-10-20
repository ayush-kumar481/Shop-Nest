const configuredApiUrl = (process.env.REACT_APP_API_URL || "").trim();
const apiBaseUrl = configuredApiUrl.replace(/\/+$/, "");

export const apiUrl = (path) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${apiBaseUrl}${normalizedPath}`;
};
