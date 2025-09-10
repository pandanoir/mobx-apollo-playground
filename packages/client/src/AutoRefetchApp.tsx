import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client/react';
import { useAutoRefetchQuery } from './useAutoRefetchQuery';

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
  const { loading, error, data, previousData } = useAutoRefetchQuery(
    ['Note'],
    getNotesQuery,
  );
  const [create] = useMutation(createNoteMutation);
  const [update] = useMutation(updateNoteMutation);

  if (loading && !previousData) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return loading ? (
    <div>
      {(previousData as any).notes.map((note) => note.content)}
      <button onClick={() => create()}>add</button>
      <button onClick={() => update()}>update</button>
    </div>
  ) : (
    <div>
      {(data as any).notes.map((note) => note.content)}
      <button onClick={() => create()}>add</button>
      <button onClick={() => update()}>update</button>
    </div>
  );
}
