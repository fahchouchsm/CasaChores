import { useNavigate } from "react-router-dom";

interface editAccountNav {
  userData: any;
}

const EditAcountNav: React.FC<editAccountNav> = ({ userData }) => {
  const navigate = useNavigate();

  const accountNav = [
    {
      name: "Nom",
      navigate: () => navigate(`/settings/user/edit/account/${userData._id}`),
    },
    {
      name: "Email",
      navigate: () => navigate(`/settings/user/edit/account/${userData._id}`),
    },
    {
      name: "Numéro de téléphone",
      navigate: () => navigate(`/settings/user/edit/account/${userData._id}`),
    },
    { name: "Mot de passe", navigate: () => navigate("/nom") },
  ];

  return (
    <div className="w-full mt-16">
      <div className="mx-12 sm:mx-16">
        <div className="text-xl font-semibold text-center pb-5">Compte</div>
        <div className="flex flex-col border rounded-lg divide-y">
          {accountNav.map((mov: any, i: number) => {
            return (
              <button
                className="inline-flex items-center justify-center py-3 px-4 w-full 
              text-left text-base font-medium hover:text-gray-900 hover:bg-gray-50"
                key={i}
                onClick={mov.navigate}
              >
                <span className="w-full">{mov.name}</span>
                <svg
                  className="w-3.5 h-3.5 text-gray-800"
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
      </div>
    </div>
  );
};

export default EditAcountNav;
