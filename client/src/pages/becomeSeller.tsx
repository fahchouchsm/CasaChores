import { useState } from "react";

const BecomeSeller = () => {
  const [typeSelc, setTypeSelc] = useState<number | null>(null);

  // * data
  const [phone, setPhone] = useState<string | null>();

  return (
    <div
      className="flex flex-col items-center justify-center mt-8 sm:mt-20 sm:mx-28
    md:mx-28 mx-0 p-6 rounded-lg shadow bg-gray-50"
    >
      <ol
        className="flex items-center justify-center w-full p-3 space-x-2 text-sm font-medium text-center
      text-gray-500 rounded-lg  sm:text-base sm:p-4 sm:space-x-4 rtl:space-x-reverse"
      >
        <li className="flex items-center text-teal-700 ">
          <span
            className="flex items-center justify-center w-5 h-5 me-2 text-xs border 
          border-teal-800 rounded-full shrink-0 "
          >
            1
          </span>
          Personal <span className="hidden sm:inline-flex sm:ms-2">Info</span>
          <svg
            className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
            aria-hidden="true"
            fill="none"
            viewBox="0 0 12 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m7 9 4-4-4-4M1 9l4-4-4-4"
            />
          </svg>
        </li>
        <li className="flex items-center">
          <span
            className="flex items-center justify-center w-5 h-5 me-2 text-xs border
          border-gray-500 rounded-full shrink-0 "
          >
            2
          </span>
          Account <span className="hidden sm:inline-flex sm:ms-2">Info</span>
          <svg
            className="w-3 h-3 ms-2 sm:ms-4 rtl:rotate-180"
            aria-hidden="true"
            fill="none"
            viewBox="0 0 12 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m7 9 4-4-4-4M1 9l4-4-4-4"
            />
          </svg>
        </li>
        <li className="flex items-center">
          <span
            className="flex items-center justify-center w-5 h-5 me-2 text-xs border
          border-gray-500 rounded-full shrink-0 "
          >
            3
          </span>
          Profile
        </li>
      </ol>
      <div
        className={`flex flex-row my-4 ${
          typeSelc === 1
            ? "text-teal-500 hover:text-teal-600"
            : "text-gray-800 hover:text-gray-700"
        }`}
      >
        <div className="mr-12" onClick={() => setTypeSelc(1)}>
          <svg
            className={`w-16 h-16 cursor-pointer`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 14 18"
          >
            <path d="M7 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Zm2 1H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z" />
          </svg>
          <div className="text-center pt-2.5 font-medium">Individuel</div>
        </div>
        {/*  */}
        <div className="border-r-2" />
        {/*  */}
        <div
          className={`ml-12 cursor-pointer ${
            typeSelc === 2
              ? "text-teal-700 hover:text-teal-600 font-medium"
              : "text-gray-800 hover:text-gray-700"
          }`}
          onClick={() => setTypeSelc(2)}
        >
          <svg
            className={`w-16 h-16 cursor-pointer`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M17.876.517A1 1 0 0 0 17 0H3a1 1 0 0 0-.871.508C1.63 1.393 0 5.385 0 6.75a3.236 3.236 0 0 0 1 2.336V19a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-6h4v6a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V9.044a3.242 3.242 0 0 0 1-2.294c0-1.283-1.626-5.33-2.124-6.233ZM15.5 14.7a.8.8 0 0 1-.8.8h-2.4a.8.8 0 0 1-.8-.8v-2.4a.8.8 0 0 1 .8-.8h2.4a.8.8 0 0 1 .8.8v2.4ZM16.75 8a1.252 1.252 0 0 1-1.25-1.25 1 1 0 0 0-2 0 1.25 1.25 0 0 1-2.5 0 1 1 0 0 0-2 0 1.25 1.25 0 0 1-2.5 0 1 1 0 0 0-2 0A1.252 1.252 0 0 1 3.25 8 1.266 1.266 0 0 1 2 6.75C2.306 5.1 2.841 3.501 3.591 2H16.4A19.015 19.015 0 0 1 18 6.75 1.337 1.337 0 0 1 16.75 8Z" />
          </svg>
          <div className="text-center pt-2.5 font-medium">Entreprise</div>
        </div>
      </div>

      {/*  */}
      {typeSelc ? (
        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 w-full sm:px-16 px-0 py-8">
          <div className="sm:col-span-2">
            <label
              htmlFor="userName"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Nom d'utilisateur
            </label>
            <input
              type="text"
              id="userName"
              autoComplete="off"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
              focus:ring-gray-800 focus:border-gray-700 block w-full p-2.5"
              placeholder="Nom d'utilisateur"
              required={true}
            />
          </div>
          {/*  */}
          <div className="w-full">
            <label
              htmlFor="brand"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Numéro de telephone
            </label>
            <div className="flex items-center mt-2">
              <div
                className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm 
                font-medium text-center text-gray-900 bg-gray-100 border border-gray-300
                rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100"
              >
                +212
              </div>
              <div className="relative w-full">
                <input
                  type="tel"
                  pattern="[0-9]{9}"
                  inputMode="numeric"
                  id="phone-input"
                  aria-describedby="helper-text-explanation"
                  className="block p-2.5 w-full z-20 text-gray-900 bg-gray-50 rounded-e-lg 
                  border-s-0 border border-gray-300 text-sm 
                  focus:ring-gray-800 focus:border-gray-700"
                  placeholder="123456789"
                  onInput={(e) => {
                    const inputValue = (
                      e.target as HTMLInputElement
                    ).value.replace(/[^0-9]/g, "");

                    // Limit the input to exactly 9 characters
                    if (inputValue.length > 9) {
                      (e.target as HTMLInputElement).value = inputValue.slice(
                        0,
                        9,
                      );
                    } else {
                      (e.target as HTMLInputElement).value = inputValue;
                    }
                  }}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setPhone(e.target.value);
                  }}
                  required={true}
                />
              </div>
            </div>
          </div>
          <div className="w-full">
            <label
              htmlFor="price"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Lien WhatsApp
            </label>
            <input
              type="text"
              id="disabled-input-2"
              aria-label="disabled input 2"
              className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg
              focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-pointer"
              value={`https://wa.me/${phone}`}
              disabled
              readOnly={true}
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Category
            </label>
            <select
              id="category"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
              focus:ring-gray-800 focus:border-primary-500 block w-full p-2.5"
            >
              <option selected={true}>Select category</option>
              <option value="TV">TV/Monitors</option>
              <option value="PC">PC</option>
              <option value="GA">Gaming/Console</option>
              <option value="PH">Phones</option>
            </select>
          </div>
          <div>
            <label
              htmlFor="item-weight"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Item Weight (kg)
            </label>
            <input
              type="number"
              name="item-weight"
              id="item-weight"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
              focus:ring-gray-800 focus:border-gray-700 block w-full p-2.5"
              placeholder="12"
              required={true}
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Description
            </label>
            <textarea
              id="description"
              rows={8}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border
              border-gray-300 focus:ring-gray-800 focus:border-primary-500"
              placeholder="Your description here"
              defaultValue={""}
            />
          </div>
          {/* {typeSelc === 0 && <Input0 />}
        {typeSelc === 1 && <Input1 />} */}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default BecomeSeller;
