import { useState } from "react";
import SideBarCitys from "../../assets/sideBar";
import SideBarVille from "./sideBarVille";

interface content0 {
  userData: any;
}

const Content0: React.FC<content0> = ({ userData }) => {
  const [open, setOpen] = useState(false);
  const [citySearch, setCitySearch] = useState<string>("");

  const [city, setCity] = useState<string>("");
  const [typeWork, setTypeWork] = useState<null | number>(null);
  const [phoneHidde, setPhoneHidde] = useState(false);

  const donwArrow = (
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
  );

  return (
    <div className="py-5">
      <div className="my-2 flex flex-col">
        <div className="text-2xl text-black font-semibold mb-0.5">
          Qu'annoncez-vous aujourd'hui ?
        </div>
        <div className="text-gray-500 mb-4 text-sm">
          Grâce à ces informations les acheteurs peuvent trouver votre annonce
          plus facilement
        </div>
        {/*  */}
        <div className="pl-1 font-normal">Type de travail :</div>
        <div className="flex flex-row my-2 gap-3">
          <div
            className={`border  cursor-pointer rounded-full py-2 px-2.5 hover:text-teal-600 hover:border-teal-600 ${
              typeWork === 0
                ? "border-teal-600 bg-teal-50 text-teal-600"
                : "border-gray-700 bg-white text-black"
            } `}
            onClick={() => {
              setTypeWork(0);
            }}
          >
            En présentiel
          </div>
          <div
            className={`border  cursor-pointer rounded-full py-2 px-2.5 hover:text-teal-600 hover:border-teal-600 ${
              typeWork === 1
                ? "border-teal-600 bg-teal-50 text-teal-600"
                : "border-gray-700 bg-white text-black"
            } `}
            onClick={() => {
              setTypeWork(1);
            }}
          >
            À distance
          </div>
        </div>
        {/*  */}
        <label htmlFor="ville" className="pl-1 font-normal mt-2">
          Ville :
        </label>
        <button
          className="border rounded-lg p-2 lg:w-8/12 w-full my-2"
          onClick={() => setOpen(true)}
          id="ville"
        >
          <div className="flex flex-row items-center">
            <div className="">
              <svg
                className="w-5 h-5 text-gray-800 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="2"
                  d="M3 21h18M4 18h16M6 10v8m4-8v8m4-8v8m4-8v8M4 9.5v-1c0-.3.2-.6.5-.8l7-4.5a1 1 0 0 1 1 0l7 4.5c.3.2.5.5.5.8v1c0 .3-.2.5-.5.5h-15a.5.5 0 0 1-.5-.5Z"
                />
              </svg>
            </div>
            <div className="pl-2">{city !== "" ? city : "Sélectionner"}</div>
            <div className="ml-auto">{donwArrow}</div>
          </div>
          <SideBarCitys
            open={open}
            setOpen={setOpen}
            name="Ville"
            content={
              <SideBarVille
                citySearch={citySearch}
                setCitySearch={setCitySearch}
                setCity={setCity}
                setOpen={setOpen}
              />
            }
          />
        </button>
        {/*  */}
        {typeWork === 0 ? (
          <>
            <label className="pl-1 font-normal mt-2">
              Adresse (optionnel) :
            </label>
            <div className="relative my-3">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-800 "
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
                    d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                  />
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.8 14h0a7 7 0 1 0-11.5 0h0l.1.3.3.3L12 21l5.1-6.2.6-.7.1-.2Z"
                  />
                </svg>
              </div>
              <input
                className="block lg:w-8/12 w-full p-2.5 ps-10 text-sm text-gray-900 border 
              border-gray-300 rounded-lg"
                placeholder="Adresse de votre entreprise"
              />
            </div>
          </>
        ) : (
          <></>
        )}

        {/*  */}
        <div className="my-2">
          <div className="">Vos coordonnées</div>
          <div className="text-gray-500 text-sm mt-1">
            Les acheteurs peuvent vous contacter directement sur votre numéro de
            téléphone ou par message.
          </div>
          <div className="grid sm:grid-cols-2 sm:gap-10 gap-3 items-center">
            <div className="relative my-3 ">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
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
                    d="m18.4 14.8-1.2-1.3a1.7 1.7 0 0 0-2.4 0l-.7.7a1.7 1.7 0 0 1-2.4 0l-1.9-1.9a1.7 1.7 0 0 1 0-2.4l.7-.6a1.7 1.7 0 0 0 0-2.5L9.2 5.6a1.6 1.6 0 0 0-2.4 0c-3.2 3.2-1.7 6.9 1.5 10 3.2 3.3 7 4.8 10.1 1.6a1.6 1.6 0 0 0 0-2.4Z"
                  />
                </svg>
              </div>
              <input
                className="block p-2 w-full ps-10 text-sm text-gray-900 border 
              border-gray-300 rounded-lg bg-gray-50  cursor-not-allowed"
                disabled={true}
                value={"+212 " + userData.phone}
              />
            </div>
            {/*  */}
            <div className="flex flex-row  items-center w-full pl-2">
              <div
                className={`rounded-full w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-50 `}
              >
                <svg className="w-5 h-5" viewBox="0 0 640 512">
                  <path d="M601.2 5.1c10.4-8.2 25.5-6.3 33.7 4.1s6.3 25.5-4.1 33.7l-592 464c-10.4 8.2-25.5 6.3-33.7-4.1s-6.3-25.5 4.1-33.7l155.6-122C101.8 270 64 171.4 64 64c0-18 12.1-33.8 29.5-38.6l88-24c19.4-5.3 39.7 4.6 47.4 23.2l40 96c6.8 16.3 2.1 35.2-11.6 46.3L208 207.3c12 25.5 27.2 49.2 45 70.7L601.2 5.1zM234.3 415.6l91.3-72c13.7 9.1 28 17.3 43 24.3L409 318.7c11.2-13.7 30-18.4 46.3-11.6l96 40c18.6 7.7 28.5 28 23.2 47.4l-24 88C545.8 499.9 530 512 512 512c-104.9 0-201.3-36-277.7-96.4z" />
                </svg>
              </div>

              <div className="text-sm pl-3">
                Masquer le numéro dans l'annonce
              </div>
              <label className="ml-auto mr-3 relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={phoneHidde}
                  onChange={() => {
                    setPhoneHidde(!phoneHidde);
                  }}
                />
                <div
                  className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full
            rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white 
            after:content-[''] after:absolute after:top-[2px] after:start-[2px]
            after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5
            after:w-5 after:transition-all peer-checked:bg-gray-700"
                ></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content0;
