import { ChangeEvent, useEffect, useState } from "react";
import catData from "../../catData.json";
import SearchDropdown from "./searchDropdown";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HomeSearch: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [searchResults, setSearchResult] = useState<any[]>([]);
  const navigate = useNavigate();

  const allServices = Object.values(catData).flatMap(
    (categoryServices) => categoryServices,
  );

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      const firstResult = searchResults[0];
      window.location.href = `/search/${encodeURIComponent(firstResult)}`;
    } else {
      console.log("here:", query);
      console.log("nothing");
    }
  };

  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setQuery(inputValue);

    const results = allServices.filter((service) =>
      service.toLowerCase().includes(inputValue.toLowerCase()),
    );
    setSearchResult(results);
  };

  useEffect(() => {
    axios.get("http://localhost:3001/getcategories");
  });

  return (
    <form className="flex items-center mt-5" onSubmit={submitHandler}>
      <div className="relative w-full">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-3 h-3 text-gray-800"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 8 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
            />
          </svg>
        </div>
        <input
          type="text"
          id="voice-search"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
        focus:ring-gray-900 focus:border-gray-800 block w-full ps-10 py-2.5"
          placeholder="Qu'y a-t-il sur votre liste de choses à faire ?"
          required
          autoComplete="off"
          onChange={handleQuery}
        />

        {query !== "" && searchResults?.length > 0 && (
          <SearchDropdown searchResults={searchResults} />
        )}
      </div>

      {/* <button
        type="submit"
        className="inline-flex items-center px-3 ms-2 text-sm font-medium text-white 
      bg-gray-800 rounded-lg border hover:bg-gray-700 ring-0 focus:outline-none focus:ring-blue-300"
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => e.preventDefault()}
      >
        <svg
          className="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </button> */}
    </form>
  );
};

export default HomeSearch;
