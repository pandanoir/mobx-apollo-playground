import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { ApolloLink, Observable } from '@apollo/client';
import { typenameEmitter } from './typenameEmitter';

/**
 * mutationのレスポンスに含まれてるtypenameをイベント名として、typenameEmitterにイベントを発火させる
 */
const typenameEmitterLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      const subscription = forward(operation).subscribe({
        next: (result) => {
          if (result.data) {
            for (const value of Object.values(result.data)) {
              if (value?.__typename) {
                typenameEmitter.dispatchEvent(
                  new CustomEvent(value.__typename),
                );
              }
            }
          }
          observer.next(result);
        },
        error: (err) => observer.error(err),
        complete: () => observer.complete(),
      });

      return () => subscription.unsubscribe();
    }),
);

const client = new ApolloClient({
  link: ApolloLink.from([
    typenameEmitterLink,
    new HttpLink({ uri: 'http://localhost:4000/graphql' }),
  ]),
  cache: new InMemoryCache(),
});

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(
    <StrictMode>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </StrictMode>,
  );
}
