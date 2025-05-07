"use client";
import { CHANGE_PASS } from "@/graphql/mutation";
import { CHANGE_PASSPAGE, USER_DATA } from "@/graphql/query";
import { useMutation, useQuery } from "@apollo/client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

export default function Page() {
  const pathname = usePathname().split("/")[2];
  const router = useRouter();
  const { data, loading } = useQuery(CHANGE_PASSPAGE, {
    variables: { password: pathname },
  });
  const userdata = useQuery(USER_DATA);

  useEffect(() => {
    if (userdata?.data?.users) {
      router.push("/");
    }
  }, [userdata?.data]);
  return loading ? (
    <div>Loading....</div>
  ) : data?.chnagepasswordq ? (
    <div>
      <Forgot router={router} />
    </div>
  ) : (
    <div className="w-dvw h-dvh flex justify-center items-center">
      <p className="font-medium text-lg ">invalid url please your Owner...</p>
    </div>
  );
}

export function Forgot({ router }) {
  const [loading, setloading] = useState(false);
  const [isEyeopen, setisEyeopen] = useState(false);
  const [isEyeopen2, setisEyeopen2] = useState(false);
  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [Error, setError] = useState("");

  // functions
  const [Changingpass] = useMutation(CHANGE_PASS);
  const handleresetpass = async () => {
    setloading(true);
    try {
      if (password === confirmpassword && password && confirmpassword) {
        await Changingpass({
          variables: {
            input: {
              password: password,
              pathurl: "2Xlh1pBSi5vNVx",
            },
          },
        }).then((response) => {
          setloading(false);
          router.push("/login");
        });
      } else {
        setloading(false);
        setError("enter valid password");
      }
    } catch (error) {
      setloading(false);
      setError(error.message);
    }
  };
  useEffect(() => {
    setError("");
  }, [password, confirmpassword]);

  return (
    <div className=" w-full h-dvh flex justify-center bodyclr items-center">
      <div className="w-full max-w-[500px] p-4">
        <h3 className="text-2xl font-medium text-center">Password</h3>
        <div className="py-4 flex flex-col gap-4 ">
          <div className={`flex flex-col gap-2 duration-150 overflow-hidden`}>
            <p className="font-medium">Enter Password</p>
            <div className="relative flex items-center">
              <input
                name="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                type={`${isEyeopen ? "text" : "password"}`}
                placeholder="Enter password"
                className="outline-none  w-full py-2 px-2 rounded bg-white backdrop-blur-[2px] "
              />
              <button
                className="absolute right-2"
                onClick={() => setisEyeopen(!isEyeopen)}
              >
                {!isEyeopen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#2c3e50"
                  >
                    <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#2c3e50"
                  >
                    <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className={`flex flex-col gap-2 duration-150 overflow-hidden`}>
            <p className="font-medium">Re-Enter Password</p>
            <div className="relative flex items-center">
              <input
                name="password"
                value={confirmpassword}
                onChange={(e) => setconfirmpassword(e.target.value)}
                type={`${isEyeopen2 ? "text" : "password"}`}
                onKeyDown={(e) => e.key === "Enter" && handleresetpass()}
                placeholder="Enter password"
                className="outline-none border w-full py-2 px-2 rounded bg-black/60 backdrop-blur-[2px] "
              />
              <button
                className="absolute right-2"
                onClick={() => setisEyeopen2(!isEyeopen2)}
              >
                {!isEyeopen2 ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#2c3e50"
                  >
                    <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#2c3e50"
                  >
                    <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          {Error && <p className="text-red-500 font-medium text-sm">{Error}</p>}

          {loading ? (
            <button className="bg-[#1abc9c]  rounded mt-3 font-medium h-10 flex justify-center items-center">
              <span className="w-5 h-5 rounded-full aspect-square border-2 animate-spin border-t-0"></span>
            </button>
          ) : (
            <button
              className="bg-[#1abc9c] p-2 rounded mt-3 font-medium"
              onClick={handleresetpass}
            >
              set new password
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
