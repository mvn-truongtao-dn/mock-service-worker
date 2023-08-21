import { gql } from "@apollo/client";

export const CREATE_BOOK = gql`
  mutation createBook($name: String, $author: String) {
    addBook(name: $name, author: $author) {
      name
      author
    }
  }
`;

export const DELETE_BOOK = gql`
  mutation deleteBook($id: ID!) {
    book(id: $id) {
      name
      author
      id
    }
  }
`;

export const UPDATE_BOOK = gql`
  mutation updateBook($id: ID!) {
    book(name: $name, author: $author, id: $id) {
      name
      author
      id
    }
  }
`;
