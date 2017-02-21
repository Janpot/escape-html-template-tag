const assert = require('assert')
const H = require('.')

assert.strictEqual(String(H`<a>`), '<a>')
assert.strictEqual(String(H`${'<a>'}`), '&lt;a&gt;')
assert.strictEqual(String(H`${1}`), '1')

// nesting
assert.strictEqual(String(H`${H`<a>`}`), '<a>')
assert.strictEqual(String(H`${H`${'<a>'}`}`), '&lt;a&gt;')

// escape characters
assert.strictEqual(String(H`${'&'}`), '&amp;')
assert.strictEqual(String(H`${'<'}`), '&lt;')
assert.strictEqual(String(H`${'>'}`), '&gt;')
assert.strictEqual(String(H`${'"'}`), '&quot;')
assert.strictEqual(String(H`${"'"}`), '&#39;')
assert.strictEqual(String(H`${'/'}`), '&#x2F;')
assert.strictEqual(String(H`${'`'}`), '&#x60;')
assert.strictEqual(String(H`${'='}`), '&#x3D;')

// flattening arrays
assert.strictEqual(String(H`${['a', 1, '<']}`), 'a1&lt;')
assert.strictEqual(String(H`${['a', H`<`]}`), 'a<')
assert.strictEqual(String(H`${[]}`), '')

// H.safe
assert.strictEqual(String(H`${H.safe('<a>')}`), '<a>')
assert.strictEqual(String(H`${H.safe(1)}`), '1')
assert.strictEqual(String(H`${H.safe([1, 2, 3])}`), '1,2,3')
assert.strictEqual(String(H`${H.safe(H`<a>`)}`), '<a>')

// .join
assert.strictEqual(String(H.join([H`a`, H`b`, H`c`], ' ')), 'a b c')
assert.strictEqual(String(H.join([H`a`, H`b`, H`c`])), 'a,b,c')
assert.strictEqual(String(H.join([H`a`, H`b`, H`c`], null)), 'a,b,c')
assert.strictEqual(String(H.join([H`<`, H`>`], H`${'&'}`)), '<&amp;>')
assert.strictEqual(String(H.join([H`${'<'}`, H`${'>'}`], H`&`)), '&lt;&&gt;')
