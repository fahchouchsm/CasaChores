import Data from "../../data.json";

const SideBarCat = () => {
  const home = Data.categories.home;
  console.log(home);

  return (
    <div className="mb-5">
      <h5 className="uppercase text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
        Categories
      </h5>
      <ul>
        {home.map((mov, i) => {
          return (
            <li className="mb-3">
              <button
                type="button"
                className="flex items-center justify-between group w-full"
              >
                <span className="flex items-center">
                  <div></div>
                  <span className="text-gray-900 dark:text-white text-base font-medium group-hover:text-blue-700 dark:group-hover:text-blue-600">
                    {mov.name}
                  </span>
                </span>
                <span className="text-base font-medium text-gray-500 dark:text-gray-400 group-hover:text-blue-700 dark:group-hover:text-blue-600">
                  (0)
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SideBarCat;
