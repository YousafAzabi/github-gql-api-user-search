import { gql } from '@apollo/client';

const GET_USERS = gql`
  query GetUsers ($searchText: String!, $first: Int, $last: Int, $after: String, $before: String) {
    search(query: $searchText, type: USER, first: $first, last: $last, after: $after, before: $before) {
      nodes {
        ...on User {
          name
          login
          avatarUrl
        }
      }
      pageInfo {
        startCursor
        endCursor
        hasNextPage
        hasPreviousPage
      }
      userCount
    }
  }`;

const GET_REPOSITORIES = gql`
  query GetRepositories ($userName: String!, $first: Int, $last: Int, $after: String, $before: String) {
    user(login: $userName) {
      repositories(first: $first, last: $last, after: $after, before: $before) {
        nodes {
          name
          url
        }
        pageInfo {
          startCursor
          endCursor
          hasNextPage
          hasPreviousPage
        }
      }
    }
  }`;

export {
  GET_USERS,
  GET_REPOSITORIES
}