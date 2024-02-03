import React, { useState } from "react";

interface UploadDefaultProps {
  onImageChange: (files: File[] | null) => void; // Adjusted type to accept an array of File objects
}

const UploadDefault: React.FC<UploadDefaultProps> = ({ onImageChange }) => {
  const [images, setImages] = useState<string[]>([]);

  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const selectedImages = Array.from(files).slice(0, 5); // Limit to 5 images
      onImageChange(selectedImages);
      const urls = selectedImages.map((file) => URL.createObjectURL(file));
      setImages(urls);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 border-2
  border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50
  hover:bg-gray-100 "
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">Cliquez pour télécharger</span> ou
            faites glisser et déposez
          </p>
          <p className="text-xs text-gray-500">SVG, PNG ou JPG</p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          onChange={handleImgChange}
          multiple
        />
      </label>
      <div className="mt-4 grid grid-cols-3 gap-4">
        {images.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Uploaded Image ${index + 1}`}
            className="w-24 h-24 object-cover rounded-lg"
          />
        ))}
      </div>
    </div>
  );
};

export default UploadDefault;
