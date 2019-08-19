interface Stringifable {
    toString(): string
}

interface HtmlSafeString extends Stringifable {}

type StringLike = Stringifable | string

export function safe(value: StringLike): HtmlSafeString

export function join(values: Array<StringLike>, separator?: StringLike | null): HtmlSafeString

export default function escapeHtml(parts: TemplateStringsArray, ...subs: Array<StringLike>): HtmlSafeString