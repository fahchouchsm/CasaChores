import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../pages/loading";

interface content3 {
  imgs: any[];
  favIndex: number;
  title: string;
  description: string;
  adresse: string;
  city: string;
}

const Content3: React.FC<content3> = ({ favIndex }) => {
  const locationSvg = (
    <svg
      className="m-1"
      aria-hidden="true"
      data-prefix="fas"
      data-icon="location-arrow"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
    >
      <path
        fill="currentColor"
        d="M444.52 3.52L28.74 195.42c-47.97 22.39-31.98 92.75 19.19 92.75h175.91v175.91c0 51.17 70.36 67.17 92.75 19.19l191.9-415.78c15.99-38.39-25.59-79.97-63.97-63.97z"
        className=""
      ></path>
    </svg>
  );
  const categorySvg = (
    <svg
      aria-hidden="true"
      data-prefix="fas"
      data-icon="list"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className="m-0.5"
    >
      <path
        fill="currentColor"
        d="M128 116V76c0-8.837 7.163-16 16-16h352c8.837 0 16 7.163 16 16v40c0 8.837-7.163 16-16 16H144c-8.837 0-16-7.163-16-16zm16 176h352c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H144c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h352c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H144c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zM16 144h64c8.837 0 16-7.163 16-16V64c0-8.837-7.163-16-16-16H16C7.163 48 0 55.163 0 64v64c0 8.837 7.163 16 16 16zm0 160h64c8.837 0 16-7.163 16-16v-64c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v64c0 8.837 7.163 16 16 16zm0 160h64c8.837 0 16-7.163 16-16v-64c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v64c0 8.837 7.163 16 16 16z"
        className=""
      ></path>
    </svg>
  );

  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/new/post/prePost",
          { withCredentials: true },
        );
        setResult(response.data.msg);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-64">
        <Loading />;
      </div>
    );
  }

  if (!result) {
    return null;
  }

  return (
    <>
      <h2 className="mb-1 text-xl font-bold text-gray-900 ">
        Publier l'annonce
      </h2>
      <p className="text-sm text-gray-600">
        Veuillez vérifier les informations renseignées avant la publication de
        votre annonces
      </p>
      <div className="grid grid-cols-6 gap-6 mt-4">
        {result.step2 && (
          <img
            className="rounded-lg col-span-2 object-cover max-h-48 w-full"
            src={result.step2.imgUrl[result.step2.favIndex]}
            alt="main img"
          />
        )}
        <div className="col-span-4 flex flex-col justify-between">
          <div>
            <div className="text-lg text-black">{result.step1.title}</div>
            <div className="text-sm text-gray-700">
              {result.step1.description}
            </div>
          </div>
          <div className="text-sm mt-auto flex flex-col">
            <div className="items-center gap-2 flex mt-3">
              <span className="rounded-full p-0.5 w-4 h-4 flex items-center justify-center bg-gray-600 text-white">
                {categorySvg}
              </span>
              <div className="text-sm mb-0.5 text-gray-900">
                {result.step1.mainCat}, {result.step1.subCat}
              </div>
            </div>
            <div className="items-center gap-2 flex">
              <span className="rounded-full w-4 h-4 flex items-center justify-center bg-gray-600 text-white">
                {locationSvg}
              </span>
              <div className="text-sm mb-0.5 text-gray-900">
                {result.step0.city}, {result.step0.adresse}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Content3;
