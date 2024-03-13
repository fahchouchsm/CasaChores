import { useState } from "react";
import HeroSearch from "../components/heroSearch/heroSearch";
import NavBar from "../components/navbar/navBar";

interface home {
  loged: boolean;
  userData: any;
}

const Home: React.FC<home> = ({ userData, loged }) => {
  const [typeSelc, setTypeSelc] = useState<number>(0);

  return (
    <>
      <div className="flex flex-col h-screen">
        <NavBar loged={loged} userData={userData} />
        <HeroSearch
          typeSelc={typeSelc}
          setTypeSelc={setTypeSelc}
          userData={userData}
          loged={loged}
        />
      </div>
      {/* <div className="flex-shrink-0 bg-blue-300">
        <h1>hamid lamba</h1>
      </div> */}
    </>
  );
};

export default Home;
