type options = {
  weight?: number
  link?: string

  list?: {
    type: 'ordered' | 'unordered'
    number?: number
  }
}

type style = (str: string, options?: options) => string

export type StyleConfig = {
  bold: style
  italic: style
  link: style
  strikethrough: style
  inlineCode: style

  header: style
  listPoint: style
}
