export type Span = string

export interface Paragraph {
  str: Span
  type: 'paragraph' | 'heading' | 'code' | 'list'
}

export interface Heading extends Paragraph {
  level: headerLevel
  type: 'heading'
}

export type headerLevel = 1 | 2 | 3 | 4 | 5 | 6

export interface Code extends Paragraph {
  language: string
  type: 'code'
}

export interface List extends Paragraph {
  points: ListPoint[]
  type: 'list'
}

export interface ListPoint {
  pointType: 'ordered' | 'unordered'
  content: Span
}

export interface OrderedListPoint extends ListPoint {
  pointType: 'ordered'
  order: number
}

export interface UnorderedListPoint extends ListPoint {
  pointType: 'unordered'
}
