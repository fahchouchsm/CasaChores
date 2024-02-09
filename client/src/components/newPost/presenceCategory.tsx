import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../pages/loading";
import { Transition } from "@headlessui/react";

interface presenceCategor {
  arrowSvg: (e: boolean) => any;
  setOpen: (e: boolean) => void;
  setCategorieSvg: (e: any) => void;
  setMainCat: (e: string) => void;
  setSubCat: (e: string) => void;
  setSubCat1: (e: string) => void;
}

const PresenceCategory: React.FC<presenceCategor> = ({
  arrowSvg,
  setCategorieSvg,
  setMainCat,
  setOpen,
  setSubCat,
  setSubCat1,
}) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const [showed, setShowed] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const [subShowed, setSubShowed] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/get/category/presence")
      .then((result) => {
        setLoading(false);
        setData(result.data.msg);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col">
      <div className="py-6 ">
        <div
          className="h-screen overflow-y-scroll scrollbar-thin
    scrollbar-thumb-gray-800 scrollbar-track-gray-200 "
          style={{ maxHeight: "calc(100vh - 6.05rem)" }}
        >
          {data.map((cat: any, i: number) => {
            return (
              <>
                <div
                  className="px-3 mx-2 py-2.5 flex font-semibold flex-row items-center select-none
                  hover:bg-gray-100 rounded-lg cursor-pointer gap-2"
                  key={i}
                  onClick={() => {
                    setShowed((prevShowed: any) => {
                      const updateShowed = [...prevShowed];
                      updateShowed[i] = !updateShowed[i];
                      return updateShowed;
                    });
                  }}
                >
                  <div className="">{cat.name}</div>
                  {arrowSvg(showed[i])}
                </div>

                <Transition
                  show={showed[i]}
                  enter="transition ease-out duration-1000"
                  enterFrom="opacity-0 -translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-600"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 -translate-y-1"
                >
                  {cat.subCategory.map((sub: any, ii: number) => {
                    return (
                      <>
                        <div
                          className="px-3 mr-2 ml-7 py-2 font-semibold flex flex-row items-center select-none
                      hover:bg-gray-100 rounded-lg cursor-pointer gap-2 text-ellipsis"
                          key={ii}
                          onClick={() => {
                            setSubShowed((preSubShowed: any) => {
                              const updatedSubShowed = [...preSubShowed];
                              updatedSubShowed[ii] = !updatedSubShowed[ii];
                              return updatedSubShowed;
                            });
                          }}
                        >
                          {sub.name}
                          {arrowSvg(subShowed[ii])}
                        </div>
                        <Transition
                          show={subShowed[ii]}
                          enter="transition ease-out duration-1000"
                          enterFrom="opacity-0 -translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-600"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 -translate-y-1"
                        >
                          {sub.subCategory.map((subb: any, iii: number) => {
                            return (
                              <div
                                className="px-3 mr-2 ml-12 py-2 flex flex-row items-center select-none
                                hover:bg-gray-100 rounded-lg cursor-pointer gap-2 text-ellipsis"
                                key={iii}
                                onClick={() => {
                                  setMainCat(cat.name);
                                  setSubCat(sub.name);
                                  setSubCat1(subb.name);
                                  setOpen(false);
                                  setMainCat(subb.name);
                                  setCategorieSvg(cat.icon);
                                }}
                              >
                                {subb.name}
                              </div>
                            );
                          })}
                        </Transition>
                      </>
                    );
                  })}
                </Transition>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default PresenceCategory;
