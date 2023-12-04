import SearchBar from "./searchBar";
import SideFilter from "./sideFilter";

interface searchFilterP {
  selectedCatP: number;
  setSelectedCatP: (i: number) => void;
  typeCatP: number;
  setTypeCat: (i: number) => void;
}

const SearchFilter: React.FC<searchFilterP> = (p) => {
  return (
    <div className=" mx-auto px-5">
      <SearchBar
        selectedCatP={p.selectedCatP}
        setSelectedCatP={p.setSelectedCatP}
      />
      <SideFilter typeCatP={p.typeCatP} setTypeCat={p.setTypeCat} />
    </div>
  );
};

export default SearchFilter;
