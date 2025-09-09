import { gql } from '@apollo/client';
import { useMutation, useQuery } from '@apollo/client/react';

export const noteFragment = gql`
  fragment Note on Note {
    id
    content
  }
`;

const getNotesQuery = gql`
  query {
    notes {
      ...Note
    }
  }
  ${noteFragment}
`;

const updateNoteMutation = gql`
  mutation {
    updateNote(id: "1", content: "Updated note") {
      ...Note
    }
  }
  ${noteFragment}
`;

// フラグメントに対してqueryやmutationを行うサンプル
export function App() {
  const { loading, error, data } = useQuery(getNotesQuery);
  const [update] = useMutation(updateNoteMutation);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div>
      {(data as any).notes.map((note) => note.content)}
      <button onClick={() => update()}>update</button>
    </div>
  );
}
