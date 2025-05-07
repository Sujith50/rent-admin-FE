"use client";
import { GET_TENTANT_DETAILS, tenantdetails, USER_DATA } from "@/graphql/query";
import { useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function Tenents() {
  const [selectFilter, setselectFilter] = useState("All");
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
  const { data, loading } = useQuery(GET_TENTANT_DETAILS);

  const filterdata = data?.gettenantdetail?.filter(
    (item) => item?.type === selectFilter || selectFilter === "All"
  );
  // const handlerouter = (id) => {
  //   router.push(`/tenants/${id}`);
  // };
  const userdata = useQuery(USER_DATA);
  if (userdata?.data?.users?.role !== "admin") {
    return null;
  }
  return (
    <div className="px-4 py-5">
      <h2 className="text-xl font-medium">Tenants</h2>
      {!loading ? (
        <div>
          <div className="flex gap-2 my-5">
            {types?.map((item, i) => (
              <button
                key={i}
                onClick={() => setselectFilter(item)}
                className={`${
                  selectFilter === item ? "opbg" : "mobnavcontainer"
                } px-5 rounded-4xl py-1.5 font-medium capitalize`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className=" flex flex-col gap-2 ">
            {filterdata?.map((item, i) => (
              <div key={i} className=" p-3 mobnavcontainer relative rounded">
                <div className="absolute top-0 right-0 p-1 bodyclr flex flex-col gap-1 items-center">
                  <span>
                    {item?.type === "room" ? (
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
                    {item?.type || "building"}
                  </span>
                </div>
                <div className="flex gap-2 items-center">
                  <h4 className="font-medium text-lg capitalize">
                    {item?.name || "Unknown"}
                  </h4>
                  <p className="text-xs lightcontainer px-1 py-0.5 gap-0.5 flex items-center rounded-full ">
                    <span className="capitalize">{item?.doornumber}</span>
                  </p>
                </div>

                <div className="py-3 flex flex-col gap-2">
                  <div className="flex items-center gap-0.5">
                    <p className="font-medium">Phone No:</p>
                    <span className="ps-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="18px"
                        viewBox="0 -960 960 960"
                        width="18px"
                      >
                        <path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" />
                      </svg>
                    </span>
                    <p className="font-medium mx-1 relative ">
                      {item?.phonenumber || "xxx xxx xxxx"}
                      {/* <span className="w-full h-[1px] bg-white absolute left-0 bottom-0"></span> */}
                    </p>
                  </div>
                  <div className="flex gap-0.5">
                    <p className="font-medium">Advance Pay :</p>
                    <p className="font-medium px-2 rounded-sm">
                      ₹ {item?.advancepayment || "no record"}
                    </p>
                  </div>
                  <div className="flex gap-0.5">
                    <p className="font-medium">Rent Amount:</p>
                    <p className="font-medium px-2 rounded-sm">
                      ₹ {item?.rentpermonth || "xxxx"}
                    </p>
                  </div>
                  <div className="flex gap-0.5">
                    <p className="font-medium">Tenant From:</p>
                    <p className="font-medium px-2 rounded-sm">
                      <span className="bg-green-900 px-1 mx-1 rounded-sm text-sm">
                        {timestramptodate(item?.startingdate)}
                      </span>
                    </p>
                  </div>
                  <div className="pt-2 flex items-center gap-1">
                    <Link
                      href={`tel:${item?.phonenumber}`}
                      className="font-medium  select-none px-3 flex items-center gap-1 bg-green-600  py-1 rounded-md text-base"
                    >
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="20px"
                          viewBox="0 -960 960 960"
                          width="20px"
                        >
                          <path d="M798-120q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" />
                        </svg>
                      </span>
                      Call
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
const types = ["All", "shop", "room"];
const sample = [
  {
    no: "1",
    status: false,
    name: "Hari",
    type: "Shop",
    Advance: "20000",
    rentamount: "4000",
    from: "1711564800000",
    paymentstatus: false,
    phonenumber: "8300119850",
  },
  {
    no: "1",
    status: false,
    name: "Siva",
    type: "House",
    Advance: "10000",
    rentamount: "3000",
    from: "1711564800000",
    paymentstatus: false,
    phonenumber: "8300119850",
  },
];
