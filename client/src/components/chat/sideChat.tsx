import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../pages/loading";
import SideChatSearch from "./sideChatSearch";
import SideChatUsers from "./sideChatUsers";

interface sideChat {
  userData: any;
  selId: string | null;
  setSelId: (e: string | null) => void;
}

const SideChat: React.FC<sideChat> = ({ userData, selId, setSelId }) => {
  const searchSvg = (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      aria-hidden="true"
      className="w-5 h-5 text-gray-500"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );

  const [users, setUsers] = useState<any>();
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const fetchData = async () => {
        setLoading(true);
        if (query) {
          const result = await axios.get(
            `http://localhost:3001/chat/get/users/${encodeURIComponent(query)}`,
            { withCredentials: true }
          );
          setUsers(result.data);
          setLoading(false);
        }
      };
      fetchData();
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  }, [query]);

  return (
    <div className="col-span-2 px-3 pt-4 border-r bg-gray-50">
      <div className="relative  w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          {searchSvg}
        </div>
        <input
          type="text"
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-3xl
                focus:ring-gray-800 focus:border-gray-700 block w-full pl-10 p-2.5 py-2.5"
          placeholder="Chercher un utilisateur..."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setQuery(e.target.value);
          }}
        />
      </div>
      {query === "" ? (
        <SideChatUsers userData={userData} setSelId={setSelId} />
      ) : loading ? (
        <Loading />
      ) : (
        <SideChatSearch users={users} selId={selId} setSelId={setSelId} />
      )}
    </div>
  );
};

export default SideChat;
