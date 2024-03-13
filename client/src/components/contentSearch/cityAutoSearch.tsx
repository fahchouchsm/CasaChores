import data from "../../data.json";

const cities = data.cities;

const CityAutoSearch = () => {
  return (
    <>
      <select
        id="countries"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
        focus:ring-gray-800 focus:border-gray-800 block w-full p-2.5"
        placeholder="Ville"
      >
        <option value="">Choise une ville</option>
        {cities.map((mov: any, i: number) => (
          <option value={mov.name} key={i}>
            {mov.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default CityAutoSearch;
