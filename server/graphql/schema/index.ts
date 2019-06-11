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
  issues: [Issue!]
}

type Message {
  _id: ID!
  message: String!
  user: User!
  issues: Issue!
  categories: Category!
  createdAt: String!
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
  createdMessages: [Message!]
  lastLoggedIn: String
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

input CategoryInput {
  title: String!
}

input MessageInput {
  message: String!
  createdAt: String!
  issueId: String!
  categoryId: String!
}

type RootQuery {
  issues: [Issue!]!
  categories: [Category!]!
  stakeholders: [Stakeholder!]!
  messages: [Message!]!
  login(email: String!, password: String!): AuthData!
}

type RootMutation {
  createIssue(issueInput: IssueInput): Issue
  createCategory(categoryInput: CategoryInput): Category
  createUser(userInput: UserInput): User
  createMessage(messageInput: MessageInput): Message
  createStakeholder(stakeholderInput: StakeholderInput): Stakeholder
}
schema {
  query: RootQuery
  mutation: RootMutation
}
`);
