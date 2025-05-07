"use client";
import React, { useEffect, useRef, useState } from "react";
import logimage from "@/Assets/loginbg.png";
import Image from "next/image";
import { useMutation } from "@apollo/client";
import {
  ON_FORGOTCODE,
  ON_LOGIN,
  ON_SIGNUP,
  ONSET_FORGOTPASS,
  SEND_OTP,
  VARIFY_OTP,
} from "@/graphql/mutation";
import { useRouter } from "next/navigation";
export default function Page() {
  const [Loginin, setLoginin] = useState(false);
  const [Operations, setOperations] = useState("");
  const opencreatepage = () => {
    setLoginin(true);
    setOperations("create");
  };
  return (
    <section className="p-5 flex bodyclr justify-center h-dvh items-center ">
      <div
        className={`flex flex-col items-center w-full h-full max-w-[500px] ${
          Loginin ? "justify-center" : "justify-between"
        }`}
      >
        <div
          className={`flex flex-col ${
            Loginin ? "gap-0" : "gap-5 justify-center h-[70%]"
          }`}
        >
          <Image
            src={logimage}
            width={250}
            height={250}
            alt="login image"
            priority
            className={`object-cover mx-auto lightcontainer rounded-full duration-100 ${
              Loginin ? "w-[120px]" : "w-[200px]"
            }`}
          />
          <p
            className={`font-semibold text-2xl text-center overflow-hidden duration-150 ${
              Loginin ? "h-0" : "h-10"
            }`}
          >
            Join Family
          </p>
        </div>
        <div
          className={`overflow-hidden ${
            Loginin
              ? "max-h-[0]"
              : "h-fit max-h-[500px] flex flex-col gap-5 w-full"
          }`}
        >
          <button
            className="lightcontainer p-2 w-full border-[#3f4750] rounded-4xl font-medium"
            onClick={opencreatepage}
          >
            Get Started
          </button>
          <button
            className="border border-[#343454] p-2 w-full rounded-4xl"
            onClick={() => setLoginin(true)}
          >
            I already have an account
          </button>
        </div>
        {/*login page  */}
        <div
          className={`${
            Loginin ? "h-fit max-h-[800px] w-full " : "hidden max-h-0"
          } overflow-hidden`}
        >
          {Operations === "forgot" ? (
            <Forgot setOperations={setOperations} />
          ) : Operations === "create" ? (
            <Create setOperations={setOperations} />
          ) : (
            <Login setOperations={setOperations} />
          )}
        </div>
      </div>
    </section>
  );
}

export function Create({ setOperations }) {
  const [isEyeopen, setisEyeopen] = useState(false);
  const route = useRouter();
  //   otp datas
  const [getOtp, setgetOtp] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [Error, setError] = useState("");
  const [otptimmer, setotptimmer] = useState(false);
  const inputRefs = useRef([]);
  const [loadings, setloadings] = useState(false);
  // backend connect
  const [onCreateacc, { data, loading, error }] = useMutation(ON_SIGNUP);
  const [onSignupCode] = useMutation(SEND_OTP);
  const [OnVarify] = useMutation(VARIFY_OTP);
  // otp send
  const handleOtpsend = async () => {
    try {
      await onSignupCode({
        variables: {
          input: { email: email },
        },
      }).then(() => {
        setotptimmer(true);
      });
      console.log("sometime the message in the spam");
    } catch (error) {
      setError(error.message);
    }
  };

  // signup function
  const handlecreate = async () => {
    const jointotp = otp.join("");
    try {
      setloadings(true);
      await onCreateacc({
        variables: {
          input: {
            email: email,
            otp: jointotp,
            password: password,
          },
        },
      }).then((response) => {
        const token = response.data?.onCreateacc;
        setloadings(false);
        if (token) {
          localStorage.setItem("istenant", token);
          route.push("/");
          window?.location.reload();
        }
      });
    } catch (error) {
      setError(error?.message);
      setloadings(false);
    }
  };
  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "Enter") {
      console.log("varified");
    }
  };

  const handleotpVerify = async () => {
    const jointotp = otp.join("");
    try {
      setloadings(true);
      await OnVarify({
        variables: {
          input: {
            email: email,
            otp: jointotp,
          },
        },
      }).then((response) => {
        setgetOtp(true);
        setloadings(false);
      });
    } catch (error) {
      setloadings(false);
      setError(error.message);
    }
  };

  useEffect(() => {
    setError("");
  }, [email, password, otp]);

  // const handleOtpsend = () => {
  //   console.log(Math.floor(100000 + Math.random() * 900000));
  // };
  return (
    <div className=" w-full flex justify-center items-center">
      <div className="w-full max-w-[500px] p-4">
        <h3 className="text-2xl font-medium text-center">Create account</h3>
        <div className="py-4 flex flex-col gap-4 ">
          <div
            className={` overflow-hidden ${
              !getOtp ? "h-fit max-h-[500px] flex flex-col gap-2" : "max-h-0"
            }`}
          >
            <p className="font-medium">Email</p>
            <div>
              <input
                name="email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                placeholder="Enter email"
                className="outline-none border w-full py-2 px-2 rounded backdrop-blur-[2px] font-medium"
              />
            </div>
            {otptimmer ? (
              <Otptimmer setotptimmer={setotptimmer} />
            ) : (
              <button
                className="text-end font-medium text-sm text-[#7c71f5]"
                onClick={handleOtpsend}
              >
                Get OTP
              </button>
            )}
          </div>
          <div
            className={` overflow-hidden ${
              !getOtp ? "h-fit max-h-[500px] flex flex-col gap-2" : "max-h-0"
            }`}
          >
            <p className="font-medium">OTP</p>
            <div className="relative p-1 flex gap-2 items-center justify-between h-fit">
              {otp.map((digit, index) => (
                <input
                  ref={(el) => (inputRefs.current[index] = el)}
                  inputMode="numeric"
                  key={index}
                  id={`otp-${index}`}
                  maxLength={1}
                  value={digit}
                  autoComplete="off"
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="h-full text-center outline-[#7c71f5] max-w-12 w-full aspect-square border  rounded  font-medium"
                />
              ))}
            </div>
          </div>
          <div
            className={`flex flex-col gap-3 duration-200 overflow-hidden ${
              getOtp ? "h-fit max-h-[500px]" : "max-h-0 "
            }`}
          >
            {/* <div className="flex flex-col gap-2">
              <p className="font-medium">Name</p>
              <div className="relative flex items-center">
                <input
                  name="name"
                  type="text"
                  placeholder="Enter password"
                  className="outline-none border w-full py-2 px-2 rounded backdrop-blur-[2px] font-medium"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-medium">Phone Number</p>
              <div className="relative flex items-center">
                <input
                  name="name"
                  type="text"
                  placeholder="Enter password"
                  className="outline-none border w-full py-2 px-2 rounded backdrop-blur-[2px] font-medium"
                />
              </div>
            </div> */}
            <div className="flex flex-col gap-2">
              <p className="font-medium">Password</p>
              <div className="relative flex items-center">
                <input
                  name="password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  type={`${isEyeopen ? "text" : "password"}`}
                  placeholder="Enter password"
                  className="outline-none border w-full py-2 px-2 rounded backdrop-blur-[2px] font-medium"
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
                    >
                      <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                    >
                      <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
          {
            <p
              className={`${
                Error ? "h-5" : "h-0"
              } duration-150 text-red-500 overflow-hidden font-medium text-sm`}
            >
              {Error}
            </p>
          }
          {loadings ? (
            <button className="bg-[#7c71f5]  rounded mt-3 font-medium h-10 flex justify-center items-center">
              <span className="w-5 h-5 rounded-full aspect-square border-white border-2 animate-spin border-t-0"></span>
            </button>
          ) : getOtp ? (
            <button
              className="bg-[#7c71f5] p-2 rounded mt-3 font-medium text-white "
              onClick={handlecreate}
            >
              Signup
            </button>
          ) : (
            <button
              className="bg-[#7c71f5] p-2 rounded mt-3 font-medium text-white"
              onClick={handleotpVerify}
            >
              Verify
            </button>
          )}
          <div className="flex justify-end">
            <button
              className=" font-medium"
              onClick={() => setOperations("login")}
            >
              back to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Login({ setOperations }) {
  const [isEyeopen, setisEyeopen] = useState(false);
  const [useremail, setuseremail] = useState("");
  const [userepassword, setuserepassword] = useState("");
  const [Error, setError] = useState("");
  const route = useRouter();
  const [OnAdminLogin, { data, loading, error }] = useMutation(ON_LOGIN);
  const handleLogin = async () => {
    if (useremail && userepassword) {
      try {
        await OnAdminLogin({
          variables: {
            input: {
              email: useremail,
              password: userepassword,
            },
          },
        }).then((response) => {
          const token = response.data?.onLogin;

          if (token) {
            localStorage.setItem("istenant", token);
            route.push("/");
          }
        });
      } catch (error) {
        setError(error.message);
      }
    } else if (useremail) {
      setError("Enter password ");
    } else if (userepassword) {
      setError("Enter email address");
    } else {
      setError("Enter all the input field");
    }
  };
  useEffect(() => {
    setError("");
  }, [useremail, userepassword]);
  return (
    <div className=" w-full flex justify-center items-center">
      <div className="w-full max-w-[500px] p-4">
        <h3 className="text-2xl font-medium text-center">Login</h3>
        <div className="py-4 flex flex-col gap-4 ">
          <div className="flex flex-col gap-2">
            <p className="font-medium">Email</p>
            <div>
              <input
                name="email"
                placeholder="Enter email"
                onChange={(e) => setuseremail(e.target.value)}
                value={useremail}
                className="outline-none border w-full py-2 px-2 rounded backdrop-blur-[2px] font-medium"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-medium">Password</p>
            <div className="relative flex items-center">
              <input
                name="name"
                type={`${isEyeopen ? "text" : "password"}`}
                placeholder="Enter password"
                onChange={(e) => setuserepassword(e.target.value)}
                value={userepassword}
                className="outline-none border w-full py-2 px-2 rounded backdrop-blur-[2px] font-medium"
              />
              <button
                className="absolute right-2"
                onClick={() => setisEyeopen(!isEyeopen)}
              >
                {isEyeopen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#1f2a38"
                  >
                    <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#1f2a38"
                  >
                    <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                  </svg>
                )}
              </button>
            </div>

            <span
              className={`text-start font-medium text-sm text-red-600 duration-150 ${
                Error ? "h-5" : "h-0"
              }`}
            >
              {Error}
            </span>

            <button
              className="text-end font-medium mt-1"
              onClick={() => setOperations("forgot")}
            >
              Forgot Password?
            </button>
          </div>
          {loading ? (
            <button className="bg-[#7c71f5]  rounded mt-3 font-medium h-10 flex justify-center items-center">
              <span className="w-5 h-5 rounded-full  aspect-square border-2 border-white animate-spin border-t-0"></span>
            </button>
          ) : (
            <button
              className={`${
                useremail && userepassword ? "bg-[#7c71f5]" : "bg-gray-700"
              } p-2 rounded mt-3 font-medium text-white`}
              onClick={handleLogin}
            >
              Login
            </button>
          )}
          <div className="flex justify-center">
            <button
              className="font-medium"
              onClick={() => setOperations("create")}
            >
              Create new account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Forgot({ setOperations }) {
  const [getOtp, setgetOtp] = useState(false);
  const [loading, setloading] = useState(false);
  const [resetpass, setresetpass] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isEyeopen, setisEyeopen] = useState(false);
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [Error, setError] = useState("");
  const inputRefs = useRef([]);

  const handleChange = (index, value) => {
    if (!/^[0-9]?$/.test(value)) return;
    let newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "Enter") {
      console.log("varified");
    }
  };
  // functions
  const [onSignupCode] = useMutation(ON_FORGOTCODE);
  const [OnVarify] = useMutation(VARIFY_OTP);
  const [onForgotPass] = useMutation(ONSET_FORGOTPASS);
  const handlegetotp = async () => {
    if (email) {
      try {
        setloading(true);
        console.log(email);

        await onSignupCode({
          variables: {
            input: { email: email },
          },
        }).then((response) => {
          setgetOtp(true);
          setloading(false);
        });
        console.log("sometime the message in the spam");
      } catch (error) {
        setError(error.message);

        setloading(false);
      }
    } else {
      setError("Enter email address");
    }
  };
  const handlevarify = async () => {
    const jointotp = otp.join("");
    try {
      setloading(true);
      setError("");
      await OnVarify({
        variables: {
          input: {
            email: email,
            otp: jointotp,
          },
        },
      }).then((response) => {
        setresetpass(true);
        setloading(false);
      });
    } catch (error) {
      setError(error.message);
      setloading(false);
    }
  };
  const handleresetpass = async () => {
    const jointotp = otp.join("");
    if (password.length > 2) {
      try {
        setloading(true);
        await onForgotPass({
          variables: {
            input: { email: email, password: password, otp: jointotp },
          },
        }).then((response) => {
          setloading(false);
          setOperations("login");
        });
      } catch (error) {
        setError(error.message);
      }
    } else {
      setError("enter valid password");
    }
  };
  useEffect(() => {
    setError("");
  }, [email, password, otp]);

  return (
    <div className=" w-full flex justify-center items-center">
      <div className="w-full max-w-[500px] p-4">
        <h3 className="text-2xl font-medium text-center">Forgot Password</h3>
        <div className="py-4 flex flex-col gap-4 ">
          <div
            className={`flex flex-col gap-4 duration-150 overflow-hidden ${
              !resetpass ? "max-h-[1000px] h-fit" : "max-h-0"
            }`}
          >
            <div className="flex flex-col gap-2">
              <p className="font-medium">Email</p>
              <div>
                <input
                  name="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setemail(e.target.value)}
                  className="outline-none border w-full py-2 px-2 rounded backdrop-blur-[2px] font-medium"
                  onKeyDown={(e) =>
                    e.key === "Enter" && email && handlegetotp()
                  }
                />
              </div>
            </div>
            <div
              className={`flex flex-col gap-2 duration-300 overflow-hidden ${
                getOtp ? "h-fit max-h-[500px]" : "max-h-0"
              }`}
            >
              <p className="font-medium">Password</p>
              <div className="relative p-1 flex gap-2 items-center justify-between h-fit">
                {otp.map((digit, index) => (
                  <input
                    ref={(el) => (inputRefs.current[index] = el)}
                    inputMode="numeric"
                    key={index}
                    id={`otp-${index}`}
                    maxLength={1}
                    value={digit}
                    autoComplete="off"
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="h-full text-center outline-[#7c71f5] max-w-12 w-full aspect-square border  rounded  font-medium"
                  />
                ))}
              </div>
            </div>
          </div>
          <div
            className={`${
              resetpass ? "max-h-[150px] h-fit" : "max-h-0"
            } flex flex-col gap-2 duration-150 overflow-hidden`}
          >
            <p className="font-medium">Password</p>
            <div className="relative flex items-center">
              <input
                name="password"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                type={`${isEyeopen ? "text" : "password"}`}
                onKeyDown={(e) => e.key === "Enter" && handleresetpass()}
                placeholder="Enter password"
                className="outline-none border w-full py-2 px-2 rounded backdrop-blur-[2px] font-medium"
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
                  >
                    <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                  >
                    <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          {Error && <p className="text-red-500 font-medium text-sm">{Error}</p>}
          <button
            className="text-end font-medium mt-1"
            onClick={() => setOperations("login")}
          >
            Back to Login?
          </button>

          {loading ? (
            <button className="bg-[#7c71f5]  rounded mt-3 font-medium h-10 flex justify-center items-center">
              <span className="w-5 h-5 rounded-full aspect-square border-2 border-white animate-spin border-t-0"></span>
            </button>
          ) : resetpass ? (
            <button
              className="bg-[#7c71f5] p-2 rounded mt-3 font-medium text-white"
              onClick={handleresetpass}
            >
              set new password
            </button>
          ) : getOtp ? (
            <button
              className="bg-[#7c71f5] p-2 rounded mt-3 font-medium text-white"
              onClick={handlevarify}
            >
              Verify
            </button>
          ) : (
            <button
              className={`${
                email ? "bg-[#7c71f5]" : "bg-gray-700"
              } p-2 rounded mt-3 font-medium`}
              onClick={handlegetotp}
            >
              Get OTP
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function Otptimmer({ setotptimmer }) {
  const [second, setsecond] = useState(30);
  useEffect(() => {
    if (second <= 0) {
      setotptimmer(false);
    }

    const interval = setInterval(() => {
      setsecond((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [second]);
  return (
    <section className="text-end font-semibold text-sm text-[#7c71f5]">
      <p className="flex items-center justify-end ">
        00:{second < 10 ? `0${second}` : `${second}`}
      </p>
    </section>
  );
}
