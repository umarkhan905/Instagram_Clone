import { useMutation, useQueryClient } from "@tanstack/react-query";

const useLogout = () => {
  const queryClient = useQueryClient();

  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });
      if (!res.ok) {
        throw new Error("Failed to log out");
      }
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (err) => {
      alert(err.message);
    },
  });
  return logout;
};

export default useLogout;
