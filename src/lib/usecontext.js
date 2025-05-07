"use client";

import { USER_DATA } from "@/graphql/query";
import { useLazyQuery } from "@apollo/client";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useEffect } from "react";

const AuthContext = createContext();

export const Authprovider = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [getData, { data, loading }] = useLazyQuery(USER_DATA);
  useEffect(() => {
    getData()?.then(({ data, loading, error }) => {
      if (!loading) {
        if (error?.message === "Invalid token" || data === undefined) {
          const allowedPaths = ["/login", "/forgot-password"];
          const isAllowed = allowedPaths.some((path) =>
            pathname.startsWith(path)
          );
          if (!isAllowed) {
            router.push("/login");
          }
        }
      }
      if (data && pathname === "/login") {
        router.push("/");
      }
      AuthContext;
    });
  }, []);

  return (
    <AuthContext.Provider value={{ data: data }}>
      {children}
    </AuthContext.Provider>
  );
};

// export const useAuth = () => useContext(AuthContext);
