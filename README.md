Olá, eu sou o Michael, mas pode me chamar de Jack Bravo!

Este é um projeto Fullstack utilizando GraphQL com Apollo, que visa o recebimento e transmissão de dados entre o Frontend e Backend.


Descrição
Este sistema Fullstack é composto por um Frontend em React/ApolloClient/GraphQL e um Backend em Node.js/ApolloServer/GraphQL. 


Ele fornece funcionalidades como:
Login de usuário.
Visualização de usuários e cursos.
CRUD avançado com suporte a dados.
Criptografia JWT/tokens.



Frontend (React):

Padrões de projeto: Separação clara entre regras de negócios e componentes.

Rotas e Protected Routes: Utilização do react-router-dom para navegação.

Gerenciamento de estado: Uso de useState e useEffect para estados locais.

Redux: Utilização de Reducers, Saga, Store e Slice para o gerenciamento de estado global.

Tokens: Implementação de autenticação e manutenção de sessão com tokens JWT.

Apollo Client (GraphQL Frontend): Configuração dos schemas, cacheController e execução de consultas GraphQL.



Backend (Node.js):

Estrutura de servidor com ApolloServer: Organizando a lógica de GraphQL com Apollo Server.

Padrões de projeto: Separação de responsabilidades nas camadas de Schemas, Types, Resolvers, Mutations, Middlewares, etc.

Rotas protegidas: Uso de middlewares para proteger rotas sensíveis.

Criptografia: Implementação de JSON Web Token (JWT) para autenticação e proteção de Resolvers e Mutations.

Prisma: ORM para interação com o banco de dados MySQL.

MySQL: Banco de dados relacional utilizado.



Tecnologias Utilizadas:

Frontend: React, Apollo Client, Redux, react-router-dom.

Backend: Node.js, Apollo Server, Prisma, MySQL.

Autenticação: JWT (JSON Web Tokens).

ORM: Prisma.
