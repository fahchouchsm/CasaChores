import Data from "../../data.json";

const SideBarCat = () => {
  const home = Data.categories.home;

  return (
    <div>
      <h5 className="uppercase text-sm font-medium text-gray-500 mb-4">
        Categories
      </h5>
      <ul>
        {home.map((mov, i) => (
          <li key={i} className="mb-3">
            <button
              type="button"
              className="flex items-center justify-between group w-full"
            >
              <span className="flex items-center">
                <span
                  className="text-gray-900 text-base font-medium
                group-hover:text-blue-700 text-left"
                >
                  {mov.name}
                </span>
              </span>
              <span className="text-base font-medium text-gray-500 group-hover:text-blue-700">
                (0)
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBarCat;
