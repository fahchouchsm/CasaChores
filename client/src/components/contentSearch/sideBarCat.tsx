interface Category {
  name: string;
  num: number;
}

interface SideBarCatProps {
  cats: Category[];
  selCat: string | null;
  setSelCat: (e: string | null) => void;
}

const SideBarCat: React.FC<SideBarCatProps> = ({ cats, selCat, setSelCat }) => {
  const handlSelc = (mov: string) => {
    if (mov === selCat) {
      setSelCat(null);
    } else {
      setSelCat(mov);
    }
  };

  return (
    <div>
      <h5 className="uppercase text-sm font-medium text-gray-500 mb-4">
        Categories
      </h5>
      <ul>
        {cats.map((cat, i) => (
          <li key={i} className="mb-3">
            <button
              type="button"
              className={`flex items-center justify-between group w-full ${
                cat.name === selCat ? "text-blue-700" : "text-gray-900"
              }`}
              onClick={() => handlSelc(cat.name)}
            >
              <span className="flex items-center">
                <span className="text-base font-medium text-left">
                  {cat.name}
                </span>
              </span>
              <span className="text-base font-medium text-gray-500">{`(${cat.num})`}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideBarCat;
