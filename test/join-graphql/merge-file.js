const { loadFilesSync } = require('@graphql-tools/load-files');
const { mergeTypeDefs } = require('@graphql-tools/merge')
const { print } = require( 'graphql');
const fs = require('fs')

const loadedFiles = loadFilesSync(`src/modules/**/graphql/*.graphql`);
const typeDefs = mergeTypeDefs(loadedFiles);
const printedTypeDefs = print(typeDefs);
fs.writeFileSync(`test/join-graphql/joined.graphql`, printedTypeDefs);
