import React, { useState } from "react";
import UploadDefault from "../../assets/uploadDefault";

const Content2 = () => {
  const [imgs, setImgs] = useState<File[]>([]);

  const handleImageChange = (files: File[] | null) => {
    // Adjusted type to expect an array of File objects
    if (files) {
      const selectedImages = files.slice(0, 5); // Limit to 5 images
      setImgs(selectedImages);
    }
  };

  return (
    <>
      <h2 className="mb-4 text-xl font-bold text-gray-900 ">
        Photos de l'annonce
      </h2>
      <UploadDefault onImageChange={handleImageChange} />
    </>
  );
};

export default Content2;
