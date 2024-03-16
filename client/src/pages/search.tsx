import { useState } from "react";
import SearchFilter from "../components/contentSearch/searchFilter";
import NavBar from "../components/navbar/navBar";
import { useParams } from "react-router-dom";

interface search {
  userData: any;
  loged: boolean;
  autoCity: string;
}

const Search: React.FC<search> = ({ loged, userData, autoCity }) => {
  const [typeCat, setTypeCat] = useState(0);

  let { search } = useParams();

  return (
    <>
      <NavBar loged={loged} userData={userData} />
      <SearchFilter
        search={search}
        autoCity={autoCity}
        typeCat={typeCat}
        setTypeCat={setTypeCat}
      />
    </>
  );
};

export default Search;
