import { defineConfig } from 'tsdown'

// Output file names match the previous microbundle build to stay backwards compatible.
export default defineConfig([
  {
    // Modern ESM build, used by the `exports` map.
    entry: { index: 'src/index.ts' },
    format: 'esm',
    target: 'es2019',
    sourcemap: true,
    dts: true,
    outExtensions: () => ({ js: '.modern.mjs', dts: '.mts' })
  },
  {
    // Legacy ESM build for the `module` field. Its types are emitted as
    // `index.d.ts` for resolvers that don't support `exports`.
    entry: { index: 'src/index.ts' },
    format: 'esm',
    target: 'es2015',
    sourcemap: true,
    dts: true,
    clean: false,
    outExtensions: () => ({ js: '.module.mjs', dts: '.ts' })
  },
  {
    // CommonJS entry: `module.exports` is the tag function itself, with
    // `default`, `join` and `safe` attached as properties.
    entry: { index: 'src/index.cjs.ts' },
    format: 'cjs',
    target: 'es2015',
    sourcemap: true,
    dts: true,
    clean: false,
    outExtensions: () => ({ js: '.js' }),
    // CJS types are emitted in a separate pass; name them `.d.cts` so they
    // don't collide with the ESM `index.d.ts`.
    outputOptions: (options, _format, { cjsDts }) =>
      cjsDts ? { ...options, entryFileNames: '[name].d.cts' } : options
  },
  {
    entry: { index: 'src/index.cjs.ts' },
    format: 'umd',
    target: 'es2015',
    globalName: 'escapeHtmlTemplateTag',
    sourcemap: true,
    clean: false,
    outExtensions: () => ({ js: '.js' })
  }
])
