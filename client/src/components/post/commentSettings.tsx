import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface commentSettings {
  current: boolean;
}

const CommentSettings: React.FC<commentSettings> = ({ current }) => {
  const dotsSvg = (
    <svg
      className="w-4 h-4"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 16 3"
    >
      <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
    </svg>
  );

  return (
    <Menu as="div" className={"relative ml-auto"}>
      <Menu.Button
        id="dropdownComment1Button"
        data-dropdown-toggle="dropdownComment1"
        className="relative inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
        type="button"
      >
        {dotsSvg}
        <span className="sr-only">Comment settings</span>
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md  
            bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          {current ? (
            <Menu.Item>
              {({ active }) => (
                <button
                  className={
                    "hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700 text-left w-full"
                  }
                >
                  Profile
                </button>
              )}
            </Menu.Item>
          ) : (
            <Menu.Item>
              {({ active }) => (
                <button
                  className={
                    "hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700 text-left w-full"
                  }
                >
                  hamid
                </button>
              )}
            </Menu.Item>
          )}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default CommentSettings;
