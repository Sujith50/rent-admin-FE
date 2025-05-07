"use client";
import { ADD_TENANT, ON_ADDTENENT } from "@/graphql/mutation";
import { GET_TENANT_DET, PERSONAL_PAYMENT, USER_DATA } from "@/graphql/query";
import { useMutation, useQuery } from "@apollo/client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

function Tenents() {
  const [tenantform, settenantform] = useState(true);
  const [conformation, setconformation] = useState(false);
  const [showpop, setshowPop] = useState(false);

  //   house uuid
  const houseuuid = usePathname().split("/")[2];

  const issplitRoom = houseuuid?.split("-");

  const checkroom = issplitRoom[issplitRoom.length - 2];
  const hsenumber = `${checkroom}-${issplitRoom[issplitRoom.length - 1]}`;
  //   times stramp
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
  const [AddTenant] = useMutation(ADD_TENANT);
  const { data, loading } = useQuery(GET_TENANT_DET, {
    variables: { roomuuid: houseuuid },
  });
  const payments = useQuery(PERSONAL_PAYMENT, {
    variables: { uuid: houseuuid },
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
    const totalpaid = item?.paymentdetail?.reduce(
      (sum, itm) => sum + Number(itm?.payamount),
      0
    );
    const totalmonths = totalmonth(Number(data?.roomDetails?.startingdate));

    const totalrentamount =
      totalmonths * Number(data?.roomDetails?.rentpermonth);
    const totalpending = totalrentamount - totalpaid;

    return totalpending;
  };

  // add tenant add add
  const [type, setType] = useState("Select type");
  const [amount, setamount] = useState("");
  const [name, setname] = useState("");
  const [Error, setError] = useState("");
  const [tentphone, settentphone] = useState("");
  const [tentemail, settentemail] = useState("");
  const [livestartdate, setlivestartdate] = useState("");
  const [advancepayement, setadvancepayement] = useState("");
  const [dropdown1Open, setDropdown1Open] = useState(false);
  const [Message, setMessage] = useState("");
  const dropdown1Ref = useRef(null);

  // backend connect

  // useEffect(() => {
  //   settenantform(false);
  // }, [filterroom?.tenantuuid]);

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
    history.back();
  };

  const handlecomformation = () => {
    setconformation(true);
  };

  const handleaddbtn = async () => {
    const timestramp = new Date(livestartdate).getTime().toString();
    if (checkroom === "rooms" || checkroom === "shops") {
      try {
        const type = checkroom === "rooms" ? "room" : "shop";
        const doornumber = `${checkroom}-${
          issplitRoom[issplitRoom.length - 1]
        }`;

        await AddTenant({
          variables: {
            input: {
              type: type.trim(),
              doornumber: doornumber,
              name: name,
              startingdate: timestramp,
              roomuuid: houseuuid,
              rentpermonth: amount.trim(),
              phonenumber: tentphone.trim(),
              email: tentemail.trim(),
              advancepayment: advancepayement.trim(),
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

  const Whatsapp = () => {
    const Phonenumber = `+91${data?.roomDetails?.phonenumber}`;
    const message = `Hello, tennant to click the link and View your rent history ! ! ! 192.168.1.12:3000/forgot-password/${data?.roomDetails?.password}`;
    setshowPop(false);
    window.location.href = `https://wa.me/${Phonenumber}?text=${encodeURIComponent(
      message
    )}`;
  };
  const sendMessage = () => {
    const Phonenumber = `+91${data?.roomDetails?.phonenumber}`;
    const message = `Hello, tennant to click the link and View your rent history ! ! ! 192.168.1.12:3000/forgot-password/${data?.roomDetails?.password}`;
    console.log(message);

    setshowPop(false);
    window.location.href = `sms:${Phonenumber}?body=${encodeURIComponent(
      message
    )}`;
  };
  const userdata = useQuery(USER_DATA);
  console.log(userdata?.data);

  // if (userdata?.data?.users?.role !== "admin") {
  //   return null;
  // }

  return (
    <div className={`${data?.tenantpersonal && "px-4 py-5"} pb-24 bodyclr`}>
      {!loading ? (
        data?.roomDetails ? (
          <div className=" bodyclr min-h-dvh rounded flex flex-col gap-5 relative">
            <div className="px-5 sm:px-0 topprimary flex justify-between pt-8 pb-5 w-full rounded-b-3xl">
              <div>
                <h2 className="font-semibold text-xl textprimary">
                  this{" "}
                  <span className="capitalize">
                    {data?.roomDetails?.name || "Unkown"}
                  </span>
                  !
                </h2>
                <span className="text-sm font-medium textsecondary">
                  From {timestramptodate(data?.roomDetails?.startingdate)}
                </span>
              </div>
              <button onClick={() => setshowPop(true)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#ffffff"
                >
                  <path d="M680-80q-50 0-85-35t-35-85q0-6 3-28L282-392q-16 15-37 23.5t-45 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q24 0 45 8.5t37 23.5l281-164q-2-7-2.5-13.5T560-760q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-24 0-45-8.5T598-672L317-508q2 7 2.5 13.5t.5 14.5q0 8-.5 14.5T317-452l281 164q16-15 37-23.5t45-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-80q17 0 28.5-11.5T720-200q0-17-11.5-28.5T680-240q-17 0-28.5 11.5T640-200q0 17 11.5 28.5T680-160ZM200-440q17 0 28.5-11.5T240-480q0-17-11.5-28.5T200-520q-17 0-28.5 11.5T160-480q0 17 11.5 28.5T200-440Zm480-280q17 0 28.5-11.5T720-760q0-17-11.5-28.5T680-800q-17 0-28.5 11.5T640-760q0 17 11.5 28.5T680-720Zm0 520ZM200-480Zm480-280Z" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col gap-3 px-5 sm:px-0 ">
              <p className="font-medium">Key Card</p>
              <div className="secondarybg  rounded-xl p-3.5 flex flex-col gap-2 text-white">
                <div className="flex justify-between">
                  <div className="flex flex-col gap-2">
                    <p className="text-sm">My Pending</p>
                    <h3 className="font-semibold text-3xl">
                      {data &&
                        (payments?.data?.tenentpayment?.paymentdetail
                          ? `₹ ${totalpendingrent(
                              payments?.data?.tenentpayment
                            )}`
                          : "No Pending")}
                    </h3>
                  </div>
                  <div className="text-sm text-[#ffffffe1]">
                    Doorno :{" "}
                    <span className="font-medium text-white">
                      {data?.roomDetails?.doornumber || "xx xx"}
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
                    {data?.roomDetails?.phonenumber || "xxx xxx xxxx"}
                  </span>
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex flex-col items-start gap-1.5">
                    <p className="text-xs">Living from</p>
                    <span className="font-semibold text-sm">
                      {timestramptodate(data?.roomDetails?.startingdate)}
                    </span>
                  </div>
                  <div className="flex flex-col font-medium   items-start gap-1.5">
                    <button className="bg-[#003f68] p-2 rounded-md">
                      Rent Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3 px-5 sm:px-0">
              <p className="font-medium">Recent History</p>
              <div className="flex flex-col gap-3.5">
                {payments?.data?.tenentpayment?.paymentdetail.length > 0 ? (
                  payments?.data?.tenentpayment?.paymentdetail.map((itm, i) => (
                    <div
                      className="flex justify-between items-center p-3 w-full border border-[#EAEBEC] rounded-xl bg-white"
                      key={i}
                    >
                      <div className=" flex items-center gap-2">
                        <div>
                          <p>{timestramptodate(itm?.date)}</p>
                          <span className="text-sm capitalize ">
                            house rent
                          </span>
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
            {showpop && (
              <div className="flex justify-center items-center w-dvw h-dvh fixed left-0 top-0 bg-[#00000026]">
                <div className="relative w-[100%] max-w-[180px]">
                  <div className="flex justify-end p-1 absolute -top-5 -right-5">
                    <button
                      className="bg-gray-100 rounded-full cursor-pointer"
                      onClick={() => setshowPop(false)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="18px"
                        viewBox="0 -960 960 960"
                        width="18px"
                        fill="#000000"
                      >
                        <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                      </svg>
                    </button>
                  </div>
                  {data?.roomDetails?.phonenumber && (
                    <div className="bg-white  rounded font-medium flex flex-col overflow-hidden drop-shadow-2xl w-full relative">
                      <button
                        className="flex gap-2 justify-between cursor-pointer hover:bg-gray-100 px-5 py-3"
                        onClick={Whatsapp}
                      >
                        Whatsapp{" "}
                        <span className="bg-green-400 rounded ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="#fff"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M18.403 5.633A8.919 8.919 0 0 0 12.053 3c-4.948 0-8.976 4.027-8.978 8.977 0 1.582.413 3.126 1.198 4.488L3 21.116l4.759-1.249a8.981 8.981 0 0 0 4.29 1.093h.004c4.947 0 8.975-4.027 8.977-8.977a8.926 8.926 0 0 0-2.627-6.35m-6.35 13.812h-.003a7.446 7.446 0 0 1-3.798-1.041l-.272-.162-2.824.741.753-2.753-.177-.282a7.448 7.448 0 0 1-1.141-3.971c.002-4.114 3.349-7.461 7.465-7.461a7.413 7.413 0 0 1 5.275 2.188 7.42 7.42 0 0 1 2.183 5.279c-.002 4.114-3.349 7.462-7.461 7.462m4.093-5.589c-.225-.113-1.327-.655-1.533-.73-.205-.075-.354-.112-.504.112s-.58.729-.711.879-.262.168-.486.056-.947-.349-1.804-1.113c-.667-.595-1.117-1.329-1.248-1.554s-.014-.346.099-.458c.101-.1.224-.262.336-.393.112-.131.149-.224.224-.374s.038-.281-.019-.393c-.056-.113-.505-1.217-.692-1.666-.181-.435-.366-.377-.504-.383a9.65 9.65 0 0 0-.429-.008.826.826 0 0 0-.599.28c-.206.225-.785.767-.785 1.871s.804 2.171.916 2.321c.112.15 1.582 2.415 3.832 3.387.536.231.954.369 1.279.473.537.171 1.026.146 1.413.089.431-.064 1.327-.542 1.514-1.066.187-.524.187-.973.131-1.067-.056-.094-.207-.151-.43-.263"
                            ></path>
                          </svg>
                        </span>
                      </button>
                      <button
                        className="flex gap-2 justify-between cursor-pointer hover:bg-gray-100 px-5 py-3"
                        onClick={sendMessage}
                      >
                        Message{" "}
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#000"
                          >
                            <path d="M240-400h320v-80H240v80Zm0-120h480v-80H240v80Zm0-120h480v-80H240v80ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Zm126-240h594v-480H160v525l46-45Zm-46 0v-480 480Z" />
                          </svg>
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="min-h-dvh  flex flex-col gap-5 blktext ">
            <div className="px-5 sm:px-0 topprimary  pt-8 pb-5 w-full rounded-b-3xl">
              <h2 className="font-semibold text-xl textprimary">
                Hey <span className="capitalize ">tenant</span>!
              </h2>
              <span className="text-sm font-medium textsecondary">
                Live Like a Family
              </span>
            </div>
            <div
              className={`overflow-hidden px-5 duration-150  flex justify-center items-center`}
            >
              <div className="relative bg-white rounded-3xl w-full h-full px-4 py-5">
                <div className="flex flex-col gap-3 max-h-full overflow-y-scroll pb-8 scrollbar-none">
                  <div className="relative w-full flex flex-col gap-2">
                    <h3 className="">House Number</h3>
                    <div className="rounded border border-[#00000029] cursor-pointer flex justify-between items-center min-w-24 ">
                      <p className="p-2">{data?.name || hsenumber}</p>
                    </div>
                  </div>
                  <div className="relative w-full flex flex-col gap-2">
                    <h3 className="">Tentent Name</h3>
                    <div className="rounded border border-[#00000029] cursor-pointer flex justify-between items-center min-w-24 ">
                      <input
                        inputMode="text"
                        id="tenantname"
                        placeholder="Enter Tentent name"
                        className=" p-2 w-full outline-none"
                        onChange={(e) => setname(e.target.value)}
                        autoComplete="off"
                        value={name}
                      />
                    </div>
                  </div>

                  <div className="relative w-full flex flex-col gap-2">
                    <h3 className="">Tenant Phonenumber</h3>
                    <div className="rounded border border-[#00000029] cursor-pointer flex justify-between items-center min-w-24 ">
                      <input
                        inputMode="numeric"
                        id="tenantphone"
                        placeholder="Enter tenant phonenumber"
                        className=" p-2 w-full outline-none"
                        autoComplete="off"
                        onChange={(e) => settentphone(e.target.value)}
                        value={tentphone}
                        maxLength={10}
                      />
                    </div>
                  </div>
                  <div className="relative w-full flex flex-col gap-2">
                    <h3 className="">
                      Tentent Email{" "}
                      {/* <span className="font-medium text-sm">(*optional)</span> */}
                    </h3>
                    <div className="rounded border border-[#00000029] cursor-pointer flex justify-between items-center min-w-24 ">
                      <input
                        inputMode="email"
                        id="tenantemail"
                        placeholder="Enter Tentent name"
                        className=" p-2 w-full outline-none"
                        autoComplete="off"
                        onChange={(e) =>
                          settentemail(e.target.value.toLocaleLowerCase())
                        }
                        value={tentemail}
                      />
                    </div>
                  </div>
                  <div className="relative w-full flex flex-col gap-2">
                    <h3 className="">Tenant Live From</h3>
                    <div className="rounded border border-[#00000029] cursor-pointer flex justify-between items-center min-w-24 ">
                      <input
                        // inputMode=""
                        type="date"
                        id="tenantstartdate"
                        className=" p-2 w-full outline-none"
                        autoComplete="off"
                        onChange={(e) => setlivestartdate(e.target.value)}
                        value={livestartdate}
                        maxLength={10}
                      />
                    </div>
                  </div>
                  <div className="relative w-full flex flex-col gap-2">
                    <h3 className="">Advance Amount</h3>
                    <div className="rounded border border-[#00000029] cursor-pointer flex justify-between items-center min-w-24 ">
                      <input
                        inputMode="numeric"
                        id="advancepayment"
                        placeholder="Enter advance payment"
                        className=" p-2 w-full outline-none"
                        autoComplete="off"
                        onChange={(e) => setadvancepayement(e.target.value)}
                        value={advancepayement}
                      />
                    </div>
                  </div>
                  <div className="relative w-full flex flex-col gap-2">
                    <h3 className="">Rent Amount</h3>
                    <div className="rounded border border-[#00000029] cursor-pointer flex justify-between items-center min-w-24 ">
                      <input
                        inputMode="numeric"
                        id="rentpermonth"
                        placeholder="Enter rent amount in Rs"
                        className=" p-2 w-full outline-none"
                        autoComplete="off"
                        onChange={handleChange}
                        value={amount}
                      />
                    </div>
                  </div>
                  {Error && (
                    <p className="font-medium text-sm text-red-600">
                      *{Error}*
                    </p>
                  )}
                </div>
                <div className=" bottom-3 left-0 w-full flex justify-between gap-3">
                  {/* <button
                  className="flex-1 p-2 bg-gray-600 text-white ms-3 cursor-pointer rounded"
                  onClick={handlecanceladd}
                >
                  Cancel
                </button> */}
                  <button
                    className="flex-1 p-2 bg-green-600 text-white me-3 cursor-pointer rounded font-medium"
                    onClick={handlecomformation}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
            {/* tenant*/}
            {conformation && (
              <div className="flex justify-center z-20 items-center bg-[#4646463c] w-dvw h-dvh fixed left-0 top-0">
                <div className="border border-[#9c9c9c] bg-[#ffffff] p-4 rounded flex flex-col gap-3 max-w-[250px]">
                  <p>Are you sure want to add tenant?</p>
                  <div className="flex gap-2">
                    <button
                      className="bg-gray-600 text-white flex-1 rounded p-1 cursor-pointer"
                      onClick={() => setconformation(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-green-600 text-white flex-1 rounded p-1 cursor-pointer"
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
            {/* {!tenantform && (
            <button
              className="fixed bottom-[8%] right-[12%] cursor-pointer bg-white text-black w-14 h-14 rounded-full flex flex-col items-center justify-center gap-0"
              onClick={() => settenantform(true)}
            >
              <span className="text-sm font-semibold leading-3">Add</span>
              <span className="text-xs">tenant</span>
            </button>
          )} */}
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
const types = ["All", "shop", "house"];
