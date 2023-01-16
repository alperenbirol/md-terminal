import {
  headerLevel,
  Heading,
  ListPoint,
  OrderedListPoint,
  Paragraph,
  List,
  UnorderedListPoint,
  Code,
} from './types'

const headerDetector = (str: string): Heading | null => {
  if (/^#{1,6} (.*)/.test(str)) {
    const [, level, content] = str.match(/(^#{1,6}) (.*)/) as RegExpMatchArray
    return {
      str: content,
      level: level.length as headerLevel,
      type: 'heading',
    } as Heading
  }

  return null
}

const codeDetector = (str: string): Code | null => {
  if (/(```([a-zA-Z]*)\n((?:[\s\S]*?)\n)```)/.test(str)) {
    const [, , language, content] = str.match(
      /(```([a-zA-Z]*)\n((?:[\s\S]*?)\n)```)/
    ) as RegExpMatchArray

    return {
      str: content,
      language: language,
      type: 'code',
    } as Code
  }

  return null
}

const listDetector = (str: string): ListPoint[] | null => {
  const points: ListPoint[] = []

  if (/^(\d)+\. (.*)/.test(str)) {
    const orderedList = str.matchAll(/(\d)+\. (.*)/g)
    let index = 0
    for (const [, order, content] of orderedList) {
      let numOrder = parseInt(order)
      if (numOrder === 0) {
        numOrder = index + 1
      }
      index++

      points.push({
        content: content,
        order: numOrder,
        pointType: 'ordered',
      } as OrderedListPoint)
    }

    return points
  }

  if (/^[*+-] (.*)/.test(str)) {
    const unorderedList = str.matchAll(/[*+-] (.*)/g)

    for (const [, content] of unorderedList) {
      points.push({
        content: content,
        pointType: 'unordered',
      } as UnorderedListPoint)
    }

    return points
  }

  return null
}

export const findParagraphType = (paragraph: string): Paragraph => {
  const heading = headerDetector(paragraph)
  if (heading) {
    return heading
  }

  if (listDetector(paragraph)) {
    return {
      str: paragraph,
      points: listDetector(paragraph) as ListPoint[],
      type: 'list',
    } as List
  }

  const code = codeDetector(paragraph)
  if (code) {
    return code
  }

  return {str: paragraph, type: 'paragraph'}
}
