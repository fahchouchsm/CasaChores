interface navigator {
  step: number;
  setSteps: (e: number) => void;
}

const Navigator: React.FC<navigator> = ({ setSteps, step }) => {
  const stepsData = [
    {
      name: "Information Général",
      subName: "Remplir les informations générales de votre annonce",
      selected: 0,
      arrow: true,
      icon: (
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
            d="M5 7h14M5 12h14M5 17h14"
          />
        </svg>
      ),
    },
    {
      name: "Détails de l'annonce",
      subName: "Ajouter plus de détails de votre annonce",
      selected: 1,
      arrow: true,
      icon: (
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
            d="M5 7h14M5 12h14M5 17h14"
          />
        </svg>
      ),
    },
    {
      name: "Information Général",
      subName: "Remplir les informations générales de votre annonce",
      selected: 2,
      arrow: true,
      icon: (
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
            d="M5 7h14M5 12h14M5 17h14"
          />
        </svg>
      ),
    },
    {
      name: "Information Général",
      subName: "Remplir les informations générales de votre annonce",
      selected: 3,
      arrow: false,
      icon: (
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
            d="M5 7h14M5 12h14M5 17h14"
          />
        </svg>
      ),
    },
  ];

  return (
    <div
      className="w-full flex justify-center items-center 
flex-row bg-white shadow-md py-3 pl-16 sm:pl-32"
    >
      <div className="flex flex-row gap-2">
        {stepsData.map((mov, i: number) => {
          return (
            <div
              className={`flex flex-row items-center  ${
                mov.selected <= step ? " text-teal-600 " : ""
              }`}
              key={i}
            >
              <div
                className={`rounded-full mx-0.5 w-7 h-7 flex items-center justify-center ${
                  mov.selected <= step
                    ? "bg-teal-600 text-white"
                    : "bg-gray-200 text-gray-50 "
                }`}
              >
                {mov.icon}
              </div>
              {/* text */}
              <div
                className={`flex flex-col pl-2  ${
                  mov.selected === step ? "sm:block hidden" : "hidden"
                }`}
              >
                <div className="font-semibold">{mov.name}</div>
                <div className="text-xs">{mov.subName}</div>
              </div>
              {mov.arrow ? (
                <svg
                  className="w-4 h-4 text-black"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m9 5 7 7-7 7"
                  />
                </svg>
              ) : (
                <></>
              )}
            </div>
          );
        })}
      </div>
      <div className="sm:block hidden ml-auto mr-4 font-semibold cursor-pointer">
        Quitter
      </div>
      <div className="ml-auto sm:hidden block mr-4">
        <svg
          className="w-6 h-6 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18 18 6m0 12L6 6"
          />
        </svg>
      </div>
    </div>
  );
};

export default Navigator;
