const { loadFilesSync } = require('@graphql-tools/load-files');
const { mergeTypeDefs } = require('@graphql-tools/merge')
const { print } = require( 'graphql');
const fs = require('node:fs')
const path = require('node:path')


const loadedFiles = loadFilesSync(`src/modules/**/graphql/*.graphql`);
const typeDefs = mergeTypeDefs(loadedFiles);
const printedTypeDefs = print(typeDefs);
fs.writeFileSync(`${path.dirname(__filename)}/joined.graphql`, printedTypeDefs);
