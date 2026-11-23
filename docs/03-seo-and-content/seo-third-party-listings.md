# SEO third-party listing URL audit checklist

Last updated: 23 November 2026 (two locations; Calendly removed, the site no longer uses it).

Canonical website URL for every external listing: `https://foot-plus.co.uk`

Each location has its own Google Business Profile and listings. Check each listing matches its own location:

| Field | Foot+ Bristol | Foot+ Southampton |
| --- | --- | --- |
| Business name | `Foot+ Bristol` | `Foot+ Southampton` |
| Website | `https://foot-plus.co.uk` (or its location page) | `https://foot-plus.co.uk` (or its location page) |
| Email | `bristol@foot-plus.co.uk` | `southampton@foot-plus.co.uk` |
| Phone | 07380 301555 | 07564 614967 |
| Service area | Bristol, by postcode (`app/lib/postcodes.ts`) | Southampton and surrounding towns, by postcode |

Listings covering both (the Foot+ Facebook page) use `Foot+`, `hello@foot-plus.co.uk` and `https://foot-plus.co.uk`. Phones and emails are kept in `app/lib/site.ts`; if they change there, update this table.

Do not mark any item as updated until the listing owner has authenticated with that platform, changed the listing if needed, and confirmed the public listing shows the canonical URL.

| Listing or platform | Current URL, where known | Required canonical URL | Other business information to check | Status | Notes |
| --- | --- | --- | --- | --- | --- |
| BCPASW directory | Current or suspected URL: `http://www.foot-plus.co.uk` | `https://foot-plus.co.uk` | Business name, website, email, phone number, service area, business description | To verify | Known issue: replace non-canonical HTTP/www URL with the canonical HTTPS non-www URL. |
| Google Business Profiles (Bristol, Southampton) | Unknown | `https://foot-plus.co.uk` | Business name, website, email, phone number, service area, business description | To verify | Check the public profile and dashboard website field. |
| Facebook page (covers both locations) | Unknown | `https://foot-plus.co.uk` | Business name, website, email, phone number, service area, business description | To verify | Check page About/contact fields and any pinned posts that include a website URL. |
| Professional membership directories | Unknown | `https://foot-plus.co.uk` | Business name, website, email, phone number, service area, business description | To verify | Check any practitioner, healthcare, foot-health or local professional-body listings. |
| Local Bristol and Southampton directories | Unknown | `https://foot-plus.co.uk` | Business name, website, email, phone number, service area, business description | To verify | Check Bristol-focused business and community directories. |
| Referral partner websites | Unknown | `https://foot-plus.co.uk` | Business name, website, email, phone number, service area, business description | To verify | Ask clinics, care providers, charities or other referral partners to update old links. |
| Social-media profiles | Unknown | `https://foot-plus.co.uk` | Business name, website, email, phone number, service area, business description | To verify | Check profile links and bio links on every active social channel. |
| Splose public patient form | `https://foot-plus.splose.com/public-form/e373fa16-a7c8-4138-a4fb-c2b9b8a1aa7d` | `https://foot-plus.co.uk` for website/profile fields | Business name, website, email, phone number, service area, business description | To verify | Repository references this external form. Keep the form URL where needed for forms, but verify any Splose profile/business website field uses the canonical site URL. |
