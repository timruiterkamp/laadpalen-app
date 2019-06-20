const { buildSchema } = require("graphql");

module.exports = buildSchema(`
type Category {
  _id: ID!
  title: String!
  stakeholders: Stakeholder!
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
  stakeholders: Stakeholder!
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
  creator: User
  category: Category!
  location: String,
  status: String
  polenumber: Int!
  createdAt: String!
  messages: [Message!],
  history: [History!],
  image: String
  stakeholders: Stakeholder!
  loadingstation: Loadingstation!
  confirmed: Int
}

type User {
  _id: ID!
  email: String!
  password: String
  createdIssues: [Issue!]
  createdMessages: [Message!]
  lastLoggedIn: String
}

type Loadingstation {
  _id: ID!
  longitude: Float
  latitude: Float
  city: String!
  region: String
  regioncode: String
  district: String
  subdistrict: String
  address: String
  postalcode: String
  provider: String
  sockets: Int
  usedsockets: Int
  status: String
  issues: [Issue!]
}

type AuthData {
  userId: ID!
  token: String!
  tokenExpiration: Int!
}

input IssueInput {
  title: String!
  description: String!
  location: String
  status: String
  polenumber: Int
  createdAt: String!
  image: String
  confirmed: Int
  stakeholderId: String!
  loadingstationId: String!
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
  categoryId: String
}

type RootQuery {
  issues: [Issue!]!
  categories: [Category!]!
  users: [User!]!
  stakeholders: [Stakeholder!]!
  messages: [Message!]!
  loadingstations: [Loadingstation!]!
  login(email: String!, password: String!): AuthData!
}

type RootMutation {
  createIssue(issueInput: IssueInput): Issue
  createCategory(categoryInput: CategoryInput): Category
  createUser(userInput: UserInput): User
  createMessage(messageInput: MessageInput): Message
  createStakeholder(stakeholderInput: StakeholderInput): Stakeholder
  updateIssue(issueId: ID!): Issue
  updateLoadingstation(loadingstationId: ID!): Loadingstation
}
schema {
  query: RootQuery
  mutation: RootMutation
}
`);
