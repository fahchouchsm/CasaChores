import { useState } from "react";
import Input1 from "../components/becomeSeller/input1";
import Input2 from "../components/becomeSeller/input2";
import Input3 from "../components/becomeSeller/input3";

interface becomeSeller {
  userData: any;
  setUserData: (e: any) => void;
  loged: boolean;
}

const BecomeSeller: React.FC<becomeSeller> = ({
  userData,
  setUserData,
  loged,
}) => {
  if (!loged) {
    window.location.href = "/login";
  }

  const [typeSelc, setTypeSelc] = useState<number | null>(null);

  // * data
  const [phone, setPhone] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [steps, setSteps] = useState<number>(1);

  let content;
  switch (steps) {
    case 1:
      content = (
        <Input1
          userData={userData}
          setSteps={setSteps}
          phone={phone}
          setPhone={setPhone}
          setTypeSelc={setTypeSelc}
          userName={userName}
          setUserName={setUserName}
          typeSelc={typeSelc}
        />
      );
      break;
    case 2:
      content = (
        <Input2
          typeSelc={typeSelc}
          setSteps={setSteps}
          setUserData={setUserData}
          userData={userData}
          userName={userName}
        />
      );
      break;
    case 3:
      content = <Input3 />;
      break;
  }

  return (
    <div
      className="flex flex-col items-center justify-center mt-8 sm:mt-20 sm:mx-20
    md:mx-28 mx-0 p-6 rounded-lg sm:shadow-2xl sm:bg-gray-50"
    >
      <ol
        className="flex items-center justify-center w-full p-3 space-x-2 text-sm font-medium text-center
      text-gray-500 rounded-lg  sm:text-base sm:p-4 sm:space-x-4 rtl:space-x-reverse"
      >
        <li className="flex items-center select-none text-teal-600 ">
          <span
            className="flex items-center justify-center w-5 h-5 me-2 text-xs border 
          border-teal-800 rounded-full shrink-0 "
          >
            1
          </span>
          Personnel <span className="hidden sm:inline-flex sm:ms-2">Info</span>
          <svg
            className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
            aria-hidden="true"
            fill="none"
            viewBox="0 0 12 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m7 9 4-4-4-4M1 9l4-4-4-4"
            />
          </svg>
        </li>
        <li
          className={`flex items-center select-none ${
            steps === 2 || steps === 3 ? "text-teal-600" : "text-gray-500"
          }`}
        >
          <span
            className={`flex items-center justify-center w-5 h-5 me-2 text-xs border
            ${
              steps === 2 || steps === 3 ? "border-teal-600" : "border-gray-500"
            }  rounded-full shrink-0`}
          >
            2
          </span>
          Compte <span className="hidden sm:inline-flex sm:ms-2">Info</span>
          <svg
            className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
            aria-hidden="true"
            fill="none"
            viewBox="0 0 12 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m7 9 4-4-4-4M1 9l4-4-4-4"
            />
          </svg>
        </li>
        <li
          className={`flex items-center select-none ${
            steps === 3 ? "text-teal-600" : ""
          }`}
        >
          <span
            className={`flex items-center justify-center w-5 h-5 me-2 text-xs border
            ${
              steps === 3 ? "border-teal-600" : "border-gray-500"
            }  rounded-full shrink-0`}
          >
            3
          </span>
          <span className="hidden sm:inline-flex sm:ms-2 whitespace-nowrap">
            Créer un&nbsp;
          </span>
          Post
        </li>
      </ol>
      {content}
    </div>
  );
};

export default BecomeSeller;
