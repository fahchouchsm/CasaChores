import OnlineCategory from "./onlineCategory";
import PresenceCategorie from "./presenceCategory";

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

  if (typeWork === "presence") {
    return (
      <PresenceCategorie
        arrowSvg={arrowSvg}
        setCategorieSvg={setCategorieSvg}
        setMainCat={setMainCat}
        setOpen={setOpen}
        setSubCat={setSubCat}
        setSubCat1={setSubCat1}
      />
    );
  } else {
    return (
      <OnlineCategory
        arrowSvg={arrowSvg}
        setCategorieSvg={setCategorieSvg}
        setMainCat={setMainCat}
        setOpen={setOpen}
        setSubCat={setSubCat}
        setSubCat1={setSubCat1}
      />
    );
  }
};

export default SidebarCategorie;
