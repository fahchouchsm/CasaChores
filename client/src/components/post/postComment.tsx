import axios from "axios";
import React, { useEffect, useState } from "react";
import CommentSettings from "./commentSettings";
import { useParams } from "react-router-dom";
import AddComment from "./addComment";
import SortComments from "./sortComments";

interface postComment {
  post: any;
  commentAdd: boolean;
  setCommentAdd: (e: boolean) => void;
  current: boolean;
  userData: any;
  fetchData: () => void;
}

declare module "react" {
  interface TimeHTMLAttributes<T> extends HTMLAttributes<T> {
    pubdate?: string;
  }
}

const PostComment: React.FC<postComment> = ({
  post,
  userData,
  current,
  commentAdd,
  setCommentAdd,
  fetchData,
}) => {
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
  const plusSvg = (
    <svg
      className="w-3.5 h-3.5 text-white"
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
  const minusSvg = (
    <svg
      className="w-3.5 h-3.5 text-white "
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
        d="M5 12h14"
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

  const [comments, setComments] = useState([...post.user.comments].reverse());

  const [visibleContents, setVisibleContents] = useState<number>(4);
  const incriment = 4;

  const { id } = useParams();
  const fetchComment = async () => {
    const result = await axios.get(`http://localhost:3001/get/post/${id}`);
    await setComments([...result.data.post.user.comments].reverse());
  };
  const handleVote = async (vote: number, id: string, i: number) => {
    try {
      await axios.post(
        `http://localhost:3001/vote/comment/${vote}/${id}`,
        {},
        { withCredentials: true }
      );
      fetchComment();
    } catch (error) {
      console.error(error);
    }
  };

  const [sort, setSort] = useState<{ sort: string; e: boolean }>({
    sort: "recent",
    e: true,
  });
  useEffect(() => {
    const handleFilter = (sort: string, e: boolean) => {
      let sortedComments = [...comments];

      if (sort === "date") {
        sortedComments.sort((a: any, b: any) => {
          if (e) {
            return a.date.localeCompare(b.date);
          } else {
            return b.date.localeCompare(a.date);
          }
        });
      } else if (sort === "vote") {
        sortedComments.sort((a: any, b: any) => {
          const voteCountA = a.vote.reduce(
            (total: any, currentVote: any) =>
              total + (currentVote.vote ? 1 : -1),
            0
          );
          const voteCountB = b.vote.reduce(
            (total: any, currentVote: any) =>
              total + (currentVote.vote ? 1 : -1),
            0
          );
          if (e) {
            return voteCountA - voteCountB;
          } else {
            return voteCountB - voteCountA;
          }
        });
      }
      setComments(sortedComments.reverse());
    };
    handleFilter(sort.sort, sort.e);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);

  return (
    <div className="antialiased ">
      <SortComments setSort={setSort} sort={sort} />
      <AddComment
        commentAdd={commentAdd}
        fetchComment={fetchComment}
        post={post}
        setCommentAdd={setCommentAdd}
      />

      {comments.slice(0, visibleContents).map((comment: any, i: number) => {
        return (
          <div className="py-4 text-base rounded-lg" key={i}>
            <div className="flex flex-row">
              <div
                className="flex flex-col rounded-md items-center shadow-sm mr-4"
                role="group"
              >
                <button
                  type="button"
                  className={`px-3.5 py-1.5 font-medium border rounded-t-lg  ${
                    comment.vote.find((v: any) => v.vote === true)
                      ? "bg-green-600 text-white border-green-500"
                      : "bg-gray-800 text-gray-400 border-gray-700"
                  }`}
                  onClick={() => {
                    handleVote(1, comment._id, i);
                  }}
                >
                  {plusSvg}
                </button>
                <div className="px-3 w-full text-center py-1.5 text-sm font-medium border focus:z-10 focus:ring-2 bg-gray-800 border-gray-700 text-white">
                  {comment.vote.reduce(
                    (total: any, currentVote: any) =>
                      total + (currentVote.vote ? 1 : -1),
                    0
                  )}
                </div>
                <button
                  type="button"
                  className={`px-3.5 py-1.5 font-medium border rounded-b-lg ${
                    comment.vote.find((v: any) => v.vote === false)
                      ? "bg-red-600 text-white border-red-500"
                      : "bg-gray-800 text-gray-400 border-gray-700"
                  }`}
                  onClick={() => {
                    handleVote(0, comment._id, i);
                  }}
                >
                  {minusSvg}
                </button>
              </div>

              <div className="">
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
                  {<CommentSettings current={current} />}
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
