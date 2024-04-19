import CityAutoSearch from "./cityAutoSearch";
import DescCat from "./descCat";

interface searchBar {
  autoCity: string;
  setSelCity: (e: string) => void;
  selCity: string;
  searchQuery: string | undefined;
  setSearchQuery: (e: string) => void;
}

const SearchBar: React.FC<searchBar> = ({
  selCity,
  setSelCity,
  setSearchQuery,
  searchQuery,
}) => {
  const searchSvg = (
    <svg
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      aria-hidden="true"
      className="w-5 h-5 text-gray-500 "
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <DescCat />

      <div className="w-full mb-6">
        <div
          className="flex flex-col items-center justify-between p-4 border
        border-gray-200 rounded-lg bg-gray-50 lg:flex-row"
        >
          <div className="flex-shrink-0 w-full lg:w-auto lg:flex">
            <div className="relative flex-shrink-0 w-full mb-4 lg:mb-0 lg:mr-5 lg:w-64 xl:w-96">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                {searchSvg}
              </div>
              <input
                type="text"
                className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg
                focus:ring-gray-800 focus:border-gray-700 block w-full pl-10 p-2.5 py-2.5"
                placeholder="Chercher par mots clés"
                defaultValue={searchQuery}
                onChange={changeHandler}
              />
            </div>
            <div className="min-w-[260px] lg:mr-5 mb-3 lg:mb-0">
              <CityAutoSearch selCity={selCity} setSelCity={setSelCity} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
