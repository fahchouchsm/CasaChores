import axios from "axios";

interface chatInput {
  msg: string;
  setMsg: (e: string) => void;
  selId: string | null;
  setlastmsg: (e: string) => void;
}

const ChatInput: React.FC<chatInput> = ({ msg, setMsg, selId, setlastmsg }) => {
  const imgSvg = (
    <svg className="w-5 h-5" aria-hidden="true" fill="none" viewBox="0 0 20 18">
      <path
        fill="currentColor"
        d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"
      />
    </svg>
  );
  const fileSvg = (
    <svg
      className="w-5 h-5"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M7 8v8a5 5 0 1 0 10 0V6.5a3.5 3.5 0 1 0-7 0V15a2 2 0 0 0 4 0V8"
      />
    </svg>
  );
  const sendSvg = (
    <svg
      className="w-5 h-5 rotate-90 rtl:-rotate-90"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 18 20"
    >
      <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
    </svg>
  );

  const handleMessageSend = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:3001/chat/send/msg",
        {
          recipientId: selId,
          content: msg,
        },
        { withCredentials: true }
      );
      setlastmsg(msg);
      setMsg("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="row-span-1  bg-white w-full">
      <form onSubmit={handleMessageSend}>
        <div className="flex items-center px-3 py-2 rounded-lg ">
          <button
            type="button"
            className="inline-flex justify-center p-1.5 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 "
          >
            {imgSvg}
          </button>
          <button
            type="button"
            className="p-1.5 text-gray-500 rounded-lg cursor-pointer hover:text-gray-900 hover:bg-gray-100 "
          >
            {fileSvg}
          </button>
          <input
            type="text"
            className="block mr-4 ml-1.5 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300  focus:border-gray-800 focus:ring-0"
            placeholder="Écris quelque chose..."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setMsg(e.target.value);
            }}
            value={msg}
          />
          <button
            type="submit"
            className="inline-flex justify-center p-2 text-gray-700 rounded-full cursor-pointer hover:bg-gray-100"
          >
            {sendSvg}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
