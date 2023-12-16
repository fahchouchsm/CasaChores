import { BrowserRouter, Routes, Route } from "react-router-dom";
import E404 from "./pages/404";
import Login from "./pages/login";
import Register from "./pages/register";
import { useEffect, useState } from "react";
import axios from "axios";
import Profile from "./pages/myProfile";
import Loading from "./pages/loading";
import Home from "./pages/home";
import HomeTest from "./pages/homeTest";

export default function App(): React.ReactElement {
  const [loged, setLoged] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .get("http://localhost:3001/jwt", { withCredentials: true })
      .then((response) => {
        if (response.status === 200) {
          setLoged(true);
          setUserData(response.data.userData);
        }
      })
      .catch((err) => {
        setLoged(false);
        setUserData(null);
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [loged]);

  if (loading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <Home
                userDataP={userData}
                logedP={loged}
                loadingP={loading}
                setLogedP={setLoged}
                setLoadingP={setLoading}
              />
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="/user">
          <Route
            path=":id"
            element={
              <Profile
                userDataP={userData}
                loadingP={loading}
                setLoadingP={setLoading}
                setLogedP={setLoged}
              />
            }
          />
          <Route
            path="*"
            element={
              <Home
                userDataP={userData}
                logedP={loged}
                loadingP={loading}
                setLogedP={setLoged}
                setLoadingP={setLoading}
              />
            }
          />
        </Route>
        <Route
          path="/test"
          element={
            <HomeTest
              userDataP={userData}
              logedP={loged}
              loadingP={loading}
              setLogedP={setLoged}
              setLoadingP={setLoading}
            />
          }
        />
        <Route path="*" element={<E404 />} />
      </Routes>
    </BrowserRouter>
  );
}
