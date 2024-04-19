import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Fragment } from "react";

interface SortCommentsProps {
  sort: { sort: string; e: boolean };
  setSort: (e: any) => void;
}

const SortComments: React.FC<SortCommentsProps> = ({ setSort, sort }) => {
  const upSvg = (
    <svg
      className="w-4 h-4 text-gray-800"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 6v13m0-13 4 4m-4-4-4 4"
      />
    </svg>
  );
  const downSvg = (
    <svg
      className="w-4 h-4 text-gray-800"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 19V5m0 14-4-4m4 4 4-4"
      />
    </svg>
  );

  const sortOptions = [
    { name: "Les plus récent", value: "recent", e: false },
    { name: "les plus votés", value: "vote", e: false },
  ];

  const handleSortOptionClick = (option: { value: string; e: boolean }) => {
    setSort((prevSort: any) => ({
      sort: option.value,
      e: prevSort.sort === option.value ? !prevSort.e : false,
    }));
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
          Filter
          <ChevronDownIcon
            className="-mr-1 ml-1 h-5 w-5 pt-1 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
          {sortOptions.map((option, i) => (
            <Menu.Item key={i}>
              {({ active }) => (
                <button
                  onClick={() => handleSortOptionClick(option)}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    sort.sort === option.value
                      ? "font-semibold text-black"
                      : "text-gray-500"
                  } ${active ? "bg-gray-100" : ""}`}
                >
                  <div className="grid grid-cols-11 items-center">
                    <div className="pt-0.5 pr-1 col-span-2">
                      {sort.sort === option.value && sort.e ? upSvg : downSvg}
                    </div>
                    <div className="col-span-9">{option.name}</div>
                  </div>
                </button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default SortComments;
