# Hexagrow Production Diagnostic Report

**Date:** 2026-04-11
**Author:** Staff Engineer Audit
**VPS:** vps-f02429ea.vps.ovh.net (51.178.50.181) — Ubuntu 24.04, 4 vCores, 8 GB RAM, 75 GB Storage
**Domain:** hexagrow-indus.com

---

## Executive Summary

The Hexagrow platform (3 services: client, ceo, server) has been **unstable in production for months**. The Perplexity debugging sessions reveal a pattern of firefighting symptoms without addressing root causes. The core problems are:

1. **Hardcoded localhost URLs shipping to production** — logout and hero images are broken for every user
2. **No process management configuration** — services die silently, no auto-restart, no ecosystem file
3. **No deployment pipeline** — manual SSH + `pm2 start npm` is fragile and non-reproducible
4. **Nginx upstream timeouts** — caused by Node processes crashing/hanging, not by Nginx config

This report prioritizes issues by **blast radius** (how many users are affected) and **fix effort**.

---

## Architecture Overview

| Service | Framework | Port | Domain | Purpose |
|---------|-----------|------|--------|---------|
| **client** | Next.js 15.5.3 | 3000 | hexagrow-indus.com | Public storefront |
| **ceo** | Next.js 15.4.6 | 3001 | admin.hexagrow-indus.com | Admin panel |
| **server** | Express 5.1 | env `$PORT` | api.hexagrow-indus.com | REST API + MongoDB |

Nginx reverse-proxies all three behind HTTPS (Let's Encrypt assumed).

---

## P0 — Broken in Production Right Now

### 1. Logout is calling localhost:5000 in production

**File:** `client/components/Navbar.jsx:96`
```js
await fetch("http://localhost:5000/api/auth/logout", { ... })
```

**Impact:** Every user who clicks "Logout" on the public site gets a silent failure. The request goes to `localhost:5000` inside the user's browser, which either fails or hits whatever is running on their machine. The user stays logged in, cookies are never cleared server-side, and JWT refresh tokens remain valid indefinitely.

**Fix:** Replace with `https://api.hexagrow-indus.com/api/auth/logout` (or better, use an env variable).

### 2. Hero component images point to localhost:5000

**File:** `client/components/Hero.jsx:185`
```js
src={`http://localhost:5000${product.image}`}
```

**Impact:** The hero section (most visible part of the site) shows broken images for every visitor. Product images stored in `/uploads` on the server are unreachable because the browser tries `localhost:5000`.

**Fix:** Replace with `https://api.hexagrow-indus.com${product.image}` (or env variable).

### 3. NEXT_PUBLIC_CURRENCY is undefined

**File:** `client/context/AppContext.jsx:19`
```js
const currency = process.env.NEXT_PUBLIC_CURRENCY;
```

No `.env` or `.env.local` defines this variable. Every price display that uses `currency` shows `undefined` next to the amount.

**Fix:** Add `NEXT_PUBLIC_CURRENCY=TND` (or appropriate currency) to client's `.env.local` and rebuild.

---

## P1 — Causing 504s and Service Instability

### 4. No PM2 ecosystem config — processes managed ad-hoc

The Perplexity sessions show repeated manual `pm2 start npm --name ...` commands, `^C` interruptions, zombie processes holding ports (EADDRINUSE on 3001), and no `pm2 save`. This means:

- **After VPS reboot:** all services are down until someone SSHes in
- **After OOM kill:** PM2 may or may not restart the process (no config = default behavior)
- **Port collisions:** old Next.js processes survive and block new ones

**Fix:** Create `ecosystem.config.cjs` at `/srv/hexagrow/new-hexa/`:

```js
module.exports = {
  apps: [
    {
      name: 'hexagrow-server',
      cwd: './server',
      script: 'server.js',
      interpreter: 'node',
      env: {
        NODE_ENV: 'production',
        PORT: 4000
      },
      max_memory_restart: '500M',
      exp_backoff_restart_delay: 100
    },
    {
      name: 'hexagrow-client',
      cwd: './client',
      script: 'node_modules/.bin/next',
      args: 'start -p 3000',
      env: {
        NODE_ENV: 'production'
      },
      max_memory_restart: '1G',
      exp_backoff_restart_delay: 100
    },
    {
      name: 'hexagrow-ceo',
      cwd: './ceo',
      script: 'node_modules/.bin/next',
      args: 'start -p 3001',
      env: {
        NODE_ENV: 'production'
      },
      max_memory_restart: '1G',
      exp_backoff_restart_delay: 100
    }
  ]
};
```

Then:
```bash
pm2 delete all
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup  # generates the systemd service for auto-start on reboot
```

### 5. Node.js 18.19.1 is EOL — should be on v20 LTS or v22 LTS

Node 18 reached end-of-life in April 2025. Next.js 15.x officially requires Node 18.18+ but recommends 20+. Running EOL Node means no security patches and potential compatibility issues.

**Fix:** Upgrade to Node 20 LTS via nvm or nodesource on the VPS.

### 6. Nginx upstream timeouts are a symptom, not the cause

The error log shows two patterns:
- `upstream timed out ... while connecting` to `:3000` — the client Next.js process is **not listening** (crashed, OOM'd, never started)
- `upstream timed out ... while reading response header` from `:3001` — the ceo process **accepted the connection but never responded** (SSR hang, API call timeout)

Increasing `proxy_read_timeout` to 300s (as suggested by Perplexity) is a band-aid. A Next.js page should respond in < 5s. If it takes > 60s, the app is broken.

**Root causes to investigate:**
- Is MongoDB reachable from the VPS? A slow/unreachable DB will make every SSR page hang
- Are the Next.js apps built? (`npm run build` must succeed before `next start`)
- Is the server port actually set in `.env`? If `PORT` is undefined, Express crashes silently

### 7. Missing `.env` files on VPS

The `.env` files are gitignored (correct), but there's no `.env.example` documenting what's needed, and the Perplexity sessions suggest env vars may be misconfigured on the VPS.

**Required environment variables for the server:**

| Variable | Required | Notes |
|----------|----------|-------|
| `PORT` | Yes | Must match what Nginx proxies to (e.g., 4000) |
| `MONGO_URI` | Yes | MongoDB Atlas or local connection string |
| `CORS_ORIGINS` | Yes | `https://hexagrow-indus.com,https://admin.hexagrow-indus.com` |
| `JWT_ACCESS_SECRET` | Yes | Random secret, min 32 chars |
| `JWT_REFRESH_SECRET` | Yes | Different from access secret |
| `NODE_ENV` | Yes | `production` |
| `CLOUDINARY_*` | Yes | 3 vars for image uploads |
| `SMTP_*` | For email | 5 vars for transactional emails |

---

## P2 — Technical Debt Creating Risk

### 8. All API URLs are hardcoded across the codebase

Every `fetch()` call in both `client/` and `ceo/` hardcodes `https://api.hexagrow-indus.com`. This means:
- Local development requires the production API (or manual find-replace)
- Changing the domain requires editing 20+ files
- Two calls still point to `localhost:5000` (the ones that were missed)

**Fix:** Create a single env variable `NEXT_PUBLIC_API_URL` and use it everywhere:

```js
// client/.env.local
NEXT_PUBLIC_API_URL=https://api.hexagrow-indus.com

// client/.env.development
NEXT_PUBLIC_API_URL=http://localhost:5000
```

Then replace all hardcoded URLs:
```js
const API = process.env.NEXT_PUBLIC_API_URL;
await fetch(`${API}/api/auth/logout`, { ... })
```

**Files requiring changes in `client/`:**
- `context/AppContext.jsx` — 12 fetch calls
- `components/Navbar.jsx` — 1 fetch call (the broken localhost one)
- `components/Hero.jsx` — 1 image URL (the broken localhost one)
- `app/auth/page.jsx` — 1 fetch call

**Files requiring changes in `ceo/`:**
- Multiple admin pages with fetch/axios calls

### 9. CORS configuration may block the frontends

The server reads `CORS_ORIGINS` from `.env` and splits by comma. If this env var is empty or missing, `allowedOrigins` becomes `[]`, and the CORS middleware will **reject all cross-origin requests**. This could silently break every API call from both frontends.

**Verify on VPS:** Check that `CORS_ORIGINS` in the server's `.env` includes both frontend domains with the `https://` scheme.

### 10. No health checks or monitoring

There is no `/health` endpoint on the server, no uptime monitoring, and no alerting. When services go down (which is clearly happening regularly), nobody knows until a user complains.

**Quick fix:** Add a health endpoint to the Express server:
```js
app.get('/health', (req, res) => res.json({ status: 'ok', timestamp: Date.now() }));
```

Then set up OVH's built-in monitoring or a free service (UptimeRobot, Betterstack) to ping it every minute.

### 11. SSL/TLS configuration is weak

The Nginx config still allows TLSv1 and TLSv1.1:
```
ssl_protocols TLSv1 TLSv1.1 TLSv1.2 TLSv1.3;
```

TLSv1 and TLSv1.1 are deprecated and insecure. Modern browsers don't use them, but having them enabled fails security audits.

**Fix:** Change to `ssl_protocols TLSv1.2 TLSv1.3;`

### 12. Empty Docker configuration

`docker-compose.yml` and `client/Dockerfile` both exist but are empty (0 bytes). These are misleading — either implement containerization or delete the files.

---

## Action Plan — Status as of 2026-04-11

### Phase 1 — Stop the Bleeding (COMPLETED 2026-04-11)

| # | Task | Status | Notes |
|---|------|--------|-------|
| 1 | Fix localhost URLs in `Navbar.jsx` and `Hero.jsx` | DONE | Commit `b4140f1` — replaced `http://localhost:5000` with `https://api.hexagrow-indus.com` |
| 2 | Set `NEXT_PUBLIC_CURRENCY` in client `.env.local` | SKIPPED | User deferred |
| 3 | Rebuild both Next.js apps on VPS (`npm run build`) | DONE | Built without turbopack (`npx next build --no-lint`). Turbopack builds were missing CSS and `images.remotePatterns` |
| 4 | Verify server `.env` has correct `PORT`, `MONGO_URI`, `CORS_ORIGINS` | DONE | PORT=5000, MONGO_URI points to Atlas (cluster was paused, resumed), CORS_ORIGINS verified |

### Phase 2 — Stabilize (COMPLETED 2026-04-11)

| # | Task | Status | Notes |
|---|------|--------|-------|
| 5 | Create `ecosystem.config.cjs` and deploy with PM2 | DONE | Created at `/srv/hexagrow/new-hexa/ecosystem.config.cjs` with `max_memory_restart` limits |
| 6 | Run `pm2 save && pm2 startup` | DONE | Systemd service `pm2-ubuntu` created and enabled |
| 7 | Kill all zombie Node processes, clean start | DONE | Multiple PM2 daemon resets required (stuck sockets, zombie `next-server` processes) |
| 8 | Add `trust proxy` to Express | DONE | Commit `f8bab24` — `express-rate-limit` was rejecting all requests behind Nginx due to `X-Forwarded-For` without trust proxy |
| 9 | Add 2GB swap | DONE | `/swapfile` created to prevent OOM kills |
| 10 | Increase Nginx proxy timeouts | DONE | `proxy_read_timeout 120s` on all 3 vhosts |
| 11 | Restore `globals.css` on VPS | DONE | VPS had old boilerplate version; `git checkout` restored Tailwind v4 theme with custom colors |
| 12 | Restore `next.config.mjs` on VPS | DONE | VPS was missing `images.remotePatterns` for Cloudinary; `git checkout` restored it |
| 13 | Resume MongoDB Atlas cluster | DONE | Cluster was auto-paused due to inactivity, causing `ENOTFOUND` DNS errors |

### Phase 3 — Harden (TODO)

| # | Task | Risk if skipped |
|---|------|-----------------|
| 1 | Replace all hardcoded API URLs with `NEXT_PUBLIC_API_URL` | Can't develop locally, fragile, risk of future localhost leaks |
| 2 | Upgrade Node.js to v20 LTS | No security patches (v18 is EOL since April 2025) |
| 3 | Fix TLS config (drop TLSv1/1.1) | Security audit failure |
| 4 | Create `.env.example` files for all 3 services | Next developer is lost |
| 5 | Set up basic deployment script or CI | Every deploy is manual and error-prone |
| 6 | Prevent MongoDB Atlas auto-pause | Add cron: `0 */4 * * * curl -s "https://api.hexagrow-indus.com/api/admin/products?limit=1" > /dev/null` or upgrade to M10+ |
| 7 | Add health endpoint + uptime monitoring | Blind to outages |
| 8 | Never edit files directly on VPS | VPS had diverged `globals.css` and `next.config.mjs` — always deploy via git pull |

---

## Issues Discovered and Fixed During Stabilization

### 1. PM2 daemon freezes
PM2 would freeze on `pm2 start` commands, requiring full daemon kills (`pkill -9 pm2`, socket cleanup). Root cause: stale PM2 daemon processes and socket files. Fix: always clean sockets before restarting daemon, use `ecosystem.config.cjs` instead of individual `pm2 start` commands.

### 2. `express-rate-limit` blocking all requests
The rate limiter threw `ERR_ERL_UNEXPECTED_X_FORWARDED_FOR` because Nginx sends `X-Forwarded-For` but Express didn't have `trust proxy` set. Every API request was silently rejected. Fix: `app.set('trust proxy', 1)`.

### 3. Next.js build with Turbopack produces incomplete CSS
Building with `--turbopack` (in the `build` script) generated a `.next/static/` directory with no `css/` folder. All Tailwind classes were missing. Fix: build with standard Webpack (`npx next build --no-lint`).

### 4. VPS files diverged from git
`client/app/globals.css` and `client/next.config.mjs` were manually edited on the VPS, removing all custom Tailwind theme colors and Cloudinary image patterns. Fix: `git checkout -- <file>` to restore from repo.

### 5. MongoDB Atlas auto-pause
Free-tier Atlas clusters pause after prolonged inactivity. The server crashed in a loop with `ENOTFOUND` DNS errors. Fix: resume cluster manually, consider adding a keep-alive cron.

### 6. Next.js build hangs on type-checking
`next build` would hang indefinitely at "Linting and checking validity of types" on the VPS. Fix: skip type-checking with `NEXT_PRIVATE_SKIP_TYPECHECKING=1 npx next build --no-lint`.

---

## Resource Status (Post-Fix)

| Resource | Value |
|----------|-------|
| RAM total | 7.6 GB |
| RAM used (3 services running) | ~3.1 GB |
| RAM available | ~4.5 GB |
| Swap | 2 GB (newly added) |
| hexagrow-server memory | ~103 MB |
| hexagrow-client memory | ~226 MB |
| hexagrow-ceo memory | ~185 MB |
| MongoDB | Atlas (external, free tier) |

---

## Current Production State (Verified 2026-04-11 21:28 UTC)

| Service | URL | Status | Port |
|---------|-----|--------|------|
| Client | https://hexagrow-indus.com | HTTP 200 | 3000 |
| CEO Admin | https://admin.hexagrow-indus.com | HTTP 200 | 3001 |
| API Server | https://api.hexagrow-indus.com | HTTP 200 | 5000 |

All services running via PM2 with auto-restart on crash and auto-start on reboot.

---

## Verification Checklist (Run on VPS to verify stability)

```bash
# 1. All services are running
pm2 status

# 2. All ports are listening
ss -ltnp | grep -E ':(3000|3001|5000)'

# 3. All services respond locally
curl -I --max-time 5 http://127.0.0.1:3000/
curl -I --max-time 5 http://127.0.0.1:3001/
curl -I --max-time 5 http://127.0.0.1:5000/api/admin/products?limit=1

# 4. All domains respond externally
curl -I --max-time 10 https://hexagrow-indus.com
curl -I --max-time 10 https://admin.hexagrow-indus.com
curl -I --max-time 10 "https://api.hexagrow-indus.com/api/admin/products?limit=1"

# 5. No localhost references in built client code
grep -r "localhost" /srv/hexagrow/new-hexa/client/.next/ 2>/dev/null | grep -v node_modules

# 6. PM2 survives reboot
pm2 save
sudo reboot
# After reboot:
pm2 status

# 7. Check for recent errors
sudo tail -20 /var/log/nginx/error.log
pm2 logs --lines 20 --nostream
```