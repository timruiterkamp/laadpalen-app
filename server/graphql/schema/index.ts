const { buildSchema } = require("graphql");

module.exports = buildSchema(`
type UserConfirm {
  _id: ID!
  user: User!
  issue: Issue!
  count: Int!
  date: String!
}

type Category {
  _id: ID!
  title: String!
  stakeholder: Stakeholder!
  messages: [Message!]
}

type Message {
  _id: ID!
  title: String!
  description: String!
  user: User!
  issue: Issue!
  category: Category!
  created: String!
}

type History {
  _id: ID!
  issue: Issue!
  user: User!
  stakeholder: Stakeholder! 
  date: String!
  messages: [Message!]
}

type Stakeholder {
  _id: ID!
  title: String!
  users: [User!]
  issues: [Issue!]
}

type Issue {
  _id: ID!
  title: String!
  description: String!
  creator: User!
  category: Category!
  location: String,
  status: String
  polenumber: Int!
  created: String!
  confirmed: [UserConfirm!],
  messages: [Message!],
  history: [History!],
  image: String
  stakeholder: Stakeholder!
}

type User {
  _id: ID!
  email: String!
  password: String
  createdIssues: [Issue!]
  lastLoggedIn: String!
}

type Laadpalen {
  _id: ID!
  address: String!
  latlong: String!
  power: Int!
}

type AuthData {
  userId: ID!
  token: String!
  tokenExpiration: Int!
}

input IssueInput {
  title: String!
  description: String!
  location: String!
  status: String
  polenumber: Int
  created: String!
  image: String
}

input UserInput {
  email: String!
  password: String!
}

input StakeholderInput {
  title: String!
}

type RootQuery {
  issues: [Issue!]!
  categories: [Category!]!
  stakeholders: [Stakeholder!]!
  login(email: String!, password: String!): AuthData!
}

type RootMutation {
  createIssue(issueInput: IssueInput): Issue
  createUser(userInput: UserInput): User
  createStakeholder(stakeholderInput: StakeholderInput): Stakeholder
}
schema {
  query: RootQuery
  mutation: RootMutation
}
`);
