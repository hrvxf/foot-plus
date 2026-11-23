// Server only. A small in-memory limiter for the enquiry form.
//
// Vercel reuses warm server instances, so this stops a single script hammering the
// form, but it isn't shared between instances. For a hard limit across the whole
// site, add a Vercel Firewall rate-limit rule on /api/contact as well.

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
const MAX_KEYS = 5000;

/** True if `key` is still within `limit` hits per `windowMs`; records the hit. */
export function allow(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    if (buckets.size >= MAX_KEYS) {
      for (const [k, b] of buckets) if (b.resetAt <= now) buckets.delete(k);
      if (buckets.size >= MAX_KEYS) buckets.clear();
    }
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  bucket.count += 1;
  return bucket.count <= limit;
}

/** The visitor's IP as Vercel reports it. */
export function clientIp(req: Request) {
  return (
    req.headers.get("x-real-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}
