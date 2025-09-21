import { useState, useEffect } from "react";
import ChatMsg from "../components/chat/chatMsg";
import SideChat from "../components/chat/sideChat";
import { useParams } from "react-router-dom";
import NavBar from "../components/navbar/navBar";

interface chat {
  loged: boolean;
  userData: any;
}

const Chat: React.FC<chat> = ({ loged, userData }) => {
  const [selId, setSelId] = useState<string | null>(null);

  let { id } = useParams();

  useEffect(() => {
    if (id) {
      setSelId(id);
    }
  }, [id]);

  return (
    <div className="h-screen flex flex-col overflow-clip">
      <NavBar loged={loged} userData={userData} />
      <div className="grid grid-cols-7 flex-1">
        <SideChat userData={userData} selId={selId} setSelId={setSelId} />
        <ChatMsg selId={selId} userData={userData} />
      </div>
    </div>
  );
};

export default Chat;
