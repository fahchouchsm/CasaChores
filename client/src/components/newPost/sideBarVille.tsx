import axios from "axios";
import _ from "lodash";
import { useState, useEffect } from "react";
import Loading from "../../pages/loading";

interface sideBarVille {
  citySearch: string;
  setCitySearch: (e: string) => void;
  setCity: (e: string) => void;
  setOpen: (e: boolean) => void;
}

const SideBarVille: React.FC<sideBarVille> = ({
  citySearch,
  setCitySearch,
  setCity,
  setOpen,
}) => {
  const [citys, setCitys] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:3001/get/city")
      .then((result) => {
        setCitys(result.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching city data:", error);
      });
  }, []);

  const filteredCities = citys.filter((city) =>
    _.deburr(city.toUpperCase()).includes(_.deburr(citySearch.toUpperCase())),
  );

  return (
    <div className="flex flex-col ">
      <div className="relative">
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            className="block w-full p-4 ps-10 text-sm text-gray-900 
               rounded-full bg-gray-50 border border-gray-300  
               focus:ring-gray-800 focus:border-gray-700"
            placeholder="Rechercher"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setCitySearch(e.target.value);
            }}
          />
        </div>
      </div>
      <div className=" py-6 px-4">
        <div
          className="h-screen  overflow-y-scroll scrollbar-thin
        scrollbar-thumb-gray-800 scrollbar-track-gray-200 "
          style={{ maxHeight: "calc(100vh - 10.8rem)" }}
        >
          {loading ? (
            <Loading />
          ) : (
            filteredCities.map((city, i) => (
              <div
                className="flex flex-row items-center mx-2 px-4 py-2.5
            hover:bg-gray-100 hover:rounded-full cursor-pointer"
                key={i}
                onClick={() => {
                  setCity(city);
                  setOpen(false);
                }}
              >
                {city}
                <svg
                  className="w-5 h-5 ml-auto text-gray-800 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m9 5 7 7-7 7"
                  />
                </svg>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBarVille;
