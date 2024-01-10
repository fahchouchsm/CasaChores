import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface editAccountInfo {
  userData: any;
  loged: boolean;
}

const EditAccountInfo: React.FC<editAccountInfo> = ({ userData, loged }) => {
  const navigate = useNavigate();
  const [err, setErr] = useState<string | false>(false);
  const [loading, setLoading] = useState<boolean>(false);

  if (!loged) {
    window.location.href = "/login";
  }

  // ? sended data
  const [email, setEmail] = useState<any>(userData.email);
  const [name, setName] = useState<any>(userData.name);
  const [lastName, setLastnName] = useState<any>(userData.lastName);
  const [phone, setPhone] = useState<any>(userData.phone);

  // ? inputs handlers
  const emailHandler = (e: any) => {
    setEmail(e.target.value);
  };
  const nameHandler = (e: any) => {
    setName(e.target.value);
  };
  const lastNameHandler = (e: any) => {
    setLastnName(e.target.value);
  };

  // ! submit handler
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    setErr(false);

    axios
      .post(
        `http://localhost:3001/edit/user/${userData._id}`,
        { email, name, lastName, phone },
        { withCredentials: true },
      )
      .then((response) => {
        if (response.status === 200 && response.statusText === "OK") {
          window.location.href = "/";
        }
        setLoading(false);
      })
      .catch((error: any) => {
        console.log(error);
        setErr(error.response.data.error);
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col justify-center my-8 ">
      <button
        className="ml-3 flex items-center text-gray-800"
        onClick={() => navigate(`/user/settings/${userData._id}`)}
      >
        <svg
          className="w-3.5 h-3.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 8 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"
          />
        </svg>
        <div className="pl-1.5">Compte</div>
      </button>
      <div className="p-6 space-y-4 w-full">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-center text-gray-900 md:text-2xl pb-4">
          Modifier les informations personnelles
        </h1>
        {err ? (
          <div
            className="flex items-center p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
            role="alert"
          >
            <svg
              className="flex-shrink-0 inline w-4 h-4 me-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span className="sr-only">Info</span>
            <div>
              <span className="font-medium">Erreur!</span> {err}
            </div>
          </div>
        ) : (
          <></>
        )}
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          {/* names */}
          <div className="sm:columns-2">
            {/* first name */}
            <>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Nom
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900
              sm:text-sm rounded-lg focus:ring-gray-800 focus:border-gray-700
              block w-full p-3"
                placeholder="Nom"
                value={name}
                required={true}
                onChange={nameHandler}
              />
            </>
            {/* last name */}
            <div className="mt-6 sm:mt-0">
              <label
                htmlFor="lastName"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Prenom
              </label>
              <input
                type="name"
                name="lastName"
                id="lastName"
                className="bg-gray-50 border border-gray-300 text-gray-900 
              sm:text-sm rounded-lg focus:ring-gray-800 focus:border-gray-700
              block w-full p-3"
                placeholder="Prenom"
                value={lastName}
                required={true}
                onChange={lastNameHandler}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Adresse e-mail
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900
              sm:text-sm rounded-lg focus:ring-gray-800 focus:border-gray-700
              block w-full p-3"
              placeholder="Adresse e-mail"
              value={email}
              required={true}
              onChange={emailHandler}
            />
          </div>

          {/* Phone */}
          <>
            <div className="relative mt-0">
              <label
                htmlFor="phone-input"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Numéro de téléphone
              </label>
              <input
                type="tel"
                id="phone-input"
                name="phone-input"
                aria-describedby="helper-text-explanation"
                className="bg-gray-50 border border-gray-300 text-gray-900 mb-3
                sm:text-sm rounded-lg focus:ring-gray-800 focus:border-gray-700
                block w-full p-3 text-sm"
                pattern="[0-9]{10}"
                maxLength={10}
                placeholder="Numéro de téléphone (060 000 0001)"
                value={phone}
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const numericValue = e.target.value.replace(/\D/g, "");
                  const truncatedValue = numericValue.slice(0, 10);
                  setPhone(truncatedValue);
                }}
              />
            </div>
          </>
          <button
            className="bg-gray-700 flex items-center justify-center text-center rounded-lg p-3 text-white
            sm:ml-auto w-full sm:w-auto hover:bg-gray-600 sm:px-5"
            type="submit"
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
                Loading...
              </>
            ) : (
              "Sauvegarder"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditAccountInfo;
