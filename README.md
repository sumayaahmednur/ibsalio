# Portfolio (ibsalio)

Personal portfolio site built with **Vite**, **React**, and **TypeScript**. Content lives in the `SITE` object in [`src/App.tsx`](src/App.tsx) — edit name, bio, projects, skills, and links there.

## Local development

```bash
npm install
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

## Build

```bash
npm run build
npm run preview
```

For a production build that matches GitHub Pages asset paths, the workflow sets `CI` and `GITHUB_REPOSITORY`. Locally you can simulate:

```bash
# PowerShell
$env:CI="true"; $env:GITHUB_REPOSITORY="YOUR_GITHUB_USERNAME/ibsalio"; npm run build
```

If your GitHub repository name is **not** `ibsalio`, either rename the repo or change the fallback repo name in [`vite.config.ts`](vite.config.ts).

## Push to GitHub

1. Create a new empty repository on GitHub (e.g. named `ibsalio`).
2. In this folder:

```bash
git init
git add .
git commit -m "Add portfolio site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/ibsalio.git
git push -u origin main
```

Use SSH instead of HTTPS if you prefer: `git@github.com:YOUR_USERNAME/ibsalio.git`.

## Deploy on GitHub Pages

1. In the GitHub repo: **Settings → Pages**.
2. Under **Build and deployment**, set **Source** to **GitHub Actions** (not “Deploy from a branch” unless you change the setup).
3. The workflow [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) runs on every push to `main` and publishes the `dist` output.
4. After the first successful run, your site will be at:

`https://YOUR_USERNAME.github.io/ibsalio/`

(Replace `YOUR_USERNAME` and path if the repo name differs.)

### Custom domain (optional)

Add your domain in **Pages** settings and put a `CNAME` file in `public/` if needed; you may set `base: '/'` in `vite.config.ts` when using a root domain.

## Deploy elsewhere

- **Vercel / Netlify / Cloudflare Pages**: connect the repo; set build command `npm run build` and output directory `dist`. Set `base` to `'/'` in `vite.config.ts` or use their environment variables for the public URL.
