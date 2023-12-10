import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [err, setErr] = useState<string | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(false);
  const emailHandler = (e: any) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e: any) => {
    setPassword(e.target.value);
  };
  const rememberHandler = (e: any) => {
    setRemember(!remember);
  };

  // ! submit handler
  const submitHandler = async (e: any) => {
    e.preventDefault();

    const data = { email, password, remember };
    setLoading(true);

    axios
      .post("http://localhost:3001/login", data, { withCredentials: true })
      .then((response) => {
        setLoading(false);
        setErr(null);
        window.location.href = "/";
      })
      .catch((error) => {
        setLoading(false);
        setErr(
          "L'adresse e-mail ou le mot de passe que vous avez saisi n'est pas valide",
        );
      });
  };

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
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Connectez-vous à votre compte
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
            <form
              className="space-y-4 md:space-y-6"
              action="#"
              onSubmit={submitHandler}
            >
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
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                  focus:ring-gray-800 focus:border-gray-700 block w-full p-2.5 "
                  placeholder="Adresse e-mail"
                  required={true}
                  onChange={emailHandler}
                />
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
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg 
                  focus:ring-gray-800 focus:border-gray-700 block w-full p-2.5 "
                  required={true}
                  onChange={passwordHandler}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border text-gray-800 border-gray-300 rounded bg-gray-50 
                      focus:ring-0 focus:ring-primary-300"
                      onChange={rememberHandler}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500">
                      Se souvenir de moi
                    </label>
                  </div>
                </div>
                <button className="text-sm font-medium text-primary-600 hover:underline">
                  Mot de passe oublié ?
                </button>
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
                  "Se connecter"
                )}
              </button>

              <p className="text-sm font-light text-gray-500 ">
                Vous n'avez pas encore de compte?&nbsp;
                <a
                  href="/register"
                  className="font-medium text-primary-600 hover:underline"
                >
                  Inscrivez-vous ici
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
