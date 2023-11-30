

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
    authors: [String]
    description: String
    bookId: ID!
    title: String
    image: String
    link: String
}
type Query {
    me: User

}
type Auth {
    token: ID!
    user: User
}
input BookInput {
    bookId: String
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