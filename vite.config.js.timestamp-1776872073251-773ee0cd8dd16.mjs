// vite.config.js
import { defineConfig } from "file:///C:/xampp/htdocs/portfolio/node_modules/vite/dist/node/index.js";
import react from "file:///C:/xampp/htdocs/portfolio/node_modules/@vitejs/plugin-react/dist/index.js";
var vite_config_default = defineConfig({
  base: process.env.NODE_ENV === "production" ? "/portfolio/" : "/",
  plugins: [react()],
  build: {
    // ESNext → output nhỏ nhất, không polyfill cũ
    target: "esnext",
    minify: "esbuild",
    chunkSizeWarningLimit: 800,
    cssCodeSplit: true,
    reportCompressedSize: false,
    // Không preload particles/swiper chunk — để thực sự lazy-load sau LCP
    modulePreload: {
      resolveDependencies: (_url, deps) => deps.filter(
        (dep) => !dep.includes("particles") && !dep.includes("swiper")
      )
    },
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name]-[hash][extname]",
        chunkFileNames: "assets/[name]-[hash].js",
        entryFileNames: "assets/[name]-[hash].js",
        manualChunks: (id) => {
          if (!id.includes("node_modules")) return;
          if (id.includes("@tsparticles") || id.includes("/tsparticles")) return "vendor-particles";
          if (id.includes("/swiper/")) return "vendor-swiper";
          if (id.includes("/react-dom/") || id.includes("/react/") || id.includes("/scheduler/")) return "vendor-react";
          if (id.includes("TagCloud") || id.includes("typewriter-effect") || id.includes("react-icons")) return "vendor-misc";
        }
      }
    }
  },
  server: {
    warmup: {
      clientFiles: ["./src/App.jsx", "./src/index.css"]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFx4YW1wcFxcXFxodGRvY3NcXFxccG9ydGZvbGlvXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFx4YW1wcFxcXFxodGRvY3NcXFxccG9ydGZvbGlvXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi94YW1wcC9odGRvY3MvcG9ydGZvbGlvL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCdcblxuLy8gaHR0cHM6Ly92aXRlLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBiYXNlOiBwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ3Byb2R1Y3Rpb24nID8gJy9wb3J0Zm9saW8vJyA6ICcvJyxcbiAgcGx1Z2luczogW3JlYWN0KCldLFxuICBidWlsZDoge1xuICAgIC8vIEVTTmV4dCBcdTIxOTIgb3V0cHV0IG5oXHUxRUNGIG5oXHUxRUE1dCwga2hcdTAwRjRuZyBwb2x5ZmlsbCBjXHUwMTY5XG4gICAgdGFyZ2V0OiAnZXNuZXh0JyxcbiAgICBtaW5pZnk6ICdlc2J1aWxkJyxcbiAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDgwMCxcbiAgICBjc3NDb2RlU3BsaXQ6IHRydWUsXG4gICAgcmVwb3J0Q29tcHJlc3NlZFNpemU6IGZhbHNlLFxuXG4gICAgLy8gS2hcdTAwRjRuZyBwcmVsb2FkIHBhcnRpY2xlcy9zd2lwZXIgY2h1bmsgXHUyMDE0IFx1MDExMVx1MUVDMyB0aFx1MUVGMWMgc1x1MUVGMSBsYXp5LWxvYWQgc2F1IExDUFxuICAgIG1vZHVsZVByZWxvYWQ6IHtcbiAgICAgIHJlc29sdmVEZXBlbmRlbmNpZXM6IChfdXJsLCBkZXBzKSA9PlxuICAgICAgICBkZXBzLmZpbHRlcihkZXAgPT5cbiAgICAgICAgICAhZGVwLmluY2x1ZGVzKCdwYXJ0aWNsZXMnKSAmJlxuICAgICAgICAgICFkZXAuaW5jbHVkZXMoJ3N3aXBlcicpXG4gICAgICAgICksXG4gICAgfSxcblxuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIG91dHB1dDoge1xuICAgICAgICBhc3NldEZpbGVOYW1lczogJ2Fzc2V0cy9bbmFtZV0tW2hhc2hdW2V4dG5hbWVdJyxcbiAgICAgICAgY2h1bmtGaWxlTmFtZXM6ICdhc3NldHMvW25hbWVdLVtoYXNoXS5qcycsXG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiAnYXNzZXRzL1tuYW1lXS1baGFzaF0uanMnLFxuICAgICAgICBtYW51YWxDaHVua3M6IChpZCkgPT4ge1xuICAgICAgICAgIGlmICghaWQuaW5jbHVkZXMoJ25vZGVfbW9kdWxlcycpKSByZXR1cm47XG4gICAgICAgICAgLy8gUGFydGljbGVzIFx1MjE5MiBjaHVuayByaVx1MDBFQW5nLCBsYXp5LWxvYWRlZCBzYXUgaWRsZVxuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnQHRzcGFydGljbGVzJykgfHwgaWQuaW5jbHVkZXMoJy90c3BhcnRpY2xlcycpKSByZXR1cm4gJ3ZlbmRvci1wYXJ0aWNsZXMnO1xuICAgICAgICAgIC8vIERcdTFFRTEgYlx1MUVDRiBcdTAwRTlwIGNodW5rICd2ZW5kb3ItZnJhbWVyJyBcdTAxMTFcdTFFQzMgUm9sbHVwIGtcdTAwRURjaCBob1x1MUVBMXQgdGh1XHUxRUFEdCB0b1x1MDBFMW4gVHJlZS1zaGFraW5nIFx1MDExMVx1MUVEOWMgbFx1MUVBRHAsIGdpXHUwMEZBcCBsb1x1MUVBMWkgYlx1MUVDRiAyMktCIGNvZGUgdGhcdTFFRUJhIG1cdTAwRTAgTGlnaHRob3VzZSBjXHUxRUEzbmggYlx1MDBFMW8uIFxuICAgICAgICAgIC8vIFN3aXBlciBcdTIxOTIgY2hcdTFFQzkgbG9hZCB0clx1MDBFQW4gZGVza3RvcFxuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnL3N3aXBlci8nKSkgcmV0dXJuICd2ZW5kb3Itc3dpcGVyJztcbiAgICAgICAgICAvLyBSZWFjdCBjb3JlIFx1MjE5MiBsdVx1MDBGNG4gY1x1MUVBN25cbiAgICAgICAgICBpZiAoaWQuaW5jbHVkZXMoJy9yZWFjdC1kb20vJykgfHwgaWQuaW5jbHVkZXMoJy9yZWFjdC8nKSB8fCBpZC5pbmNsdWRlcygnL3NjaGVkdWxlci8nKSkgcmV0dXJuICd2ZW5kb3ItcmVhY3QnO1xuICAgICAgICAgIC8vIE1pc2MgdXRpbGl0aWVzXG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdUYWdDbG91ZCcpIHx8IGlkLmluY2x1ZGVzKCd0eXBld3JpdGVyLWVmZmVjdCcpIHx8IGlkLmluY2x1ZGVzKCdyZWFjdC1pY29ucycpKSByZXR1cm4gJ3ZlbmRvci1taXNjJztcbiAgICAgICAgfSxcbiAgICAgIH1cbiAgICB9XG4gIH0sXG5cbiAgc2VydmVyOiB7XG4gICAgd2FybXVwOiB7XG4gICAgICBjbGllbnRGaWxlczogWycuL3NyYy9BcHAuanN4JywgJy4vc3JjL2luZGV4LmNzcyddLFxuICAgIH1cbiAgfVxufSlcblxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFxUSxTQUFTLG9CQUFvQjtBQUNsUyxPQUFPLFdBQVc7QUFHbEIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsTUFBTSxRQUFRLElBQUksYUFBYSxlQUFlLGdCQUFnQjtBQUFBLEVBQzlELFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixPQUFPO0FBQUE7QUFBQSxJQUVMLFFBQVE7QUFBQSxJQUNSLFFBQVE7QUFBQSxJQUNSLHVCQUF1QjtBQUFBLElBQ3ZCLGNBQWM7QUFBQSxJQUNkLHNCQUFzQjtBQUFBO0FBQUEsSUFHdEIsZUFBZTtBQUFBLE1BQ2IscUJBQXFCLENBQUMsTUFBTSxTQUMxQixLQUFLO0FBQUEsUUFBTyxTQUNWLENBQUMsSUFBSSxTQUFTLFdBQVcsS0FDekIsQ0FBQyxJQUFJLFNBQVMsUUFBUTtBQUFBLE1BQ3hCO0FBQUEsSUFDSjtBQUFBLElBRUEsZUFBZTtBQUFBLE1BQ2IsUUFBUTtBQUFBLFFBQ04sZ0JBQWdCO0FBQUEsUUFDaEIsZ0JBQWdCO0FBQUEsUUFDaEIsZ0JBQWdCO0FBQUEsUUFDaEIsY0FBYyxDQUFDLE9BQU87QUFDcEIsY0FBSSxDQUFDLEdBQUcsU0FBUyxjQUFjLEVBQUc7QUFFbEMsY0FBSSxHQUFHLFNBQVMsY0FBYyxLQUFLLEdBQUcsU0FBUyxjQUFjLEVBQUcsUUFBTztBQUd2RSxjQUFJLEdBQUcsU0FBUyxVQUFVLEVBQUcsUUFBTztBQUVwQyxjQUFJLEdBQUcsU0FBUyxhQUFhLEtBQUssR0FBRyxTQUFTLFNBQVMsS0FBSyxHQUFHLFNBQVMsYUFBYSxFQUFHLFFBQU87QUFFL0YsY0FBSSxHQUFHLFNBQVMsVUFBVSxLQUFLLEdBQUcsU0FBUyxtQkFBbUIsS0FBSyxHQUFHLFNBQVMsYUFBYSxFQUFHLFFBQU87QUFBQSxRQUN4RztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBRUEsUUFBUTtBQUFBLElBQ04sUUFBUTtBQUFBLE1BQ04sYUFBYSxDQUFDLGlCQUFpQixpQkFBaUI7QUFBQSxJQUNsRDtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
