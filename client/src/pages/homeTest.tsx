import { useState } from "react";
import NavBar from "../components/navBarTest/navBarTest";
import SearchFilter from "../components/contentSearch/searchFilter";

interface homeTestP {
  logedP: boolean;
  setLogedP: (i: boolean) => void;
  userDataP: any;
  loadingP: boolean;
  setLoadingP: (i: boolean) => void;
}

const HomeTest: React.FC<homeTestP> = (p) => {
  const [selectedCat, setSelectedCat] = useState(0);
  const [typeCat, setTypeCat] = useState(0);

  const navigation: any = [
    { name: "Maison", href: "#", current: selectedCat === 0 },
    { name: "Personnel", href: "#", current: selectedCat === 1 },
    { name: "Extérieur", href: "#", current: selectedCat === 2 },
    { name: "Éducatif", href: "#", current: selectedCat === 3 },
    { name: "Santé ", href: "#", current: selectedCat === 4 },
  ];

  return (
    <>
      <NavBar
        selectedCatP={selectedCat}
        setSelectedCatP={setSelectedCat}
        navigationP={navigation}
        logedP={p.logedP}
        setLogedP={p.setLogedP}
        userDataP={p.userDataP}
      />
      <SearchFilter
        selectedCatP={selectedCat}
        setSelectedCatP={setSelectedCat}
        typeCatP={typeCat}
        setTypeCat={setTypeCat}
      />
    </>
  );
};

export default HomeTest;
