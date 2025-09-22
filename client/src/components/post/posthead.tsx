import { useEffect, useState } from "react";
import PostComment from "./postComment";
import PostImgs from "./postImgs";

interface posthead {
  post: any;
  fetchData: () => void;
  userData: any;
  loged: boolean;
}

const PostHead: React.FC<posthead> = ({ post, fetchData, userData, loged }) => {
  const imgSvg = (
    <svg
      className="w-6 h-6 text-gray-800 "
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
        d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.286 6M14 10h.01M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z"
      />
    </svg>
  );
  const commentSvg = (
    <svg
      className="w-6 h-6 text-gray-800 "
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
        d="M7.556 8.5h8m-8 3.5H12m7.111-7H4.89a.896.896 0 0 0-.629.256.868.868 0 0 0-.26.619v9.25c0 .232.094.455.26.619A.896.896 0 0 0 4.89 16H9l3 4 3-4h4.111a.896.896 0 0 0 .629-.256.868.868 0 0 0 .26-.619v-9.25a.868.868 0 0 0-.26-.619.896.896 0 0 0-.63-.256Z"
      />
    </svg>
  );

  const locationSvg = (
    <svg
      className="w-3.5 h-3.5 text-gray-800"
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
        d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z"
      />
    </svg>
  );
  const starSvg = (
    <svg
      className="w-3.5 h-3.5 text-gray-800"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 22 20"
    >
      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
    </svg>
  );
  const msgSvg = (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="#fff" role="img">
      <path
        clipRule="evenodd"
        d="M15.48.423a.75.75 0 0 1 .255.724l-2.8 14a.75.75 0 0 1-1.186.453l-3.982-2.987-2.465 2.875A.75.75 0 0 1 3.982 15l.005-5.598a.75.75 0 0 1 .333-.623l4.196-2.803a.75.75 0 1 1 .833 1.248L6.034 9.438l5.663 4.248 2.296-11.475L2.517 6.8l.801.6a.75.75 0 1 1-.9 1.2L.55 7.201A.75.75 0 0 1 .72 5.903l14-5.6a.75.75 0 0 1 .758.12Zm-9.994 10.48-.002 2.068 1.08-1.26-1.078-.809Z"
      ></path>
    </svg>
  );
  const plusSvg = (
    <svg
      className="w-4 h-4  "
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
        d="M5 12h14m-7 7V5"
      />
    </svg>
  );
  const penSvg = (
    <svg
      className="w-4 h-4 text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        fillRule="evenodd"
        d="M14 4.182A4.136 4.136 0 0 1 16.9 3c1.087 0 2.13.425 2.899 1.182A4.01 4.01 0 0 1 21 7.037c0 1.068-.43 2.092-1.194 2.849L18.5 11.214l-5.8-5.71 1.287-1.31.012-.012Zm-2.717 2.763L6.186 12.13l2.175 2.141 5.063-5.218-2.141-2.108Zm-6.25 6.886-1.98 5.849a.992.992 0 0 0 .245 1.026 1.03 1.03 0 0 0 1.043.242L10.282 19l-5.25-5.168Zm6.954 4.01 5.096-5.186-2.218-2.183-5.063 5.218 2.185 2.15Z"
        clipRule="evenodd"
      />
    </svg>
  );

  const { user, seller } = post;
  const [current, setCurrent] = useState(true);

  const contactHandler = () => {
    if (!loged) {
      window.location.href = "/login";
    }
    window.location.href = `/chat/${post.user._id}`;
  };
  const editHandler = () => {
    window.location.href = `/post/edit/${post._id}`;
  };

  useEffect(() => {
    const currentSetter = () => {
      if (userData && userData._id && user && user._id) {
        if (user._id === userData._id) {
          setCurrent(true);
        } else {
          setCurrent(false);
        }
      } else {
        setCurrent(false);
      }
    };
    currentSetter();
  }, [user, userData]);

  const [commentAdd, setCommentAdd] = useState(false);
  return (
    <>
      <div className="flex flex-row">
        <img
          className="w-24 h-24 object-cover rounded-full shadow-xl mr-7"
          src={user.pfpLink}
          alt="pfp"
        />
        <div className="flex flex-col justify-center gap-1">
          <div className="text-gray-900 font-semibold">
            {user.name} {user.lastName}
            <div className="text-gray-400 text-sm font-normal">
              @{seller.userName}
            </div>
          </div>
          <div className="flex items-center text-sm">
            {starSvg}
            <span className="ml-1">
              {user.userRating} ({user.reviews?.length || 0})
            </span>
          </div>
          <div className="flex items-center text-sm">
            {locationSvg} <span className="ml-1">{post.city}</span>{" "}
          </div>
        </div>

        <div className="ml-auto flex items-center">
          {!current || !loged ? (
            <button
              className="inline-flex ml-auto items-center px-3 py-2 text-sm font-medium text-center
        text-white bg-gray-800 rounded-lg hover:opacity-90 focus:outline-none
        focus:ring-blue-300 gap-2"
              onClick={contactHandler}
            >
              {msgSvg}
              Contacter Moi
            </button>
          ) : (
            <button
              className="inline-flex ml-auto items-center px-3 py-2 text-sm font-medium text-center
    text-white bg-gray-800 rounded-lg hover:opacity-90 focus:outline-none
    focus:ring-blue-300 gap-2"
              onClick={editHandler}
            >
              {penSvg}
              Modifier
            </button>
          )}
        </div>
      </div>
      <div className="mt-14 ml-2 flex flex-col gap-5">
        <div className="">
          <div className="text-gray-900 text-md font-semibold mb-1">
            À propos de moi
          </div>
          <div className="text-gray-400 text-sm w-11/12">{seller.bio}</div>
        </div>
        <div className="">
          <div className="font-semibold text-base mb-1">{post.title}</div>
          <div className="text-gray-400 text-sm w-11/12">
            {post.description}
          </div>
        </div>
        <div className="">
          <div className="text-gray-900 flex text-md font-semibold mb-3">
            {imgSvg}&nbsp;Photos de travail
          </div>
          <PostImgs post={post} />
        </div>
        <div className="text-gray-900 text-md font-semibold mb-3">
          <div className="flex items-center mb-3">
            {commentSvg}&nbsp;Commentaires {` (${post?.comments?.length || 0})`}
            <div className="ml-auto">
              <button
                className="inline-flex ml-auto items-center px-3 py-2 md:text-sm text-xs font-medium text-center text-white bg-gray-800 rounded-lg hover:opacity-90 focus:outline-none gap-1"
                onClick={() => {
                  if (!loged) {
                    window.location.href = "/login";
                  } else {
                    setCommentAdd(!commentAdd);
                  }
                }}
              >
                {plusSvg}
                Ajouter un commentaire
              </button>
            </div>
          </div>
          <PostComment
            userData={userData}
            current={current}
            post={post}
            commentAdd={commentAdd}
            setCommentAdd={setCommentAdd}
            fetchData={fetchData}
          />
        </div>
      </div>
    </>
  );
};

export default PostHead;
