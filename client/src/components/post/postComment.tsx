import { Transition } from "@headlessui/react";
import axios from "axios";
import React, { useState } from "react";

interface postComment {
  post: any;
  commentAdd: boolean;
  setCommentAdd: (e: boolean) => void;
  fetchData: () => void;
}

declare module "react" {
  interface TimeHTMLAttributes<T> extends HTMLAttributes<T> {
    pubdate?: string;
  }
}

const PostComment: React.FC<postComment> = ({
  post,
  commentAdd,
  setCommentAdd,
  fetchData,
}) => {
  const comments = [...post.user.comments].reverse();
  const dotsSvg = (
    <svg
      className="w-4 h-4"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 16 3"
    >
      <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
    </svg>
  );
  const replySvg = (
    <svg
      className="mr-1.5 w-3.5 h-3.5"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 18"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
      />
    </svg>
  );
  const loadingSvg = (
    <svg
      aria-hidden="true"
      role="status"
      className="inline w-4 h-4 me-3 text-white animate-spin"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="#E5E7EB"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentColor"
      />
    </svg>
  );
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
  const date = (dateString: string) => {
    const date = new Date(dateString);

    const monthNames = [
      "janv.",
      "févr.",
      "mars",
      "avr.",
      "mai",
      "juin",
      "juil.",
      "août",
      "sept.",
      "oct.",
      "nov.",
      "déc.",
    ];

    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    const formattedDate = `${day} ${month} ${year}`;

    return formattedDate;
  };

  const [loading, setLoading] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");
  const [visibleContents, setVisibleContents] = useState<number>(4);
  const incriment = 4;

  // ! Submit handler
  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:3001/new/comment",
        {
          comment,
          idPostUser: post.user._id,
        },
        { withCredentials: true },
      );
      setLoading(false);
      setCommentAdd(false);
      fetchData();
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="antialiased ">
      <Transition
        show={commentAdd}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 -translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-1"
      >
        <form className="mb-6" onSubmit={submitHandler}>
          <div className="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              rows={4}
              className="px-0 w-full resize-none text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none"
              placeholder="Write a comment..."
              required={true}
              defaultValue={""}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                setComment(e.target.value);
              }}
            />
          </div>
          <button
            type="submit"
            className=" items-center py-2.5 px-4 text-xs font-medium text-center 
            text-white ml-auto flex bg-gray-900 rounded-lg hover:bg-primary-800"
          >
            {loading ? (
              <>
                {loadingSvg}
                Chargement...
              </>
            ) : (
              <>Commenter</>
            )}
          </button>
        </form>
      </Transition>

      {comments.slice(0, visibleContents).map((comment: any, i: number) => {
        return (
          <div className="py-4 text-base rounded-lg" key={i}>
            <footer className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <p className="inline-flex items-center mr-3 text-sm text-gray-900 font-semibold">
                  <img
                    className="mr-2 w-8 h-8 rounded-full bg-cover"
                    src={comment.user.pfpLink}
                    alt="Michael Gough"
                  />
                  {comment.user.name} {comment.user.lastName}
                </p>
                <p className="text-sm text-gray-600 ">
                  <time
                    pubdate=""
                    dateTime="2022-02-08"
                    title="February 8th, 2022"
                  >
                    {date(comment.date)}
                  </time>
                </p>
              </div>
              <button
                id="dropdownComment1Button"
                data-dropdown-toggle="dropdownComment1"
                className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50"
                type="button"
              >
                {dotsSvg}
                <span className="sr-only">Comment settings</span>
              </button>
            </footer>
            <p className="text-gray-500 ">{comment.comment}</p>
            <div className="flex items-center mt-4 space-x-4">
              <button
                type="button"
                className="flex items-center text-sm text-gray-500 hover:underline font-medium"
              >
                {replySvg} Reply
              </button>
            </div>
          </div>
        );
      })}

      {comments.length > visibleContents && (
        <button
          className="flex mx-auto items-center gap-1 text-gray-800 hover:bg-gray-200 bg-gray-100 rounded-full px-12 py-2 font-normal"
          onClick={() => setVisibleContents((prev) => prev + incriment)}
        >
          montre plus
          {downArrowSvg}
        </button>
      )}
    </div>
  );
};

export default PostComment;

<article className="p-6 mb-3 ml-6 lg:ml-12 text-base bg-white rounded-lg ">
  <footer className="flex justify-between items-center mb-2">
    <div className="flex items-center">
      <p className="inline-flex items-center mr-3 text-sm text-gray-900 font-semibold">
        <img
          className="mr-2 w-6 h-6 rounded-full"
          src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          alt="Jese Leos"
        />
        Jese Leos
      </p>
      <p className="text-sm text-gray-600 ">
        <time pubdate="" dateTime="2022-02-12" title="February 12th, 2022">
          Feb. 12, 2022
        </time>
      </p>
    </div>
    <button
      id="dropdownComment2Button"
      data-dropdown-toggle="dropdownComment2"
      className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500  bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50"
      type="button"
    >
      <svg
        className="w-4 h-4"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 16 3"
      >
        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
      </svg>
      hamid
      <span className="sr-only">Comment settings</span>
    </button>
    <div
      id="dropdownComment2"
      className="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow "
    >
      <ul
        className="py-1 text-sm text-gray-700"
        aria-labelledby="dropdownMenuIconHorizontalButton"
      >
        <li>
          <div className="block py-2 px-4 hover:bg-gray-100 ">Edit</div>
        </li>
        <li>
          <div className="block py-2 px-4 hover:bg-gray-100">Remove</div>
        </li>
        <li>
          <div className="block py-2 px-4 hover:bg-gray-100">Report</div>
        </li>
      </ul>
    </div>
  </footer>
  <p className="text-gray-500">Much appreciated! Glad you liked it ☺️</p>
  <div className="flex items-center mt-4 space-x-4">
    <button
      type="button"
      className="flex items-center text-sm text-gray-500 hover:underline font-medium"
    >
      <svg
        className="mr-1.5 w-3.5 h-3.5"
        aria-hidden="true"
        fill="none"
        viewBox="0 0 20 18"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
        />
      </svg>
      Reply
    </button>
  </div>
</article>;
