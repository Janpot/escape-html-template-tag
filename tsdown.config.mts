import { defineConfig } from 'tsdown'

export default defineConfig([
  {
    entry: { index: 'src/index.ts' },
    format: 'esm',
    dts: true
  },
  {
    // CommonJS entry: `module.exports` is the tag function itself, with
    // `default`, `join` and `safe` attached as properties.
    entry: { index: 'src/index.cjs.ts' },
    format: 'cjs',
    dts: true,
    clean: false
  }
])
