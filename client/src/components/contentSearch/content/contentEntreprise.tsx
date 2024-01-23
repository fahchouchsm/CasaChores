const ContentEntreprise = () => {
  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-5 bg-white border border-gray-200 rounded-lg shadow">
        {/*  */}
        <div className="p-4">
          <img
            className="object-cover w-28 h-28 rounded-full"
            src="https://images.unsplash.com/photo-1481349518771-20055b2a7b24?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmFuZG9tfGVufDB8fDB8fHww"
            alt=""
          />
        </div>
        {/*  */}
        <div className="col-span-4 justify-between  pt-4 px-4 leading-normal text-left">
          <div className="grid grid-cols-2 place-content-between">
            <h5 className=" text-2xl font-bold tracking-tight text-gray-900 ">
              Dounia Boukerne
            </h5>
            <button
              className="inline-flex ml-auto items-center px-3 py-2 text-sm font-medium text-center
         text-white bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none
         focus:ring-blue-300 "
            >
              Contact
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
            </button>
          </div>

          <div className="">
            <span
              className="bg-gray-100 text-gray-800 text-xs font-medium 
         px-2.5 py-0.5 rounded"
            >
              Oujda
            </span>
          </div>
          {/* Reviews */}
          <div className="flex items-center pl-2 ">
            <svg
              className="w-3 h-3 text-gray-800"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 20"
            >
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
            </svg>
            <span className="ml-1 ">0.0 (0)</span>
          </div>
          {/* vehicule */}
          <div className="flex items-center pl-2 font-extralight">
            Véhicules : camionnette, vélo
          </div>
          {/* description */}
          <div className="w-auto py-2.5 px-3 mb-3 font-normal text-base text-gray-700 bg-gray-100  mt-3 rounded">
            <p className="">
              <span className="line-clamp-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Veritatis tempora cumque nobis. Nihil placeat necessitatibus
                quas consectetur consequuntur alias blanditiis exercitationem
                provident, inventore atque odit quibusdam, quod aliquam
                laboriosam explicabo. Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Veritatis tempora cumque nobis. Nihil placeat
                necessitatibus quas consectetur consequuntur alias blanditiis
                exercitationem provident, inventore atque odit quibusdam, quod
                aliquam laboriosam explicabo.
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentEntreprise;
