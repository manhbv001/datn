"use client";

import Loading from "@/components/common/Loading";
// import useQueryParams from "@/hooks/useQueryParams";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";
// import { useCookies } from "react-cookie";

const OAuthPage = () => {
  // const {
  //   queryParams: { token },
  // } = useQueryParams<{ token: string }>();
  // const router = useRouter();
  // const [, setCookie] = useCookies();
  // useEffect(() => {
  //   if (token) {
  //     setCookie("accessToken", token);
  //     setTimeout(() => {
  //       router.push("/");
  //     }, 1000);
  //   }
  // }, [token]);

  return (
    <div className="flex flex-col items-center">
      <Loading />
      <h2 className="pl-2 mt-8">Authenticating...</h2>
    </div>
  );
};

export default OAuthPage;
