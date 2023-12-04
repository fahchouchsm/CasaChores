import SideBarCat from "./sideBarCat";

interface sideFilter {
  typeCatP: number;
  setTypeCat: (i: number) => void;
}

const SideFilter: React.FC<sideFilter> = (p) => {
  const handleButtonClick = (buttonType: number) => {
    p.setTypeCat(buttonType);
  };

  return (
    <div className="grid grid-cols-4 gap-5 mt-4">
      <aside className="hidden md:block col-span-1 bg-gray-50 rounded-lg border border-gray-200 p-5 flex-1">
        <div className="mb-5 ">
          <h5 className="uppercase text-sm font-medium text-gray-500 mb-4">
            Type de service
          </h5>
          <div
            className="grid grid-cols-2 rounded-md shadow-sm w-full px-3"
            role="group"
          >
            <button
              type="button"
              className={`inline-flex justify-center group items-center px-4 py-2 text-sm font-medium
              border rounded-l-lg focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700  
              ${
                p.typeCatP === 0
                  ? "text-blue-700 bg-gray-100"
                  : "text-gray-800 bg-white"
              }
              `}
              onClick={() => handleButtonClick(0)}
            >
              <svg
                className={`w-4 h-4 ${
                  p.typeCatP === 0 ? "text-blue-700" : "text-gray-800"
                } dark:text-white`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 14 18"
              >
                <path d="M7 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm2 1H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
              </svg>
            </button>
            <button
              type="button"
              className={`inline-flex justify-center group items-center px-4 py-2 text-sm font-medium border
              rounded-r-lg focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700   
              ${
                p.typeCatP === 1
                  ? "text-blue-700 bg-gray-100"
                  : "text-gray-800 bg-white"
              }
              `}
              onClick={() => handleButtonClick(1)}
            >
              <svg
                className={`w-4 h-4 ${
                  p.typeCatP === 1 ? "text-blue-700" : "text-gray-800"
                } dark:text-white`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M17.876.517A1 1 0 0 0 17 0H3a1 1 0 0 0-.871.508C1.63 1.393 0 5.385 0 6.75a3.236 3.236 0 0 0 1 2.336V19a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6h4v6a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V9.044a3.242 3.242 0 0 0 1-2.294c0-1.283-1.626-5.33-2.124-6.233ZM15.5 14.7a.8.8 0 0 1-.8.8h-2.4a.8.8 0 0 1-.8-.8v-2.4a.8.8 0 0 1 .8-.8h2.4a.8.8 0 0 1 .8.8v2.4ZM16.75 8a1.252 1.252 0 0 1-1.25-1.25 1 1 0 0 0-2 0 1.25 1.25 0 0 1-2.5 0 1 1 0 0 0-2 0 1.25 1.25 0 0 1-2.5 0 1 1 0 0 0-2 0A1.252 1.252 0 0 1 3.25 8 1.266 1.266 0 0 1 2 6.75C2.306 5.1 2.841 3.501 3.591 2H16.4A19.015 19.015 0 0 1 18 6.75 1.337 1.337 0 0 1 16.75 8Z" />
              </svg>
            </button>
          </div>
        </div>

        <SideBarCat />
      </aside>
    </div>
  );
};

export default SideFilter;
