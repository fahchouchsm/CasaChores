interface HeroSearchProps {
  typeSelc: number;
  setTypeSelc: (i: number) => void;
}

const HomeSearch: React.FC<HeroSearchProps> = ({ typeSelc, setTypeSelc }) => (
  <form className="flex items-center mt-5">
    <label htmlFor="voice-search" className="sr-only">
      Search
    </label>
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
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-800 block w-full ps-10 p-2.5"
        placeholder="Qu'y a-t-il sur votre liste de choses à faire ?"
        required
      />
    </div>

    <button
      type="submit"
      className="inline-flex items-center py-2.5 px-3 ms-2 text-sm font-medium text-white bg-gray-800 rounded-lg border hover:bg-gray-700 ring-0 focus:outline-none focus:ring-blue-300"
    >
      <svg
        className="w-4 h-4 me-2"
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
      Search
    </button>
  </form>
);

export default HomeSearch;
