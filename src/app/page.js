"use client";
import { ADD_ROOMS, ADD_TENANT } from "@/graphql/mutation";
import {
  PERSONAL_PAYMENT,
  TENANT_PERSONAL,
  TOTAL_ROOMS,
  USER_DATA,
} from "@/graphql/query";
import { useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { data, loading } = useQuery(USER_DATA);
  const totalrooms = useQuery(TOTAL_ROOMS);
  const [popupshow, setpopupshow] = useState(false);
  const [noofrooms, setnoofrooms] = useState("");
  const [nameofbuilding, setnameofbuilding] = useState("");
  const [noofshops, setnoofshops] = useState("");
  const [success, setsuccess] = useState("");
  const [Error, setError] = useState("");
  const [showall, setshowall] = useState("");

  const router = useRouter();
  useEffect(() => {
    if (!data && !loading) {
      router.push("/login");
    }
  }, [data]);
  // setTimeout(() => {
  //   setpopupshow(true);
  // }, 10000);

  useEffect(() => {
    if (totalrooms?.data?.totalrooms?.length > 0) {
      setpopupshow(false);
    } else {
      setpopupshow(true);
    }
  }, [totalrooms?.data, totalrooms?.loading]);

  const [NoofRooms] = useMutation(ADD_ROOMS);
  const [addtenant] = useMutation(ADD_TENANT);
  const handlecreatenumber = async () => {
    try {
      if (noofrooms || noofshops) {
        const room = { name: "rooms", count: noofrooms };
        const shop = { name: "shops", count: noofshops };
        const document = { buildingname: nameofbuilding, data: [room, shop] };
        await NoofRooms({
          variables: {
            input: document,
          },
        }).then((response) => {
          setsuccess("success");
          setTimeout(() => {
            setsuccess("");
            window.location.reload();
          }, 500);
        });
      } else {
        setError("Enter the input field");
      }
    } catch (error) {
      setError(error.message);
    }
  };
  const filterdata = totalrooms?.data?.totalrooms?.filter(
    (item) => item.detail && item.detail.length > 0
  );

  const handlerouter = (uuid) => {
    router.push(`/building/${uuid}`);
  };

  useEffect(() => {
    setError("");
  }, [noofrooms, noofshops]);

  return (
    <div>
      {loading ? (
        <p>loading</p>
      ) : popupshow ? (
        <div className="w-dvw fixed left-0  h-dvh  flex justify-center items-center z-50 bg-[#00000020]">
          <div className="bodyclr p-3 rounded-lg flex flex-col gap-3">
            <div className="flex flex-col gap-2">
              <p className="font-medium">Building name</p>
              <input
                type="text"
                name="building name"
                inputMode="text"
                value={nameofbuilding}
                onChange={(e) => setnameofbuilding(e.target.value)}
                placeholder="Building name"
                className="lightcontainer outline-0 border border-[#1f2a38] rounded p-1 px-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-medium">Rooms</p>
              <input
                type="text"
                inputMode="numeric"
                name="number of rooms"
                value={noofrooms}
                onChange={(e) => {
                  e.target.value = setnoofrooms(
                    e.target.value.replace(/[^0-9]/g, "")
                  );
                }}
                placeholder="Number of room"
                className="lightcontainer outline-0 border border-[#1f2a38] rounded p-1 px-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-medium">Shops</p>
              <input
                type="text"
                name="number of shops"
                inputMode="numeric"
                value={noofshops}
                onChange={(e) => {
                  e.target.value = setnoofshops(
                    e.target.value.replace(/[^0-9]/g, "")
                  );
                }}
                placeholder="Number of shops"
                className="lightcontainer outline-0 border border-[#1f2a38] rounded p-1 px-2"
              />
            </div>
            {Error && (
              <p className="font-medium text-sm text-red-500">{Error}</p>
            )}
            <button
              className={`${
                noofrooms || noofshops ? "bg-green-500" : "bg-gray-700"
              } rounded p-1 mt-2 cursor-pointer text-white`}
              onClick={handlecreatenumber}
            >
              Confirm
            </button>
          </div>
        </div>
      ) : (
        <main className="h-dvh bodyclr flex flex-col gap-5 blktext ">
          <div className="px-5 sm:px-0 topprimary h-fit pt-8 pb-5 w-full rounded-b-3xl">
            <h2 className="font-semibold text-xl textprimary">
              Hey <span className="capitalize ">Admin</span>!
            </h2>
            <span className="text-sm font-medium textsecondary">
              Live Like a Family
            </span>
          </div>
          <div className="px-5 sm:px-0 textprimary ">
            {filterdata?.map((item, i) => (
              <div className="text-[#101010] p-3 rounded bgwhite" key={i}>
                <div
                  onClick={() =>
                    setshowall(showall === item?.name ? "" : item?.name)
                  }
                  className="flex items-center gap-3 justify-between"
                >
                  <div className="flex items-center gap-2">
                    <span>
                      {item?.name === "rooms" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="#00000070"
                        >
                          <path d="M19 2H9c-1.103 0-2 .897-2 2v5.586l-4.707 4.707A1 1 0 0 0 3 16v5a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4c0-1.103-.897-2-2-2zm-8 18H5v-5.586l3-3 3 3V20zm8 0h-6v-4a.999.999 0 0 0 .707-1.707L9 9.586V4h10v16z"></path>
                          <path d="M11 6h2v2h-2zm4 0h2v2h-2zm0 4.031h2V12h-2zM15 14h2v2h-2zm-8 1h2v2H7z"></path>
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="24px"
                          viewBox="0 -960 960 960"
                          width="24px"
                          fill="#00000070"
                        >
                          <path d="M160-720v-80h640v80H160Zm0 560v-240h-40v-80l40-200h640l40 200v80h-40v240h-80v-240H560v240H160Zm80-80h240v-160H240v160Zm-38-240h556-556Zm0 0h556l-24-120H226l-24 120Z" />
                        </svg>
                      )}
                    </span>
                    <p className="capitalize text-xl">{item?.name}</p>
                  </div>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#000"
                    className={`${
                      showall === item?.name ? "rotate-0" : "rotate-180"
                    } duration-150`}
                  >
                    <path d="M480-528 296-344l-56-56 240-240 240 240-56 56-184-184Z" />
                  </svg>
                </div>
                <div
                  className={`${
                    showall === item?.name
                      ? "max-h-[560px] h-fit pt-3"
                      : "max-h-0"
                  } overflow-hidden duration-150 flex flex-col gap-1`}
                >
                  {item?.detail?.map((itm, ind) => (
                    <div
                      key={ind}
                      className="px-3 py-3 bg-[#efefef] flex justify-between items-center"
                    >
                      <div>
                        <p className="">{itm?.name}</p>
                      </div>
                      <p className="font-medium text-sm">
                        {itm?.tenantuuid === "null" ? (
                          <Link
                            href={`/building/${itm?.uuid}`}
                            className="text-green-400 select-none px-2 py-0.5 border rounded-4xl"
                          >
                            Add tenant
                          </Link>
                        ) : (
                          <Link
                            href={`/building/${itm?.uuid}`}
                            className="text-red-400 select-none px-2 py-0.5 border rounded-4xl"
                          >
                            View tenant
                          </Link>
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {data?.users?.role === "admin" && (
            <div className="mobnavcontainer p-2 rounded flex flex-col gap-4">
              <h2 className="font-medium text-xl">Pending Details</h2>
              <div>
                {pendingdetails?.map((item, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center my-1"
                  >
                    <div className="flex flex-col gap-0.5">
                      <p className="font-medium text-lg">{item.name}</p>
                      <span className="text-sm">{item?.renttype}</span>
                    </div>
                    <p className="text-xl font-medium">
                      ₹{item?.penddingamount}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      )}
      {success && (
        <div className=" w-dvw fixed left-0 bottom-[10%] flex justify-center ">
          <p>{success}</p>
        </div>
      )}
    </div>
  );
}

export function Userbase({ item }) {
  const tenentpersonal = useQuery(TENANT_PERSONAL, {
    variables: { uuid: item?.users?.uuid },
  });

  return (
    <div className="h-[calc(100vh-80px)] w-full bodyclr flex justify-center items-center">
      <div className=" h-[20%] min-w-[200px] aspect-square overflow-hidden bodyclr flex justify-center items-center">
        {item?.users?.type === "room" ? (
          <div className="bg-[#054599]  relative overflow-hidden w-full max-w-[450px] min-h-[100px] ">
            <div className="absolute top-[20%] right-[20px] p-0.5 rounded-full aspect-square text-xs w-4 h-4 flex justify-center items-center navbg"></div>
            {/* door */}
            <div className="absolute right-1.5 bottom-0 bg-[#b76f20] w-[30px] h-[60px] flex justify-center items-center gap-0.5 p-[3px] ">
              <div className="border-2 border-[#6d4317] bg-[#8b571f] w-full h-full relative flex items-center">
                <div className="absolute  right-0 w-[3px] h-2 bg-[#cfc7c2] rounded-xl ">
                  <div className="relative h-full w-full ">
                    <span className="absolute w-2 h-[2px] bg-[#c6920e] right-[1px] top-0.5 rounded-ss-4xl rounded-r-3xl"></span>
                    <span className="absolute w-[0.5px] h-0.5 right-[1.5px] bottom-[1px] rounded-3xl bg-black"></span>
                  </div>
                </div>
              </div>
            </div>
            {/* small window */}
            <div className="absolute right-9 bottom-2 bg-[#b76f20] w-4 h-9 gap-[1px] p-[2px] flex justify-center">
              <div className="bg-[#d07e27] w-full h-full flex justify-center flex-col items-center gap-0.5 p-0.5 ">
                <span className="bg-[#686663] w-full h-full rounded-xl"></span>
                <span className="bg-[#686663] w-full h-full rounded-xl"></span>
              </div>
            </div>
            <div className="absolute right-9 bottom-0 bg-[#b76f20] w-4 h-2 gap-[1px] p-[2px] flex justify-center"></div>
            {/* center styles line */}

            <div className="absolute flex gap-0.5 right-[35%]">
              <div className=" flex min-w-0.5 bg-white min-h-[100vh]"></div>
              <div className=" w-5 h-[100%] bg-[#ffffff] min-h-[100vh] flex flex-col  gap-1 items-center overflow-hidden py-1">
                <span className="aspect-square w-4 h-4 bg-[#054599] flex justify-center items-center">
                  <span className="w-1.5 h-1.5 bg-white"></span>
                </span>
                <span className="aspect-square w-full h-4 bg-[#054599] flex justify-center items-center">
                  <span className="w-full h-1 bg-white"></span>
                </span>
                <span className="aspect-square w-4 h-4 bg-[#054599] flex justify-center items-center">
                  <span className="w-1.5 h-1.5 bg-white"></span>
                </span>
                <span className="aspect-square w-full h-4 bg-[#054599] flex justify-center items-center">
                  <span className="w-full h-1 bg-white"></span>
                </span>
                <span className="aspect-square w-4 h-4 bg-[#054599] flex justify-center items-center">
                  <span className="w-1.5 h-1.5 bg-white"></span>
                </span>
                <span className="aspect-square w-full h-4 bg-[#054599] flex justify-center items-center">
                  <span className="w-full h-1 bg-white"></span>
                </span>
                <span className="aspect-square w-4 h-4 bg-[#054599] flex justify-center items-center">
                  <span className="w-1.5 h-1.5 bg-white"></span>
                </span>
                <span className="aspect-square w-full h-4 bg-[#054599] flex justify-center items-center">
                  <span className="w-full h-1 bg-white"></span>
                </span>
                <span className="aspect-square w-4 h-4 bg-[#054599] flex justify-center items-center">
                  <span className="w-1.5 h-1.5 bg-white"></span>
                </span>
                <span className="aspect-square w-full h-4 bg-[#054599] flex justify-center items-center">
                  <span className="w-full h-1 bg-white"></span>
                </span>
                <span className="aspect-square w-4 h-4 bg-[#054599] flex justify-center items-center">
                  <span className="w-1.5 h-1.5 bg-white"></span>
                </span>
                <span className="aspect-square w-full h-4 bg-[#054599] flex justify-center items-center">
                  <span className="w-full h-1 bg-white"></span>
                </span>
                <span className="aspect-square w-4 h-4 bg-[#054599] flex justify-center items-center">
                  <span className="w-1.5 h-1.5 bg-white"></span>
                </span>
                <span className="aspect-square w-full h-4 bg-[#054599] flex justify-center items-center">
                  <span className="w-full h-1 bg-white"></span>
                </span>
              </div>
              <div className="min-h-full flex min-w-0.5 bg-white"></div>
            </div>
            {/* bigg window */}
            <div className="absolute left-[12%] bottom-[23%] h-12 w-12 flex gap-[1px] p-[2px] bg-[#b76f20] ">
              <div className="bg-[#d07e27] w-full h-full flex justify-center flex-col items-center gap-0.5 p-0.5 ">
                <span className="bg-[#686663] w-full h-full "></span>
                <span className="bg-[#686663] w-full h-full "></span>
              </div>
              <div className="bg-[#d07e27] w-full h-full flex justify-center flex-col items-center gap-0.5 p-0.5 ">
                <span className="bg-[#686663] w-full h-full "></span>
                <span className="bg-[#686663] w-full h-full "></span>
              </div>
              <div className="bg-[#d07e27] w-full h-full flex justify-center flex-col items-center gap-0.5 p-0.5 ">
                <span className="bg-[#686663] w-full h-full "></span>
                <span className="bg-[#686663] w-full h-full "></span>
              </div>
            </div>
            <div className="absolute w-2 h-[100%] bg-[#ffffff] left-0 flex flex-col gap-1 items-center overflow-hidden py-1">
              <span className="w-full h-1 bg-[#054599]"></span>
              <span className="w-full h-1 bg-[#054599]"></span>
              <span className="w-full h-1 bg-[#054599]"></span>
              <span className="w-full h-1 bg-[#054599]"></span>
              <span className="w-full h-1 bg-[#054599]"></span>
              <span className="w-full h-1 bg-[#054599]"></span>
              <span className="w-full h-1 bg-[#054599]"></span>
              <span className="w-full h-1 bg-[#054599]"></span>
              <span className="h-full w-0.5 bg-[#054599]"></span>
              <span className="h-full w-0.5 bg-[#054599]"></span>
              <span className="h-full w-0.5 bg-[#054599]"></span>
            </div>
          </div>
        ) : (
          <div className="w-full max-w-[450px] px-2 py-1 pt-4 bg-white relative">
            <div className="absolute top-0 left-0 h-7 w-full bg-[#4378be] text-xs flex justify-center items-center"></div>
            <div className="bg-[#054599] h-full w-full flex flex-col gap-1 justify-between border border-[#054599]">
              <span className="bg-[#ffffff] h-[1px] w-full"></span>
              <span className="bg-[#ffffff] h-[1px] w-full"></span>
              <span className="bg-[#ffffff] h-[1px] w-full"></span>
              <span className="bg-[#ffffff] h-[1px] w-full"></span>
              <span className="bg-[#ffffff] h-[1px] w-full"></span>
              <span className="bg-[#ffffff] h-[1px] w-full"></span>
              <span className="bg-[#ffffff] h-[1px] w-full"></span>
              <span className="bg-[#ffffff] h-[1px] w-full"></span>
              <span className="bg-[#ffffff] h-[1px] w-full"></span>
              <span className="bg-[#ffffff] h-[1px] w-full"></span>
              <span className="bg-[#ffffff] h-[1px] w-full"></span>
              <span className="bg-[#ffffff] h-[1px] w-full"></span>
              <span className="bg-[#ffffff] h-[1px] w-full"></span>
              <span className="bg-[#ffffff] h-[1px] w-full"></span>
              <span className="bg-[#ffffff] h-[1px] w-full"></span>
              <span className="bg-[#ffffff] h-[1px] w-full"></span>
              <span className="bg-[#ffffff] h-[1px] w-full"></span>
              <div className="h-1.5 flex justify-between w-full items-center">
                <span className=""></span>
                <span className="bg-[#202020] h-0.5 w-2 mx-1"></span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export function Upuserbase({ item }) {
  const tenentpersonal = useQuery(TENANT_PERSONAL, {
    variables: { uuid: item?.users?.uuid },
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

  const { data, loading } = useQuery(PERSONAL_PAYMENT, {
    variables: { uuid: item?.users?.uuid },
  });
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
    let totalpaid;
    if (item?.paymentdetail.length > 0) {
      totalpaid = item?.rentdetails?.reduce(
        (sum, itm) => sum + Number(itm?.payamount),
        0
      );
    } else {
      totalpaid = 0;
    }

    const totalmonths = totalmonth(
      Number(tenentpersonal?.data?.tenantpersonal?.startingdate)
    );
    const totalrentamount =
      totalmonths * Number(tenentpersonal?.data?.tenantpersonal?.rentpermonth);
    const totalpending = totalrentamount - totalpaid;

    return totalpending;
  };

  return (
    <div className="min-h-[100vh] w-full bodyclr flex flex-col gap-9 blktext">
      <div className="px-5 sm:px-0 topprimary h-fit pt-8 pb-5 w-full rounded-b-3xl">
        <h2 className="font-semibold text-xl textprimary">
          Hey{" "}
          <span className="capitalize ">
            {tenentpersonal?.data?.tenantpersonal?.name || "tenant"}
          </span>
          !
        </h2>
        <span className="text-sm font-medium textsecondary">
          Live Like a Family
        </span>
      </div>
      <div className="flex flex-col gap-3 px-5 sm:px-0 ">
        <p className="font-medium">Key Card</p>
        <div className="secondarybg  rounded-xl p-3.5 flex flex-col gap-2 text-white">
          <div className="flex justify-between">
            <div className="flex flex-col gap-2">
              <p className="text-sm">My Pending</p>
              <h3 className="font-semibold text-3xl">
                {data?.tenentpayment?.paymentdetail
                  ? `₹ ${totalpendingrent(data?.tenentpayment)}`
                  : "No Pending"}
              </h3>
            </div>
            <div className="text-sm text-[#ffffffe1]">
              Doorno :{" "}
              <span className="font-medium text-white">
                {item?.users?.doornumber || "xx xx"}
              </span>
            </div>
          </div>
          <p className="flex items-end gap-1 py-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            +91{" "}
            <span className="tracking-wide">
              {tenentpersonal?.data?.tenantpersonal?.phonenumber ||
                "xxx xxx xxxx"}
            </span>
          </p>
          <div className="flex justify-between items-center">
            <div className="flex flex-col items-start gap-1.5">
              <p className="text-xs">Living from</p>
              <span className="font-semibold text-sm">
                {timestramptodate(
                  tenentpersonal?.data?.tenantpersonal?.startingdate
                )}
              </span>
            </div>
            <div className="flex flex-col font-medium   items-start gap-1.5">
              <button className="bg-[#003f68] p-2 rounded-md">Pay now</button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-3 px-5 sm:px-0">
        <p className="font-medium">Recent History</p>
        <div className="flex flex-col gap-3.5">
          {data?.tenentpayment?.paymentdetail.length > 0 ? (
            data?.tenentpayment?.paymentdetail.map((itm, i) => (
              <div
                className="flex justify-between items-center p-3 w-full border border-[#EAEBEC] rounded-xl bg-white"
                key={i}
              >
                <div className=" flex items-center gap-2">
                  <div>
                    <p>{timestramptodate(itm?.date)}</p>
                    <span className="text-sm capitalize ">house rent</span>
                  </div>
                </div>
                <div className="font-semibold text-[#5ADCA2] text-xl">
                  ₹{itm?.payamount}
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center bg-white p-3 py-6 border border-[#EAEBEC] rounded-xl">
              no found data
            </div>
          )}
        </div>
      </div>
      <div className="px-5 sm:px-0  ">
        <div className="bg-[#F9FDFF] p-4 rounded-xl flex justify-between items-center ">
          <div className="flex flex-col gap-1.5 ">
            <p className="text-[#005995] font-medium">Need Help?</p>
            <span className="text-[#00000070] text-sm">
              Chat with admin for assistence
            </span>
          </div>
          <Link
            href={"tel:+918300119850"}
            className="border border-[#E0F3FE] p-3 rounded-full bg-[#ddf2fd]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="#0095F9"
              stroke="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
// static value
const pendingdetails = [
  { name: "Siva", renttype: "House rent", penddingamount: "12000" },
  { name: "Siva", renttype: "House rent", penddingamount: "12000" },
  { name: "Siva", renttype: "House rent", penddingamount: "12000" },
];

// steps
{
  /* <div className="col-span-2 bg-white flex">
<div className=" w-full h-full ">
  <div className="flex flex-col w-full h-full">
    <span className="h-full w-full bg-[#e0e0e0]"></span>
    <div className="bg-amber-200 w-full h-full flex flex-col overflow-hidden">
      <span className="h-2 w-full bg-gradient-to-b from-[#5d2906] to-[#d77f43]"></span>
      <span className="h-2 w-full bg-gradient-to-b from-[#5d2906] to-[#d77f43]"></span>
      <span className="h-2 w-full bg-gradient-to-b from-[#5d2906] to-[#d77f43]"></span>
      <span className="h-2 w-full bg-gradient-to-b from-[#5d2906] to-[#d77f43]"></span>
      <span className="h-2 w-full bg-gradient-to-b from-[#5d2906] to-[#d77f43]"></span>
      <span className="h-2 w-full bg-gradient-to-b from-[#5d2906] to-[#d77f43]"></span>
      <span className="h-2 w-full bg-gradient-to-b from-[#5d2906] to-[#d77f43]"></span>
      <span className="h-2 w-full bg-gradient-to-b from-[#5d2906] to-[#d77f43]"></span>
      <span className="h-2 w-full bg-gradient-to-b from-[#5d2906] to-[#d77f43]"></span>
      <span className="h-2 w-full bg-gradient-to-b from-[#5d2906] to-[#d77f43]"></span>
    </div>
  </div>
</div>
<div className=" w-full h-full ">
  <div className="flex flex-col w-full h-full">
    <span className="bg-[#054599] w-full h-full"></span>
    <div className=" flex h-full w-full gap-3 bg-[#e0e0e0]"></div>
  </div>
</div>
</div> */
}
