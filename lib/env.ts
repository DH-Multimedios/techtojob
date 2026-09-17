const LOCAL_SITE_URL = "http://localhost:3000";

function parseSiteUrl(): URL {
  const rawSiteUrl = process.env.SITE_URL?.trim();
  const isProduction = process.env.NODE_ENV === "production";

  if (!rawSiteUrl) {
    if (isProduction) {
      throw new Error(
        "SITE_URL is required for production builds and must be an absolute HTTPS URL.",
      );
    }

    return new URL(LOCAL_SITE_URL);
  }

  let siteUrl: URL;

  try {
    siteUrl = new URL(rawSiteUrl);
  } catch {
    throw new Error("SITE_URL must be a valid absolute URL.");
  }

  const isLocalDevelopmentUrl =
    !isProduction &&
    siteUrl.protocol === "http:" &&
    ["localhost", "127.0.0.1"].includes(siteUrl.hostname);

  if (siteUrl.protocol !== "https:" && !isLocalDevelopmentUrl) {
    throw new Error("SITE_URL must use HTTPS outside local development.");
  }

  if (
    siteUrl.username ||
    siteUrl.password ||
    siteUrl.pathname !== "/" ||
    siteUrl.search ||
    siteUrl.hash
  ) {
    throw new Error("SITE_URL must contain only the canonical site origin.");
  }

  return new URL(siteUrl.origin);
}

export const siteUrl = parseSiteUrl();
export const isLocalSiteUrl = siteUrl.hostname === "localhost";
