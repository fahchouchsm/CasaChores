import NavBar from "../../navbar/navBar";
import { useEffect, useState } from "react";
import EditNotification from "./editNotification";
import axios from "axios";
import Loading from "../../../pages/loading";
import EditAcountNav from "./editAccountNav";

interface settingNav {
  userData: any;
  setUserData: (mov: any) => any;
  loged: boolean;
}

const SettingNav: React.FC<settingNav> = ({ userData, loged }) => {
  if (!loged) {
    window.location.href = "/login";
  }

  const [selectedSetting, setSelectedSetting] = useState<number>(0);
  const [settingsData, setSettingsData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("http://localhost:3001/userSettings", {
          withCredentials: true,
        })
        .then((response) => {
          setSettingsData(response.data.settingsData);
        })
        .catch((err) => {
          window.location.href = "/";
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <NavBar loged={loged} userData={userData} />
      <div className="flex flex-1">
        <>
          <div className="grid sm:grid-cols-5 flex-1 select-none">
            <div className="sm:col-span-1 hidden sm:block flex-grow border-r">
              <div className=" text-xl hover:text-gray-800 font-semibold py-4 px-3.5 border-b ">
                Paramètres
              </div>
              <div
                className={`flex items-center py-3 px-2.5 cursor-pointer border-b  ${
                  selectedSetting === 0
                    ? "text-black font-semibold"
                    : "text-gray-500 font-normal"
                }`}
                onClick={() => setSelectedSetting(0)}
              >
                Compte
                <svg
                  className="w-3 h-3 text-gray-800 ml-auto "
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
              </div>
              <div
                className={`flex items-center py-3 px-2.5 cursor-pointer border-b  ${
                  selectedSetting === 1
                    ? "text-black font-bold"
                    : "text-gray-500 font-normal"
                }`}
                onClick={() => setSelectedSetting(1)}
              >
                Notifications
                <svg
                  className="w-3 h-3 text-gray-800 ml-auto "
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
              </div>
            </div>
            <div className="col-span-4">
              <div className="flex flex-col items-center w-full h-full ">
                {selectedSetting === 0 ? (
                  <EditAcountNav userData={userData} />
                ) : (
                  <EditNotification
                    settingsData={settingsData}
                    setSettingsData={setSettingsData}
                  />
                )}
              </div>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default SettingNav;
