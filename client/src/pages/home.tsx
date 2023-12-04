import { useState } from "react";
import NavBar from "../components/navBar/navBar";
import SearchFilter from "../components/contentSearch/searchFilter";

export default function Home() {
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
      />
      <SearchFilter
        selectedCatP={selectedCat}
        setSelectedCatP={setSelectedCat}
        typeCatP={typeCat}
        setTypeCat={setTypeCat}
      />
    </>
  );
}
