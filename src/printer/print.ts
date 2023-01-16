import {Code, Heading, List, OrderedListPoint, Paragraph, UnorderedListPoint} from '../lexer/types'
import {StyleConfig} from '../style/config'
import {colorizeCode} from './code'

export interface Printer {
  config: StyleConfig

  printHeader: (header: Heading) => void
  printList: (list: List) => void
  printCode: (code: Code) => void
  printParagraph: (paragraph: Paragraph) => void
}

export function printHeader(this: Printer, header: Heading) {
  console.log(this.config.header(parseText(header.str, this.config), {weight: header.level}))
}

export function printList(this: Printer, list: List) {
  list.points.forEach(point => {
    if (point.pointType === 'ordered') {
      const ordered = point as OrderedListPoint
      console.log(
        this.config.listPoint(parseText(ordered.content, this.config), {
          list: {type: 'ordered', number: ordered.order},
        })
      )
    } else {
      const unordered = point as UnorderedListPoint
      console.log(
        this.config.listPoint(parseText(unordered.content, this.config), {
          list: {type: 'unordered'},
        })
      )
    }
  })
}

export function printCode(this: Printer, code: Code) {
  console.log(colorizeCode(code).str)
}

export function printParagraph(this: Printer, paragraph: Paragraph) {
  console.log(parseText(paragraph.str, this.config))
}

const parseText = (text: string, config: StyleConfig) => {
  text = text.replaceAll(/`(.*)`/g, (match, content) => {
    return config.inlineCode(content as string)
  })

  text = text.replaceAll(/\[(.+?)\]\((.+?)\)/g, (match, title, link) => {
    return config.link(title as string, {link: link as string})
  })

  text = text.replaceAll(/\*{2}(.*)\*{2}/g, (match, content) => {
    return config.bold(content as string)
  })

  text = text.replaceAll(/_{2}(.*)_{2}/g, (match, content) => {
    return config.bold(content as string)
  })

  text = text.replaceAll(/\*(.*)\*/g, (match, content) => {
    return config.italic(content as string)
  })

  text = text.replaceAll(/_(.*)_/g, (match, content) => {
    return config.italic(content as string)
  })

  text = text.replaceAll(/~~(.*)~~/g, (match, content) => {
    return config.strikethrough(content as string)
  })

  return text
}
