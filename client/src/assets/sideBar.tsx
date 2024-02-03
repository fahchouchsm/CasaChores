import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

interface sideBar {
  open: boolean;
  name: string;
  setOpen: (e: boolean) => void;
  content: any;
}

const SideBar: React.FC<sideBar> = ({ open, setOpen, name, content }) => {
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto relative w-screen max-w-md">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4 "></div>
                  </Transition.Child>
                  {/*  */}
                  <div className="flex flex-col h-screen bg-white pt-6">
                    <div className="px-4 sm:px-6">
                      <Dialog.Title>
                        <div className="flex flex-row">
                          <div className="text-xl font-semibold leading-6 text-gray-900">
                            {name}
                          </div>
                          <button
                            className="relative rounded-md text-gray-300 ml-auto hover:text-white
                        focus:outline-none focus:ring-2 focus:ring-white"
                            type="button"
                            onClick={() => setOpen(false)}
                          >
                            <span className="absolute -inset-2.5" />
                            <span className="sr-only">Close panel</span>
                            <svg
                              className="w-6 h-6 text-gray-800"
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
                                d="M6 18 18 6m0 12L6 6"
                              />
                            </svg>
                          </button>
                        </div>
                      </Dialog.Title>
                    </div>
                    <div className="static mt-6 flex-1 px-4 sm:px-6">
                      {content}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default SideBar;
