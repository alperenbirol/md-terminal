import chalk from 'chalk'
import {Code} from '../lexer/types'

const colorizeJavascript = (code: string): string => {
  const colors = {
    magenta: chalk.magentaBright,
    yellow: chalk.yellowBright,
    blue: chalk.blue,
  }

  code = code.replaceAll(/([`'"].*[`'"])/g, (match, content) => {
    return colors.yellow(content as string)
  })

  for (const match of code.matchAll(/(const|let|var|function) ([A-z_0-9]*)/g)) {
    const [, , name] = match
    const functionNameIndex = code.indexOf(name, match.index)
    code =
      code.slice(0, functionNameIndex) +
      colors.blue(name) +
      code.slice(functionNameIndex + name.length)
  }

  code = code.replaceAll(
    /(\bexport\b|\bconst\b|\breturn\b|\bas\b|\bswitch\b|\bcase\b|\bbreak\b)/g,
    (match, content) => {
      return colors.magenta(content as string)
    }
  )

  return code
}

export const colorizeCode = (code: Code): Code => {
  switch (code.language) {
    case 'javascript': {
      code.str = colorizeJavascript(code.str)
      break
    }
  }

  return code
}
