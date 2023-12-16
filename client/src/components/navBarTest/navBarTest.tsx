import { Fragment, ReactElement, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

interface navBarP {
  selectedCatP: number;
  setSelectedCatP: (i: number) => void;
  navigationP: {
    name: string;
    current: boolean;
  }[];
  logedP: boolean;
  setLogedP: (i: boolean) => void;
  userDataP: any;
}

// ! main
const NavBarTest: React.FC<navBarP> = (p) => {
  const navigator = useNavigate();
  const logoHadnler = (e: any) => {
    navigator("/");
  };
  const [logedContent, setLogedContent] = useState<ReactElement>();

  const connectHandler = (e: any) => {
    navigator("/login");
  };
  const profileHandler = (e: any) => {
    window.location.href = `/user/${p.userDataP._id}`;
  };

  useEffect(() => {
    if (p.logedP) {
      setLogedContent(
        <div className="relative ml-3 flex items-center">
          <Menu as="div" className="relative">
            <div>
              <Menu.Button
                className="relative flex rounded-full bg-gray-800 text-sm 
              focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt=""
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
              <Menu.Items className=" absolute right-0 z-10 mt-2 w-52 origin-top-right rounded bg-gray-700 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div
                  id="dropdownInformation"
                  className="divide-y divide-gray-600 rounded-lg shadow dark:divide-gray-600"
                >
                  <div className="px-4 py-3 text-sm text-white">
                    <div>
                      {p.userDataP.name} {p.userDataP.lastName}
                    </div>
                    <div className="text-gray-400 truncate text-xs">
                      {p.userDataP.email}
                    </div>
                  </div>
                  <ul
                    className="text-sm text-gray-200 "
                    aria-labelledby="dropdownInformationButton"
                  >
                    <li>
                      <button
                        className="block px-4 py-2 hover:bg-gray-600 w-full text-left"
                        onClick={profileHandler}
                      >
                        <div className="flex items-center">
                          <svg
                            className="w-3.5 h-3.5 text-gray-200 hover:text-white mr-1.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                          </svg>
                          <div>Profile</div>
                        </div>
                      </button>
                    </li>
                    <li>
                      <button className="block px-4  py-2 hover:bg-gray-600 w-full text-left">
                        <div className="flex items-center">
                          <svg
                            className="w-3.5 h-3.5 text-gray-200 hover:text-white mr-1.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M7.324 9.917A2.479 2.479 0 0 1 7.99 7.7l.71-.71a2.484 2.484 0 0 1 2.222-.688 4.538 4.538 0 1 0-3.6 3.615h.002ZM7.99 18.3a2.5 2.5 0 0 1-.6-2.564A2.5 2.5 0 0 1 6 13.5v-1c.005-.544.19-1.072.526-1.5H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h7.687l-.697-.7ZM19.5 12h-1.12a4.441 4.441 0 0 0-.579-1.387l.8-.795a.5.5 0 0 0 0-.707l-.707-.707a.5.5 0 0 0-.707 0l-.795.8A4.443 4.443 0 0 0 15 8.62V7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.12c-.492.113-.96.309-1.387.579l-.795-.795a.5.5 0 0 0-.707 0l-.707.707a.5.5 0 0 0 0 .707l.8.8c-.272.424-.47.891-.584 1.382H8.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1.12c.113.492.309.96.579 1.387l-.795.795a.5.5 0 0 0 0 .707l.707.707a.5.5 0 0 0 .707 0l.8-.8c.424.272.892.47 1.382.584v1.12a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1.12c.492-.113.96-.309 1.387-.579l.795.8a.5.5 0 0 0 .707 0l.707-.707a.5.5 0 0 0 0-.707l-.8-.795c.273-.427.47-.898.584-1.392h1.12a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5ZM14 15.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" />
                          </svg>
                          <div>Parametres</div>
                        </div>
                      </button>
                    </li>
                    <li>
                      <button className="block px-4  py-2 hover:bg-gray-600 w-full text-left">
                        <div className="flex items-center">
                          <svg
                            className="w-3.5 h-3.5 text-gray-200 hover:text-white mr-1.5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M17.947 2.053a5.209 5.209 0 0 0-3.793-1.53A6.414 6.414 0 0 0 10 2.311 6.482 6.482 0 0 0 5.824.5a5.2 5.2 0 0 0-3.8 1.521c-1.915 1.916-2.315 5.392.625 8.333l7 7a.5.5 0 0 0 .708 0l7-7a6.6 6.6 0 0 0 2.123-4.508 5.179 5.179 0 0 0-1.533-3.793Z" />
                          </svg>
                          <div>Favori</div>
                        </div>
                      </button>
                    </li>
                  </ul>
                  <div className="py-2">
                    <button className="block px-4  py-2 text-sm text-gray-200 hover:bg-gray-600 w-full text-left">
                      <div className="flex items-center">
                        {/* <svg
                          className="w-3.5 h-3.5 text-gray-200 hover:text-white mr-1.5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" />
                        </svg> */}
                        <div>Sign out</div>
                      </div>
                    </button>
                  </div>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>,
      );
    } else {
      setLogedContent(
        <div className="hidden sm:ml-6 sm:block  items-center">
          <button
            className="relative inline-flex items-center justify-center px-3 py-2 overflow-hidden
          text-xs font-medium text-gray rounded-lg group bg-slate-300
          hover:bg-black hover:text-white"
            onClick={connectHandler}
          >
            Se connecter/S'inscrire
          </button>
        </div>,
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [p.logedP]);

  // !return
  return (
    <Disclosure as="nav" className="">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 xl:px-10 bg-gray-900">
            <div className="relative flex h-16 items-center justify-between ">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button
                  className="relative inline-flex items-center justify-center rounded-md p-2
                text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2
                focus:ring-inset focus:ring-white"
                >
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div
                  className="flex flex-shrink-0 items-center cursor-pointer"
                  onClick={logoHadnler}
                >
                  <img
                    className=" w-auto h-8"
                    src="img\icons\noBgLogo.png"
                    alt="Your Company"
                  />
                </div>
              </div>

              {/* <div className=""> */}
              {logedContent}
              {/* </div> */}
            </div>
          </div>

          <div className="mx-auto  max-w-7xl px-2 sm:px-6 lg:px-8 xl:px-10 bg-gradient-to-b from-gray-900 to-gray-700">
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                {p.navigationP.map((item, i) => (
                  <button
                    key={i}
                    onClick={(e: any) => {
                      p.setSelectedCatP(i);
                    }}
                    className={classNames(
                      item.current
                        ? "border-b-2 text-white"
                        : "text-gray-300 hover:text-white hover:border-b",
                      "rounded-0 px-3 py-2 text-xs font-medium",
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* mobile */}
          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 bg-gray-900">
              {p.navigationP.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium",
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default NavBarTest;
