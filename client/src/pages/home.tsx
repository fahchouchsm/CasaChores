import { useState } from "react";
import HeroSearch from "../components/heroSearch/heroSearch";
import NavBar from "../components/navbar/navBar";

interface homeP {
  logedP: boolean;
  setLogedP: (i: boolean) => void;
  userDataP: any;
  loadingP: boolean;
  setLoadingP: (i: boolean) => void;
}

const Home: React.FC<homeP> = (p) => {
  const [typeSelc, setTypeSelc] = useState<number>(0);

  return (
    <>
      <div className="flex flex-col h-screen">
        <NavBar />
        <HeroSearch typeSelc={typeSelc} setTypeSelc={setTypeSelc} />
      </div>
      <div className="flex-shrink-0 bg-blue-300">
        {/* <h1>hamid lamba</h1> */}
      </div>
    </>
  );
};

export default Home;
