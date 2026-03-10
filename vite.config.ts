import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

function remToPxPlugin(): Plugin {
  return {
    name: 'rem-to-px',
    generateBundle(_, bundle) {
      for (const file of Object.values(bundle)) {
        if (file.type === 'asset' && file.fileName.endsWith('.css')) {
          file.source = (file.source as string).replace(
            /(\d*\.?\d+)rem/g,
            (_, n) => `${Math.round(parseFloat(n) * 16)}px`
          );
        }
      }
    }
  };
}

export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: { overlay: false },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    remToPxPlugin()
  ].filter(Boolean),
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "assets/bta-planner.js",
        chunkFileNames: "assets/bta-planner-[name].js",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) return "assets/bta-planner.css";
          return "assets/[name][extname]";
        },
      },
    },
  },
  base: "https://curious-kangaroo-7b6f90.netlify.app/",
}));
