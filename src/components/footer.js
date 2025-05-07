"use client";

import { CREATE_ISSUES, ON_TRANSACTION } from "@/graphql/mutation";
import { TENANT_PERSONAL, USER_DATA } from "@/graphql/query";
import { useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Footer() {
  const [addbtn, setaddbtn] = useState(false);
  const [popup, setpopup] = useState("");
  const pathname = usePathname().split("/");
  const chatpage = pathname[1] === "chats" && pathname[2];
  const handlerise = (e) => {
    setaddbtn(false);
    setpopup(e);
  };
  if (
    pathname[1] === "login" ||
    pathname[1] === "forgot-password" ||
    chatpage
  ) {
    return null;
  }
  return (
    <section className="fixed bottom-0 left-0 z-40 bg-[#ffffff]  text-[#000000] w-full">
      <div className="flex items-center h-18 w-full justify-between gap-6 px-5 sm:hidden">
        <Link href={"/"} className="py-2 w-fit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill=""
            className={`${
              pathname[1] === "" ? "fill-[#1abc9c]" : "fill-[#D6D6D6]"
            }`}
          >
            <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z" />
          </svg>
        </Link>
        <Link href={"/chats"} className="py-2 w-fit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill=""
            className={`${
              pathname[1] === "chats" ? "fill-[#1abc9c]" : "fill-[#D6D6D6]"
            }`}
          >
            <path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z" />
          </svg>
        </Link>
        <Link
          href={"/add-tenant"}
          className="relative w-16 flex justify-center"
        >
          <div className="p-2.5 rounded-full absolute bottom-0 bg-white ">
            <button className="bg-[#1abc9c] p-2 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="32px"
                viewBox="0 -960 960 960"
                width="32px"
                fill="#ffffff"
              >
                <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
              </svg>
            </button>
          </div>
        </Link>
        <Link href={"/payment-history"} className="py-2 w-fit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            className={`${
              pathname[1] === "payment-history"
                ? "fill-[#1abc9c]"
                : "fill-[#D6D6D6]"
            }`}
          >
            <path d="M120-240q-33 0-56.5-23.5T40-320q0-33 23.5-56.5T120-400h10.5q4.5 0 9.5 2l182-182q-2-5-2-9.5V-600q0-33 23.5-56.5T400-680q33 0 56.5 23.5T480-600q0 2-2 20l102 102q5-2 9.5-2h21q4.5 0 9.5 2l142-142q-2-5-2-9.5V-640q0-33 23.5-56.5T840-720q33 0 56.5 23.5T920-640q0 33-23.5 56.5T840-560h-10.5q-4.5 0-9.5-2L678-420q2 5 2 9.5v10.5q0 33-23.5 56.5T600-320q-33 0-56.5-23.5T520-400v-10.5q0-4.5 2-9.5L420-522q-5 2-9.5 2H400q-2 0-20-2L198-340q2 5 2 9.5v10.5q0 33-23.5 56.5T120-240Z" />
          </svg>
        </Link>
        <Link href={"/profile"} className="py-2 w-fit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill=""
            className={`${
              pathname[1] === "profile" ? "fill-[#1abc9c]" : "fill-[#D6D6D6]"
            }`}
          >
            <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
          </svg>
        </Link>

        <div
          className={`fixed left-0 bottom-0 duration-150 w-full z-20 ${
            popup === "riseissue" ? "max-h-[50dvh]" : "max-h-0"
          }`}
        >
          <Createissue setpopup={setpopup} />
        </div>
        <div
          className={`fixed left-0 bottom-0 duration-150 w-full z-20 ${
            popup === "rentpay" ? "max-h-[50dvh]" : "max-h-0"
          }`}
        >
          <Rentpay setpopup={setpopup} />
        </div>
      </div>
    </section>
  );
}

export function Rentpay({ setpopup }) {
  const [amount, setamount] = useState("");
  const [error, seterror] = useState("");
  const [Riseissues] = useMutation(CREATE_ISSUES);
  const { data, loading } = useQuery(TENANT_PERSONAL);

  const users = useQuery(USER_DATA);
  const [onpayment] = useMutation(ON_TRANSACTION);
  function getRandomString(length = 8) {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  const onpayemntscreen = (randomcode) => {
    window.location.href = `upi://pay?pa=iamsujith009@oksbi&pn=SUJITH+M&am=${amount}&tn=${randomcode}&cu=INR`;
  };
  const handleaddissues = async () => {
    let randomcode = getRandomString();
    try {
      await onpayment({
        variables: {
          input: {
            roomuuid: data?.tenantpersonal?.roomuuid,
            codeword: randomcode,
          },
        },
      }).then((response) => onpayemntscreen(randomcode));
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleChange = (e) => {
    const newValue = e.target.value;
    if (/^\d*$/.test(newValue)) {
      setamount(newValue);
    }
  };
  const handlekeypay = (e) => {
    if (amount && e.key === "Enter") {
      handleaddissues();
    }
  };
  return (
    <section className="bg-white py-10 px-5 flex flex-col gap-3">
      <h5 className="font-medium text-lg">Enter the amount</h5>
      <input
        type="text"
        placeholder="Enter your amount"
        name="issues"
        value={amount}
        onChange={handleChange}
        onKeyDown={handlekeypay}
        className="w-full p-2 border border-[#00000030] outline-0 rounded-md"
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <div className="flex items-center gap-3 mt-1.5">
        <button
          onClick={() => {
            setamount(""), setpopup("");
          }}
          className="px-2.5 py-2 rounded cursor-pointer bg-gray-200 w-full"
        >
          Cancel
        </button>
        <button
          className="px-2.5 py-2 rounded cursor-pointer bg-green-600 text-white w-full"
          onClick={handleaddissues}
        >
          Proceed to Pay
        </button>
      </div>
    </section>
  );
}
export function Createissue({ setpopup }) {
  const [inissues, setinissues] = useState("");
  const [error, seterror] = useState("");
  const [Riseissues] = useMutation(CREATE_ISSUES);
  const { data, loading } = useQuery(TENANT_PERSONAL);
  const users = useQuery(USER_DATA);

  const handleaddissues = async () => {
    if (inissues.length > 2) {
      await Riseissues({
        variables: {
          input: {
            roomuuid: data?.tenantpersonal?.roomuuid,
            question: inissues,
            tenantuuid: users?.data?.users?.uuid,
          },
        },
      }).then((response) => {
        setpopup("");
        setinissues("");
        seterror("");
        window.location.reload();
      });
    } else {
      seterror("Enter valid issues");
    }
  };
  return (
    <section className="bg-white py-10 px-5 flex flex-col gap-3">
      <h5 className="font-medium text-lg">Enter your issues</h5>
      <input
        type="text"
        placeholder="Enter your issue"
        name="issues"
        value={inissues}
        onChange={(e) => setinissues(e.target.value)}
        className="w-full p-2 border border-[#00000030] outline-0 rounded-md"
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <div className="flex justify-end items-center gap-3">
        <button
          onClick={() => {
            setinissues(""), setpopup("");
          }}
          className="px-2.5 py-2 rounded cursor-pointer bg-gray-200"
        >
          Cancel
        </button>
        <button
          className="px-2.5 py-2 rounded cursor-pointer bg-red-600 text-white"
          onClick={handleaddissues}
        >
          Rise
        </button>
      </div>
    </section>
  );
}
