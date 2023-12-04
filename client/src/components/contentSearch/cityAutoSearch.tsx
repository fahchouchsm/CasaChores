import data from "../../data.json";

const cities = data.cities;

const CityAutoSearch = () => {
  return (
    <>
      <select
        id="countries"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Ville"
      >
        <option selected={true}>Choisie une ville</option>
        {cities.map((mov: any, i: number) => {
          return (
            <option value="mov.name" key={i}>
              {mov.name}
            </option>
          );
        })}
      </select>
    </>
  );
};

export default CityAutoSearch;
