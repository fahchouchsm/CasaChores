import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import E404 from "./pages/404";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
        </Route>
        <Route path="*" element={<E404 />} />
      </Routes>
    </BrowserRouter>
  );
}
