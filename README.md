# serkandurusoy.com

Personal site of Serkan Durusoy. A single static page served by
[Cloudflare Workers static assets](https://developers.cloudflare.com/workers/static-assets/).

## Layout

| Path | Purpose |
|---|---|
| `public/` | Everything served as-is: `index.html`, favicons, `404.html`, `robots.txt`, the MTA-STS policy |
| `src/index.js` | Tiny Worker in front of the assets: redirects `www.` to the apex and serves the MTA-STS policy on `mta-sts.` |
| `wrangler.jsonc` | Worker configuration (assets directory, custom domains) |

## Deploys

Cloudflare Workers Builds is connected to this repository.

- Push to `main` deploys to production (`serkandurusoy.com`).
- Every other branch and pull request gets a preview URL.

Nothing needs to run locally. For a local preview:

```bash
npm install
npm run dev
```

## Editing the page

Edit `public/index.html` and push to `main`.
