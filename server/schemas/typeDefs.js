

const typeDefs =
  // Path: server/schemas/typeDefs.js
  `type User {
    _id: ID
    username: String
    email: String
    bookCount: Int
    savedBooks: [Book]
}
type Book {
    _Id: ID
    authors: [String]
    description: String
    bookId: string
    title: String
    image: String
    link: String
}
type Query {
    me: User
    users: [User]
    user(username: String!): User
    books(username: String): [Book]
    book(bookId: ID!): Book
}
type Auth {
    token: ID!
    user: User
}
input BookInput {
    bookId: ID
    authors: [String]
    description: String
    title: String
    image: String
    link: String
}

type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(bookData: BookInput!): User
    removeBook(bookId: ID!): User
}

`;

module.exports = typeDefs;