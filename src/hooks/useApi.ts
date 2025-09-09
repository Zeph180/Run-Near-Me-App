import { useCallback, useState } from "react";

export function useApiMutation<T, P = any>(
  mutationFunction: (params: P) => Promise<T>,
) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  console.log("mutation function: ", mutationFunction);

  const mutate = useCallback(
    async (params: P): Promise<T | null> => {
      try {
        setIsLoading(true);
        setError(null);

        return await mutationFunction(params);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An error occurred";
        setError(errorMessage);
        console.error("Mutation error:", err);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [mutationFunction],
  );

  return { mutate, isLoading, error };
}
