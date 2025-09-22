interface ContentProps {
  posts: any[] | null;
  typeCat: number;
}

const ContentPersonnel: React.FC<ContentProps> = ({ posts, typeCat }) => {
  const arrowSvg = (
    <svg
      className="rtl:rotate-180 w-3.5 h-3.5 ms-2 "
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 10"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M1 5h12m0 0L9 1m4 4L9 9"
      />
    </svg>
  );
  const starSvg = (
    <svg
      className="w-3 h-3 text-gray-800"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 22 20"
    >
      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
    </svg>
  );

 

  return (
    <div className="flex flex-col gap-2">
      {posts && posts.length > 0 ? (
        posts?.map((post, i) => {
          return (
            <div
              className="grid grid-cols-8 bg-white border border-gray-200 rounded-lg shadow"
              key={i}
            >
              {/* img */}
              <div className="p-4 col-span-2 flex-col flex items-center justify-center">
                <img
                  className="object-cover w-28 h-28 rounded-full mb-3"
                  src={post.user ? post.user.pfpLink : ""}
                  alt="main"
                />
                <div className="text-center font-medium">
                  {post.user && post.user.name}{" "}
                  {post.user && post.user.lastName}
                </div>
              </div>
              {/* header */}
              <div className="col-span-6 justify-between pt-4 px-4 leading-normal text-left">
                <div className="flex flex-row items-start">
                  {/* name */}
                  <div className="font-bold">
                    <div
                      className="text-lg text-gray-900 hover:underline cursor-pointer"
                      onClick={() => {
                        window.location.href = `/post/${post._id}`;
                      }}
                    >
                      {post.title}
                    </div>
                    <div className="flex items-center font-normal text-gray-600">
                      {post.serviceOfred &&
                        post.serviceOfred.length > 1 &&
                        post.serviceOfred[1]}
                    </div>
                  </div>
                  {/* button */}
                  <button
                    className="inline-flex ml-auto items-center px-3 py-2 text-sm font-medium text-center
      text-white bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none
      focus:ring-blue-300"
                  >
                    Contact
                    {arrowSvg}
                  </button>
                </div>
                {/* city */}
                <div className="">
                  <span
                    className="bg-gray-100 text-gray-800 text-xs font-medium 
      px-2.5 py-0.5 rounded"
                  >
                    {post.city}
                  </span>
                </div>
                {/* Reviews */}
                {/* Reviews */}
                <div className="flex items-center pl-2 ">
                  {starSvg}
                  <span className="ml-1 ">
                    {post.user && post.user.reviews
                      ? post.user.reviews.length
                      : 0}
                  </span>
                </div>

                {/* description */}
                <div className="w-auto py-2.5 px-3 mb-3 font-normal text-base text-gray-700 bg-gray-100  mt-3 rounded">
                  <p className="">
                    <span className="line-clamp-3">{post.description}</span>
                  </p>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="w-full px-4 text-center pt-16 font-medium">
          Nous n'avons trouvé aucun article correspondant à votre recherche.
          Veuillez réessayer avec d'autres critères de recherche.
        </div>
      )}
    </div>
  );
};

export default ContentPersonnel;
