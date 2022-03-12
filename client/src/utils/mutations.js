import { gql } from '@apollo/client';

export const ADD_USER = gql`
mutation addUser($username: String!, $email: String!, $password: String!) {
  addUser(username: $uisername, email: $email, password: $password) {
    token
    user {
      _id
      username
    }
  }
}
`;


export const LOGIN_USER = gql`
mutation loginUser($email: String!, $password: String!){
  loginUser(email: $email, password: $password) {
    token
    user {
      _id
      username  
    }

  }
}
`;


export const SAVE_BOOK = gql`
mutation saveBook($bookData: BookInput!) {
  saveBook(bookData: $bookData) {
      _id
     username
     email
     savedBooks {
        bookId
         authors
        description
       image
       link
       title
     }
  }
}
`;


export const DELETE_BOOK = gql`

mutation deleteBook($bookId: ID!) {
  deleteBook(bookId: $bookId) {
      _id
     username
     email
     savedBooks {
       bookId
       authors
       description
       image
       link
       title
     }
    }
 }
 `;