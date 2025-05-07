"use client";

import { REPLY_ISSUES } from "@/graphql/mutation";
import { GET_ISSUES, USER_DATA } from "@/graphql/query";
import { useMutation, useQuery } from "@apollo/client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Chats() {
  const [issueid, setissueid] = useState("");
  const [commentvalue, setcommentvalue] = useState("");
  const [timeSet, settimeSet] = useState("");
  const [Error, setError] = useState("");
  const pathname = usePathname().split("/");
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
  const [ReplyIssues] = useMutation(REPLY_ISSUES);
  const { data, loading, refetch } = useQuery(GET_ISSUES);
  const users = useQuery(USER_DATA);

  const filterdata = data?.getIssues?.find((itm) =>
    itm?.issues?.find((itms) => itms?.uuid === pathname[2])
  );
  console.log(filterdata);
  const handleaddcomment = async () => {
    try {
      const document = {
        answer: commentvalue,
        questionuuid: pathname[2],
      };
      await ReplyIssues({ variables: { input: document } }).then((response) => {
        refetch();
        setcommentvalue("");
      });
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };
  const handleenterbtn = (e) => {
    if (commentvalue && e?.key === "Enter") {
      handleaddcomment();
    }
  };

  useEffect(() => {
    const bottomEl = document.getElementById("bottom-of-chat");
    if (bottomEl) {
      bottomEl.scrollIntoView({ behavior: "smooth" });
      // chatinput.scrollIntoView({ behavior: "smooth" });
    }
  }, [filterdata, commentvalue]);
  useEffect(() => {
    setcommentvalue("");
  }, [issueid]);
  const router = useRouter();
  const handleback = () => {
    router.push("/chats");
  };
  return (
    <div className="h-[100vh] w-full bodyclr flex flex-col overflow-y-scroll bgimage">
      <div className="px-5 sm:px-0 bg-[#075E54] h-fit py-4 w-full flex justify-between fixed left-0 top-0">
        <div>
          <h2 className="font-semibold text-xl textprimary">
            {filterdata?.issues[0]?.question || "question"}
          </h2>
          <span className="text-sm font-medium text-[#ffffff85]">
            {timestramptodate(filterdata?.issues[0]?.date) || "xx/xx/xx"}
          </span>
        </div>
        <button onClick={handleback}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="#ffffff85"
          >
            <path d="m136-80-56-56 264-264H160v-80h320v320h-80v-184L136-80Zm344-400v-320h80v184l264-264 56 56-264 264h184v80H480Z" />
          </svg>
        </button>
      </div>
      <div className="">
        <div className="pt-4 pb-0 flex flex-col gap-4 p-3">
          <div className="h-20"></div>
          {filterdata?.issues[0]?.answer?.map((item, i) => (
            <div key={i}>
              <div
                className={`flex flex-col gap-1.5 ${
                  item?.who === users?.data?.users?.uuid
                    ? "items-end"
                    : "items-start"
                }`}
              >
                <p
                  className={`px-3 py-3 font-medium ${
                    item?.who === users?.data?.users?.uuid
                      ? "bg-violet-500 text-white text-end rounded-2xl rounded-tr-none "
                      : " bg-gray-300 rounded-2xl rounded-tl-none pr-5"
                  }`}
                >
                  {item?.ans}
                </p>
                <span
                  className={`text-xs text-[#797C7B]  ${
                    item?.who !== users?.data?.users?.uuid ? "text-end " : "  "
                  }`}
                >
                  {timestramptodate(item?.date)}
                </span>
              </div>
            </div>
          ))}
          <div id="bottom-of-chat" className="h-12" />
        </div>
        <div className="w-full bg-[#f1ecec] fixed left-0 bottom-0 h-14">
          <div className={` items-center gap-1 px-3 py-1 flex`}>
            <input
              value={commentvalue}
              name="addcomment"
              placeholder="reply..."
              // id="chatinput"
              onChange={(e) => setcommentvalue(e.target.value)}
              className="w-full bg-[#ffffff] outline-0 p-2.5 ps-5 rounded-3xl"
              onKeyDown={handleenterbtn}
            />
            <button
              className={`flex justify-center items-center right-0  h-full duration-150 rounded-full bg-[#1abc9c] overflow-hidden ${
                commentvalue ? "min-w-12 w-12 aspect-square" : "w-0 min-w-0"
              }`}
              onClick={handleaddcomment}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#ffffff"
              >
                <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

//    {itm?.answer?.length > 0 ? (
//   <div className="py-4 flex flex-col gap-4 p-3 bg-white h-full mb-1">
//   {itm?.answer?.map((itms, ind) => (
//     <div
//       className={`flex flex-col ${
//         itms?.who === users?.data?.users?.uuid
//           ? "items-end"
//           : "items-start"
//       }`}
//       key={ind}
//     >
//       <div
//         className={`flex flex-col gap-1.5 ${
//           itms?.who === users?.data?.users?.uuid
//             ? " items-end"
//             : "items-start"
//         }`}
//       >
//         <p
//           className={`px-3 py-3 font-medium ${
//             itms?.who === users?.data?.users?.uuid
//               ? "bg-violet-500 text-white text-end rounded-2xl rounded-tr-none "
//               : " bg-gray-300 rounded-2xl rounded-tl-none pr-5"
//           }`}
//         >
//           {itms?.ans}
//         </p>
// <span
//   className={`text-xs text-[#797C7B]  ${
//     itms?.who !== users?.data?.users?.uuid
//       ? "text-end "
//       : "  "
//   }`}
// >
//   {timestramptodate(itms?.date)}
// </span>
//       </div>
//     </div>
//   ))}
//   <div id="bottom-of-chat" />
// </div>
// ) : (
// <div>
//   <p className="text-center">no reply yet!</p>
// </div>
// )}
{
  /* <div className="fixed bottom-0 w-full bg-green-100  ">
<div
  className={` items-center gap-1 p-3  pt-1 ${
    issueid?.uuid ? "flex mb-10" : "hidden"
  }`}
>
  <input
    value={commentvalue}
    name="addcomment"
    placeholder="reply..."
    id="chatinput"
    onChange={(e) => setcommentvalue(e.target.value)}
    className="w-full border border-[#00000030] bg-white outline-0 p-2.5 ps-5 rounded-3xl"
    onKeyDown={handleenterbtn}
  />
  <button
    className={` flex justify-center items-center right-0  h-full duration-150 rounded-full bg-[#8e52ff] overflow-hidden ${
      commentvalue
        ? "min-w-12 w-12 aspect-square"
        : "w-0 min-w-0"
    }`}
    onClick={handleaddcomment}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#ffffff"
    >
      <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
    </svg>
  </button>
</div>
<div className="h-20"></div>
</div> */
}
