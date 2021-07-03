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
      }
      userCount
    }
  }`;

const GET_REPOSITORIES = gql`
  query GetRepositories ($userName: String!, $limit: Int!) {
    user(login: $userName) {
      repositories(first: $limit) {
        nodes {
          name
          url
        }
        pageInfo {
          startCursor
          endCursor
          hasNextPage
        }
      }
    }
  }`;

export {
  GET_USERS,
  GET_REPOSITORIES
}