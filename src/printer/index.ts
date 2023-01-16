import {printCode, Printer, printHeader, printList, printParagraph} from './print'
import {StyleConfig} from '../style/config'
import chalk from 'chalk'
import terminalLink from 'terminal-link'

const bulletCharacter = '•'

const defaultConfig: StyleConfig = {
  bold(str) {
    return chalk.bold(str)
  },
  italic(str) {
    return chalk.italic(str)
  },
  link(str, options) {
    return chalk.underline.blueBright(terminalLink(str, options?.link ?? 'no link'))
  },
  strikethrough(str) {
    return chalk.strikethrough(str)
  },
  inlineCode(str) {
    return chalk.bgGray.white(str)
  },

  header(str, options) {
    switch (options?.weight ?? 0) {
      case 1: {
        return chalk.bold.underline.magentaBright(str)
      }
      case 2: {
        return chalk.bold.cyan(str)
      }
      case 3: {
        return chalk.bold.dim.red(str)
      }
      case 4: {
        return chalk.bold.dim.yellow(str)
      }
      case 5: {
        return chalk.bold.dim.white(str)
      }
      case 6: {
        return chalk.bold.dim.gray(str)
      }
      default: {
        return chalk.dim.black(str)
      }
    }
  },
  listPoint(str, options) {
    if (options?.list?.type === 'ordered') {
      return (
        '  ' +
        chalk.bold.whiteBright((options.list.number?.toString() ?? '') + '.') +
        ' ' +
        chalk.whiteBright(str)
      )
    }

    return '  ' + chalk.bold.whiteBright(bulletCharacter + ' ' + str)
  },
}

const NewPrinter = (config: StyleConfig = defaultConfig): Printer => {
  return {
    config: config,
    printHeader: printHeader,
    printList: printList,
    printCode: printCode,
    printParagraph: printParagraph,
  } as Printer
}

export default NewPrinter
