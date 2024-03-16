import React, { ChangeEvent, useEffect, useState } from "react";
import catData from "../../catData.json";
import SearchDropdown from "./searchDropdown";
import axios from "axios";

const HomeSearch: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [searchResults, setSearchResult] = useState<any[]>([]);

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
    const fetchData = async () => {
      try {
        const result = await axios.get(
          "http://localhost:3001/get/posts/categorys",
        );
        setSearchResult(
          result.data.catP
            .map((sub: any) => {
              return sub.sub;
            })
            .flat(),
        );
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

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
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-800 block w-full ps-10 py-2.5"
          placeholder="Qu'y a-t-il sur votre liste de choses à faire ?"
          required
          autoComplete="off"
          onChange={handleQuery}
        />

        {query !== "" && searchResults?.length > 0 && (
          <SearchDropdown searchResults={searchResults} />
        )}
      </div>
    </form>
  );
};

export default HomeSearch;
