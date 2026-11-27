import { notFound } from "next/navigation";
import { getAdviceArticle } from "../../lib/advice";
import { ADVICE_SHARE_ALT, ADVICE_SHARE_SIZE, renderAdviceShareImage } from "../../lib/adviceShareImage";

// One link-preview image per article, built with the page. Design: app/lib/adviceShareImage.tsx.
export const alt = ADVICE_SHARE_ALT;
export const size = ADVICE_SHARE_SIZE;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getAdviceArticle(slug);
  if (!article) notFound();
  return renderAdviceShareImage(article);
}
