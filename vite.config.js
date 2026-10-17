import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

const stub = fileURLToPath(new URL("./src/mediapipe-stub.js", import.meta.url));

// Relative base so the build works at https://smadhu6364-beep.github.io/aiml-project/
export default defineConfig({
  base: "./",
  plugins: [react()],
  resolve: {
    alias: {
      "@mediapipe/hands": stub,
      "@mediapipe/face_mesh": stub,
    },
  },
  build: { chunkSizeWarningLimit: 4000 },
});
