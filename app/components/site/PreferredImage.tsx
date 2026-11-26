import { SITE_URL } from "../../lib/site";

/**
 * Tells Google which picture to use as this page's search result thumbnail (schema.org primaryImageOfPage).
 * Google's guidance: a relevant, representative image, not a logo or an image with text, so these are the
 * square practitioner portraits in `searchImages`. WhatsApp and Facebook use the og:image instead.
 */
export default function PreferredImage({ path, image }: { path: string; image: string }) {
  const url = `${SITE_URL}${path === "/" ? "/" : path}`;
  const data = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    primaryImageOfPage: { "@type": "ImageObject", url: image, width: 1200, height: 1200 },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
