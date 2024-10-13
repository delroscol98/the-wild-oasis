import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { signUp as signUpApi } from "../../services/apiAuth";

export function useSignUp() {
  const { mutate: signUp, isLoading: isSigningUp } = useMutation({
    mutationFn: signUpApi,
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        "Account successfully created! Please verify the email account from the user's email address"
      );
    },
    onError: (err) => {
      console.log(err);
      toast.error("There was a problem during the sign up");
    },
  });

  return { signUp, isSigningUp };
}
