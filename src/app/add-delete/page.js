"use client";
import { ON_ADDTENENT } from "@/graphql/mutation";
import { tenantdetails, USER_DATA } from "@/graphql/query";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

function Tenents() {
  const [selectFilter, setselectFilter] = useState("All");
  const [tenantform, settenantform] = useState(false);
  const [conformation, setconformation] = useState(false);
  const router = useRouter();
  const timestramptodate = (item) => {
    const timestamp = Number(item);
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
    return formattedDate;
  };
  const { data, loading } = useQuery(tenantdetails);
  const [AddTenant] = useMutation(ON_ADDTENENT);
  const filterdata = data?.tenants?.filter(
    (item) => item?.housetype === selectFilter || selectFilter === "All"
  );
  console.log(data);
  // Calculate the total months between
  const totalmonth = (timestamp) => {
    const startDate = new Date(timestamp);
    const today = new Date();
    const months =
      (today.getFullYear() - startDate.getFullYear()) * 12 +
      (today.getMonth() - startDate.getMonth());
    return months;
  };

  // rent calculator
  const totalpendingrent = (item) => {
    const totalpaid = item?.rentdetails?.reduce(
      (sum, itm) => sum + Number(itm?.payamount),
      0
    );
    const totalmonths = totalmonth(Number(item?.startingdate));
    const totalrentamount = totalmonths * Number(item?.rentpermonth);
    const totalpending = totalrentamount - totalpaid;
    return totalpending;
  };

  // add tenant add add
  const [type, setType] = useState("Select type");
  const [amount, setamount] = useState("");
  const [name, setname] = useState("");
  const [Error, setError] = useState("");
  const [tentphone, settentphone] = useState("");
  const [housenumber, sethousenumber] = useState("");
  const [advancepayement, setadvancepayement] = useState("");
  const [dropdown1Open, setDropdown1Open] = useState(false);
  const [Message, setMessage] = useState("");
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

  // amount
  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setamount(value);
    }
  };
  const handlecanceladd = () => {
    setname("");
    setamount("");
    settentphone("");
    setadvancepayement("");
    settenantform(false);
  };

  const handlecomformation = () => {
    setconformation(true);
  };

  const handleaddbtn = async () => {
    const timestramp = Date.now().toString();
    if (type === "shop" || type === "house") {
      try {
        await AddTenant({
          variables: {
            input: {
              type: type,
              rentpermonth: amount,
              phonenumber: tentphone,
              name: name,
              livingstart: timestramp,
              houseno: `${type}-${housenumber}`,
              advancepayment: advancepayement,
              tenantuuid: "invalid",
            },
          },
        }).then((response) => {
          setMessage("updated successfully");
          setTimeout(() => {
            window.location.reload();
            setMessage("");
          }, 1000);
        });
      } catch (error) {
        setError(error.message);
      }
    } else {
      setError("Enter valid type");
    }
  };
  // router
  const handlerouter = (id) => {
    // router.push(`/rent-details/${id}`);
  };
  //   console.log(data);
  const userdata = useQuery(USER_DATA);
  if (userdata?.data?.users?.role !== "admin") {
    return null;
  }

  return (
    <div className="px-4 py-5">
      <h2 className="text-xl font-medium">Edit/Add/Delete</h2>
      {!loading ? (
        <div>
          <div className="flex gap-2 my-5">
            {types?.map((item, i) => (
              <button
                key={i}
                onClick={() => setselectFilter(item)}
                className={`${
                  selectFilter === item ? "opbg" : "mobnavcontainer"
                } px-5 rounded-4xl py-1.5 font-medium cursor-pointer capitalize`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className=" flex flex-col gap-2 ">
            {filterdata?.length > 0 ? (
              filterdata?.map((item, i) => (
                <div key={i} className=" p-3 mobnavcontainer relative rounded">
                  <div className="absolute top-0 right-0 p-1 bodyclr flex flex-col gap-1 items-center">
                    <span>
                      {item?.housetype === "house" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="26px"
                          viewBox="0 -960 960 960"
                          width="26px"
                        >
                          <path d="M200-160v-366L88-440l-48-64 440-336 160 122v-82h120v174l160 122-48 64-112-86v366H520v-240h-80v240H200Zm80-80h80v-240h240v240h80v-347L480-739 280-587v347Zm120-319h160q0-32-24-52.5T480-632q-32 0-56 20.5T400-559Zm-40 319v-240h240v240-240H360v240Z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="26px"
                          viewBox="0 -960 960 960"
                          width="26px"
                        >
                          <path d="M80-80v-481l280-119v80l200-80v120h320v480H80Zm80-80h640v-320H480v-82l-200 80v-78l-120 53v347Zm280-80h80v-160h-80v160Zm-160 0h80v-160h-80v160Zm320 0h80v-160h-80v160Zm280-320H680l40-320h120l40 320ZM160-160h640-640Z" />
                        </svg>
                      )}
                    </span>
                    <span className="font-light text-[8px] capitalize">
                      {item?.housetype}
                    </span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <h4 className="font-medium text-lg">
                      {item?.tenantname || "Unknown"}
                    </h4>
                    <p className="text-xs lightcontainer px-1 py-0.5 gap-0.5 flex items-center rounded-full ">
                      <span className="capitalize">{item?.housenumber}</span>
                    </p>
                  </div>
                  <div className="py-3 flex flex-col gap-2">
                    <div className="flex gap-0.5">
                      <p className="font-medium">Pending Payment :</p>
                      <p className="font-medium px-2 rounded-sm">
                        {totalpendingrent(item) > 0
                          ? `₹ ${totalpendingrent(item)}`
                          : "-"}
                      </p>
                    </div>
                    <div className="flex gap-0.5">
                      <p className="font-medium">Starting date :</p>
                      <p className="font-medium px-2 rounded-sm">
                        {timestramptodate(item?.startingdate)}
                      </p>
                    </div>
                    <div className="pt-2 flex items-center gap-2">
                      <div
                        onClick={() => handlerouter(item?.housenumber)}
                        className="font-medium px-3 w-fit select-none cursor-pointer bg-green-600  py-1 rounded-md text-sm"
                      >
                        Edit
                      </div>
                      <div className="font-medium px-3 w-fit select-none cursor-pointer bg-red-600  py-1 rounded-md text-sm">
                        Delete
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="font-medium flex justify-center items-center h-[calc(100dvh-200px)]">
                no record
              </div>
            )}
          </div>
          {/* add new tenant */}
          <div
            className={`fixed z-10 left-0 w-dvw bottom-0 duration-150 overflow-hidden flex justify-center items-center ${
              tenantform ? " h-[calc(100dvh-80px)]" : "h-0"
            }`}
          >
            <div className="relative mobnavcontainer w-full h-full  p-3">
              <div className="flex flex-col gap-3">
                <div
                  className="relative w-full flex flex-col gap-2"
                  ref={dropdown1Ref}
                >
                  {/* Selected Value */}
                  <h3 className="">Select type</h3>
                  <div
                    className="rounded p-2 bg-[#15151c] cursor-pointer flex justify-between items-center min-w-24 "
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
                      {["shop", "house"]?.map((option, index) => (
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
                  <h3 className="">House Number</h3>
                  <div className="rounded bg-[#15151c] cursor-pointer flex justify-between items-center min-w-24 ">
                    <input
                      inputMode="numeric"
                      placeholder="Enter Tentent name"
                      className=" p-2 w-full outline-none"
                      onChange={(e) => sethousenumber(e.target.value)}
                      value={housenumber}
                    />
                  </div>
                </div>
                <div className="relative w-full flex flex-col gap-2">
                  <h3 className="">Tentent Name</h3>
                  <div className="rounded bg-[#15151c] cursor-pointer flex justify-between items-center min-w-24 ">
                    <input
                      inputMode="text"
                      placeholder="Enter Tentent name"
                      className=" p-2 w-full outline-none"
                      onChange={(e) => setname(e.target.value)}
                      value={name}
                    />
                  </div>
                </div>

                <div className="relative w-full flex flex-col gap-2">
                  <h3 className="">Tenant Phonenumber</h3>
                  <div className="rounded bg-[#15151c] cursor-pointer flex justify-between items-center min-w-24 ">
                    <input
                      inputMode="numeric"
                      placeholder="Enter tenant phonenumber"
                      className=" p-2 w-full outline-none"
                      onChange={(e) => settentphone(e.target.value)}
                      value={tentphone}
                      maxLength={10}
                    />
                  </div>
                </div>
                <div className="relative w-full flex flex-col gap-2">
                  <h3 className="">Advance Amount</h3>
                  <div className="rounded bg-[#15151c] cursor-pointer flex justify-between items-center min-w-24 ">
                    <input
                      inputMode="numeric"
                      placeholder="Enter advance payment"
                      className=" p-2 w-full outline-none"
                      onChange={(e) => setadvancepayement(e.target.value)}
                      value={advancepayement}
                      maxLength={5}
                    />
                  </div>
                </div>
                <div className="relative w-full flex flex-col gap-2">
                  <h3 className="">Rent Amount</h3>
                  <div className="rounded bg-[#15151c] cursor-pointer flex justify-between items-center min-w-24 ">
                    <input
                      inputMode="numeric"
                      placeholder="Enter rent amount in Rs"
                      className=" p-2 w-full outline-none"
                      onChange={handleChange}
                      value={amount}
                      maxLength={5}
                    />
                  </div>
                </div>
                {Error && (
                  <p className="font-medium text-sm text-red-600">*{Error}*</p>
                )}
              </div>
              <div className="absolute bottom-3 left-0 w-full flex justify-between gap-3 ">
                <button
                  className="flex-1 p-2 bg-gray-600 ms-3 cursor-pointer rounded"
                  onClick={handlecanceladd}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 p-2 bg-green-600 me-3 cursor-pointer rounded font-medium"
                  onClick={handlecomformation}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          {/* tenant*/}
          {conformation && (
            <div className="flex justify-center z-20 items-center bg-[#bebebe3c] w-dvw h-dvh fixed left-0 top-0">
              <div className="border border-[#9c9c9c] bg-[#000000] p-4 rounded flex flex-col gap-3 max-w-[250px]">
                <p>Are you sure want to add tenant?</p>
                <div className="flex gap-2">
                  <button
                    className="bg-gray-600 flex-1 rounded p-1 cursor-pointer"
                    onClick={() => setconformation(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="bg-green-600 flex-1 rounded p-1 cursor-pointer"
                    onClick={handleaddbtn}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* successfull message */}
          {Message && (
            <div className="fixed bottom-10 flex justify-center w-dvw">
              <span className="bg-gray-700 px-2 py-1 rounded">{Message}</span>
            </div>
          )}
          {!tenantform && (
            <button
              className="fixed bottom-[8%] right-[12%] cursor-pointer bg-white text-black w-14 h-14 rounded-full flex flex-col items-center justify-center gap-0"
              onClick={() => settenantform(true)}
            >
              <span className="text-sm font-semibold leading-3">Add</span>
              <span className="text-xs">tenant</span>
            </button>
          )}
        </div>
      ) : (
        <div className="font-medium flex justify-center items-center h-[calc(100dvh-200px)]">
          Loading...
        </div>
      )}
    </div>
  );
}

export default Tenents;

// static value
const types = ["All", "shop", "house"];
