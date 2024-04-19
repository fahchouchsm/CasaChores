const CatDropDown = () => {
  return (
    <div
      id="dropdown"
      className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-40 "
    >
      <ul
        className="py-2 text-sm text-gray-700"
        aria-labelledby="dropdown-button"
      >
        <li>
          <button
            type="button"
            className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
          >
            Mockups
          </button>
        </li>
        <li>
          <button
            type="button"
            className="inline-flex w-full px-4 py-2 hover:bg-gray-100"
          >
            Templates
          </button>
        </li>
        <li>
          <button
            type="button"
            className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
          >
            Design
          </button>
        </li>
        <li>
          <button
            type="button"
            className="inline-flex w-full px-4 py-2 hover:bg-gray-100 "
          >
            Logos
          </button>
        </li>
      </ul>
    </div>
  );
};

export default CatDropDown;
