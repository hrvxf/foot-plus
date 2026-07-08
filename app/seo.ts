// Centralize absolute metadata URLs so social cards and schema stay in sync.
export const SITE_URL = "https://foot-plus.co.uk";

// Search engines and social platforms expect a stable absolute URL here.
export const SEARCH_PREVIEW_IMAGE = `${SITE_URL}/WebsiteSearchThumbnail.png`;
export const SEARCH_PREVIEW_ALT = "Foot+ Bristol foot health services";

export const SEARCH_PREVIEW_IMAGE_METADATA = {
  url: SEARCH_PREVIEW_IMAGE,
  width: 1200,
  height: 630,
  alt: SEARCH_PREVIEW_ALT,
};
