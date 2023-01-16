import {Printer} from '../printer/print'
import {Parser} from './parser'

export default {
  newParser(printer: Printer) {
    return new Parser(printer)
  },
}
