const { gql } = require('apollo-server');
const { mergeTypeDefs, mergeResolvers } = require('@graphql-tools/merge');

// Importar TypeDefs
const baseTypeDefs = require('./types/base.graphql');
const userTypeDefs = require('./types/user.graphql');
const courseTypeDefs = require('./types/course.graphql');
const deletionResponseTypeDefs = require('./types/deletionResponse.graphql');

// Importar Resolvers
const userResolvers = require('./resolvers/user');
const courseResolvers = require('./resolvers/course');

// Combinar todos os TypeDefs e Resolvers
const typeDefs = mergeTypeDefs([baseTypeDefs, userTypeDefs, courseTypeDefs, deletionResponseTypeDefs]);
const resolvers = mergeResolvers([userResolvers, courseResolvers]);

module.exports = { typeDefs, resolvers };