import React from "react";

interface SearchDropdownProps {
  searchResults: string[];
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({ searchResults }) => {
  const redirectToSearch = (cat: string) => {
    window.location.href = `/search/${encodeURIComponent(cat)}`;
  };

  return (
    <div className="absolute z-10 shadow-xl border w-full divide-y border-gray-300 rounded-md bg-white max-h-60 overflow-y-scroll">
      {searchResults?.map((cat, i) => (
        <div
          className="py-2 px-4 flex items-center gap-8 hover:bg-gray-200 cursor-pointer"
          key={i}
          onClick={() => redirectToSearch(cat)}
        >
          <p>{cat}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchDropdown;
