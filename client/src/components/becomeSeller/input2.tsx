import axios from "axios";
import React, { ChangeEvent, useRef, useState } from "react";
import Loading from "../../pages/loading";

interface input2 {
  userData: any;
  setUserData: any;
  userName: string | null;
  setSteps: (e: number) => void;
  typeSelc: number | null;
}

const Input2: React.FC<input2> = ({
  userData,
  setUserData,
  userName,
  setSteps,
  typeSelc,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setLoading(true);

    if (files && files.length > 0) {
      const formData = new FormData();
      formData.append("image", files[0]);
      formData.append("userId", userData._id);
      const response = await axios.post(
        "http://localhost:3001/upload/user/pfp",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
          params: {
            userId: userData._id,
          },
        }
      );

      await setUserData(response.data.result);
      setLoading(false);
    } else {
      window.location.reload();
    }
  };

  const [bio, setBio] = useState<string>("");

  const handleSubmit = () => {
    setButtonLoading(true);
    axios
      .post(
        `http://localhost:3001/new/seller/${userData._id}`,
        { typeSelc, userName, bio },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res);
        setButtonLoading(false);
        setSteps(3);
      })
      .catch((err) => {
        console.log(err);
        setButtonLoading(false);
      });
  };

  return (
    <>
      <div className="sm:grid sm:grid-cols-3 flex flex-col sm:px-7 w-full">
        <div className="flex flex-col items-center py-9 ">
          <div className="relative group">
            {loading ? (
              <div className="w-24 h-24 mb-3 rounded-full shadow-lg inset-0 flex items-center justify-center">
                <Loading />
              </div>
            ) : (
              <>
                <div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    ref={inputRef}
                    onChange={handleFileChange}
                  />
                  <img
                    className="w-24 h-24 mb-3 rounded-full shadow-lg hover:opacity-50 cursor-pointer"
                    src={userData.pfpLink}
                    alt="PFP"
                  />
                  <div
                    className="absolute cursor-pointer inset-0 flex items-center justify-center opacity-0
           group-hover:opacity-100 transition-opacity"
                    onClick={() => inputRef.current?.click()}
                  >
                    <svg
                      className="w-8 h-8 text-white p-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 18"
                    >
                      <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
                      <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
                    </svg>
                  </div>
                </div>
              </>
            )}
          </div>
          <h5 className="mb-1 text-lg text-center font-medium text-gray-900">
            {userData.lastName} {userData.name}
          </h5>
          <span className="text-sm text-gray-500 mb-2">{userName}</span>
        </div>
        <div className="flex flex-col col-span-2  justify-center  text-left">
          <div className="mb-2  text-sm font-medium text-gray-900 text-left">
            À propos de toi :
          </div>
          <textarea
            id="message"
            rows={6}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg
          border border-gray-300 focus:ring-gray-700 focus:border-gray-600 resize-none"
            placeholder="Écrivez vos pensées ici..."
            maxLength={255}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setBio(e.target.value)
            }
          ></textarea>
        </div>
      </div>
      <button
        className={`bg-gray-800 hover:bg-gray-700   ml-auto  px-5 py-2.5 text-center 
        text-white font-medium rounded-lg text-sm focus:outline-none `}
        onClick={handleSubmit}
      >
        {buttonLoading ? (
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
            Chargement...
          </>
        ) : (
          "Suivant"
        )}
      </button>
    </>
  );
};

export default Input2;
