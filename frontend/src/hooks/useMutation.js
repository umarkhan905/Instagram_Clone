import { useMutation } from "@tanstack/react-query";

const useMutationFunction = (path, method, body, onSuccess) => {
  const { mutate, isPending, error } = useMutation({
    mutationFn: async () => {
      const res = await fetch(path, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error);
      }
      return data;
    },
    onSuccess: onSuccess,
  });
  return { mutate, isPending, error };
};

export default useMutationFunction;
