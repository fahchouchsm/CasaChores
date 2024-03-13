const Input3 = () => {
  return (
    <div className="my-8 sm:mx-16 flex flex-col items-center sm:text-center">
      <div className="font-semibold text-2xl">Créer votre première post</div>
      <p className="mt-4 text-gray-600">
        Il est temps de présenter votre travail. Créez votre première
        publication pour que les gens puissent vous trouver. Partagez vos
        compétences, services et laissez-vous découvrir par la communauté!
      </p>
      <button
        className="mt-6 flex items-center bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-600 mx-auto"
        onClick={() => (window.location.href = "/new/post")}
      >
        Commencer
        <svg
          className="w-4 h-4 ml-4"
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
  );
};

export default Input3;
