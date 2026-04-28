import { defineConfig } from 'vite';
import { resolve } from 'path';
import { readdirSync, statSync, existsSync, mkdirSync, copyFileSync } from 'fs';

/* eslint-disable no-undef */
const baseDir = resolve(__dirname);
const srcDir = resolve(baseDir, 'src');
const outDir = resolve(baseDir, '../backend/resources');

// Get entry points as directory-names under src/pages
function getEntry() {
    const pages = readdirSync(resolve(srcDir, 'pages')).filter((file) => {
        return statSync(resolve(srcDir, 'pages', file)).isDirectory();
    });
    const entry = {};
    for (const page of pages) {
        const file = resolve(srcDir, `pages/${page}/index.ts`);
        if (existsSync(file)) {
            entry[page] = file;
        }
    }
    return entry;
}

// Custom plugin to copy HTML files
function copyHtmlFiles() {
    return {
        name: 'copy-html-files',
        closeBundle() {
            const htmlFiles = readdirSync(srcDir, { recursive: true })
                .filter((file) => file.endsWith('.html'))
                .map((file) => resolve(srcDir, file));

            htmlFiles.forEach((file) => {
                const relativePath = file.replace(srcDir + '/', '');
                const dest = resolve(outDir, 'templates', relativePath);
                const destDir = resolve(dest, '..');
                mkdirSync(destDir, { recursive: true });
                copyFileSync(file, dest);
            });
        },
    };
}

export default defineConfig({
    root: srcDir,
    build: {
        outDir: outDir,
        emptyOutDir: true,
        manifest: true,
        rollupOptions: {
            input: getEntry(),
            output: {
                entryFileNames: 'static/pages/[name]/index-[hash].js',
                chunkFileNames: 'static/assets/[name]-[hash].js',
                assetFileNames: (assetInfo) => {
                    if (assetInfo.names?.some((name) => name.endsWith('.css'))) {
                        return 'static/pages/[name]/index-[hash].css';
                    }
                    return 'static/assets/[name]-[hash].[ext]';
                },
            },
        },
    },
    plugins: [copyHtmlFiles()],
    resolve: {
        alias: {
            '@src': srcDir,
        },
    },
});
