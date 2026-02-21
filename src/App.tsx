import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./Home/Home";
import Animation from "./components/solarSystem/SolarSystem";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/subscriptions-solar-system" element={<Animation />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;