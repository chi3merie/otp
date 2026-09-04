# 🚀 pharmacystore — Deployment Blueprint

This document is the complete playbook for deploying the **pharmacystore** web app.
Follow **Path A** for the easiest deployment (recommended), or **Path B / Path C** if you
need to self-host.

---

## 1. Project Overview

| Item | Detail |
|---|---|
| Framework | Next.js **16.3.3** (App Router) |
| UI | React **19.2.8** + Tailwind CSS **4** |
| Language | TypeScript 5 |
| Backend / Database | **None** — data is local (`app/data.ts`), cart state is client-side |
| Pages | `/` (storefront), `/all` (listing), `/products/[id]` (dynamic detail pages, rendered per request) |
| Assets | `public/images/`, `public/dl_test.jpg` |
| Env variables | **None required** |
| Node requirement | Node.js **20+** |

**Key implication:** because there is no server-side database or API, this app has zero
external dependencies and can be deployed anywhere in minutes.

The repository includes a Render Blueprint at `render.yaml`. It deploys the existing
multi-stage Docker image as a free web service and uses `/` as its health check.

### Architecture at a glance

```
Browser ──► Next.js server (Node 20)
              ├─ /              → app/page.tsx            (client component, storefront + cart)
              ├─ /all           → app/all/page.tsx        (full catalog)
              ├─ /products/[id] → app/products/[id]/page.tsx (dynamic, rendered per request)
              ├─ 404            → app/not-found.tsx       (custom not-found page)
              ├─ static         → app/data.ts + public/*
              └─ styles         → Tailwind CSS 4 (app/globals.css)
```

---

## 2. Pre-Deploy Checklist

- [ ] `npm ci` installs cleanly
- [ ] `npm run build` succeeds with no type/lint errors
- [ ] No environment variables needed today — if you later add a real backend
      (e.g., orders, payments), add secrets to your host's env-var settings, never in code
- [ ] Product images live in `public/images/` and are referenced correctly
- [ ] `next.config.ts` has `output: "standalone"` (added for Docker/VPS; harmless on Vercel)

---

## 3. Path A — Vercel (Recommended, ~5 minutes)

The zero-config path. Vercel is made by the creators of Next.js.

1. Push the code to **GitHub** (or GitLab/Bitbucket):

   ```bash
   git add -A
   git commit -m "Prepare for deployment"
   git push origin master
   ```

2. Go to **https://vercel.com/new**, sign in with GitHub, and **import** the
   `pharmacystore` repository.

3. Vercel auto-detects Next.js — keep the defaults:

   | Setting | Value |
   |---|---|
   | Framework Preset | Next.js |
   | Build Command | `npm run build` |
   | Output Directory | (auto) |
   | Install Command | `npm ci` |

4. Click **Deploy**. Done — you get a live URL like `https://pharmacystore.vercel.app`.

5. To use a custom domain: **Project → Settings → Domains → Add**, then update DNS
   records as instructed.

**Auto-redeploys:** every `git push` to `master` triggers a new production deployment.
Pull requests get preview URLs automatically.

**CLI alternative:**

```bash
npm i -g vercel
vercel          # first deploy (preview)
vercel --prod   # production deploy
```

---

## 4. Path B — Docker (any cloud / your own server)

A multi-stage build produces a small, secure production image.

> Prerequisite: [Docker Desktop](https://www.docker.com/products/docker-desktop/) installed.
> The `output: "standalone"` setting in `next.config.ts` is already enabled for this.

### Build & run locally

```bash
docker build -t pharmacystore .
docker run -p 3000:3000 pharmacystore
# open http://localhost:3000
```

### Push to a registry

```bash
docker tag pharmacystore <your-registry>/pharmacystore:latest
docker push <your-registry>/pharmacystore:latest
```

Then run it anywhere that accepts containers: **Fly.io, Google Cloud Run, Render,
DigitalOcean**, or Kubernetes (a plain Deployment with `containerPort: 3000` works).

---

## 5. Render Blueprint

1. Push the repository to GitHub:

   ```bash
   git add -A
   git commit -m "Configure Render deployment"
   git push origin master
   ```

2. Open [render.com](https://render.com), sign in with GitHub, and choose **New -> Blueprint**.

3. Select the `chi3merie/otp` repository. Render reads `render.yaml` and creates the
   `pharmacystore` web service automatically.

4. Click **Apply**. Render builds the Dockerfile, assigns the service `PORT`, and deploys
   the app. No environment variables are required.

5. Open the generated `onrender.com` URL and verify `/`, `/all`, and a product detail page.


---

## 6. Path C — VPS / Bare Node.js server (e.g., Ubuntu on DigitalOcean/AWS)

> Prerequisite: Node.js 20+ installed on the server.

### 5.1 Build on the server (simple)

```bash
git clone <your-repo-url> && cd pharmacystore
npm ci
npm run build
npm run start        # serves on PORT 3000 (set PORT=8080 to change)
```

### 5.2 Keep it running with PM2

```bash
npm i -g pm2
pm2 start npm --name pharmacystore -- start
pm2 save
pm2 startup          # auto-start on reboot
```

### 5.3 Or use the standalone output (no node_modules needed on the server)

After `npm run build`, the `output: "standalone"` setting produces a self-contained
folder — copy just this to the server:

```bash
# on your machine
npm ci && npm run build
scp -r .next/standalone user@server:/opt/pharmacystore
scp -r .next/static   user@server:/opt/pharmacystore/.next/static
scp -r public         user@server:/opt/pharmacystore/public
# on the server
node /opt/pharmacystore/server.js
```

### 5.4 Put it behind HTTPS with Nginx

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

Then add free TLS with: `sudo certbot --nginx` (Let's Encrypt).

---

## 7. After Deployment

| Task | How |
|---|---|
| Verify it's live | Visit `/` and `/all`; add items to the cart |
| Custom domain | Vercel: Settings → Domains; VPS: DNS A-record → your server IP |
| Monitoring | Vercel dashboard (built-in); VPS: `pm2 monit` |
| Updates | Push to `master` (Vercel redeploys) or rebuild the Docker image |
| Rollback | Vercel: Deployments → previous → **Promote to Production** |

## 8. Troubleshooting

| Symptom | Fix |
|---|---|
| Build fails with type errors | Run `npm run lint` and fix, or run `npx tsc --noEmit` locally |
| Images 404 after deploy | Ensure files exist under `public/` and paths are case-sensitive (`/images/...`) |
| `server.js` not found (Docker/VPS) | Confirm `output: "standalone"` is in `next.config.ts` and `npm run build` ran |
| App crashes on server start | Check Node version ≥ 20: `node -v` |

---

*Generated as part of the deployment preparation. Keep this file in the repo — update it
if you add a backend, database, or environment variables later.*
