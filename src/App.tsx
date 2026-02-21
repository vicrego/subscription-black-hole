import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from "./Home/Home";
import Dashboard from "./components/Dashboard";
import { mockSubscriptions } from "./mockData";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Menu />} />
        <Route path="/subscriptions-solar-system" element={<Dashboard subscriptions={mockSubscriptions} />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;