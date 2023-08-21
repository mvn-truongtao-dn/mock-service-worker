import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
  query getBooks {
    books {
      book {
        name
        author
        id
      }
    }
  }
`;

export const GET_BOOK = gql`
  query getBook($id: ID!) {
    book(id: $id) {
      name
      author
      id
    }
  }
`;
