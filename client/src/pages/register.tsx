import axios, { AxiosResponse } from "axios";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [err, setErr] = useState<string | false>(false);

  // ? sended data
  const [emailD, setEmailD] = useState<string | null>(null);
  const [passwordD, setPasswordD] = useState<string | null>(null);
  const [nameD, setNameD] = useState<string | null>(null);
  const [lastNameD, setLastnNameD] = useState<string | null>(null);
  const [confirmPasswordD, SetconfirmPasswordD] = useState<string | null>(null);
  const [dayD, setDayD] = useState<number | null>(null);
  const [monthD, setMonthD] = useState<number | null>(null);
  const [yearD, setYearD] = useState<number | null>(null);

  // ? inputs handlers
  const emailHandler = (e: any) => {
    setEmailD(e.target.value);
  };
  const nameHandler = (e: any) => {
    setNameD(e.target.value);
  };
  const lastNameHandler = (e: any) => {
    setLastnNameD(e.target.value);
  };
  const passwordHandler = (e: any) => {
    setPasswordD(e.target.value);
  };
  const confirmPasswordHandler = (e: any) => {
    SetconfirmPasswordD(e.target.value);
  };
  const dayHanlder = (e: any) => {
    setDayD(parseInt(e.target.value));
  };
  const monthHandler = (e: any) => {
    const selectedMonthIndex = parseInt(e.target.value) - 1;
    setMonthD(selectedMonthIndex);
    const selectedMonthDays = months[selectedMonthIndex].days;
    setDays(generateRange(1, selectedMonthDays));
  };
  const yearHandler = (e: any) => {
    setYearD(parseInt(e.target.value));
  };

  // ! submit handler
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);
    setErr(false);

    const data = {
      emailD,
      nameD,
      lastNameD,
      passwordD,
      confirmPasswordD,
      dayD,
      monthD,
      yearD,
    };

    axios
      .post("http://localhost:3001/register", data, { withCredentials: true })
      .then((response: AxiosResponse) => {
        setLoading(false);
        if (response.status === 200 && response.statusText === "OK") {
          window.location.href = "/";
        }
      })
      .catch((error) => {
        console.log(error);
        setErr(error.response.data.error);
        setLoading(false);
      });
  };

  const generateRange: any = (start: number, end: number) => {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };
  const [days, setDays] = useState<number[]>([]);

  const months = [
    { name: "Janvier", days: 31 },
    { name: "Février", days: 29 },
    { name: "Mars", days: 31 },
    { name: "Avril", days: 30 },
    { name: "Mai", days: 31 },
    { name: "Juin", days: 30 },
    { name: "Juillet", days: 31 },
    { name: "Août", days: 31 },
    { name: "Septembre", days: 30 },
    { name: "Octobre", days: 31 },
    { name: "Novembre", days: 30 },
    { name: "Décembre", days: 31 },
  ];
  const [years, setYears] = useState([]);
  useEffect(() => {
    setYears(generateRange(1960, new Date().getFullYear()).reverse());
  }, []);

  const logoHandler = (e: any) => {
    navigate("/");
  };

  return (
    <section className="bg-gray-50 ">
      <div className="flex flex-col items-center justify-center py-8 mx-auto  ">
        <button className="flex items-center mb-6" onClick={logoHandler}>
          <img
            className="w-full h-11 mr-2"
            src="img\icons\noBgLogoBlack.png"
            alt="logo"
          />
        </button>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Créer un compte
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
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Votre adresse e-mail
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900
                  sm:text-sm rounded-lg focus:ring-gray-800 focus:border-gray-700
                  block w-full p-2.5"
                  placeholder="Adresse e-mail"
                  required={true}
                  onChange={emailHandler}
                />
              </div>
              {/* names */}
              <div>
                <div className="columns-2">
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
                  block w-full p-2.5"
                      placeholder="Nom"
                      required={true}
                      onChange={nameHandler}
                    />
                  </>
                  {/* last name */}
                  <>
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
                  block w-full p-2.5"
                      placeholder="Prenom"
                      required={true}
                      onChange={lastNameHandler}
                    />
                  </>
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Mot de passe
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm
                  rounded-lg focus:ring-gray-800 focus:border-gray-700 block w-full p-2.5"
                  required
                  onChange={passwordHandler}
                />
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Confirmez le mot de passe
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900
                  sm:text-sm rounded-lg focus:ring-gray-800 focus:border-gray-700 block w-full p-2.5 "
                  required
                  onChange={confirmPasswordHandler}
                />
                <ul className=" text-sm text-gray-500 list-disc list-inside m-1">
                  <li>Au moins 8 caractères (et jusqu'à 100 caractères)</li>
                </ul>
              </div>

              <div>
                <label
                  htmlFor="countries"
                  className="block mb-2  text-sm font-medium text-gray-900 "
                >
                  Date de naissance
                </label>
                <div className="grid grid-cols-3 gap-4">
                  <select
                    required
                    id="day"
                    name="day"
                    className="bg-gray-50 border border-gray-300 text-gray-900 
                    text-sm rounded-lg block w-full p-2.5  focus:ring-gray-800 focus:border-gray-700  "
                    onChange={dayHanlder}
                  >
                    <option value="" selected={true} disabled>
                      Jour
                    </option>
                    {days.map((day, index) => (
                      <option key={index} value={day} className="option-hover">
                        {day}
                      </option>
                    ))}
                  </select>
                  <select
                    required
                    id="month"
                    name="month"
                    onChange={monthHandler}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                    focus:ring-gray-800 focus:border-gray-700 block w-full p-2.5"
                  >
                    <option value="" selected={true} disabled>
                      mois
                    </option>
                    {months.map((month: any, i: number) => {
                      return (
                        <option value={i + 1} key={i}>
                          {month.name}
                        </option>
                      );
                    })}
                  </select>
                  <select
                    required
                    id="year"
                    name="year"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
                    focus:ring-gray-800 focus:border-gray-700 block w-full p-2.5"
                    onChange={yearHandler}
                  >
                    <option value="" selected={true} disabled>
                      Année
                    </option>
                    {years.map((year, i) => {
                      return (
                        <option value={year} key={i}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border text-gray-800 focus:ring-0 border-gray-300 rounded bg-gray-50  "
                    required={true}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-light text-gray-500 ">
                    J'accepte les&nbsp;
                    <button className="font-medium text-primary-600 hover:underline ">
                      Conditions générales
                    </button>
                  </label>
                </div>
              </div>

              <button
                disabled={loading ? true : false}
                type="submit"
                className="w-full px-5 py-2.5 text-center  text-white bg-gray-800 hover:bg-gray-700
                   font-medium rounded-lg text-sm focus:outline-none"
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
                  "Créer un compte"
                )}
              </button>

              <p className="text-sm font-light text-gray-500 ">
                Vous avez déjà un compte?&nbsp;
                <a
                  href="/login"
                  className="font-medium text-primary-600 hover:underline "
                >
                  Connectez-vous ici
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
