import { Transition } from "@headlessui/react";
import { useEffect, useState } from "react";
import Loading from "../../pages/loading";
import axios from "axios";

interface sidebarCategorie {
  setOpen: (e: boolean) => void;
  setCategorieSvg: (e: any) => void;
  setMainCat: (e: string) => void;
  setSubCat: (e: string) => void;
  setSubCat1: (e: string) => void;
  typeWork: string;
}

const SidebarCategorie: React.FC<sidebarCategorie> = ({
  setOpen,
  setMainCat,
  setCategorieSvg,
  setSubCat,
  setSubCat1,
  typeWork,
}) => {
  const arrowSvg = (mov: boolean) => {
    return (
      <svg
        className={`w-4 h-4 ml-auto text-gray-800 ${mov ? "rotate-180" : ""}`}
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
  };

  const present = [
    {
      name: "Transport et Livraison",
      subcategories: [
        {
          name: "Livraison de Marchandises",
          subcategories: [
            { name: "Livraison légère" },
            { name: "Livraison normale" },
            { name: "Livraison lourde" },
          ],
        },

        {
          name: "Déménagement",
          subcategories: [
            { name: "Déménagement local" },
            { name: "Déménagement longue distance" },
            { name: "Location de camion de déménagement" },
            { name: "Aide au déménagement" },
          ],
        },
      ],
      icon: (
        <svg
          className="w-6 h-6 text-gray-900"
          aria-hidden="true"
          data-prefix="fal"
          data-icon="truck"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 512"
        >
          <path
            fill="currentColor"
            d="M632 384h-24V275.9c0-16.8-6.8-33.3-18.8-45.2l-83.9-83.9c-11.8-12-28.3-18.8-45.2-18.8H416V78.6c0-25.7-22.2-46.6-49.4-46.6H49.4C22.2 32 0 52.9 0 78.6v290.8C0 395.1 22.2 416 49.4 416h16.2c-1.1 5.2-1.6 10.5-1.6 16 0 44.2 35.8 80 80 80s80-35.8 80-80c0-5.5-.6-10.8-1.6-16h195.2c-1.1 5.2-1.6 10.5-1.6 16 0 44.2 35.8 80 80 80s80-35.8 80-80c0-5.5-.6-10.8-1.6-16H632c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8zM460.1 160c8.4 0 16.7 3.4 22.6 9.4l83.9 83.9c.8.8 1.1 1.9 1.8 2.8H416v-96h44.1zM144 480c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm63.6-96C193 364.7 170 352 144 352s-49 12.7-63.6 32h-31c-9.6 0-17.4-6.5-17.4-14.6V78.6C32 70.5 39.8 64 49.4 64h317.2c9.6 0 17.4 6.5 17.4 14.6V384H207.6zM496 480c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm0-128c-26.1 0-49 12.7-63.6 32H416v-96h160v96h-16.4c-14.6-19.3-37.5-32-63.6-32z"
          ></path>
        </svg>
      ),
    },
    {
      name: "Construction et Bricolage",
      subcategories: [
        {
          name: "Plomberie et Électricité",
          subcategories: [
            { name: "Câblage électrique" },
            { name: "Installation de cuisine" },
            { name: "Installation de salle de bains" },
            { name: "Plomberie" },
            { name: "Systèmes d'éclairage" },
            { name: "Travaux électriques" },
          ],
        },
        {
          name: "Rénovation de Cuisine et Salle de Bains",
          subcategories: [
            { name: "Carrelage et revêtements muraux" },
            { name: "Installation d'électroménagers" },
            { name: "Plomberie de cuisine" },
            { name: "Plomberie de salle de bains" },
            { name: "Rénovation de cuisine" },
            { name: "Rénovation de salle de bains" },
          ],
        },
        {
          name: "Rénovation Extérieure",
          subcategories: [
            { name: "Aménagement paysager" },
            { name: "Peinture extérieure" },
            { name: "Menuiserie extérieure" },
            { name: "Revêtement extérieur" },
            { name: "Terrasse et patio" },
            { name: "Toiture" },
            { name: "Piscine et spa" },
          ],
        },
        {
          name: "Rénovation Intérieure",
          subcategories: [
            { name: "Aménagement de combles" },
            { name: "Charpenterie" },
            { name: "Cloisons et plafonds" },
            { name: "Isolation thermique" },
            { name: "Menuiserie intérieure" },
            { name: "Peinture intérieure" },
            { name: "Revêtements de sol" },
            { name: "Plâtrerie" },
          ],
        },
        {
          name: "Systèmes et Sécurité",
          subcategories: [
            { name: "Contrôle d'accès" },
            { name: "Domotique" },
            { name: "Installation de climatisation et chauffage" },
            { name: "Installation de fenêtres et portes" },
            { name: "Installation de systèmes de sécurité" },
            { name: "Systèmes de surveillance" },
          ],
        },
        {
          name: "Travaux Généraux",
          subcategories: [
            { name: "Contractant général" },
            { name: "Construction de fondations" },
            { name: "Démolition" },
            { name: "Génie civil" },
            { name: "Maçonnerie" },
            { name: "Terrassement" },
          ],
        },
      ],
      icon: (
        <svg
          className="w-6 h-6 text-gray-900"
          aria-hidden="true"
          data-prefix="fal"
          data-icon="ruler-triangle"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M501.65 452.08L59.91 10.35C52.76 3.2 43.97 0 35.35 0 17.31 0 0 14.01 0 35.17V476.9C0 496.29 15.71 512 35.1 512h441.73c31.27 0 46.93-37.8 24.82-59.92zm-21.96 26.01c-.79 1.91-2.04 1.91-2.86 1.91H35.1c-1.71 0-3.1-1.39-3.1-3.1V35.17c0-3.13 3.21-3.17 3.36-3.17.48 0 1.03.08 1.93.98l73.79 73.79-16.97 16.97c-3.12 3.12-3.12 8.19 0 11.31l11.32 11.31a7.98 7.98 0 0 0 5.66 2.34c2.05 0 4.09-.78 5.66-2.34l16.97-16.97 45.26 45.26-16.97 16.97c-3.12 3.12-3.12 8.19 0 11.31l11.31 11.31a7.98 7.98 0 0 0 5.66 2.34c2.05 0 4.1-.78 5.66-2.34l16.97-16.97 45.26 45.26-16.97 16.97c-3.12 3.12-3.12 8.19 0 11.31l11.31 11.31a7.98 7.98 0 0 0 5.66 2.34c2.05 0 4.1-.78 5.66-2.34l16.97-16.97 45.25 45.25-16.97 16.97c-3.12 3.12-3.12 8.19 0 11.31l11.31 11.31c1.56 1.56 3.61 2.34 5.66 2.34s4.09-.78 5.66-2.34l16.97-16.97 45.25 45.25-16.97 16.97c-3.12 3.12-3.12 8.19 0 11.31l11.31 11.31c1.56 1.56 3.61 2.34 5.66 2.34s4.09-.78 5.66-2.34l16.97-16.97 73.79 73.79c.55.61 1.44 1.5.64 3.41zM123.31 228.68c-4.56-4.56-11.5-5.95-17.44-3.47A15.999 15.999 0 0 0 96 239.99v160c0 8.84 7.16 16 16 16h160c6.47 0 12.31-3.89 14.78-9.88a16.048 16.048 0 0 0-3.47-17.44l-160-159.99zM128 383.99V278.62L233.37 384H128z"
          ></path>
        </svg>
      ),
    },
    {
      name: "Services Événementiels",
      subcategories: [
        {
          name: "Planification d'Événements",
          subcategories: [
            { name: "Organisation de mariage" },
            { name: "Planification de fête d'anniversaire" },
            { name: "Événements d'entreprise" },
          ],
        },
        {
          name: "Services Traiteur",
          subcategories: [
            { name: "Traiteur pour mariage" },
            { name: "Service de restauration pour événements" },
            { name: "Catering pour fêtes et anniversaires" },
            { name: "Buffet et plats spéciaux" },
          ],
        },
        {
          name: "Animation et Divertissement",
          subcategories: [
            { name: "Animateurs d'événements" },
            { name: "Musique live et DJ" },
            { name: "Location de matériel audiovisuel" },
          ],
        },
        {
          name: "Photographie et Vidéographie",
          subcategories: [
            { name: "Photographes d'événements" },
            { name: "Vidéastes pour événements" },
            { name: "Montage vidéo et retouche photo" },
          ],
        },
      ],
      icon: (
        <svg
          className="w-6 h-6 text-gray-900"
          aria-hidden="true"
          data-prefix="fal"
          data-icon="calendar"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            fill="currentColor"
            d="M400 64h-48V12c0-6.627-5.373-12-12-12h-8c-6.627 0-12 5.373-12 12v52H128V12c0-6.627-5.373-12-12-12h-8c-6.627 0-12 5.373-12 12v52H48C21.49 64 0 85.49 0 112v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zM48 96h352c8.822 0 16 7.178 16 16v48H32v-48c0-8.822 7.178-16 16-16zm352 384H48c-8.822 0-16-7.178-16-16V192h384v272c0 8.822-7.178 16-16 16z"
          ></path>
        </svg>
      ),
    },
    {
      name: "Services Personnels",
      subcategories: [
        {
          name: "Coiffure",
          subcategories: [{ name: "Coiffure à domicile" }],
        },
        {
          name: "Services de Garde",
          subcategories: [
            { name: "Garde d'enfants" },
            { name: "Soins aux personnes âgées" },
            { name: "Garde d'animaux domestiques" },
          ],
        },
        {
          name: "Services de Nettoyage",
          subcategories: [
            { name: "Nettoyage domicile" },
            { name: "Nettoyage commercial" },
          ],
        },
      ],
      icon: (
        <svg
          aria-hidden="true"
          data-prefix="fal"
          data-icon="user"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          className="w-6 h-6 text-gray-800"
        >
          <path
            fill="currentColor"
            d="M313.6 288c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4zM416 464c0 8.8-7.2 16-16 16H48c-8.8 0-16-7.2-16-16v-41.6C32 365.9 77.9 320 134.4 320c19.6 0 39.1 16 89.6 16 50.4 0 70-16 89.6-16 56.5 0 102.4 45.9 102.4 102.4V464zM224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm0-224c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z"
          ></path>
        </svg>
      ),
    },
    {
      name: "Éducation et Tutorat",
      subcategories: [
        {
          name: "Cours de Langues",
          subcategories: [
            { name: "Cours de français" },
            { name: "Cours d'anglais" },
            { name: "Cours d'allemand" },
          ],
        },
        {
          name: "Préparation aux Examens",
          subcategories: [
            { name: "Préparation au baccalauréat" },
            { name: "Préparation aux concours" },
          ],
        },
        {
          name: "Musique et Arts",
          subcategories: [
            { name: "Cours de musique" },
            { name: "Cours de dessin" },
          ],
        },
      ],
      icon: (
        <svg
          className="h-6 w-6 text-gray-900"
          aria-hidden="true"
          data-prefix="fal"
          data-icon="graduation-cap"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 512"
        >
          <path
            fill="currentColor"
            d="M612.16 153.99l-265-85.68c-17.81-5.75-36.5-5.75-54.31 0l-265 85.68C10.94 159.46 0 174.38 0 192s10.94 32.54 27.84 38.01l29.71 9.6c-3.3 6.18-5.74 12.83-7.33 19.8C39.53 264.59 32 275.32 32 288c0 12.73 7.57 23.52 18.33 28.67L32.28 428.53C30.67 438.52 36.19 448 43.62 448h40.75c7.43 0 12.96-9.48 11.34-19.47L77.67 316.67C88.43 311.52 96 300.73 96 288c0-10.6-5.49-19.54-13.43-25.37 1.49-4.66 3.8-8.86 6.57-12.81l53.47 17.29L128 384c0 35.35 85.96 64 192 64s192-28.65 192-64l-14.61-116.89L612.16 230c16.9-5.46 27.84-20.38 27.84-38s-10.94-32.54-27.84-38.01zM479.48 381.86C468.72 393.19 414.04 416 320 416c-94.04 0-148.72-22.81-159.48-34.14l13.09-104.73 119.24 38.55c2.6.84 25.72 9.23 54.31 0l119.24-38.55 13.08 104.73zm122.8-182.28l-265 85.68c-11.31 3.66-23.25 3.66-34.56 0l-175.67-56.8 195.89-36.74c8.69-1.62 14.41-9.98 12.78-18.67-1.62-8.7-10.16-14.39-18.66-12.77l-203.78 38.2c-12.4 2.32-23.51 7.65-33.08 14.83l-42.49-13.74c-7.85-2.55-7.46-12.74 0-15.15l265-85.68c15.1-4.88 27.84-2.17 34.56 0l265 85.68c7.39 2.39 7.91 12.6.01 15.16z"
          ></path>
        </svg>
      ),
    },
  ];

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

  const [loading, setLoading] = useState(true);
  let data: any[] = [];

  useEffect(() => {
    if (typeWork === "presence") {
      axios
        .get("http://localhost:3001/get/category/presence")
        .then((result) => {
          setLoading(false);
          console.log(result.data.msg);
          // eslint-disable-next-line react-hooks/exhaustive-deps
          data = result.data.msg;
          console.log(data);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
        });
    } else if (typeWork === "online") {
      console.log("online");
    }
  }, [typeWork]);

  if (loading) {
    return <Loading />;
  }
  return (
    <div className="flex flex-col">
      <div className="py-6 ">
        <div
          className="h-screen  overflow-y-scroll scrollbar-thin 
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
                    setShowed((prevShowed) => {
                      const updateShowed = [...prevShowed];
                      updateShowed[i] = !updateShowed[i];
                      return updateShowed;
                    });
                  }}
                >
                  {cat.icon}
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
                  {cat.subcategories.map((sub: any, ii: number) => {
                    return (
                      <>
                        <div
                          className="px-3 mr-2 ml-7 py-2 font-semibold flex flex-row items-center select-none
                              hover:bg-gray-100 rounded-lg cursor-pointer gap-2 text-ellipsis"
                          key={ii}
                          onClick={() => {
                            setSubShowed((preSubShowed) => {
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
                          {sub.subcategories.map((subb: any, iii: number) => {
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

export default SidebarCategorie;
