import NavBar from "../components/navbar/navBar";
import ProfileContent from "../components/profile/profileContent";

interface profileSettings {
  userData: any;
  setUserData: (mov: any) => void;
  loading: boolean;
  setLoading: (e: boolean) => void;
  loged: boolean;
}

const ProfileSettings: React.FC<profileSettings> = ({
  loged,
  userData,
  setUserData,
}) => {
  if (!loged) {
    window.location.href = "/login";
  }

  return (
    <>
      <NavBar loged={loged} userData={userData} />
      <ProfileContent
        userData={userData}
        setUserData={setUserData}
        loged={loged}
      />
    </>
  );
};

export default ProfileSettings;
