"use client";
import {
  GET_TENTANT_DETAILS,
  PAYMENT_DETAILS,
  tenantdetails,
  USER_DATA,
} from "@/graphql/query";
import { useQuery } from "@apollo/client";
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
  const paymentdetails = useQuery(PAYMENT_DETAILS);

  const filterdata = data?.gettenantdetail?.filter(
    (item) => item?.type === selectFilter || selectFilter === "All"
  );

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
  const totalpendingrent = (item, itm) => {
    const totalpaid = itm?.paymentdetail?.reduce(
      (sum, itm) => sum + Number(itm?.payamount),
      0
    );
    const totalmonths = totalmonth(Number(item?.startingdate));
    const totalrentamount = totalmonths * Number(item?.rentpermonth);
    const totalpending = totalrentamount - totalpaid;
    return totalpending;
  };

  // router
  const handlerouter = (id) => {
    router.push(`/rent-details/${id}`);
  };
  // rent update
  const userdata = useQuery(USER_DATA);

  return (
    <div className="px-4 py-5">
      <h2 className="text-xl font-medium">Rent Details</h2>
      {!loading ? (
        userdata?.data?.users?.isverified ? (
          <div className="">
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
                filterdata?.map(
                  (item, i) =>
                    item?.roomuuid !== "invalid" && (
                      <div
                        key={i}
                        className=" p-3 mobnavcontainer relative rounded"
                      >
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
                            {item?.type}
                          </span>
                        </div>
                        <div className="flex gap-2 items-center">
                          <h4 className="font-medium text-lg">
                            {item?.name || "Unknown"}
                          </h4>
                          <p className="text-xs lightcontainer px-1 py-0.5 gap-0.5 flex items-center rounded-full ">
                            <span className="capitalize">
                              {item?.doornumber}
                            </span>
                          </p>
                        </div>
                        <div className="py-3 flex flex-col gap-2">
                          {paymentdetails?.data?.payments?.map(
                            (itm, i) =>
                              item?.roomuuid === itm?.roomuuid && (
                                <div className="flex gap-0.5" key={i}>
                                  <p className="font-medium">Recent Pay :</p>
                                  {itm?.paymentdetail ? (
                                    <p className="font-medium px-2 rounded-sm">
                                      ₹{" "}
                                      {
                                        itm?.paymentdetail[
                                          itm?.paymentdetail.length - 1
                                        ]?.payamount
                                      }
                                      ,
                                      <span className="bg-green-900 px-1 mx-1 rounded-sm text-sm">
                                        {timestramptodate(
                                          itm?.paymentdetail[
                                            itm?.paymentdetail.length - 1
                                          ]?.date
                                        )}
                                      </span>
                                    </p>
                                  ) : (
                                    <p>-</p>
                                  )}
                                </div>
                              )
                          )}
                          <div className="flex gap-0.5">
                            <p className="font-medium">Pending Payment :</p>
                            {paymentdetails?.data?.payments?.map(
                              (itm, i) =>
                                itm?.houseuuid === item?.houseuuid && (
                                  <p
                                    className="font-medium px-2 rounded-sm"
                                    key={i}
                                  >
                                    {totalpendingrent(item, itm) > 0
                                      ? `₹ ${totalpendingrent(item, itm)}`
                                      : "-"}
                                  </p>
                                )
                            )}
                          </div>
                          <div className="flex gap-0.5">
                            <p className="font-medium">Starting date :</p>
                            <p className="font-medium px-2 rounded-sm">
                              {timestramptodate(item?.startingdate)}
                            </p>
                          </div>
                          <div className="pt-2">
                            <div
                              onClick={() => handlerouter(item?.roomuuid)}
                              className="font-medium w-fit select-none cursor-pointer bg-green-600 px-1.5 py-1 rounded-md text-sm"
                            >
                              View More
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                )
              ) : (
                <div className="font-medium flex justify-center items-center h-[calc(100dvh-200px)]">
                  no record
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="h-[calc(100dvh-150px)] flex justify-center items-center">
            <p>waiting for approval</p>
          </div>
        )
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
const data = [
  {
    no: "1",
    status: false,
    name: "Hari",
    type: "Shop",
    Advance: "20000",
    rentamount: "4000",
    from: "1711564800000",
    lastestpay: { amount: "2500", date: "1711564800000" },
    paymentstatus: false,
    pendingamout: "15000",
    paiddetails: [
      { month: "Jan", amount: "3000", date: "1711564800000" },
      { month: "Feb", amount: "3000", date: "1711564800000" },
      { month: "Mar", amount: "3000", date: "1711564800000" },
      { month: "Apr", amount: "3000", date: "1711564800000" },
      { month: "May", amount: "3000", date: "1711564800000" },
      { month: "Jun", amount: "3000", date: "1711564800000" },
    ],
  },
  {
    no: "1",
    status: false,
    name: "Siva",
    type: "House",
    Advance: "10000",
    rentamount: "3000",
    lastestpay: { amount: "2500", date: "1711564800000" },
    from: "1711564800000",
    paymentstatus: false,
    pendingamout: "15000",
    paiddetails: [
      { month: "Jan", amount: "3000", date: "1711564800000" },
      { month: "Feb", amount: "3000", date: "1711564800000" },
      { month: "Mar", amount: "3000", date: "1711564800000" },
      { month: "Apr", amount: "3000", date: "1711564800000" },
      { month: "May", amount: "3000", date: "1711564800000" },
      { month: "Jun", amount: "3000", date: "1711564800000" },
    ],
  },
];
