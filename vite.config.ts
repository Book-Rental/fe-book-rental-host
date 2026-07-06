import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'], // Formats generated reports
      thresholds: {
        lines: 80,       // Fails the CI build if total line coverage is under 80%
        functions: 80,   // Fails the CI build if total function coverage is under 80%
        branches: 70,    // Fails the CI build if conditions aren't adequately checked
      },
      exclude: [
        'src/setupTests.ts',
        '**/*.stories.tsx', // Exclude Storybook stories from coverage data
        'dist/**'
      ]
    }
  }
})
