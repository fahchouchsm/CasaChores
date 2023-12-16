const NavBar = () => {
  return (
    <>
      <div className="flex items-center space-x-4 w-full bg-green-600 h-24 px-7 ">
        <img
          className="w-48"
          src="https://cdn.eneba.com/branding/v2/logoFull.svg"
          alt="logo"
        />
        <form>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-white"
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
            </div>

            {console.log("heloo")}

            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-white placeholder:text-white border border-gray-300 
              rounded-lg bg-green-600 focus:ring-0 focus:border-   "
              placeholder="Search"
              required=""
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default NavBar;
