"use client";
import { TO_APPROVE, TO_DELETE } from "@/graphql/mutation";
import { NOTIFY, tenantdetails, USER_DATA } from "@/graphql/query";
import { useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import logo from "@/Assets/rentlogo.svg";
import Image from "next/image";

// function Navbar() {
//   const [isOpen, setisOpen] = useState(false);
//   const [Notifyopen, setNotifyopen] = useState(false);
//   const router = useRouter();
//   const pathname = usePathname().split("/");
//   const splitpathname = pathname[1];
//   const toggleMenu = () => {
//     setNotifyopen(false);
//     setisOpen(!isOpen);
//   };
//   const handlenotify = () => {
//     setisOpen(false);
//     setNotifyopen(!Notifyopen);
//   };
//   const { data, loading } = useQuery(USER_DATA);
//   // useEffect(() => {
//   //   if (data?.users === null && !loading) {
//   //     router.push("/login");
//   //   }
//   // }, [data]);

//   if (splitpathname === "login" || splitpathname === "forgot-password") {
//     return null;
//   }
//   return (
//     <header className="border-b navbg">
//       <div className="h-20 flex justify-between items-center max-w-[1250px] px-5 sm:px-0 sm:w-[80%] mx-auto">
//         <div className="flex items-center gap-4">
//           <Link href={"/"} className="font-semibold text-xl text-[#8074ff]">
//             RENT
//           </Link>
//         </div>
//         <div className=" hidden sm:flex gap-6">
//           {data?.users?.role === "admin" && (
//             <Link
//               href={"/tenants"}
//               className="font-medium text-base py-2 w-fit"
//             >
//               Tenants
//             </Link>
//           )}
//           <Link
//             href={"/rent-details"}
//             className="font-medium text-base py-2 w-fit"
//           >
//             Rents
//           </Link>

//           {data?.users?.role === "admin" && (
//             <Link
//               href={"/rent-update"}
//               className="font-medium text-base py-2 w-fit"
//             >
//               Update
//             </Link>
//           )}
//           {data?.users?.role === "admin" && (
//             <Link
//               href={"/add-delete"}
//               className="font-medium text-base py-2 w-fit"
//             >
//               Add/Edit
//             </Link>
//           )}
//           {data?.users?.role === "admin" && (
//             <Link
//               href={"/add-rooms"}
//               className="font-medium text-base py-2 w-fit"
//             >
//               Add rooms
//             </Link>
//           )}
//         </div>
//         <div className="flex items-center gap-4">
//           {data?.users?.role === "admin" && (
//             <button
//               className={`flex w-[34px] h-[34px] justify-center items-center border rounded-full ${
//                 Notifyopen ? "bg-red-500" : "bg-transparent"
//               }`}
//               onClick={handlenotify}
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 height="24px"
//                 viewBox="0 -960 960 960"
//                 width="24px"
//                 fill="#ffffff"
//               >
//                 <path d="M160-200v-80h80v-280q0-83 50-147.5T420-792v-28q0-25 17.5-42.5T480-880q25 0 42.5 17.5T540-820v28q80 20 130 84.5T720-560v280h80v80H160Zm320-300Zm0 420q-33 0-56.5-23.5T400-160h160q0 33-23.5 56.5T480-80ZM320-280h320v-280q0-66-47-113t-113-47q-66 0-113 47t-47 113v280Z" />
//               </svg>
//             </button>
//           )}
//           <Link
//             href={"/profile"}
//             onClick={() => {
//               setNotifyopen(false), setisOpen(false);
//             }}
//             className="flex w-[34px] h-[34px] justify-center items-center border rounded-full bg-amber-500"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               height="24px"
//               viewBox="0 -960 960 960"
//               width="24px"
//               className="iconfill"
//             >
//               <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
//             </svg>
//           </Link>
//           <button
//             onClick={toggleMenu}
//             className={`sm:hidden flex flex-col items-center justify-center w-[34px] h-[34px] p-[5px] border border-[#EEEEEE] rounded-full  ${
//               isOpen ? "bg-[#00000005]" : "bg-[#FFFFFF4D]"
//             } space-y-1 group`}
//           >
//             <span
//               className={`block h-0.5 w-4 rounded transition-transform duration-300 opbg ${
//                 isOpen ? "rotate-45 translate-y-1.5" : ""
//               }`}
//             ></span>
//             <span
//               className={`block h-0.5 w-4 rounded transition-opacity duration-300 opbg ${
//                 isOpen ? "opacity-0" : ""
//               }`}
//             ></span>
//             <span
//               className={`block h-0.5 w-4 rounded transition-transform duration-300 opbg ${
//                 isOpen ? "-rotate-45 -translate-y-1.5" : ""
//               }`}
//             ></span>
//           </button>
//         </div>
//       </div>
//       <div
//         className={`fixed left-0 top-20 min-h-[calc(100vh-80px)] overflow-hidden  duration-200 z-10 mobnavcontainer ${
//           Notifyopen ? "w-dvw " : "w-0"
//         }`}
//       >
//         <Notify setNotifyopen={setNotifyopen} />
//       </div>
//       <div
//         className={`fixed left-0 top-20 min-h-[calc(100vh-80px)] overflow-hidden duration-200 z-10 mobnavcontainer ${
//           isOpen ? "w-dvw " : "w-0"
//         }`}
//       >
//         <div className="flex flex-col gap-6 p-5">
//           {data?.users?.role === "admin" && (
//             <Link
//               href={"/tenants"}
//               className="font-medium text-base py-2 w-fit"
//               onClick={() => setisOpen(false)}
//             >
//               Tenants
//             </Link>
//           )}
//           <Link
//             href={"/rent-details"}
//             className="font-medium text-base py-2 w-fit"
//             onClick={() => setisOpen(false)}
//           >
//             Rents
//           </Link>
//           {data?.users?.role === "admin" && (
//             <Link
//               href={"/add-delete"}
//               className="font-medium text-base py-2 w-fit"
//               onClick={() => setisOpen(false)}
//             >
//               add/edit
//             </Link>
//           )}
//           {data?.users?.role === "admin" && (
//             <Link
//               href={"/add-rooms"}
//               className="font-medium text-base py-2 w-fit"
//               onClick={() => setisOpen(false)}
//             >
//               add rooms
//             </Link>
//           )}
//           {data?.users?.role === "admin" && (
//             <Link
//               href={"/rent-update"}
//               className="font-medium text-base py-2 w-fit"
//               onClick={() => setisOpen(false)}
//             >
//               Update
//             </Link>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// }
function Navbar() {
  const [isOpen, setisOpen] = useState(false);
  const [Notifyopen, setNotifyopen] = useState(false);
  const router = useRouter();
  const pathname = usePathname().split("/");
  const splitpathname = pathname[1];

  const toggleMenu = () => {
    setNotifyopen(false);
    setisOpen(!isOpen);
  };
  const handlenotify = () => {
    setisOpen(false);
    setNotifyopen(!Notifyopen);
  };
  const { data, loading } = useQuery(USER_DATA);
  // useEffect(() => {
  //   if (data?.users === null && !loading) {
  //     router.push("/login");
  //   }
  // }, [data]);

  // if (splitpathname === "login" || splitpathname === "forgot-password") {
  //   return null;
  // }
  return null;
  return (
    <header className=" navbg">
      <div className="h-14 flex justify-between items-center max-w-[1250px] px-5 sm:px-0 sm:w-[80%] mx-auto">
        <div className="flex items-center gap-4">
          <Link href={"/"} className="font-semibold text-xl text-[#8074ff]">
            <Image
              src={logo}
              width={100}
              height={100}
              alt="logo"
              className="w-[36px] h-auto aspect-square"
            />
          </Link>
        </div>
        <div className=" hidden sm:flex gap-6">
          {data?.users?.role === "admin" && (
            <Link
              href={"/tenants"}
              className="font-medium text-base py-2 w-fit"
            >
              Tenants
            </Link>
          )}
          <Link
            href={"/rent-details"}
            className="font-medium text-base py-2 w-fit"
          >
            Rents
          </Link>

          {data?.users?.role === "admin" && (
            <Link
              href={"/rent-update"}
              className="font-medium text-base py-2 w-fit"
            >
              Update
            </Link>
          )}
          {data?.users?.role === "admin" && (
            <Link
              href={"/add-delete"}
              className="font-medium text-base py-2 w-fit"
            >
              Add/Edit
            </Link>
          )}
          {data?.users?.role === "admin" && (
            <Link
              href={"/add-rooms"}
              className="font-medium text-base py-2 w-fit"
            >
              Add rooms
            </Link>
          )}
        </div>
        <div>
          <p className="text-[#000000] font-semibold capitalize">
            {pathname[1]}
          </p>
        </div>
        <div className="flex items-center gap-4">
          {data?.users?.role === "admin" && (
            <button
              className={`flex w-[34px] h-[34px] justify-center items-center  ${
                Notifyopen ? "bg-red-500" : "bg-transparent"
              }`}
              onClick={handlenotify}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#000000"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10.268 21a2 2 0 0 0 3.464 0" />
                <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
              </svg>
            </button>
          )}
          {/* <Link
            href={"/profile"}
            onClick={() => {
              setNotifyopen(false), setisOpen(false);
            }}
            className="flex w-[34px] h-[34px] justify-center items-center border rounded-full bg-amber-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              className="iconfill"
            >
              <path d="M480-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM160-160v-112q0-34 17.5-62.5T224-378q62-31 126-46.5T480-440q66 0 130 15.5T736-378q29 15 46.5 43.5T800-272v112H160Zm80-80h480v-32q0-11-5.5-20T700-306q-54-27-109-40.5T480-360q-56 0-111 13.5T260-306q-9 5-14.5 14t-5.5 20v32Zm240-320q33 0 56.5-23.5T560-640q0-33-23.5-56.5T480-720q-33 0-56.5 23.5T400-640q0 33 23.5 56.5T480-560Zm0-80Zm0 400Z" />
            </svg>
          </Link> */}
          {/* <button
            onClick={toggleMenu}
            className={`sm:hidden flex flex-col items-center justify-center w-[34px] h-[34px] p-[5px] border border-[#EEEEEE] rounded-full  ${
              isOpen ? "bg-[#00000005]" : "bg-[#FFFFFF4D]"
            } space-y-1 group`}
          >
            <span
              className={`block h-0.5 w-4 rounded transition-transform duration-300 opbg ${
                isOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 w-4 rounded transition-opacity duration-300 opbg ${
                isOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 w-4 rounded transition-transform duration-300 opbg ${
                isOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></span>
          </button> */}
        </div>
      </div>
      <div
        className={`fixed left-0 top-20 min-h-[calc(100vh-80px)] overflow-hidden  duration-200 z-10 mobnavcontainer ${
          Notifyopen ? "w-dvw " : "w-0"
        }`}
      >
        <Notify setNotifyopen={setNotifyopen} />
      </div>
      <div
        className={`fixed left-0 top-20 min-h-[calc(100vh-80px)] overflow-hidden duration-200 z-10 mobnavcontainer ${
          isOpen ? "w-dvw " : "w-0"
        }`}
      >
        <div className="flex flex-col gap-6 p-5">
          {data?.users?.role === "admin" && (
            <Link
              href={"/tenants"}
              className="font-medium text-base py-2 w-fit"
              onClick={() => setisOpen(false)}
            >
              Tenants
            </Link>
          )}
          <Link
            href={"/rent-details"}
            className="font-medium text-base py-2 w-fit"
            onClick={() => setisOpen(false)}
          >
            Rents
          </Link>
          {data?.users?.role === "admin" && (
            <Link
              href={"/add-delete"}
              className="font-medium text-base py-2 w-fit"
              onClick={() => setisOpen(false)}
            >
              add/edit
            </Link>
          )}
          {data?.users?.role === "admin" && (
            <Link
              href={"/add-rooms"}
              className="font-medium text-base py-2 w-fit"
              onClick={() => setisOpen(false)}
            >
              add rooms
            </Link>
          )}
          {data?.users?.role === "admin" && (
            <Link
              href={"/rent-update"}
              className="font-medium text-base py-2 w-fit"
              onClick={() => setisOpen(false)}
            >
              Update
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;

export function Notify({ setNotifyopen }) {
  const { data, loading } = useQuery(NOTIFY);
  const tenantdetail = useQuery(tenantdetails);
  const [DeleteTenant] = useMutation(TO_DELETE);
  const [housetype, sethousetype] = useState("Select tenant");
  const [houseuuid, sethouseuuid] = useState("");
  const [con, setcon] = useState(false);
  const [conformation, setconformation] = useState(false);
  const [dropdown2Open, setDropdown2Open] = useState(false);
  const [Error, setError] = useState("");

  const dropdown2Ref = useRef(null);
  // backend connect
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdown2Ref.current &&
        !dropdown2Ref.current.contains(event.target)
      ) {
        setDropdown2Open(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const filterdata = tenantdetail?.data?.tenants?.filter(
    (item) => item?.tenantuuid === "invalid"
  );

  // handelcomfirmation
  const [Isapprove] = useMutation(TO_APPROVE);
  const handelcomfirmation = async (item) => {
    try {
      if (item?.uuid && houseuuid) {
        await Isapprove({
          variables: {
            input: {
              houseuuid: houseuuid,
              uuid: item?.uuid,
            },
          },
        }).then((response) => {
          window?.location.reload();
        });
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const handleDelete = async (item) => {
    try {
      if (item?.uuid) {
        await DeleteTenant({
          variables: {
            input: {
              uuid: item?.uuid,
            },
          },
        }).then((response) => {
          setcon(false);
          window?.location.reload();
        });
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <div className="p-5 flex flex-col gap-2 h-[calc(100vh-80px)] overflow-y-scroll relative">
      <div className="flex justify-end">
        <button
          onClick={() => setNotifyopen(false)}
          className={`flex flex-col items-center justify-center w-[34px] h-[34px] p-[5px] border border-[#EEEEEE] rounded-full  ${"bg-[#00000005]"} space-y-1 group`}
        >
          <span
            className={`block h-0.5 w-4 rounded transition-transform duration-300 opbg ${"rotate-45 translate-y-1.5"}`}
          ></span>
          <span
            className={`block h-0.5 w-4 rounded transition-opacity duration-300 opbg ${"opacity-0"}`}
          ></span>
          <span
            className={`block h-0.5 w-4 rounded transition-transform duration-300 opbg ${"-rotate-45 -translate-y-1.5"}`}
          ></span>
        </button>
      </div>
      {data?.notify.length > 0 ? (
        data?.notify?.map((item, i) => (
          <div key={i} className="border rounded p-4 flex flex-col gap-2 ">
            <div className="flex flex-col gap-1">
              <p className="font-medium">Email :</p>
              <p className="font-medium p-1 px-2 rounded-sm border">
                {item?.useremail}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-medium">Role :</p>
              <p className="font-medium p-1 px-2 rounded-sm border">
                {item?.role}
              </p>
            </div>
            <div
              ref={dropdown2Ref}
              className={`relative w-full flex flex-col gap-1 duration-150  ${
                conformation ? "max-h-[350px] h-fit" : "max-h-0 overflow-hidden"
              }`}
            >
              <h3 className="font-medium">House Number</h3>
              {/* Selected Value */}
              <div
                className="rounded p-2 bg-[#2d2d54] cursor-pointer flex justify-between items-center min-w-24 "
                onClick={() => setDropdown2Open(!dropdown2Open)}
              >
                <span className=" text-[#ffffffcc] font-medium text-sm pr-1">
                  {housetype}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 transform transition-transform duration-200 ${
                    dropdown2Open ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
              {/* Dropdown Options */}

              {dropdown2Open && (
                <div className="absolute no-scrollbar z-10 mt-1 top-full left-0 w-full bg-[#1d1d42] border border-[#343454] rounded shadow-lg max-h-60 overflow-y-auto">
                  {filterdata?.length > 0 ? (
                    filterdata?.map((option, index) => (
                      <div
                        key={index}
                        className={`px-4 py-2 cursor-pointer flex items-center gap-0.5 hover:bg-[#2a2a57e7] text-[#ffffffcc] hover:text-white`}
                        onClick={() => {
                          sethousetype(option?.housenumber);
                          sethouseuuid(option?.houseuuid);
                          setDropdown2Open(false);
                        }}
                      >
                        {option?.housenumber || "Unkown"}
                        <span className="text-sm bg-[#4b4b4b]  px-2 rounded-4xl h-fit">
                          {option?.tenantname}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div
                      className={`px-4 py-2 cursor-pointer hover:bg-[#2a2a57e7] text-[#ffffffcc] hover:text-white`}
                    >
                      ---add tenant---
                    </div>
                  )}
                </div>
              )}
            </div>
            {Error && (
              <div>
                <p className="font-medium text-sm">{Error}</p>
              </div>
            )}
            <div className="flex gap-2 pt-1">
              {conformation ? (
                <button
                  className="p-1 bg-green-500 rounded"
                  onClick={() => handelcomfirmation(item)}
                >
                  Confirm
                </button>
              ) : (
                <button
                  className="p-1 bg-green-500 rounded"
                  onClick={() => setconformation(true)}
                >
                  Approve
                </button>
              )}
              <button
                className="p-1 bg-red-500 rounded"
                onClick={() => setcon(item)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="h-full w-dvw flex justify-center items-center">
          <div className="text-center">
            <p className="font-medium ">Zero Notification</p>
            <p>close notification tab</p>
          </div>
        </div>
      )}
      {con && (
        <div className="left-0 top-0 absolute bg-[#6666663e] h-full w-dvw flex justify-center items-center">
          <div className="bg-[#121212] p-3 rounded flex flex-col gap-2">
            <p>Are you sure?</p>
            <div className="flex gap-2">
              <button
                className="px-1.5 py-1 cursor-pointer rounded bg-gray-700"
                onClick={() => setcon("")}
              >
                Cancel
              </button>
              <button
                className="px-1.5 py-1 cursor-pointer rounded bg-red-700"
                onClick={() => handleDelete(con)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const fdata = [
  {
    isverified: false,
    role: "tenant",
    useremail: "sujith@",
    uuid: "da33a57f-0a14-491e-b1d2-1fa9066f0391",
  },
  {
    isverified: false,
    role: "tenant",
    useremail: "sujith@",
    uuid: "da33a57f-0a14-491e-b1d2-1fa9066f0391",
  },
  {
    isverified: false,
    role: "tenant",
    useremail: "sujith@",
    uuid: "da33a57f-0a14-491e-b1d2-1fa9066f0391",
  },
  {
    isverified: false,
    role: "tenant",
    useremail: "sujith@",
    uuid: "da33a57f-0a14-491e-b1d2-1fa9066f0391",
  },
  {
    isverified: false,
    role: "tenant",
    useremail: "sujith@",
    uuid: "da33a57f-0a14-491e-b1d2-1fa9066f0391",
  },
  {
    isverified: false,
    role: "tenant",
    useremail: "sujith@",
    uuid: "da33a57f-0a14-491e-b1d2-1fa9066f0391",
  },
  {
    isverified: false,
    role: "tenant",
    useremail: "sujith@",
    uuid: "da33a57f-0a14-491e-b1d2-1fa9066f0391",
  },
  {
    isverified: false,
    role: "tenant",
    useremail: "sujith@",
    uuid: "da33a57f-0a14-491e-b1d2-1fa9066f0391",
  },
];
