import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  dts: false, // Temporarily disable type declarations
  splitting: false,
  sourcemap: true,
  clean: true,
});
