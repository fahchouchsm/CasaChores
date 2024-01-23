import { Fragment, useEffect, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

interface navbar {
  loged: boolean;
  userData: any;
}

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

const NavBar: React.FC<navbar> = ({ loged, userData }) => {
  const navigate = useNavigate();
  const [navigation, setNavigation] = useState<any[]>([]);

  useEffect(() => {
    if (loged) {
      setNavigation([
        { name: "Accueil", current: true, event: () => navigate("/") },
        {
          name: "Explorer",
          current: false,
          event: () => navigate("/categories"),
        },
      ]);
    } else {
      setNavigation([
        { name: "Accueil", current: true, event: () => navigate("/") },
        {
          name: "Explorer",
          current: false,
          event: () => navigate("/categories"),
        },
        {
          name: "Se connecter/S'inscrire",
          current: false,
          event: () => navigate("/login"),
        },
      ]);
    }
  }, [loged, navigate]);

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
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
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-8 w-auto cursor-pointer"
                    src="\img\icons\noBgLogo.png"
                    alt="logo"
                    onClick={() => navigate("/")}
                  />
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {loged ? (
                      <></>
                    ) : (
                      navigation.map((item) => (
                        <button
                          key={item.name}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium",
                          )}
                          aria-current={item.current ? "page" : undefined}
                          onClick={item.event}
                        >
                          {item.name}
                        </button>
                      ))
                    )}
                  </div>
                </div>

                {loged ? (
                  <>
                    <div className="pr-3 border-r-2">
                      <svg
                        className="w-5 h-5  text-white cursor-pointer"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 18"
                        fill="currentColor"
                        onClick={() => navigate("/msg")}
                      >
                        <path
                          d="M18 4H16V9C16 10.0609 15.5786 11.0783 14.8284 11.8284C14.0783 12.5786 13.0609 13 12 13H9L6.846 14.615C7.17993 14.8628 7.58418 14.9977 8 15H11.667L15.4 17.8C15.5731 17.9298 15.7836 18 16 18C16.2652 18 16.5196 17.8946 16.7071 17.7071C16.8946 17.5196 17 17.2652 17 17V15H18C18.5304 15 19.0391 14.7893 19.4142 14.4142C19.7893 14.0391 20 13.5304 20 13V6C20 5.46957 19.7893 4.96086 19.4142 4.58579C19.0391 4.21071 18.5304 4 18 4Z"
                          fill="currentColor"
                        />
                        <path
                          d="M12 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V9C0 9.53043 0.210714 10.0391 0.585786 10.4142C0.960859 10.7893 1.46957 11 2 11H3V13C3 13.1857 3.05171 13.3678 3.14935 13.5257C3.24698 13.6837 3.38668 13.8114 3.55279 13.8944C3.71889 13.9775 3.90484 14.0126 4.08981 13.996C4.27477 13.9793 4.45143 13.9114 4.6 13.8L8.333 11H12C12.5304 11 13.0391 10.7893 13.4142 10.4142C13.7893 10.0391 14 9.53043 14 9V2C14 1.46957 13.7893 0.960859 13.4142 0.585786C13.0391 0.210714 12.5304 0 12 0Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>

                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                          <span className="absolute -inset-1.5" />
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={
                              userData.pfpLink
                                ? userData.pfpLink
                                : "/img/icons/defaultPpf.png"
                            }
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
                        <Menu.Items
                          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md  
                        bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        >
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700 text-left w-full",
                                )}
                                onClick={() =>
                                  navigate(`/profile/${userData._id}`)
                                }
                              >
                                Profile
                              </button>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700 text-left w-full",
                                )}
                                onClick={() =>
                                  navigate(`/settings/profile/${userData._id}`)
                                }
                              >
                                Paramètres de profil
                              </button>
                            )}
                          </Menu.Item>
                          {!userData.seller ? (
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700 text-left w-full",
                                  )}
                                  onClick={() =>
                                    navigate(`/becomeseller/${userData._id}`)
                                  }
                                >
                                  Devenir un vendeur
                                </button>
                              )}
                            </Menu.Item>
                          ) : (
                            <></>
                          )}

                          <Menu.Item>
                            {({ active }) => (
                              <button
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700 text-left w-full",
                                )}
                                onClick={() => navigate("/logout")}
                              >
                                Se déconnecter
                              </button>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>

          {/* Mobile */}
          <Disclosure.Panel className="sm:hidden border-t border-gray-700">
            <div className="space-y-1 px-1 pb-3 pt-2">
              {navigation ? (
                navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="button"
                    className="text-gray-300 hover:bg-gray-700 hover:text-white
                      block rounded-md px-3 py-2 text-base font-medium w-full"
                    aria-current={item.current ? "page" : undefined}
                    onClick={item.event}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))
              ) : (
                <></>
              )}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default NavBar;
