import {PathLike, readFileSync} from 'fs'
import {lines} from './types'

const readFile = (path: PathLike, encoding: BufferEncoding = 'utf8'): string => {
  return readFileSync(path, encoding)
}

export const fromFile = (path: PathLike): lines => {
  const contents = readFile(path)

  return contents.split('\n\n')
}
