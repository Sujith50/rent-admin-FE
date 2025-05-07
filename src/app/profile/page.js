"use client";
import { USER_DATA } from "@/graphql/query";
import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import avatar from "@/Assets/avatar.jpg";
import Image from "next/image";
import Link from "next/link";

// function Page() {
//   const { data, loading } = useQuery(USER_DATA);
//   const [surePopup, setsurePopup] = useState(false);
//   const handleloggedout = () => {
//     localStorage.removeItem("istenant");
//     window.location.reload();
//     setsurePopup(false);
//   };

//   return (
//     <div className="relative px-4 py-5 flex flex-col justify-between h-[calc(100dvh-81px)]">
//       <div>
//         <h2 className="text-xl font-medium">Profile</h2>
//         <div className="mt-2 flex flex-col gap-3">
//           <div className="relative w-full flex flex-col gap-2">
//             <h3 className="">Name</h3>
//             <div className="p-2 border rounded border-[#343454] font-medium">
//               {data?.users?.username || "Username"}
//             </div>
//           </div>
//           <div className="relative w-full flex flex-col gap-2">
//             <h3 className="">Email</h3>
//             <div className="p-2 border rounded border-[#343454] font-medium">
//               {data?.users?.useremail || "sample@gamil.com"}
//             </div>
//           </div>
//           <div className="relative w-full flex flex-col gap-2">
//             <h3 className="">Phone Number</h3>
//             <div className="p-2 border rounded border-[#343454] font-medium">
//               {data?.users?.phoneno || "xxx xxx xxxx"}
//             </div>
//           </div>
//         </div>
//       </div>
//       <div onClick={() => setsurePopup(true)}>Log out?</div>
//       {surePopup && (
//         <div className="fixed left-0 top-0 bg-[#ffffff1e] flex justify-center items-center w-dvw h-dvh ">
//           <div className="bg-[#0f0f0f] w-[70%] max-w-[350px] rounded flex flex-col gap-5 p-4">
//             <p className="text-lg font-medium">Are you Sure want to Logout?</p>
//             <div className="flex gap-3">
//               <button
//                 className="w-full bg-gray-700 p-2 rounded "
//                 onClick={() => setsurePopup(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="w-full bg-[#7c71f5] p-2 rounded"
//                 onClick={handleloggedout}
//               >
//                 Yes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

function Page() {
  const { data, loading } = useQuery(USER_DATA);
  const [surePopup, setsurePopup] = useState(false);
  const [edit, setedit] = useState(false);
  const handleloggedout = () => {
    localStorage.removeItem("istenant");
    window.location.reload();
    setsurePopup(false);
  };

  return (
    <div className="h-[100vh] bodyclr flex flex-col gap-9">
      <div className=" w-full flex flex-col gap-9 ">
        <div className="px-5 sm:px-0 topprimary h-fit pt-8 pb-5 w-full rounded-b-3xl">
          <h2 className="font-semibold text-xl textprimary">Profile</h2>
          <span className="text-sm font-medium textsecondary">Settings</span>
        </div>
        {loading ? (
          <div className="min-h-[60dvh] flex justify-center items-center w-full">
            Loading...
          </div>
        ) : (
          <div className=" mt-2 flex flex-col gap-3 px-5">
            <div className="mx-auto flex flex-col gap-2">
              <Image
                src={avatar}
                width={1024}
                height={1024}
                alt="avatarimage"
                className="aspect-square w-28 rounded-full object-cover"
              />
              <p className="text-center font-medium text-[#005995]">
                {data?.users?.name || "Username"}
              </p>
            </div>
            {/* <div className="flex flex-col gap-3 bg-white p-3 rounded-2xl">
              <div className="relative w-full flex flex-col gap-2">
                <h3 className="text-[#005995] font-medium">Email</h3>
                <div className="p-2 border rounded border-[#00000030] text-[#00000090] font-medium">
                  {data?.users?.email || "sample@gamil.com"}
                </div>
              </div>
              <div className="relative w-full flex flex-col gap-2">
                <h3 className="text-[#005995] font-medium">Phone Number</h3>
                <div className="p-2 border rounded border-[#00000030] text-[#00000090] font-medium">
                  {data?.users?.phonenumber || "xxx xxx xxxx"}
                </div>
              </div>
              <div className="text-[#005995] flex justify-end font-medium">
                <button className="w-fit" onClick={() => setedit(true)}>
                  Edit
                </button>
              </div>
            </div> */}
            <div className="flex flex-col gap-1 bg-white rounded-2xl overflow-hidden">
              <button
                onClick={() => setedit(true)}
                className="p-4 flex gap-3 items-center active:bg-[#f1ecec56]"
              >
                <span className="p-3 bg-[#00599526] rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#005995"
                  >
                    <path d="M280-400q-33 0-56.5-23.5T200-480q0-33 23.5-56.5T280-560q33 0 56.5 23.5T360-480q0 33-23.5 56.5T280-400Zm0 160q-100 0-170-70T40-480q0-100 70-170t170-70q67 0 121.5 33t86.5 87h352l120 120-180 180-80-60-80 60-85-60h-47q-32 54-86.5 87T280-240Zm0-80q56 0 98.5-34t56.5-86h125l58 41 82-61 71 55 75-75-40-40H435q-14-52-56.5-86T280-640q-66 0-113 47t-47 113q0 66 47 113t113 47Z" />
                  </svg>
                </span>
                <p className="flex flex-col items-start gap-0">
                  <span className="font-medium text-[#005995]">Account</span>
                  <span className="text-sm">
                    privacy,security,change number
                  </span>
                </p>
              </button>
              <Link
                href={"#"}
                className="p-4 flex gap-3 items-center active:bg-[#f1ecec56]"
              >
                <span className="p-3 bg-[#00599526] rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#005995"
                  >
                    <path d="M478-240q21 0 35.5-14.5T528-290q0-21-14.5-35.5T478-340q-21 0-35.5 14.5T428-290q0 21 14.5 35.5T478-240Zm-36-154h74q0-33 7.5-52t42.5-52q26-26 41-49.5t15-56.5q0-56-41-86t-97-30q-57 0-92.5 30T342-618l66 26q5-18 22.5-39t53.5-21q32 0 48 17.5t16 38.5q0 20-12 37.5T506-526q-44 39-54 59t-10 73Zm38 314q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
                  </svg>
                </span>
                <p className="flex flex-col gap-0">
                  <span className="font-medium text-[#005995]">Help</span>
                  <span className="text-sm">contact us,privacy policy</span>
                </p>
              </Link>{" "}
              <Link
                href={"#"}
                className="p-4 flex gap-3 items-center active:bg-[#f1ecec56]"
              >
                <span className="p-3 bg-[#00599526] rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#005995"
                  >
                    <path d="M482-160q-134 0-228-93t-94-227v-7l-64 64-56-56 160-160 160 160-56 56-64-64v7q0 100 70.5 170T482-240q26 0 51-6t49-18l60 60q-38 22-78 33t-82 11Zm278-161L600-481l56-56 64 64v-7q0-100-70.5-170T478-720q-26 0-51 6t-49 18l-60-60q38-22 78-33t82-11q134 0 228 93t94 227v7l64-64 56 56-160 160Z" />
                  </svg>
                </span>
                <p className="flex flex-col gap-0">
                  <span className="font-medium text-[#005995]">
                    Storage and data
                  </span>
                  <span className="text-sm">storage usage</span>
                </p>
              </Link>
              <button
                onClick={() => setsurePopup(true)}
                className="p-4 flex gap-3 items-center active:bg-[#f1ecec56]"
              >
                <span className="p-3 bg-[#00599526] rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="#005995"
                  >
                    <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z" />
                  </svg>
                </span>
                <p className="flex flex-col gap-0 items-start">
                  <span className="font-medium text-[#005995]">Logout</span>
                  <span className="text-sm">logout from webpage</span>
                </p>
              </button>
            </div>
          </div>
        )}
      </div>
      {/* <button
       
        className="mx-5  w-fit cursor-pointer font-medium"
      >
        Log out?
      </button> */}
      <div
        className={`${
          edit ? "h-dvh" : "h-0"
        } fixed left-0 bottom-0 w-full z-50 duration-150`}
      >
        {data && <Edit setedit={setedit} data={data} />}
      </div>
      {(surePopup || edit) && (
        <div className="fixed left-0 top-0 bg-[#00000041] flex justify-center items-center w-dvw h-dvh " />
      )}
      <div
        className={`${
          surePopup ? "max-h-[500px] p-5" : "max-h-0"
        } overflow-hidden fixed left-0 bottom-0 w-full z-50 duration-150 bg-white  flex flex-col gap-3`}
      >
        <p className="text-lg font-medium">Are you Sure want to Logout?</p>
        <div className="flex gap-3 text-[#ffffff]">
          <button
            className="w-full bg-[#b9b9b9] font-medium text-[#101010] p-2 rounded "
            onClick={() => setsurePopup(false)}
          >
            Cancel
          </button>
          <button
            className="w-full bg-[#1abc9c] font-medium p-2 rounded"
            onClick={handleloggedout}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}
export default Page;

export function Edit({ setedit, data }) {
  const [editable, seteditable] = useState(false);
  const [updatedname, setupdatedname] = useState(
    data?.users?.phonenumber ? data?.users?.name : ""
  );
  const [updatedemail, setupdatedemail] = useState(
    data?.users?.phonenumber ? data?.users?.email : ""
  );
  const [updatedphonenumber, setupdatedphonenumber] = useState(
    data?.users?.phonenumber ? data?.users?.phonenumber : ""
  );
  const handlecancel = () => {
    setedit(false);
    seteditable(false);
    setupdatedphonenumber(
      data?.users?.phonenumber ? data?.users?.phonenumber : ""
    );
    setupdatedemail(data?.users?.email ? data?.users?.email : "");
    setupdatedname(data?.users?.name ? data?.users?.name : "");
  };
  return (
    <section className="h-dvh w-full flex flex-col justify-between bg-white p-5">
      <div className="flex flex-col gap-3  ">
        <div className="mx-auto flex flex-col gap-2">
          <Image
            src={avatar}
            width={1024}
            height={1024}
            alt="avatarimage"
            className="aspect-square w-28 rounded-full object-cover"
          />
          <p className="text-center font-medium text-[#005995]">
            {data?.users?.name || "Username"}
          </p>
        </div>
        <div className="relative w-full flex flex-col gap-2">
          <h3 className="text-[#005995] font-medium">Name</h3>
          <input
            type="text"
            value={updatedname}
            onChange={(e) => setupdatedname(e.target.value)}
            readOnly={editable ? false : true}
            className="p-2 border rounded border-[#00000030] text-[#00000090] font-medium outline-0"
          />
        </div>
        <div className="relative w-full flex flex-col gap-2">
          <h3 className="text-[#005995] font-medium">Email</h3>
          <input
            type="text"
            value={updatedemail}
            onChange={(e) => setupdatedemail(e.target.value)}
            readOnly={editable ? false : true}
            className="p-2 border rounded border-[#00000030] text-[#00000090] font-medium outline-0"
          />
        </div>
        <div className="relative w-full flex flex-col gap-2">
          <h3 className="text-[#005995] font-medium">Phone Number</h3>
          <input
            type="text"
            value={updatedphonenumber}
            readOnly={editable ? false : true}
            onChange={(e) => setupdatedphonenumber(e.target.value)}
            className="p-2 border rounded border-[#00000030] text-[#00000090] font-medium outline-0"
          />
        </div>
      </div>
      <div className="flex  font-medium gap-3 mt-3">
        <button
          className="w-full bg-[#b9b9b9] rounded p-2"
          onClick={handlecancel}
        >
          Cancel
        </button>
        {editable ? (
          <button className="w-full bg-[#2c3e50] textprimary rounded p-2">
            Update
          </button>
        ) : (
          <button
            className="w-full bg-[#2c3e50] textprimary rounded p-2"
            onClick={() => seteditable(true)}
          >
            Edit
          </button>
        )}
      </div>
    </section>
  );
}
// const data = { name: "Admin", email: "ass@gmail.com", phoneno: "70050484" };
