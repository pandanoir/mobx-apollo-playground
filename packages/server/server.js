// server.js
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

// スキーマ定義
const typeDefs = `#graphql
  type Note {
    id: ID!
    content: String!
  }

  type Query {
    notes: [Note!]!      # 全件取得 (Read)
    note(id: ID!): Note  # 単一取得 (Read)
  }

  type Mutation {
    addNote(content: String!): Note!        # Create
    updateNote(id: ID!, content: String!): Note # Update
    deleteNote(id: ID!): Boolean!           # Delete
  }
`;

// インメモリのデータ
let notes = [
  { id: "1", content: "First note" },
  { id: "2", content: "Second note" },
];

// リゾルバ
const resolvers = {
  Query: {
    notes: () => notes,
    note: (_, { id }) => notes.find(n => n.id === id),
  },
  Mutation: {
    addNote: (_, { content }) => {
      const newNote = { id: String(notes.length + 1), content };
      notes.push(newNote);
      return newNote;
    },
    updateNote: (_, { id, content }) => {
      const note = notes.find(n => n.id === id);
      if (!note) return null;
      note.content = content;
      return note;
    },
    deleteNote: (_, { id }) => {
      const index = notes.findIndex(n => n.id === id);
      if (index === -1) return false;
      notes.splice(index, 1);
      return true;
    },
  },
};

// サーバー作成
const server = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
  cors: { origin: "http://localhost:5173" },
});

console.log(`🚀 Server ready at ${url}`);

