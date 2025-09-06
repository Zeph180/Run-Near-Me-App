import { useCallback, useEffect, useState } from "react";

export function useApiCall<T>(
  apiFunction: () => Promise<T>,
  dependencies: any[] = [],
) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await apiFunction();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, dependencies);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, error, isLoading, refetch };
}

export function useApiMutatuion<T, P = any>(
  mutationFunction: (params: P) => Promise<T>,
) {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const mutate = useCallback(
    async (params: P) => {
      try {
        setIsLoading(true);
        setError(null);
        const result = await mutationFunction(params);
        return result;
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    },
    [mutationFunction],
  );

  return { mutate, error, isLoading };
}
