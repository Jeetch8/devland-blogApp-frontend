import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CustomAxios, CustomAxiosAuth } from "../utils/CustomAxios";

const VerifyEmail = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["verify-email"],
    queryFn: () => {
      const token = query.get("token");

      if (!token) {
        throw new Error("Invalid token or email");
      }

      return CustomAxiosAuth(token).get(
        `/auth/verify-email-update?token=${token}`
      );
    },
  });
  console.log(error);

  if (isLoading || isFetching) return <div>Loading...</div>;

  if (isError) {
    return <div>{error?.message}</div>;
  }

  return <div>{data?.data.success && <div>Success</div>}</div>;
};

export default VerifyEmail;
