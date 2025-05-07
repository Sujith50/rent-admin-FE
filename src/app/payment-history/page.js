"use client";
import { PERSONAL_PAYMENT, TENANT_PERSONAL, USER_DATA } from "@/graphql/query";
import { useQuery } from "@apollo/client";
import React, { useState } from "react";

export default function Page() {
  const userdata = useQuery(USER_DATA);
  const [viewRecent, setviewRecent] = useState(false);
  const tenentpersonal = useQuery(TENANT_PERSONAL, {
    variables: { uuid: userdata?.data?.users?.uuid },
  });
  const { data, loading } = useQuery(PERSONAL_PAYMENT, {
    variables: { uuid: userdata?.data?.users?.uuid },
  });
  return (
    <div className="h-[100vh] bodyclr flex flex-col gap-9">
      <div className=" w-full flex flex-col gap-9 ">
        <div className="px-5 sm:px-0 topprimary h-fit pt-8 pb-5 w-full rounded-b-3xl">
          <h2 className="font-semibold text-xl textprimary">Rent history</h2>
          <span className="text-sm font-medium textsecondary">
            Rent for Stay
          </span>
        </div>
        {loading ? (
          <div className="min-h-[60dvh] flex justify-center items-center w-full">
            Loading...
          </div>
        ) : (
          <div className=" mt-2 flex flex-col gap-3 px-5 bodyclr">
            <div className="  flex flex-col gap-4">
              <div className="bg-white p-3  rounded-lg flex flex-col gap-2">
                <p className="text-[#005995] font-medium">Advance Amount</p>
                <p className="font-medium text-2xl">
                  ₹ {tenentpersonal?.data?.tenantpersonal?.advancepayment}
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg flex flex-col gap-2 ">
                <p className="text-[#005995] font-medium">
                  Rent Amount{" "}
                  <span className="text-xs font-medium bg-[#E0F3FE] px-1.5 py-0.5 rounded-2xl">
                    per month
                  </span>
                </p>
                <p className="font-medium text-2xl">
                  ₹ {tenentpersonal?.data?.tenantpersonal?.rentpermonth}
                </p>
              </div>
              <div className="bg-white p-3 rounded-lg flex flex-col ">
                <div
                  className="flex justify-between items-center"
                  onClick={() => setviewRecent(!viewRecent)}
                >
                  <p className="text-[#005995] font-medium">Payment History</p>
                  <div
                    className={` duration-150 ${
                      viewRecent ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#000"
                    >
                      <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                    </svg>
                  </div>
                </div>
                <div
                  className={`duration-150  ${
                    viewRecent
                      ? " h-[calc(100dvh-500px)] overflow-y-scroll"
                      : "h-0 overflow-hidden"
                  }`}
                >
                  <div className="pt-2 flex flex-col gap-0.5 h-fit">
                    {/* {paydetail?.map((itm, i) => ( */}
                    {data?.tenentpayment?.paymentdetail.length > 0 ? (
                      data?.tenentpayment?.paymentdetail?.map((itm, i) => (
                        <div
                          key={i}
                          className="flex justify-between py-2 bg-[#f5f5f5] p-3 px-4 rounded"
                        >
                          <div>{itm?.date}</div>
                          <div>{itm?.payamount}</div>
                        </div>
                      ))
                    ) : (
                      <div className="flex justify-center items-center my-10">
                        <p className="font-medium">no payment yet!</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
