const ENTITIES = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
}

const ENT_REGEX = new RegExp(Object.keys(ENTITIES).join('|'), 'g')

class HtmlSafeString {
  constructor (parts, subs) {
    this._parts = parts
    this._subs = subs
  }

  _escapeHtml (unsafe) {
    if (unsafe instanceof HtmlSafeString) {
      return unsafe
    }
    if (Array.isArray(unsafe)) {
      return new HtmlSafeString(Array(unsafe.length + 1).fill(''), unsafe)
    }
    return String(unsafe).replace(ENT_REGEX, char => ENTITIES[char])
  }

  toString () {
    return this._parts.reduce((result, part, i) => {
      const sub = this._subs[i - 1]
      return result + this._escapeHtml(sub) + part
    })
  }

  inspect () {
    return `${this.constructor.name} '${this.toString()}'`
  }
}

function escapeHtml (parts, ...subs) {
  return new HtmlSafeString(parts, subs)
}

escapeHtml.safe = function (value) {
  return new HtmlSafeString([String(value)], [])
}

module.exports = escapeHtml
