import { useEffect, useState } from "react";
import Loading from "../../pages/loading";
import ProfileChangePfp from "./profileChangePfp";
import ProfileNavSettings from "./profileNavSettings";
import { useNavigate } from "react-router-dom";

interface profileContent {
  userData: any;
  setUserData: (mov: any) => void;
  loged: boolean;
}

const ProfileContent: React.FC<profileContent> = ({
  userData,
  setUserData,
  loged,
}) => {
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const settingsNav = [
    {
      name: "Paramètres du compte",
      nav: () => {
        navigate(`/user/settings/${userData._id}`);
      },
    },
    {
      name: "Paramétres de notification",
      nav: () => {
        navigate("/user/settings/account");
      },
    },
  ];

  useEffect(() => {
    if (loged) {
      setLoading(false);
    } else {
      window.location.href = "/login";
    }
  }, [loged]);

  if (loading) {
    return (
      <div className="h-96">
        <Loading />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-7 my-10 mx-16">
      <ProfileChangePfp userData={userData} setUserData={setUserData} />

      <ProfileNavSettings settingsNav={settingsNav} />
    </div>
  );
};

export default ProfileContent;
