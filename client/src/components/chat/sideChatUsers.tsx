import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../pages/loading";

interface SideChatUsersProps {
  userData: any;
  setSelId: (e: string | null) => void;
}

interface Chat {
  participants: any[];
  lastMessage: {
    timestamp: string;
    content: string;
  } | null;
}

const SideChatUsers: React.FC<SideChatUsersProps> = ({
  userData,
  setSelId,
}) => {
  const [chatUsers, setChatUsers] = useState<Chat[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchChatUsers = async () => {
      try {
        setLoading(true);
        const response = await axios.post(
          "http://localhost:3001/chat/get/history",
          {},
          { withCredentials: true }
        );

        setChatUsers(response.data.chats);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching chat users:", error);
      }
    };

    fetchChatUsers();
  }, []);

  const handleClick = (otherUserId: string) => {
    setSelId(otherUserId);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="mt-8">
      {chatUsers.map((user, i) => (
        <div
          key={i}
          className="grid grid-cols-8 gap-x-2 w-full h-auto py-2 pr-2 rounded-lg hover:bg-gray-100 hover:cursor-pointer"
          onClick={() => {
            const otherUserId =
              user.participants[0]._id === userData._id
                ? user.participants[1]._id
                : user.participants[0]._id;
            handleClick(otherUserId);
          }}
        >
          <div className="col-span-2 flex items-center justify-center">
            <img
              className="h-16 w-16 object-cover rounded-full"
              src={
                user.participants[0]._id === userData._id
                  ? user.participants[1].pfpLink
                  : user.participants[0].pfpLink
              }
              alt={"pfp"}
            />
          </div>
          <div className="col-span-6">
            <div className="flex items-center mb-1">
              <div className="text-sm">
                {user.participants[0]._id === userData._id
                  ? `${user.participants[1].name} ${user.participants[1].lastName}`
                  : `${user.participants[0].name} ${user.participants[0].lastName}`}
              </div>{" "}
              {user.lastMessage && (
                <div className="text-gray-400 text-xs ml-auto">
                  {new Date(user.lastMessage.timestamp).toLocaleDateString()}
                </div>
              )}
            </div>
            <div className="text-sm text-gray-500 ">
              <div className="flex-grow overflow-hidden whitespace-nowrap overflow-ellipsis">
                {user.lastMessage ? user.lastMessage.content : "Pas de message"}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SideChatUsers;
