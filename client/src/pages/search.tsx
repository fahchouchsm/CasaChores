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

  const { search } = useParams();

  const [searchQuery, setSearchQuery] = useState<string | undefined>(search);

  return (
    <>
      <NavBar loged={loged} userData={userData} />
      <SearchFilter
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
        autoCity={autoCity}
        typeCat={typeCat}
        setTypeCat={setTypeCat}
      />
    </>
  );
};

export default Search;
