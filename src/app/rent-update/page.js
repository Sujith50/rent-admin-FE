"use client";
import { ONUPDATE_RENT } from "@/graphql/mutation";
import { GET_TENTANT_DETAILS, tenantdetails, USER_DATA } from "@/graphql/query";
import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useRef, useState } from "react";

function Page() {
  const [amount, setamount] = useState("");
  const [surePopup, setsurePopup] = useState(false);
  const [Message, setMessage] = useState("");
  const [Error, setError] = useState("");
  // type of shop or house
  const [type, setType] = useState("Select type");
  const [tenantname, settenantname] = useState("");
  const [houseuuid, sethouseuuid] = useState("");
  const [housetype, sethousetype] = useState("Select tenant");
  const [paiddate, setpaiddate] = useState("");
  const [dropdown1Open, setDropdown1Open] = useState(false);
  const [dropdown2Open, setDropdown2Open] = useState(false);
  const [btnloading, setbtnloading] = useState(false);

  const dropdown1Ref = useRef(null);
  const dropdown2Ref = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdown1Ref.current &&
        !dropdown1Ref.current.contains(event.target)
      ) {
        setDropdown1Open(false);
      }
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
  // handle keybosrd enter btn
  const handleEnterbtn = (e) => {
    if (e.key === "Enter") {
      setsurePopup(true);
    }
  };

  // filter data
  const { data, loading } = useQuery(GET_TENTANT_DETAILS);
  const filterdata = data?.gettenantdetail?.filter(
    (item) => item?.type === type
  );

  // add rent
  const [Onpayrent] = useMutation(ONUPDATE_RENT);
  const handleaddrent = async () => {
    setbtnloading(true);
    const timestramp = new Date(paiddate).getTime().toString();

    try {
      await Onpayrent({
        variables: {
          input: {
            payamount: amount,
            houseuuid: houseuuid,
            date: timestramp,
          },
        },
      }).then((response) => {
        setMessage("updated successfully");
        setbtnloading(false);
        setTimeout(() => {
          window.location.reload();
          setMessage("");
        }, 1000);
      });
    } catch (error) {
      setError(error.message);
      setsurePopup(false);
      setbtnloading(false);
    }
  };
  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setamount(value);
    }
  };
  useEffect(() => {
    setError("");
  }, [houseuuid, paiddate, amount]);

  const userdata = useQuery(USER_DATA);
  if (userdata?.data?.users?.role !== "admin") {
    return null;
  }
  return (
    <div className="relative px-4 py-5 flex flex-col justify-between h-[calc(100dvh-81px)]">
      <div>
        <h2 className="text-xl font-medium">Rent Update</h2>
        <div className="mt-2 flex flex-col gap-3">
          <div
            className="relative w-full flex flex-col gap-2"
            ref={dropdown1Ref}
          >
            {/* Selected Value */}
            <h3 className="">Select type</h3>
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
                {["shop", "room"]?.map((option, index) => (
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
            <h3 className="">Tenant Name</h3>
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
              <div
                className="absolute no-scrollbar z-10 mt-1 top-full left-0 w-full bg-[#1d1d42] border border-[#343454] rounded shadow-lg max-h-60 overflow-y-auto"
                ref={dropdown2Ref}
              >
                {filterdata?.length > 0 ? (
                  filterdata?.map((option, index) => (
                    <div
                      key={index}
                      className={`px-4 py-2 cursor-pointer flex items-center gap-0.5 hover:bg-[#2a2a57e7] text-[#ffffffcc] hover:text-white`}
                      onClick={() => {
                        sethousetype(option?.doornumber),
                          settenantname(option?.name),
                          sethouseuuid(option?.roomuuid);
                        setDropdown2Open(!dropdown2Open);
                      }}
                    >
                      {option?.doornumber || "Unkown"}
                      <span className="text-sm bg-[#4b4b4b]  px-2 rounded-4xl h-fit">
                        {option?.name}
                      </span>
                    </div>
                  ))
                ) : (
                  <div
                    className={`px-4 py-2 cursor-pointer hover:bg-[#2a2a57e7] text-[#ffffffcc] hover:text-white`}
                  >
                    ---Select type---
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="relative w-full flex flex-col gap-2">
            <h3 className="">Amount Received Date</h3>
            <div className="rounded bg-[#2d2d54] cursor-pointer flex justify-between items-center min-w-24 ">
              <input
                type="date"
                className=" p-2 w-full outline-none"
                onChange={(e) => setpaiddate(e.target.value)}
                value={paiddate}
              />
            </div>
          </div>
          <div
            className="relative w-full flex flex-col gap-2"
            ref={dropdown2Ref}
          >
            <h3 className="">Amount Received</h3>
            <div className="rounded bg-[#2d2d54] cursor-pointer flex justify-between items-center min-w-24 ">
              <input
                inputMode="numeric"
                placeholder="Enter Amount in Rs"
                className=" p-2 w-full outline-none"
                onChange={handleChange}
                value={amount}
                onKeyDown={handleEnterbtn}
              />
            </div>
          </div>
          {Error && <p className="font-medium text-sm text-red-500">{Error}</p>}
        </div>
      </div>
      {amount && (
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
              {btnloading ? (
                <button className="bg-[#7c71f5] w-full h-10 rounded  font-medium  flex justify-center items-center">
                  <span className="w-5 h-5 rounded-full aspect-square border-2 animate-spin border-t-0"></span>
                </button>
              ) : (
                <button
                  className="w-full bg-[#7c71f5] p-2 rounded"
                  onClick={handleaddrent}
                >
                  Update
                </button>
              )}
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
