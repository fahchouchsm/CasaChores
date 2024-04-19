import React, { useRef, useEffect, useState } from "react";
import ChatInput from "./chatInput";
import axios from "axios";
import ChatDisplay from "./chatDisplay";

interface ChatMsgProps {
  selId: string | null;
  userData: any[];
}

const ChatMsg: React.FC<ChatMsgProps> = ({ selId, userData }) => {
  const scrollableDivRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollableDivRef.current) {
      scrollableDivRef.current.scrollTop =
        scrollableDivRef.current.scrollHeight;
    }
  };

  const [selUser, setSelUser] = useState<any>();
  const [msg, setMsg] = useState<string>("");
  const [lastmsg, setlastmsg] = useState<string>("");

  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    try {
      if (selId) {
        const fetchData = async () => {
          const result = await axios.get(
            `http://localhost:3001/chat/get/user/${selId}`,
            { withCredentials: true }
          );
          setSelUser(result.data);
        };
        fetchData();
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }, [selId]);

  if (!selId || selId === "") {
    return <></>;
  }

  return (
    <div className="grid grid-rows-5 h-screen col-span-5">
      <div className="row-span-4 h-full relative ">
        <div className="py-3 px-7 h-16  border-b">
          <div className="flex flex-row gap-2 items-center">
            {selUser && selUser.user && (
              <>
                <img
                  src={selUser.user.pfpLink}
                  className="h-10 w-10 object-cover rounded-full mr-4"
                  alt="pfp"
                />
                <div className="text-lg font-medium text-gray-700">
                  {selUser.user.name}
                </div>
                <div className="text-lg font-medium text-gray-700">
                  {selUser.user.lastName}
                </div>
              </>
            )}
          </div>
        </div>
        <div
          ref={scrollableDivRef}
          className="overflow-y-auto p-4 absolute top-16 bottom-0 left-0 right-0"
          style={{ maxHeight: "calc(100% - 4rem)" }}
        >
          <ChatDisplay userData={userData} selId={selId} lastMsg={lastmsg} />
        </div>
      </div>
      <ChatInput
        msg={msg}
        selId={selId}
        setMsg={setMsg}
        setlastmsg={setlastmsg}
      />
    </div>
  );
};

export default ChatMsg;
