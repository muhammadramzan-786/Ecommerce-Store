import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { forgotPassword, getUser, resetPassword, signUp, updateUser, userExist } from "../api/auth";
import { useUserStore } from "../stores/userStore";
import { toast } from "react-toastify";

export function useUser(id) {
  const setUser = useUserStore((state) => state.setUser);
  const setLoading = useUserStore((state) => state.setLoading);
  return useQuery({
    queryKey: ["user", id],
    queryFn: async () => {
      setLoading(true)
      const res = await getUser(id);

      if (!res.data || (Array.isArray(res.data) && res.data.length === 0)) {
        throw new Error("USER_NOT_FOUND");
      }
      setUser(res?.data);
      setLoading(false)
      return res.data;
    },
    enabled: !!id,
    initialData: {},
  });
}

export function useForgotPassword() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: (_,vars) => qc.invalidateQueries(["user"]),
  });
}

export function useResetPassword() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: (_,vars) => qc.invalidateQueries(["user"]),
  });
}

export function useUserExist() {
      return useQuery({
          queryKey:["user"],
          queryFn:async ()=> (await userExist()).data,
      })
}

export function useUpdateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: updateUser,
    onSuccess: (_,vars) => qc.invalidateQueries(["user",vars.id]),
  });
}

export function useSignUp() {
  return useMutation({
    mutationFn: signUp,
    onSuccess: (data) => {
      toast.success("Account created successfully!");
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to create account");
    }
  });
}
