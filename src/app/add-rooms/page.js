"use client";
import { ADD_XTRAROOMS, ONUPDATE_RENT } from "@/graphql/mutation";
import { tenantdetails, TOTAL_ROOMS, USER_DATA } from "@/graphql/query";
import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";

function Page() {
  const [surePopup, setsurePopup] = useState(false);
  const [Error, setError] = useState("");
  // type of shop or house
  const [type, setType] = useState("Select type");
  const [count, setcount] = useState("");
  const [dropdown1Open, setDropdown1Open] = useState(false);
  const [Message, setMessage] = useState("");
  const totalrooms = useQuery(TOTAL_ROOMS);

  const dropdown1Ref = useRef(null);

  // backend connect
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdown1Ref.current &&
        !dropdown1Ref.current.contains(event.target)
      ) {
        setDropdown1Open(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // filter data
  const filterdata = totalrooms?.data?.totalrooms?.filter(
    (item) => item.name === type
  );

  // add rent
  const [addnewcount] = useMutation(ADD_XTRAROOMS);
  const handleaddrent = async () => {
    try {
      if (type !== "Select type") {
        await addnewcount({
          variables: {
            input: {
              newcount: count,
              name: type,
            },
          },
        }).then((response) => {
          setMessage("successfull");
          setTimeout(() => {
            window.location.reload();
          }, 100);
        });
      } else {
        setError("enter valid input");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setcount(value);
    }
  };
  useEffect(() => {
    console.log("sdssd");
  }, []);

  const userdata = useQuery(USER_DATA);
  if (userdata?.data?.users?.role !== "admin") {
    return null;
  }

  return (
    <div className="relative px-4 py-5 flex flex-col justify-between h-[calc(100dvh-81px)]">
      <div>
        <h2 className="text-xl font-medium">Add Rooms/Shops</h2>
        <div className="mt-2 flex flex-col gap-3">
          <div
            className="relative w-full flex flex-col gap-2"
            ref={dropdown1Ref}
          >
            {/* Selected Value */}
            <h3 className="">Select</h3>
            <div
              className="rounded p-2 bg-[#2d2d54] cursor-pointer flex justify-between items-center min-w-24 "
              onClick={() => setDropdown1Open(!dropdown1Open)}
            >
              <span className=" text-[#ffffffcc] font-medium text-sm pr-1 capitalize">
                {type}
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 transform transition-transform duration-200 ${
                  dropdown1Open ? "rotate-180" : "rotate-0"
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
            {dropdown1Open && (
              <div className="absolute no-scrollbar z-10 mt-1 top-full left-0 w-full bg-[#1d1d42] border border-[#343454] rounded shadow-lg max-h-60 overflow-y-auto">
                {["shops", "rooms"]?.map((option, index) => (
                  <div
                    key={index}
                    className={`px-4 py-2 cursor-pointer hover:bg-[#2a2a57e7] text-[#ffffffcc] capitalize hover:text-white`}
                    onClick={() => {
                      setType(option), setDropdown1Open(!dropdown1Open);
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="relative w-full flex flex-col gap-2">
            <h3 className="">Already available {type}</h3>
            {/* Selected Value */}
            <div className="rounded p-2 h-8 bg-[#2d2d54] cursor-pointer flex justify-between items-center min-w-24 ">
              <span className=" text-[#ffffffcc] font-medium text-sm pr-1">
                {filterdata
                  ? filterdata[0]?.detail?.length
                    ? filterdata[0]?.detail?.length
                    : "0"
                  : "0"}
              </span>
            </div>
          </div>
          <div className="relative w-full flex flex-col gap-2">
            <h3 className="">Add Number of {type}</h3>
            <div className="rounded bg-[#2d2d54] cursor-pointer flex justify-between items-center min-w-24 ">
              <input
                inputMode="numeric"
                placeholder="add number"
                className=" p-2 w-full outline-none"
                onChange={handleChange}
                value={count}
                maxLength={5}
              />
            </div>
          </div>
          {Error && <p className="font-medium text-sm text-red-500">{Error}</p>}
        </div>
      </div>
      {count && (
        <div className="absolute left-0 bottom-2 w-full flex justify-between gap-3">
          <button className="w-full bg-gray-700 p-2 rounded ms-4">
            Cancel
          </button>
          <button
            className="w-full bg-[#7c71f5] p-2 rounded me-4"
            onClick={() => setsurePopup(true)}
          >
            Update
          </button>
        </div>
      )}
      {/* popup fixed */}
      {surePopup && (
        <div className="fixed left-0 top-0 bg-[#ffffff1e] flex justify-center items-center w-dvw h-dvh ">
          <div className="bg-[#0f0f0f] w-[70%] rounded max-w-[350px] flex flex-col gap-5 p-4">
            <p className="text-lg font-medium">Are you Sure want to Update?</p>
            <div className="flex gap-3">
              <button
                className="w-full bg-gray-700 p-2 rounded "
                onClick={() => setsurePopup(false)}
              >
                Cancel
              </button>
              <button
                className="w-full bg-[#7c71f5] p-2 rounded"
                onClick={handleaddrent}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
      {Message && (
        <div className="fixed bottom-10 flex justify-center w-dvw">
          <span className="bg-gray-700 px-2 py-1 rounded">{Message}</span>
        </div>
      )}
    </div>
  );
}

export default Page;

// static data

const tenantdetail = [
  {
    name: "Shelba",
    type: "House",
    penddingamount: "15000",
  },
  {
    name: "Shajin",
    penddingamount: "15000",
    type: "Shop",
  },
  {
    name: "Shiva",
    penddingamount: "15000",
    type: "House",
  },
  {
    name: "Hari",
    type: "Shop",
    penddingamount: "15000",
  },
];
