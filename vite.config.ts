import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Match your GitHub repo name for GitHub Pages project sites:
// https://<user>.github.io/<repo>/
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'ibsalio'

export default defineConfig({
  plugins: [react()],
  base: process.env.CI ? `/${repo}/` : '/',
})
