import { BrowserRouter, Routes, Route } from "react-router-dom";
import E404 from "./pages/404";
import Login from "./pages/login";
import Register from "./pages/register";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import Loading from "./pages/loading";
import Home from "./pages/home";
import Profile from "./pages/profileSettings";
import Logout from "./pages/logout";
import Account from "./components/profile/settings/settingNav";
import SettingNav from "./components/profile/settings/settingNav";
import BecomeSeller from "./pages/becomeSeller";
import EditAccount from "./pages/editAccout";
import NewPost from "./pages/newPost";
import Search from "./pages/search";
import Post from "./pages/post";

export default function App() {
  const [loged, setLoged] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [autoCity, setAutoCity] = useState<string>("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/jwt", { withCredentials: true })
      .then((response: AxiosResponse) => {
        if (response.status === 200) {
          setLoged(true);
          setUserData(response.data.userData);
        } else {
          window.location.href = "/";
        }
      })
      .catch((err) => {
        setLoged(false);
        setUserData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [loged]);

  const fetchCity = async () => {
    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        },
      );

      const { latitude, longitude } = position.coords;
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
      const response = await fetch(url);
      const data = await response.json();

      setAutoCity(data.address.city);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    fetchCity();
    return (
      <div className="h-screen">
        <Loading />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* authentication */}
        <Route path="/">
          <Route index element={<Home userData={userData} loged={loged} />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        {/* Search */}
        <Route
          path="/search/:category"
          element={
            <Search loged={loged} userData={userData} autoCity={autoCity} />
          }
        />
        {/* Post view */}
        <Route
          path="/post/:id"
          element={<Post loged={loged} userData={userData} />}
        />
        {/* Settings */}
        <>
          <Route path="settings">
            <Route
              path="profile/:id?"
              element={
                <Profile
                  loading={loading}
                  setLoading={setLoading}
                  userData={userData}
                  setUserData={setUserData}
                  loged={loged}
                />
              }
            />
            <Route path="user">
              <Route
                path="nav/:id?"
                index
                element={
                  <SettingNav
                    userData={userData}
                    loged={loged}
                    setUserData={setUserData}
                  />
                }
              />
              <Route
                path="edit/account/:id"
                element={<EditAccount loged={loged} userData={userData} />}
              />
            </Route>

            <Route
              path="account/:id"
              element={
                <Account
                  loged={loged}
                  userData={userData}
                  setUserData={setUserData}
                />
              }
            />
            <Route
              path="notification/:id"
              //todo
            />
          </Route>
          <Route
            path="/logout"
            element={
              <Logout
                loading={loading}
                setLoading={setLoading}
                userData={userData}
              />
            }
          />
        </>
        {/* Become a seller */}
        <>
          <Route
            path="/becomeseller/:id"
            element={
              <BecomeSeller
                userData={userData}
                setUserData={setUserData}
                loged={loged}
              />
            }
          />
        </>
        {/* New post */}
        <>
          <Route
            path="/new/post"
            element={<NewPost loged={loged} userData={userData} />}
          />
        </>
        <Route path="*" element={<E404 />} />
      </Routes>
    </BrowserRouter>
  );
}
