import React, { useEffect, useState } from "react";
import UploadDefault from "../../assets/uploadDefault";
import axios from "axios";

interface Content2Props {
  userData: any;
}

const Content2: React.FC<Content2Props> = ({ userData }) => {
  const [imgs, setImgs] = useState<any[]>([]);

  const addImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const selectedImages = await Promise.all(
        Array.from(files).map(async (file) => {
          const url = URL.createObjectURL(file);
          return { value: url, loading: true };
        }),
      );
      setImgs((prev: any[]) => [...prev, ...selectedImages]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          "http://localhost:3001/get/prepost/imgs",
          {
            withCredentials: true,
          },
        );
        setImgs((prev: any) => {
          prev = [...prev, ...result.data.msg];
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [imgs]);

  return (
    <>
      <h2 className="mb-4 text-xl font-bold text-gray-900">
        Photos de l'annonce
      </h2>
      <UploadDefault imgs={imgs} setImgs={setImgs} addImg={addImg} />
    </>
  );
};

export default Content2;
