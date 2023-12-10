import ContentEntreprise from "./content/contentEntreprise";
import ContentPersonnel from "./content/contentPersonnel";
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
    <div className=" mx-auto px-5 mb-5">
      <SearchBar
        selectedCatP={p.selectedCatP}
        setSelectedCatP={p.setSelectedCatP}
      />
      <div className="grid grid-cols-4 gap-5 mt-4">
        <div className="hidden md:block col-span-1">
          <SideFilter typeCatP={p.typeCatP} setTypeCat={p.setTypeCat} />
        </div>
        <div className="md:col-span-3 col-span-4">
          {p.typeCatP === 0 ? <ContentPersonnel /> : <ContentEntreprise />}
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
