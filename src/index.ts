import reader from './reader'
import lexer from './lexer'
import printer from './printer'

const lorem = reader.fromFile('readme.md')

const parser = lexer.newParser(printer())

lorem.forEach(parser.parseLine)
