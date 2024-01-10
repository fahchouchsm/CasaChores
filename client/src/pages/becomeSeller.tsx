const BecomeSeller = () => {
  return (
    <div
      className="flex flex-col items-center justify-center mt-8 sm:mt-20 sm:mx-20 md:mx-28 mx-0 p-6 rounded-lg
    shadow bg-gray-50"
    >
      <ol
        className="flex items-center justify-center w-full p-3 space-x-2 text-sm font-medium text-center
      text-gray-500 rounded-lg  sm:text-base sm:p-4 sm:space-x-4 rtl:space-x-reverse"
      >
        <li className="flex items-center text-teal-800 ">
          <span
            className="flex items-center justify-center w-5 h-5 me-2 text-xs border 
          border-teal-800 rounded-full shrink-0 "
          >
            1
          </span>
          Personal <span className="hidden sm:inline-flex sm:ms-2">Info</span>
          <svg
            className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 12 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m7 9 4-4-4-4M1 9l4-4-4-4"
            />
          </svg>
        </li>
        <li className="flex items-center">
          <span
            className="flex items-center justify-center w-5 h-5 me-2 text-xs border
          border-gray-500 rounded-full shrink-0 "
          >
            2
          </span>
          Account <span className="hidden sm:inline-flex sm:ms-2">Info</span>
          <svg
            className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 12 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m7 9 4-4-4-4M1 9l4-4-4-4"
            />
          </svg>
        </li>
        <li className="flex items-center">
          <span
            className="flex items-center justify-center w-5 h-5 me-2 text-xs border
          border-gray-500 rounded-full shrink-0 "
          >
            3
          </span>
          Profile
        </li>
      </ol>
    </div>
  );
};

export default BecomeSeller;
