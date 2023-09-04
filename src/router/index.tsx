import { Routes, Route} from "react-router-dom";
import MainPage from "../pages/MainPage";
import PersonalDataStorage from "../pages/PersonalDataStorage";
import LayoutShifting from "../pages/LayoutShifting";

const Router = () => (
  <Routes>
    <Route path="/" element={<MainPage />} />
    <Route path="/layout-shifting" element={<LayoutShifting />} />
    <Route path="/personal-data-storage" element={<PersonalDataStorage />} />
  </Routes>
);

export default Router;
