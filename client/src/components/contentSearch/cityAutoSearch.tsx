import data from "../../data.json";

const cities = data.cities;

interface cityAutoSearch {
  setSelCity: (e: string) => void;
  selCity: string;
}

const CityAutoSearch: React.FC<cityAutoSearch> = ({ selCity, setSelCity }) => {
  const changeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelCity(e.target.value);
  };

  return (
    <>
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
        focus:ring-gray-800 focus:border-gray-800 block w-full p-2.5"
        placeholder="Ville"
        value={selCity} // Set the value to selCity
        onChange={changeHandler}
      >
        {selCity ? (
          <option value={selCity}>{selCity}</option>
        ) : (
          <option value="">Choisissez une ville</option>
        )}
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
