import { defineConfig } from '@tanstack/start/config';
import viteTsConfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  server: {
    preset: "aws-lambda-streaming",
  },
  vite: {
    plugins: [
      viteTsConfigPaths({
        projects: ["./tsconfig.json"],
      }),
    ],
  },
});
