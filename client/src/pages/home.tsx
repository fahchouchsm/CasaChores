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
    </>
  );
};

export default Home;
