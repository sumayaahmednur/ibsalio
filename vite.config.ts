import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Match your GitHub repo name for GitHub Pages project sites:
// https://<user>.github.io/<repo>/
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'ibsalio'
const isGithubPages = process.env.GITHUB_ACTIONS === 'true'

export default defineConfig({
  plugins: [react()],
  // Netlify uses CI=true as well, but needs root base path.
  base: isGithubPages ? `/${repo}/` : '/',
})
