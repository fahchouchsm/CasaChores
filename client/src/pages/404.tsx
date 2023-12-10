import { useNavigate } from "react-router-dom";

const E404 = () => {
  const navigate = useNavigate();

  const handleGobackButton = (e: any) => {
    navigate("/");
  };

  return (
    <section className="flex items-center justify-center min-h-screen bg-white pb-40">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-gray-800">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl ">
            Quelque chose manque.
          </p>
          <p className="mb-4 text-lg font-light text-gray-500 dark:text-gray-400">
            Désolé, nous ne pouvons pas trouver cette page. Vous trouverez
            beaucoup à explorer sur la page d'accueil.
          </p>
          <div className="mx-10">
            <button
              className="w-full  px-5 py-2.5 text-center  text-white bg-gray-800 hover:bg-gray-700
                font-medium rounded-lg text-sm focus:outline-none"
              onClick={handleGobackButton}
            >
              Retourner
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default E404;
