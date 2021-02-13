import { fileLoader, mergeTypes } from 'merge-graphql-schemas'; // passa um path pra ele, ele vai ler todos os arquivos .gql e juntar tudo dentro de um array
import path from 'path';

const typesArray = fileLoader(path.join(__dirname, 'modules', '**', '*gql'));
const typeDefs = mergeTypes(typesArray); // faz o merge de todos os arrays pra ficar tudo em uma linha só de código

export default typeDefs;