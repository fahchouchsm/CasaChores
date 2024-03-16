import axios from "axios";
import Loading from "./loading";
import { useEffect } from "react";

interface logout {
  userData: any;
  loading: boolean;
  setLoading: (e: boolean) => void;
}

const Logout: React.FC<logout> = () => {
  useEffect(() => {
    const handleLogout = async () => {
      await axios
        .post("http://localhost:3001/logout", {}, { withCredentials: true })
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.error("Logout failed:", err);
        })
        .finally(() => {
          window.location.href = "/";
        });
    };

    handleLogout();
  }, []);

  return (
    <div className="h-screen w-screen">
      <Loading />
    </div>
  );
};

export default Logout;
