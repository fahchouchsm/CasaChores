import axios from "axios";
import { ChangeEvent, useRef, useState } from "react";
import Loading from "../../pages/loading";

interface ProfileChangePfpProps {
  userData: any;
  setUserData: (mov: any) => void;
}

const ProfileChangePfp: React.FC<ProfileChangePfpProps> = ({
  userData,
  setUserData,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    setLoading(true);

    if (files && files.length > 0) {
      const formData = new FormData();
      formData.append("image", files[0]);
      formData.append("userId", userData._id);

      try {
        const response = await axios.post(
          "http://localhost:3001/upload/user/pfp",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            params: {
              userId: userData._id,
            },
          },
        );

        setUserData(response.data.result);
        setLoading(false);
      } catch (error) {
        console.error("Error uploading:", error);
      }
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-md shadow">
      <div className="flex flex-col items-center py-9">
        <div className="relative group">
          {loading ? (
            <div className="w-24 h-24 mb-3 rounded-full shadow-lg inset-0 flex items-center justify-center">
              <Loading />
            </div>
          ) : (
            <>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                ref={inputRef}
                onChange={handleFileChange}
              />
              <img
                className="w-24 h-24 mb-3 rounded-full shadow-lg hover:opacity-50 cursor-pointer"
                src={
                  userData.pfpLink
                    ? userData.pfpLink
                    : "/img/icons/defaultPpf.png"
                }
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
            </>
          )}
        </div>
        <h5 className="mb-1 text-lg text-center font-medium text-gray-900">
          {`${userData.lastName} ${userData.name}`}
        </h5>
        <span className="text-sm text-gray-500 mb-2">{userData.email}</span>
        <div className="grid grid-cols-2 divide-x">
          <div className="px-4 col-span-1 text-center">
            <span className="text-gray-900 font-semibold text-sm">
              {userData.posts.length}
            </span>
            <br />
            <span className="text-gray-500 text-sm">Posts</span>
          </div>
          <div className="px-4 col-span-1 text-center">
            <span className="text-gray-900 font-semibold text-sm">
              {userData.userRating}
            </span>
            <br />
            <span className="text-gray-500 text-sm">
              {userData.reviews.length && (
                <span>{userData.reviews.length} Avis</span>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileChangePfp;
