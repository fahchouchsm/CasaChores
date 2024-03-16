import { useState } from "react";
import SideBarCitys from "../../assets/sideBar";
import SidebarCategorie from "./sideBarCategorie";

interface content1 {
  setTitle: (e: string) => void;
  setDescription: (e: string) => void;
  setmainCat: (e: string) => void;
  setSubCat: (e: string) => void;
  setSubCat1: (e: string) => void;
  mainCat: string;
  catErr: string;
  titleErr: string;
  title: string;
  description: string;
}

const Content1: React.FC<content1> = ({
  setDescription,
  setTitle,
  setSubCat,
  mainCat,
  setmainCat,
  catErr,
  titleErr,
  title,
  description,
  setSubCat1,
}) => {
  const [open, setOpen] = useState(false);
  const [categorieSvg, setCategorieSvg] = useState<any>();

  const errMsg = (msg: string) => {
    return (
      <p className="mb-2 text-sm text-red-600 flex flex-row items-center">
        <svg
          className="w-4 h-4 mr-0.5 pt-0.5"
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
            d="M10 11h2v5m-2 0h4m-2.6-8.5h0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>{" "}
        <span className="font-medium">{msg}</span>
      </p>
    );
  };

  return (
    <>
      <h2 className="mb-4 text-xl font-bold text-gray-900 ">
        Détails de l'annonce
      </h2>
      <div className="grid gap-4 mb-4 sm:grid-cols-2 sm:gap-6 sm:mb-5">
        <div className="sm:col-span-2">
          <label className="block pl-1 text-sm font-medium text-gray-900">
            Catégorie :
          </label>
          <button
            className="border rounded-lg p-2 lg:w-8/12 w-full my-2"
            onClick={() => setOpen(true)}
          >
            <div className="flex flex-row items-center">
              <div className="">
                {categorieSvg ? (
                  categorieSvg
                ) : (
                  <svg
                    aria-hidden="true"
                    data-prefix="fal"
                    data-icon="clipboard"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    className="w-5 h-5 text-gray-800 "
                  >
                    <path
                      fill="currentColor"
                      d="M336 64h-88.581c.375-2.614.581-5.283.581-8 0-30.879-25.122-56-56-56s-56 25.121-56 56c0 2.717.205 5.386.581 8H48C21.49 64 0 85.49 0 112v352c0 26.51 21.49 48 48 48h288c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm16 400c0 8.822-7.178 16-16 16H48c-8.822 0-16-7.178-16-16V112c0-8.822 7.178-16 16-16h48v20c0 6.627 5.373 12 12 12h168c6.627 0 12-5.373 12-12V96h48c8.822 0 16 7.178 16 16v352zM192 32c13.255 0 24 10.745 24 24s-10.745 24-24 24-24-10.745-24-24 10.745-24 24-24"
                    ></path>
                  </svg>
                )}
              </div>
              <div className="pl-2 truncate">
                {mainCat !== "" ? mainCat : "Sélectionner"}
              </div>
              <div className="ml-auto">
                <svg
                  className="w-4 h-4 text-gray-800 "
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
                    d="m19 9-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
            <SideBarCitys
              open={open}
              setOpen={setOpen}
              name="Catégories"
              content={
                <SidebarCategorie
                  setSubCat1={setSubCat1}
                  setCategorieSvg={setCategorieSvg}
                  setOpen={setOpen}
                  setMainCat={setmainCat}
                  setSubCat={setSubCat}
                />
              }
            />
          </button>
          {catErr !== "" ? errMsg(catErr) : null}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Titre d'annonce :
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="border border-gray-200 text-gray-900 text-sm
              rounded-lg focus:ring-gray-800 focus:border-gray-700 block w-full p-2.5"
            placeholder="Écrivez votre titre ici..."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(e.target.value);
            }}
            defaultValue={title}
          />
          {titleErr !== "" ? errMsg(titleErr) : null}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Description :
          </label>
          <textarea
            id="description"
            maxLength={700}
            rows={8}
            className="block resize-none p-2.5 w-full text-sm text-gray-900 rounded-lg border
              border-gray-200 focus:ring-gray-700 focus:border-gray-800"
            placeholder="Écrivez une description ici..."
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setDescription(e.target.value);
            }}
            defaultValue={description}
          />
        </div>
      </div>
    </>
  );
};

export default Content1;
