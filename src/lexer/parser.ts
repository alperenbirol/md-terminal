import {findParagraphType} from './lexer'
import {Code, Heading, List} from './types'
import {Printer} from '../printer/print'

export class Parser {
  printer: Printer
  parseLine: (line: string) => void

  constructor(printer: Printer) {
    this.printer = printer

    this.parseLine = parseLine.bind(this)
  }
}

function parseLine(this: Parser, line: string) {
  const paragraphType = findParagraphType(line)

  switch (paragraphType.type) {
    case 'heading': {
      const heading = paragraphType as Heading
      this.printer.printHeader(heading)
      break
    }
    case 'list': {
      const list = paragraphType as List
      this.printer.printList(list)
      break
    }
    case 'code': {
      const code = paragraphType as Code
      this.printer.printCode(code)
      break
    }
    default: {
      this.printer.printParagraph(paragraphType)
    }
  }
  console.log('')
}
