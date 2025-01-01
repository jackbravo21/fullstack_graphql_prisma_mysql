const { ApolloServer, gql } = require('apollo-server');
const { PrismaClient } = require('@prisma/client'); //Importa o cliente do Prisma
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();                  //Instancia o cliente do Prisma
const port = 9000;                                  //Porta do servidor;

const { typeDefs, resolvers } = require('./src/graphql');

//Configuração do Apollo Server
const server = new ApolloServer({
    context:({ req }) => {
      const authHeader = req.headers.authorization || '';
      const token = authHeader.split(' ')[1];   //Remove 'Bearer '
      console.log("Token Server: ", token);

      if(token){
        try{
          const user = jwt.verify(token, process.env.JWT_SECRET);
          console.log("Token verificado:", user);
          return { user };
        }
        catch(err){
        console.error('Token inválido', err);
        }
      }
      return {}; //Retorna um contexto vazio para desabilitar a verificação
    },
    cors: {
      origin: 'http://localhost:3000', //Permitir apenas o front end local
      credentials: true, //Caso precise enviar cookies ou headers de autorização
    },
    typeDefs,
    resolvers,
});

//Teste de conexao com Prima/DB;
prisma.$connect()
  .then(() => console.log("\x1b[33m" + "Conectado ao banco de dados!"))
  .catch((error) => console.error("\x1b[31m" + "Erro ao conectar ao banco:", error))
  .finally(() => prisma.$disconnect());

//Iniciar Servidor
server.listen(port).then(({url}) => {
    console.log("\x1b[36m%s\x1b[0m", `Server rodando em ${url}`);
}).catch((error) => {
  console.error("\x1b[31m", "Erro ao iniciar o servidor Apollo", error);
});;
