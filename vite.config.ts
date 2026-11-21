import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig} from 'vite';

const MIME_TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.mov': 'video/mp4',
  '.mp4': 'video/mp4',
};

export default defineConfig(() => {
  return {
    base: './',
    plugins: [
      react(),
      tailwindcss(),
      // Copies src/assets into dist/ so root-relative URLs like
      // "/src/assets/images/..." (e.g. generate_image output) still resolve
      // in production builds. Do not remove.
      {
        name: 'copy-unbundled-src-assets',
        apply: 'build',
        closeBundle(error?: Error): void {
          if (error) {
            return;
          }
          const distDir = path.resolve(__dirname, 'dist');
          const srcAssets = path.resolve(__dirname, 'src/assets');
          const distAssets = path.resolve(distDir, 'src/assets');
          if (fs.existsSync(distDir) && fs.existsSync(srcAssets)) {
            fs.cpSync(srcAssets, distAssets, {recursive: true, force: true});
          }
        },
      },
      // Serves docs/assets during Vite dev and copies them into dist/assets on build
      // so both AI Studio preview and GitHub Pages (/docs) share one canonical media folder.
      {
        name: 'share-docs-assets',
        configureServer(server) {
          server.middlewares.use('/assets', (req, res, next) => {
            if (!req.url) return next();
            const cleanRel = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '');
            const docsAssetsRoot = path.resolve(__dirname, 'docs/assets');
            const targetPath = path.resolve(docsAssetsRoot, cleanRel);
            if (!targetPath.startsWith(docsAssetsRoot + path.sep)) return next();
            if (!fs.existsSync(targetPath) || !fs.statSync(targetPath).isFile()) return next();

            const stat = fs.statSync(targetPath);
            const ext = path.extname(targetPath).toLowerCase();
            const contentType = MIME_TYPES[ext] || 'application/octet-stream';
            const range = req.headers.range;

            if (range) {
              const parts = range.replace(/bytes=/, '').split('-');
              const start = parseInt(parts[0], 10);
              const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
              if (Number.isNaN(start) || Number.isNaN(end) || start > end || end >= stat.size) {
                res.statusCode = 416;
                res.end();
                return;
              }
              res.statusCode = 206;
              res.setHeader('Content-Range', `bytes ${start}-${end}/${stat.size}`);
              res.setHeader('Accept-Ranges', 'bytes');
              res.setHeader('Content-Length', String(end - start + 1));
              res.setHeader('Content-Type', contentType);
              fs.createReadStream(targetPath, {start, end}).pipe(res);
              return;
            }

            res.statusCode = 200;
            res.setHeader('Accept-Ranges', 'bytes');
            res.setHeader('Content-Length', String(stat.size));
            res.setHeader('Content-Type', contentType);
            fs.createReadStream(targetPath).pipe(res);
          });
        },
        closeBundle(error?: Error): void {
          if (error) {
            return;
          }
          const distDir = path.resolve(__dirname, 'dist');
          const docsAssets = path.resolve(__dirname, 'docs/assets');
          const distAssets = path.resolve(distDir, 'assets');
          if (fs.existsSync(distDir) && fs.existsSync(docsAssets)) {
            fs.cpSync(docsAssets, distAssets, {recursive: true, force: true});
          }
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
