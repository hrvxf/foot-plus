import { notFound } from "next/navigation";
import type { Metadata } from "next";
import AdviceArticleLayout from "../../components/advice/AdviceArticleLayout";
import { adviceMetadata, articleJsonLd, getAdviceArticle, publishedAdviceArticles } from "../../lib/advice";
export function generateStaticParams() { return publishedAdviceArticles.map((a)=>({slug:a.slug})); }
export function generateMetadata({ params }: { params: Promise<{ slug:string }> }): Promise<Metadata> { return params.then(({slug})=>{ const article=getAdviceArticle(slug); if(!article) return {}; return adviceMetadata(article); }); }
export default async function Page({ params }: { params: Promise<{ slug:string }> }) { const { slug } = await params; const article=getAdviceArticle(slug); if(!article) notFound(); return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(articleJsonLd(article))}}/><AdviceArticleLayout article={article}/></>; }
export const dynamicParams = false;
