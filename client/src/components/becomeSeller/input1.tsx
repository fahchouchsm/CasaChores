import axios from "axios";
import { useState } from "react";
import CountdownButton from "./countdownButton";

interface input1 {
  userData: any;
  setSteps: (e: number) => void;
  userName: string | null;
  setUserName: (e: string) => void;
  phone: string | null;
  setPhone: (e: string) => void;
  typeSelc: number | null;
  setTypeSelc: (e: number) => void;
}

const Input1: React.FC<input1> = ({
  userData,
  setSteps,
  userName,
  setUserName,
  phone,
  setPhone,
  typeSelc,
  setTypeSelc,
}) => {
  // * countdown
  const [countdown, setCountdown] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingSend, setLoadingSend] = useState<boolean>(false);

  function sellerTypeHandler() {
    if (typeSelc) {
      switch (typeSelc) {
        case 1:
          return "individual";

        case 2:
          return "company";
        default:
          return null;
      }
    }
    return null;
  }

  const data = {
    phone,
    userName,
    sellerType: sellerTypeHandler(),
  };

  const isValidPhone = !!phone && /^\d{9}$/.test(phone);
  const [code, setCode] = useState<string>("");

  const allValuesNotNull =
    Object.values(data).every((value) => value !== null && value !== "") &&
    isValidPhone &&
    userName &&
    userName.length >= 5 &&
    code?.length > 4;

  const [errorUserName, SetErrorUserName] = useState<string | null>();
  const [errorPhone, SetErrorPhone] = useState<string | null>();
  const [errCode, setErrorCode] = useState<string | null>();

  const sendData = () => {
    axios
      .post("http://localhost:3001/check/userNamePhone", data, {
        withCredentials: true,
      })
      .then((result) => {
        const { userName, phone } = result.data;
        setLoading(false);

        setLoading(phone);
        if (phone) {
          SetErrorPhone("Le numéro de téléphone est déja utilisé.");
        }
        if (userName) {
          SetErrorUserName("Le nom d'utilisateur est déja utilisé.");
        }
        if (!userName && !phone) {
          setSteps(2);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const wsSend = () => {
    setLoadingSend(true);
    axios
      .post(
        `http://localhost:3001/ws/send/${userData._id}`,
        { phone: phone },
        {
          withCredentials: true,
        },
      )
      .then((result) => {
        console.log(result);
        setLoadingSend(false);
        setCountdown(true);
      })
      .catch((err) => {
        console.log("Erreur lors de l'envoi du message");
        setLoadingSend(false);
      });
  };

  const wsCheck = () => {
    setLoading(true);
    axios
      .post(
        `http://localhost:3001/ws/check/${userData._id}`,
        { code: code },
        {
          withCredentials: true,
        },
      )
      .then((result) => {
        console.log(result);
        if (result.data.message) {
          sendData();
        } else {
          setErrorCode("Code incorrect");
        }
        setLoading(false);
      })
      .catch((err) => {
        setErrorCode("Code incorrect");
      });
  };

  return (
    <>
      <div className={`flex flex-row my-4`}>
        <div
          className={`mr-12 cursor-pointer ${
            typeSelc === 1
              ? "text-teal-500 hover:text-teal-600 font-medium"
              : "text-gray-800 hover:text-gray-700"
          }`}
          onClick={() => setTypeSelc(1)}
        >
          <svg
            className={`w-16 h-16 cursor-pointer`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 14 18"
          >
            <path d="M7 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm2 1H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
          </svg>
          <div className="text-center pt-2.5 font-medium">Individuel</div>
        </div>
        {/*  */}
        <div className="border-r-2" />
        {/*  */}
        <div
          className={`ml-12 cursor-pointer ${
            typeSelc === 2
              ? "text-teal-500 hover:text-teal-600 font-medium"
              : "text-gray-800 hover:text-gray-700"
          }`}
          onClick={() => setTypeSelc(2)}
        >
          <svg
            className={`w-16 h-16 `}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M17.876.517A1 1 0 0 0 17 0H3a1 1 0 0 0-.871.508C1.63 1.393 0 5.385 0 6.75a3.236 3.236 0 0 0 1 2.336V19a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6h4v6a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V9.044a3.242 3.242 0 0 0 1-2.294c0-1.283-1.626-5.33-2.124-6.233ZM15.5 14.7a.8.8 0 0 1-.8.8h-2.4a.8.8 0 0 1-.8-.8v-2.4a.8.8 0 0 1 .8-.8h2.4a.8.8 0 0 1 .8.8v2.4ZM16.75 8a1.252 1.252 0 0 1-1.25-1.25 1 1 0 0 0-2 0 1.25 1.25 0 0 1-2.5 0 1 1 0 0 0-2 0 1.25 1.25 0 0 1-2.5 0 1 1 0 0 0-2 0A1.252 1.252 0 0 1 3.25 8 1.266 1.266 0 0 1 2 6.75C2.306 5.1 2.841 3.501 3.591 2H16.4A19.015 19.015 0 0 1 18 6.75 1.337 1.337 0 0 1 16.75 8Z" />
          </svg>
          <div className="text-center pt-2.5 font-medium">Entreprise</div>
        </div>
      </div>
      {/*  */}
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 w-full sm:px-7 md:px-16 px-0 pt-8">
        <div className="sm:col-span-1">
          <label
            htmlFor="userName"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Nom d'utilisateur
          </label>
          <input
            type="text"
            id="userName"
            autoComplete="off"
            maxLength={18}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
        focus:ring-gray-800 focus:border-gray-700 block w-full p-2.5"
            placeholder="Nom d'utilisateur"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setUserName(e.target.value);
            }}
            required={true}
          />
          {errorUserName ? (
            <p className="mt-2 text-sm text-red-600 pl-2">{errorUserName}</p>
          ) : (
            <></>
          )}
        </div>
        <div className=" hidden sm:block col-span-1"></div>
        {/*  */}
        <div className="w-full">
          <label
            htmlFor="brand"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Numéro de telephone
          </label>

          <div className="flex items-center mt-2">
            <div
              className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm 
          font-medium text-center text-gray-900 bg-gray-100 border border-gray-300
          rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setUserName(e.target.value);
              }}
            >
              +212
            </div>
            <div className="relative w-full">
              <input
                type="tel"
                pattern="[0-9]{9}"
                inputMode="numeric"
                id="phone-input"
                aria-describedby="helper-text-explanation"
                className="block p-2.5 w-full z-20 text-gray-900 bg-gray-50 rounded-e-lg 
            border-s-0 border border-gray-300 text-sm 
            focus:ring-gray-800 focus:border-gray-700"
                placeholder="123456789"
                onInput={(e) => {
                  const inputValue = (
                    e.target as HTMLInputElement
                  ).value.replace(/[^0-9]/g, "");

                  // Limit the input to exactly 9 characters
                  if (inputValue.length > 9) {
                    (e.target as HTMLInputElement).value = inputValue.slice(
                      0,
                      9,
                    );
                  } else {
                    (e.target as HTMLInputElement).value = inputValue;
                  }
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setPhone(e.target.value);
                }}
                required={true}
              />
            </div>
          </div>
          {errorPhone ? (
            <p className="mt-2 text-sm text-red-600 pl-2">{errorPhone}</p>
          ) : (
            <></>
          )}
        </div>
        <div className="w-full">
          <label
            htmlFor="price"
            className="block mb-2 text-sm font-medium text-gray-900 "
          >
            Code de confirmation
          </label>
          <input
            type="text"
            maxLength={12}
            autoComplete="off"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
        focus:ring-gray-800 focus:border-gray-700 block w-full p-2.5"
            placeholder="Code de confirmation"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setCode(e.target.value);
            }}
            required={true}
          />
          {errCode ? (
            <p className="mt-2 text-sm text-red-600 pl-2">{errCode}</p>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="flex-col ml-auto">
        {!countdown ? (
          <button
            className={`${
              !isValidPhone
                ? "bg-gray-400 hover:bg-gray-400 "
                : " bg-gray-700 hover:bg-gray-600"
            }
          ml-auto  px-5 py-2.5 text-center  text-white font-medium rounded-lg text-sm focus:outline-none mt-5 mr-4`}
            disabled={!isValidPhone}
            onClick={wsSend}
          >
            {loadingSend ? (
              <>
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
                Chargement...
              </>
            ) : (
              "Envoyer le code"
            )}
          </button>
        ) : (
          <CountdownButton countdown={countdown} setCountdown={setCountdown} />
        )}
        <button
          className={`${
            !allValuesNotNull
              ? "bg-gray-400 hover:bg-gray-400 cursor-default"
              : " bg-gray-800 hover:bg-gray-700"
          }
          ml-auto  px-5 py-2.5 text-center  text-white font-medium rounded-lg text-sm focus:outline-none mt-5`}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            wsCheck();
          }}
          disabled={!allValuesNotNull}
        >
          {loading ? (
            <>
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
              Chargement...
            </>
          ) : (
            "Suivant"
          )}
        </button>
      </div>
    </>
  );
};

export default Input1;
