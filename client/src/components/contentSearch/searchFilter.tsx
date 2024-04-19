import React, { useEffect, useState } from "react";
import ContentPersonnel from "./content/contentPersonnel";
import SearchBar from "./searchBar";
import SideFilter from "./sideFilter";
import axios from "axios";
import Loading from "../../pages/loading";

interface SearchFilterProps {
  typeCat: number;
  setTypeCat: (i: number) => void;
  searchQuery: string | undefined;
  autoCity: string;
  setSearchQuery: (e: string) => void;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  setTypeCat,
  typeCat,
  searchQuery,
  setSearchQuery,
  autoCity,
}) => {
  const [loading, setLoading] = useState(true);
  const [loadingContent, setLoadingContent] = useState(true);
  const [posts, setPosts] = useState<any[] | null>(null);
  const [cats, setCats] = useState<any[]>([]);
  const [selCity, setSelCity] = useState(autoCity);
  const [selCat, setSelCat] = useState<string | null>(null);

  useEffect(() => {
    try {
      const fetchData = async () => {
        setLoadingContent(true);
        const result = await axios.post(
          `http://localhost:3001/get/posts/${searchQuery}`,
          { typeCat, city: selCity, selCat }
        );
        setPosts(result.data.response);
        setLoadingContent(false);
      };
      fetchData();
    } catch (error) {
      console.log(error);
      setLoadingContent(false);
    }
  }, [searchQuery, selCity, typeCat, selCat]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          "http://localhost:3001/get/posts/categorys"
        );
        setCats(result.data.catP);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

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
        setSearchQuery={setSearchQuery}
        searchQuery={searchQuery}
        selCity={selCity}
        setSelCity={setSelCity}
        autoCity={autoCity}
      />
      <div className="grid grid-cols-4 gap-5 mt-4">
        <div className="hidden md:block col-span-1">
          <SideFilter
            typeCat={typeCat}
            cats={cats}
            setTypeCat={setTypeCat}
            selCat={selCat}
            setSelCat={setSelCat}
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
