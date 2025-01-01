import { gql } from '@apollo/client';

export const COURSES = gql`
  query courses {
    courses {
        id
        title
        description
        teacher
        createdAt
    }
  }
`;

export const CREATE_COURSE = gql`
  mutation createCourse($title: String!, $description: String!, $teacher: Int!) {
    createCourse(title: $title, description: $description, teacher: $teacher) {
      id
      title
      description
      teacher
      createdAt
    }
  }
`;

export const EDIT_COURSE = gql`
  mutation editCourse($id: Int!, $title: String!, $description: String!, $teacher: Int!){
    editCourse(
      id: $id,
      title: $title,
      description: $description,
      teacher: $teacher
    ){
        id
        title
        description
        teacher
        createdAt
    }
  }
`;

export const DELETE_COURSE = gql`
  mutation deleteCourse($id: Int!){
    deleteCourse(
      id: $id,
    ){
        id
    }
  }
`;