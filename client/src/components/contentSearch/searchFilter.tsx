import React, { useEffect, useState } from "react";
import ContentPersonnel from "./content/contentPersonnel";
import SearchBar from "./searchBar";
import SideFilter from "./sideFilter";
import axios from "axios";
import Loading from "../../pages/loading";

interface SearchFilterProps {
  typeCat: number;
  setTypeCat: (i: number) => void;
  search: string | undefined;
  autoCity: string;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  setTypeCat,
  typeCat,
  search,
  autoCity,
}) => {
  const [loading, setLoading] = useState(true);
  const [loadingContent, setLoadingContent] = useState(true);
  const [posts, setPosts] = useState<any[] | null>(null);
  const [catP, setCatP] = useState<any[]>([]);
  const [catO, setCatO] = useState<any[]>([]);
  const [selCity, setSelCity] = useState(autoCity);

  console.log(posts);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          "http://localhost:3001/get/posts/categorys",
        );
        setCatP(result.data.catP);
        setCatO(result.data.catO);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoadingContent(true);
      try {
        let url = `http://localhost:3001/get/posts/${search}/${typeCat}`;
        if (selCity) {
          url += `/${selCity}`;
        }
        const result = await axios.get(url);
        setPosts(result.data.res);
        setLoadingContent(false);
      } catch (error) {
        setLoadingContent(false);
        console.log(error);
      }
    };

    fetchData();
  }, [search, selCity, typeCat]);

  useEffect(() => {
    setSelCity(autoCity);
  }, [autoCity]);

  if (loading) {
    return (
      <div className="h-96">
        <Loading />
      </div>
    );
  }

  return (
    <div className=" mx-auto px-5 mb-5">
      <SearchBar
        selCity={selCity}
        setSelCity={setSelCity}
        autoCity={autoCity}
      />
      <div className="grid grid-cols-4 gap-5 mt-4">
        <div className="hidden md:block col-span-1">
          <SideFilter
            typeCat={typeCat}
            catO={catO}
            catP={catP}
            setTypeCat={setTypeCat}
          />
        </div>
        <div className="md:col-span-3 col-span-4">
          {loadingContent ? (
            <Loading />
          ) : (
            <ContentPersonnel typeCat={typeCat} posts={posts} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
