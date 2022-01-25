/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUser = /* GraphQL */ `
  query GetUser($user: String!) {
    getUser(user: $user) {
      user
      todos {
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $user: String
    $filter: ModelUserFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listUsers(
      user: $user
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        user
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      description
      deadline
      priority
      completed
      category
      userID
      user {
        user
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        deadline
        priority
        completed
        category
        userID
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const searchTodos = /* GraphQL */ `
  query SearchTodos(
    $filter: SearchableTodoFilterInput
    $sort: [SearchableTodoSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableTodoAggregationInput]
  ) {
    searchTodos(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        name
        description
        deadline
        priority
        completed
        category
        userID
        createdAt
        updatedAt
        owner
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;
