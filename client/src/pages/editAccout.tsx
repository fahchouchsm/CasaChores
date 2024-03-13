import NavBar from "../components/navbar/navBar";
import EditAccountInfo from "../components/profile/settings/editAccountInfo";

interface editAccout {
  userData: any;
  loged: boolean;
}

const EditAccount: React.FC<editAccout> = ({ userData, loged }) => {
  if (!loged) {
    window.location.href = "/login";
  }

  return (
    <>
      <NavBar loged={loged} userData={userData} />
      <EditAccountInfo userData={userData} loged={loged} />
    </>
  );
};

export default EditAccount;
