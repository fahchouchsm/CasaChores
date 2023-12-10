import { useNavigate, useParams } from "react-router-dom";
import Loading from "./loading";
import { useEffect } from "react";
import HeaderProfile from "../components/profile/headerProfile";

interface profile {
  userDataP: { _id: string }; // Assuming _id is always present
  loadingP: boolean;
  setLoadingP: (i: boolean) => void;
  setLogedP: (i: boolean) => void;
}

const Profile: React.FC<profile> = (p) => {
  const navigate = useNavigate();
  const { id } = useParams();
  p.setLoadingP(true);

  useEffect(() => {
    if (p.userDataP?._id !== id) {
      p.setLoadingP(false);
      navigate("/");
    }
    p.setLoadingP(false);
  });

  if (p.loadingP) {
    return <Loading />;
  }
  // ?
  return <HeaderProfile />;
};

export default Profile;
