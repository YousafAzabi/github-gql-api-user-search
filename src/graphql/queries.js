import { gql } from '@apollo/client';

const GET_USERS = gql`
  query GetUsers ($searchText: String!, $limit: Int!) {
    search(query: $searchText, type: USER, first: $limit) {
      nodes {
        ...on User {
          name
          login
          avatarUrl
        }
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
        }
      }
    }
  }`;

export {
  GET_USERS,
  GET_REPOSITORIES
}