# escape-html-template-tag

Construct string literals that have their substitutions escaped automatically.

[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

## Usage

### Basic example

```js
const escapeHtml = require('escape-html-template-tag')

const title = 'All about < & >'
const h1 = escapeHtml`
  <h1>${title}</h1>
`
// <h1>All about &lt; &amp; &gt;</h1>
```

### Nesting templates

Escaped template literals can be nested and won't be interpollated again.

```js
const h1 = escapeHtml`<h1>Hello World</h1>`;
const article = escapeHtml`
  ${h1}
  I'ts me!
`;
// <h1>Hello World</h1>
// I'ts me!
```

### Automatically flatten arrays

In case a value is an Array, the items will be individually escaped and concatenated.

```js
const listOfSymbols = escapeHtml`
  <ul>
    ${['<', '&', '>'].map(item => escapeHtml`<li>symbol: ${item}</li>`)}
  </ul>
`
// <ul>
//   <li>symbol: &lt;</li>
//   <li>symbol: &amp;</li>
//   <li>symbol: &gt;</li>
// </ul>
```

### Don't interpollate html from trusted sources with `escapeHtml.safe()`

If you have html strings that already contain markup you can prevent it from being escaped with `escapeHtml.safe()`.

```js
const trustedString = '<a href="https://www.google.com">Google</a>'
const navigation = escapeHtml`
<div>
  ${escapeHtml.safe(trustedString)}
</div>
`
// <div>
//   <a href="https://www.google.com">Google</a>
// </div>
```

### Compose templates easily with functions

```js
const html = require('escape-html-template-tag')

const anchor = (text, href) => html`<a href="${href}">${text}</a>`

const list = items => html`
  <ul>
    ${items.map(item => html`<li>${item}</li>`)}
  </ul>
`

const navigation = list(
  anchor('Home', '/home'),
  anchor('About', '/about'),
  anchor('Blog', '/blog')
);
// <ul>
//   <li><a href="&#x2F;home">Home</a></li>
//   <li><a href="&#x2F;about">About</a></li>
//   <li><a href="&#x2F;blog">Blog</a></li>
// </ul>
```