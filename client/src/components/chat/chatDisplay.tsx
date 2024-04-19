import axios from "axios";
import { useEffect, useState, useRef } from "react";

interface ChatDisplayProps {
  userData: any;
  selId: string | null;
  lastMsg: string;
}

const ChatDisplay: React.FC<ChatDisplayProps> = ({
  userData,
  selId,
  lastMsg,
}) => {
  const [chatHistory, setChatHistory] = useState<any[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        if (selId) {
          const response = await axios.get(
            `http://localhost:3001/chat/get/history/${selId}`,
            { withCredentials: true }
          );
          setChatHistory(response.data.chat.messages);
        }
      } catch (error) {
        console.error("Error fetching chat history:", error);
      }
    };
    fetchChatHistory();
  }, [selId, lastMsg]);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const scrollToBottom = () => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="text-sm">
      {chatHistory.map((message, i) => (
        <div className="flex my-3" key={i}>
          {message.sender._id !== userData._id && (
            <img
              src="http://localhost:3001/uploads/pfp/66013d3f4667d883d611758a-2024-03-25T09-18-26.911Z-PFP-Designer (3).jpeg"
              className="h-8 mr-2 w-8 object-cover rounded-full mt-auto"
              alt="pfp"
            />
          )}
          <div
            className={` w-fit rounded-t-2xl p-2.5 ${
              message.sender._id === userData._id
                ? "ml-auto text-right rounded-s-2xl bg-slate-700"
                : "mr-auto text-left rounded-e-2xl bg-green-700"
            }`}
          >
            <div className="text-white">{message.content}</div>
            <div className="text-gray-400" style={{ fontSize: "0.65rem" }}>
              {new Date(message.timestamp).toLocaleString([], {
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
          {message.sender._id === userData._id && (
            <img
              src={userData.pfpLink}
              className="h-8 ml-2 w-8 object-cover rounded-full mt-auto"
              alt="pfp"
            />
          )}
        </div>
      ))}
      <div ref={chatEndRef}></div>
    </div>
  );
};

export default ChatDisplay;
