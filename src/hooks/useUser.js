import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUser, updateUser } from "../api/auth";
import { useUserStore } from "../stores/userStore";

export function useUser(id) {
  const setUser = useUserStore((state) => state.setUser);
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      const res = await getUser(id);

      if (!res.data || (Array.isArray(res.data) && res.data.length === 0)) {
        throw new Error("USER_NOT_FOUND");
      }
      setUser(res?.data);
      return res.data;
    },
    enabled: !!id,
    initialData: {},
  });
}

export function useUpdateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: (_,vars) => qc.invalidateQueries(["user",vars.id]),
  });
}