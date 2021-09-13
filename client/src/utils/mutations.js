import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        bookCount
        savedBooks {
          bookId
          authors
          description
          title
          image
          link
        }
      }
    }
  }
`;

export const ADD_USER = gql`
    mutation AddUserMutation(
        $username: String!
        $email: String!
        $password: String!
    ) {
        addUser(
        username: $username
        email: $email
        password: $password
        ) {
        token
        user {
            _id
            username
            email
            bookCount
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
        }
    }  
`;


export const SAVE_BOOK = gql`
    mutation SaveBookMutation($saveBookAuthors: [String]!, $saveBookDescription: String!, $saveBookTitle: String!, $saveBookBookId: String!, $saveBookImage: String!, $saveBookLink: String!) {
        saveBook(authors: $saveBookAuthors, description: $saveBookDescription, title: $saveBookTitle, bookId: $saveBookBookId, image: $saveBookImage, link: $saveBookLink) {
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            authors
            description
            title
            image
            link
        }
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation RemoveBookMutation($removeBookBookId: String!) {
        removeBook(BookID: $removeBookBookId) {
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            authors
            description
            title
            image
            link
        }
        }
    }
`;