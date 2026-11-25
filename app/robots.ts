import type { MetadataRoute } from "next";

import { SITE_URL } from "./lib/site";

// AI crawlers that collect pages to train models. Blocking them keeps the
// site's copy and design out of future training data.
const AI_TRAINING_BOTS = [
  "GPTBot",
  "ClaudeBot",
  "anthropic-ai",
  "Applebot-Extended",
  "CCBot",
  "meta-externalagent",
  "Bytespider",
  "cohere-training-data-crawler",
];

// AI search and user-request bots stay allowed (via the "*" rule) so
// ChatGPT, Claude, Perplexity and others can still find and recommend Foot+.
// Google-Extended is deliberately NOT blocked: the same token also controls
// Gemini grounding, so blocking it stops Gemini citing Foot+ in its answers.
// OAI-SearchBot, Claude-SearchBot, PerplexityBot, ChatGPT-User, Claude-User.

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: AI_TRAINING_BOTS,
        disallow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
