import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation createUser($fullname: String!, $mail: String!, $password: String!, $level: String) {
    createUser(fullname: $fullname, mail: $mail, password: $password, level: $level){
      id
      fullname
      mail
      level
      createdAt
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($mail: String!, $password: String!){
    login(mail: $mail, password: $password) {
    user {
      id
      fullname
      mail
			level
			created_at
			isLoggedIn
      statusCode
    }
    token
  }
  }
`;

export const USERS = gql`
  query users {
    users {
      id
      fullname
      mail
      level
      created_at
    }
  }
`;

export const EDIT_USER = gql`
  mutation editUser($id: Int!, $fullname: String!, $mail: String!, $password: String!, $level: String!){
    editUser(
      id: $id,
      fullname: $fullname,
      mail: $mail,
      password: $password,
      level: $level
    ){
      id
      fullname
      mail
      level
      created_at
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: Int!){
    deleteUser(
      id: $id,
    ){
        id
    }
  }
`;