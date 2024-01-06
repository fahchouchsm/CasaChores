import { useNavigate } from "react-router-dom";

interface profileNavSettings {
  settingsNav: any[];
}

const ProfileNavSettings: React.FC<profileNavSettings> = ({ settingsNav }) => {
  const navigate = useNavigate();

  return (
    <div className="col-span-2">
      <div className="rounded-md border border-gray-200 divide-y ">
        {settingsNav.map((mov, i) => {
          return (
            <button
              className="inline-flex items-center justify-center py-3 px-4 w-full 
              text-left text-base font-medium hover:text-gray-900 hover:bg-gray-50"
              key={i}
              onClick={mov.nav}
            >
              <span className="w-full">{mov.name}</span>
              <svg
                className="w-4 h-4 text-gray-800"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 8 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
                />
              </svg>
            </button>
          );
        })}
      </div>
      <button
        className="inline-flex items-center justify-center border border-gray-200 rounded-md mt-5
        py-3 px-4 w-full text-left text-base font-medium hover:text-gray-900 hover:bg-gray-50 "
        onClick={() => navigate("/logout")}
      >
        <span className="w-full">Se déconnecter</span>
        <svg
          className="w-4 h-4 text-gray-800"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 8 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
          />
        </svg>
      </button>
    </div>
  );
};

export default ProfileNavSettings;
