import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import Nav from "./Nav";
import TechnicianForm from "./TechnicianForm";
import TechnicianList from "./TechnicianList";
import AppointmentForm from "./AppointmentForm";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="technicians">
            <Route path="" element={<TechnicianList />} />
            <Route path="create" element={<TechnicianForm />} />
          </Route>
          <Route path="appointments">
            {/* <Route path="" element={<AppointmentList />} /> */}
            <Route path="create" element={<AppointmentForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
