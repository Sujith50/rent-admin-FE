"use client";

import { GET_ISSUES } from "@/graphql/query";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";

export default function Chats() {
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
  const { data, loading, refetch } = useQuery(GET_ISSUES);
  // console.log(data, "dataass");
  const handledoornumer = (item) => {
    const splititem = item?.split("-");
    return `${splititem[splititem.length - 2]}-${
      splititem[splititem.length - 1]
    }`;
  };
  const router = useRouter();
  const handlerouter = (id) => {
    router.push(`/chats/${id}`);
  };
  return (
    <div className="min-h-[100vh] w-full bodyclr flex flex-col gap-9 ">
      <div className="px-5 sm:px-0 topprimary h-fit pt-8 pb-5 w-full rounded-b-3xl">
        <h2 className="font-semibold text-xl textprimary">Tentant Issue !</h2>
        <span className="text-sm font-medium textsecondary">
          Tenant Problems.
        </span>
      </div>
      <div className="px-5">
        <div className="">
          <div className="flex flex-col gap-3 ">
            <p className="font-medium">Your Issues</p>
            {loading ? (
              <div className="h-20 w-full flex justify-center items-center bg-white rounded-2xl">
                Loading...
              </div>
            ) : (
              <div className="flex flex-col gap-0.5 mb-[76px] overflow-y-scroll rounded-2xl bg-white">
                {data?.getIssues?.map((item, index) =>
                  item.issues?.map((itm, i) => (
                    <div
                      key={i}
                      className={`rounded-md overflow-hidden relative`}
                    >
                      <div
                        className={`flex justify-between items-center px-3 p-3 active:bg-[#f1ecec67]
                    `}
                        onClick={() => handlerouter(itm?.uuid)}
                      >
                        <div className="flex flex-col">
                          <p className="flex items-center gap-2 font-medium text-xl text-[#005995]">
                            {itm?.question}
                            <span className="text-xs bg-[#00000020] px-1.5 rounded-4xl">
                              {handledoornumer(item?.roomuuid)}
                            </span>
                          </p>
                          <span className="text-sm font-medium">
                            {timestramptodate(itm?.date) || "xx/xx/xx"}
                          </span>
                        </div>
                        <button className="text-sm font-medium active:bg-[#f1ecec] rounded-full p-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24px"
                            viewBox="0 -960 960 960"
                            width="24px"
                            fill="#2c3e50"
                          >
                            <path d="M120-120v-320h80v184l504-504H520v-80h320v320h-80v-184L256-200h184v80H120Z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
