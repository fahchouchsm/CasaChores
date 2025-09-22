import React, { ChangeEvent, useEffect, useState } from "react";
import SearchDropdown from "./searchDropdown";
import axios from "axios";

const HomeSearch: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [searchResults, setSearchResult] = useState<string[]>([]);
  const [allServices, setAllServices] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          "http://localhost:3001/get/posts/categorys"
        );

        console.log(result.data.catP);
        const concatenatedArray = result.data.catP.reduce(
          (accumulator: any, currentValue: any) => {
            accumulator.push(currentValue.name);
            currentValue.sub.forEach((subCategory: string) => {
              accumulator.push(subCategory);
            });
            return accumulator;
          },
          []
        );
        setAllServices(concatenatedArray);
        setSearchResult(concatenatedArray);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `/search/${encodeURIComponent(query)}`;
  };

  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setQuery(inputValue);

    const results = allServices.filter((service) =>
      service.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSearchResult(results);
  };

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
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-800 block w-8/12 ps-10 py-2.5"
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
