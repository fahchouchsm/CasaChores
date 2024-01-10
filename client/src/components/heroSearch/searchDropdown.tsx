interface searchDropdown {
  searchResults: any[];
}

const SearchDropdown: React.FC<searchDropdown> = ({ searchResults }) => {
  return (
    <div
      className="absolute z-10 shadow-xl border w-full divide-y border-gray-300 rounded-md bg-white max-h-60 overflow-y-scroll
      [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:rounded-full
    [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300"
    >
      {searchResults?.map((cat, i) => (
        <div
          className="py-2 px-4 flex items-center gap-8 hover:bg-gray-200 cursor-pointer "
          key={i}
        >
          <p>{cat}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchDropdown;
