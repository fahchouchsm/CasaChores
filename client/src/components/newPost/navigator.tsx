import { useNavigate } from "react-router-dom";

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
          className="w-6 h-6 "
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
            d="m5 19 5.4-5.4m2.4-6.4 4 4-2 5.4L5.3 20 4 18.7l3.4-9.5 5.4-2Zm4.6 4.6-5.2-5.2L14.8 4 20 9.2l-2.6 2.6Z"
          />
        </svg>
      ),
    },
    {
      name: "Photos de l'annonce",
      subName: "Ajouter des photos de bonne qualité",
      selected: 2,
      arrow: true,
      icon: (
        <svg
          className="w-5 h-5"
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
            d="m3 16 5-7 6 6.5m6.5 2.5L16 13l-4.3 6m2.3-9h0M4 19h16c.6 0 1-.4 1-1V6c0-.6-.4-1-1-1H4a1 1 0 0 0-1 1v12c0 .6.4 1 1 1Z"
          />
        </svg>
      ),
    },
    {
      name: "Publication de l'annonce",
      subName: "Confirmer les informations de votre annonce",
      selected: 3,
      arrow: false,
      icon: (
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M13.09 3.294c1.924.95 3.422 1.69 5.472.692a1 1 0 0 1 1.438.9v9.54a1 1 0 0 1-.562.9c-2.981 1.45-5.382.24-7.25-.701a38.739 38.739 0 0 0-.622-.31c-1.033-.497-1.887-.812-2.756-.77-.76.036-1.672.357-2.81 1.396V21a1 1 0 1 1-2 0V4.971a1 1 0 0 1 .297-.71c1.522-1.506 2.967-2.185 4.417-2.255 1.407-.068 2.653.453 3.72.967.225.108.443.216.655.32Z" />
        </svg>
      ),
    },
  ];

  const navigate = useNavigate();

  return (
    <div
      className="w-full flex justify-center items-center 
                flex-row bg-white shadow-md py-3 px-4 sm:px-24"
    >
      <div
        className={`mr-auto font-semibold gap-2 flex flex-row items-center cursor-pointer ${
          step === 0 ? "opacity-0 pointer-events-none" : ""
        }`}
        onClick={() => {
          setSteps(step - 1);
        }}
      >
        <svg
          className="w-5 h-5 text-gray-800 "
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
            d="M5 12h14M5 12l4-4m-4 4 4 4"
          />
        </svg>
        <div className="">Retour</div>
      </div>
      <div className="flex flex-row gap-2">
        {stepsData.map((mov, i: number) => {
          return (
            <div
              className={`flex flex-row items-center  ${
                mov.selected <= step ? " text-teal-600 " : ""
              }`}
              key={i}
            >
              {step > mov.selected ? (
                <svg
                  className="w-8 h-8 mx-0.5 text-green-500"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm13.7-1.3a1 1 0 0 0-1.4-1.4L11 12.6l-1.8-1.8a1 1 0 0 0-1.4 1.4l2.5 2.5c.4.4 1 .4 1.4 0l4-4Z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <div
                  className={`rounded-full mx-0.5 w-7 h-7 flex items-center justify-center ${
                    mov.selected <= step
                      ? "bg-teal-600 text-white"
                      : "bg-gray-200 text-gray-50 "
                  }`}
                >
                  {mov.icon}
                </div>
              )}

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

      <div
        className="sm:block hidden ml-auto font-semibold cursor-pointer"
        onClick={() => {
          navigate(-1);
        }}
      >
        Quitter
      </div>
      <div className="ml-auto sm:hidden block ">
        <svg
          className="w-4 h-4"
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
