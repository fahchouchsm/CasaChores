import { useState } from "react";

interface postImgs {
  post: any;
}

const PostImgs: React.FC<postImgs> = ({ post }) => {
  const downArrowSvg = (
    <svg
      className="w-5 h-5 pt-1 text-gray-800"
      aria-hidden="true"
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m19 9-7 7-7-7"
      />
    </svg>
  );
  const [visibleContents, setVisibleContents] = useState<number>(4);
  const [selectedImg, setSelectedImg] = useState<number>(0);
  const incriment = 4;

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        {post.images.slice(0, visibleContents).map((img: string, i: number) => {
          return (
            <img
              src={img}
              className="w-64 h-64 rounded-lg bg-cover cursor-pointer"
              alt={i + ""}
              key={i}
              onClick={() => {
                setSelectedImg(i);
                setIsModalOpen(true);
              }}
            />
          );
        })}
      </div>
      {isModalOpen && (
        <div
          className="fixed top-0 left-0 w-screen h-screen bg-opacity-50 z-50 flex justify-center items-center bg-white"
          onClick={() => () => setIsModalOpen(false)}
        >
          <button
            className="absolute top-1 right-1 mr-5"
            onClick={() => setIsModalOpen(false)}
          >
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18 17.94 6M18 18 6.06 6"
              />
            </svg>
          </button>
          <img src={post.images[selectedImg]} className="h-full" alt="" />
        </div>
      )}
      {post.images.length > visibleContents && (
        <button
          className="flex mx-auto items-center gap-1 text-gray-800 hover:bg-gray-200
          bg-gray-100 rounded-full px-12 py-2 mt-5 font-normal"
          onClick={() => setVisibleContents((prev) => prev + incriment)}
        >
          montre plus
          {downArrowSvg}
        </button>
      )}
    </>
  );
};

export default PostImgs;
