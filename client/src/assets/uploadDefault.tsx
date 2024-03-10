import Loading from "../pages/loading";

interface UploadDefaultProps {
  imgs: any[];
  setImgs: (e: any) => void;
  addImg: any;
}

const UploadDefault: React.FC<UploadDefaultProps> = ({
  imgs,
  setImgs,
  addImg,
}) => {
  return (
    <div className="w-full">
      <>
        <label
          htmlFor="dropzone-file"
          className={`flex flex-col items-center justify-center w-full border-2
                border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50
                hover:bg-gray-100 ${imgs.length !== 0 && "h-64"}`}
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
            accept="image/*"
            type="file"
            className="hidden"
            onChange={addImg}
            multiple
          />
        </label>
      </>
      <div
        className={`mt-4 grid grid-cols-4 gap-4 grid-rows-2 ${
          imgs.length > 0 ? "h-64" : ""
        }`}
      >
        {imgs.map((img, i) => (
          <div className="relative inline-block" key={i}>
            <img
              className={`rounded-md object-cover h-full w-full ${
                img.loading && "opacity-60"
              }`}
              src={img.value}
              alt={`${i + 1}`}
            />
            {!img.loading ? (
              <div className="absolute top-0 right-0 rounded-full">
                <svg
                  className="w-6 h-6 p-1 text-red-500 hover:opacity-70 hover:cursor-pointer"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.6 2.6A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4c0-.5.2-1 .6-1.4ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            ) : (
              <div className="absolute inset-0 ">
                <Loading />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadDefault;
