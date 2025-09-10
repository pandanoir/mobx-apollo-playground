import { useQuery } from '@apollo/client/react';
import { useEffect } from 'react';
import { typenameEmitter } from './typenameEmitter';

/**
 * refetchTypenamesに指定されたtypenameが含まれるmutationレスポンスがあったらrefetchが走るuseQuery
 */
export const useAutoRefetchQuery = (
  refetchTypenames: string[],
  ...args: Parameters<typeof useQuery>
) => {
  const result = useQuery(...args);
  useEffect(() => {
    const disposers = refetchTypenames.map((typename) =>
      typenameEmitter.addEventListener(typename, () => result.refetch()),
    );
    return () => {
      for (const disposer of disposers) {
        disposer();
      }
    };
  }, []);
  return result;
};
