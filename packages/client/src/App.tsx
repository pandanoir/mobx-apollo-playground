import { gql } from '@apollo/client';
import { useMutation, useQuery } from '@apollo/client/react';

const getNotesQuery = gql`
  query {
    notes {
      id content
    }
  }
`;

const updateNoteMutation = gql`
  mutation {
    updateNote(id: "1", content: "Updated note") {
      id content
    }
  }
`;

const createNoteMutation = gql`
  mutation {
    addNote (content: "New note") {
      id content
    }
  }
`;

export function App() {
  const { loading, error, data } = useQuery(getNotesQuery);
  const [create] = useMutation(createNoteMutation);
  const [update] = useMutation(updateNoteMutation);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      {(data as any).notes.map((note) => note.content)}
      <button onClick={() => create()}>add</button>
      <button onClick={() => update()}>update</button>
    </div>
  );
}
