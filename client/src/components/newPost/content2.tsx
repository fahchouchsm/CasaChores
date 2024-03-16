import React, { useEffect } from "react";
import UploadDefault from "../../assets/uploadDefault";
import axios from "axios";

interface Content2Props {
  userData: any;
  favIndex: number | null;
  setFavIndex: (i: any) => void;
  imgs: any[];
  setImgs: (i: any) => void;
}

const Content2: React.FC<Content2Props> = ({
  userData,
  imgs,
  setImgs,
  favIndex,
  setFavIndex,
}) => {
  const addImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const selectedImages = await Promise.all(
        Array.from(files).map(async (file) => {
          const url = URL.createObjectURL(file);
          return { value: url, loading: true, fav: false };
        }),
      );
      setImgs((prev: any[]) => [...prev, ...selectedImages]);
      addImgS(files);
    }
  };

  const removeLoadingObjects = () => {
    const filteredImgs = imgs.filter((img) => !img.loading);
    setImgs(filteredImgs);
  };

  const addImgS = async (files: any) => {
    const formData = new FormData();
    Array.from(files).forEach((file: any) => {
      formData.append("images", file);
    });

    try {
      await axios.post("http://localhost:3001/upload/user/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
        params: {
          userId: userData._id,
        },
      });
      removeLoadingObjects();
      fetchData();
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };

  const removeImg = async (i: number) => {
    try {
      setImgs((prevImgs: any) =>
        prevImgs.map((img: any, index: number) =>
          index === i ? { ...img, loading: true, fav: false } : img,
        ),
      );
      await axios.delete(`http://localhost:3001/remove/prepost/img/${i}`, {
        withCredentials: true,
      });
      setImgs((prevImgs: any) =>
        prevImgs.filter((_: any, index: number) => index !== i),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const result = await axios.get("http://localhost:3001/get/prepost/imgs", {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      const mapResult = result.data.msg.map((mov: string) => ({
        value: mov,
        loading: false,
        fav: false,
      }));

      setImgs(mapResult);
      if (mapResult.length > 0) {
        setFavIndex(0);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h2 className="mb-4 text-xl font-bold text-gray-900">
        Photos de l'annonce
      </h2>
      <UploadDefault
        setFavIndex={setFavIndex}
        imgs={imgs}
        addImg={addImg}
        removeImg={removeImg}
        favIndex={favIndex}
      />
    </>
  );
};

export default Content2;
