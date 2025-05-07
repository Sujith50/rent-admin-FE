"use client";
import {
  GET_TENTANT_DETAILS,
  PAYMENT_DETAILS,
  TENANT_PERSONAL,
  tenantdetails,
} from "@/graphql/query";
import { useQuery } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Honey() {
  const [isOpen, setisOpen] = useState(false);
  const pahtname = usePathname();
  const splitpathname = pahtname.split("/")[2];

  const paymentdetails = useQuery(PAYMENT_DETAILS);
  const filterpayment = paymentdetails?.data?.payments?.filter(
    (itm) => itm?.roomuuid === splitpathname
  );
  const { data, loading } = useQuery(TENANT_PERSONAL, {
    variables: { uuid: filterpayment && filterpayment[0]?.tenantuuid },
  });

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
  //pending payment
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

  return (
    <div className="px-4 py-5">
      <div className=" flex flex-col gap-2 ">
        <div className=" p-3 mobnavcontainer relative rounded">
          <div className="absolute top-0 right-0 p-1 bodyclr flex flex-col gap-1 items-center">
            <span>
              {data?.tenantpersonal?.type === "room" ? (
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
            <span className="font-light text-[8px] ">
              {data?.tenantpersonal?.type || "building"}
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <h4 className="font-medium text-lg">
              {data?.tenantpersonal?.name}
            </h4>
            <p className="text-xs lightcontainer px-1 py-0.5 gap-0.5 flex items-center rounded-full ">
              {data?.tenantpersonal?.doornumber}
            </p>
          </div>
          <div className="py-3 flex flex-col gap-2">
            <div className="flex items-center gap-0.5">
              <p className="font-medium">Phone No :</p>
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
              <Link
                href={`tel:${data?.tenantpersonal?.phonenumber}`}
                className="font-medium  rounded-sm flex"
              >
                {data?.tenantpersonal?.phonenumber}
              </Link>
            </div>
            <div className="flex gap-0.5">
              {paymentdetails?.data?.payments?.map(
                (itm, i) =>
                  data?.tenantpersonal?.roomuuid === itm?.roomuuid && (
                    <div className="flex gap-0.5" key={i}>
                      <p className="font-medium">Recent Pay :</p>
                      {itm?.paymentdetail ? (
                        <p className="font-medium px-2 rounded-sm">
                          ₹{" "}
                          {
                            itm?.paymentdetail[itm?.paymentdetail.length - 1]
                              ?.payamount
                          }
                          ,
                          <span className="bg-green-900 px-1 mx-1 rounded-sm text-sm">
                            {timestramptodate(
                              itm?.paymentdetail[itm?.paymentdetail.length - 1]
                                ?.date
                            )}
                          </span>
                        </p>
                      ) : (
                        <p>-</p>
                      )}
                    </div>
                  )
              )}
            </div>
            <div className="flex gap-0.5">
              <p className="font-medium">Pending Payment :</p>
              {paymentdetails?.data?.payments?.map(
                (itm, i) =>
                  itm?.roomuuid === data?.tenantpersonal?.roomuuid && (
                    <p className="font-medium px-2 rounded-sm" key={i}>
                      {totalpendingrent(data?.tenantpersonal, itm) > 0
                        ? `₹ ${totalpendingrent(data?.tenantpersonal, itm)}`
                        : "-"}
                    </p>
                  )
              )}
            </div>
            <div className="flex gap-1">
              <p className="font-medium">Payment Status :</p>
              {paymentdetails?.data?.payments?.map(
                (itm, i) =>
                  itm?.roomuuid === data?.tenantpersonal?.roomuuid && (
                    <p
                      className={`font-medium px-2 rounded-sm ${
                        totalpendingrent(data?.tenantpersonal, itm) > 0
                          ? "bg-red-600"
                          : "bg-green-600"
                      }`}
                      key={i}
                    >
                      {totalpendingrent(data?.tenantpersonal, itm) > 0
                        ? "Pending"
                        : "nill"}
                    </p>
                  )
              )}
            </div>
            <div className="flex gap-0.5">
              <p className="font-medium">Advance Pay :</p>
              <p className="font-medium px-2 rounded-sm">
                ₹ {data?.tenantpersonal?.advancepayment}
              </p>
            </div>
          </div>
          <div className=" lightcontainer p-3 rounded">
            <div
              className="flex justify-between"
              onClick={() => setisOpen(!isOpen)}
            >
              <p>Payment Details</p>
              <p
                className={`${isOpen ? "rotate-180" : "rotate-0"} duration-150`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                >
                  <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                </svg>
              </p>
            </div>
            <div
              className={`flex flex-col scrollbar-none overflow-hidden bodyclr gap-2 duration-150  rounded ${
                isOpen
                  ? "h-fit max-h-[350px] mt-3 overflow-y-scroll "
                  : "max-h-0"
              }`}
            >
              {paymentdetails?.data?.payments?.map(
                (itm, i) =>
                  data?.tenantpersonal?.houseuuid === itm?.houseuuid &&
                  itm?.paymentdetail?.map((itms, ind) => (
                    <div key={ind}>
                      {itms?.date && itms?.payamount ? (
                        <div className="p-2 border-b h-fit flex justify-between last:border-none ">
                          <p>{timestramptodate(itms?.date)}</p>
                          <p>{itms?.payamount}</p>
                        </div>
                      ) : (
                        <p className="p-2">no record</p>
                      )}
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
