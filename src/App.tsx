import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// Assets
import Fonts from './assets/Fonts';
import Reset from './assets/Reset';
import Variables from './assets/Variables';

// Pages
import LoginPage from './pages/Authen/LoginPage';
import RegisterPage from './pages/Authen/RegisterPage';
import DashboardPage from './pages/Dashboard/DashboardPage';
import EachPlacePage from './pages/Management/EachPlacePage';
import EachSpecPage from './pages/Specification/EachSpecPage';
import ManagePage from './pages/Management/ManagePage';
import SchedulePage from './pages/Schedule/SchedulePage';
import SettingPage from './pages/Setting/SettingPage';
import EachAmenityPage from './pages/Amenity/EachAmenityPage';
import OnboardingSpace from './pages/Management/01_Onboarding/OnboardingSpace';
import OnboardingDesk from './pages/Management/01_Onboarding/OnboardingDesk';
import PlaceCategoryPage from './pages/Management/02_Create/PlaceCategoryPage';

// Context
import { usePlaceEntityValue } from './context/PlaceEntityProvider';
import PlaceInitPage from './pages/Management/02_Create/PlaceInitPage';
import PlaceImgUploadPage from './pages/Management/02_Create/PlaceImgUploadPage';
import PlaceLocatePage from './pages/Management/02_Create/PlaceLocatePage';
import DeskInitPage from './pages/Management/02_Create/DeskInitPage';
import SuccessPage from './pages/Management/02_Create/SuccessPage';
import EachDeskPage from './pages/Desk/EachDeskPage';

export const IS_PRODUCTION_MODE = true;

function App() {

  const { placeEntity, setPlaceEntity } = usePlaceEntityValue();

  useEffect(() => {
    if(!IS_PRODUCTION_MODE) console.log(placeEntity);
  },[placeEntity]);

  return (
    <>
      <Reset />
      <Fonts />
      <Variables />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/dashboard" element={<DashboardPage />} />

        <Route path="/schedule/:placeId" element={<SchedulePage />} />

        {/* Management */}
        <Route path="/management" element={<ManagePage />} />
        <Route path="/edit-place/:id" element={<EachPlacePage />} />
        <Route path="/edit-spec/:id" element={<EachSpecPage />} />
        <Route path="/edit-amenity/:id" element={<EachAmenityPage />} />
        <Route path="/edit-desk/:deskId" element={<EachDeskPage />} />

        {/* Onboarding */}
        <Route path="/onboard-space" element={<OnboardingSpace />} />
        <Route path="/onboard-desk" element={<OnboardingDesk />} />
        <Route path="/place-category" element={<PlaceCategoryPage />} />
        <Route path="/place-init" element={<PlaceInitPage />} />
        <Route path="/place-images/:id" element={<PlaceImgUploadPage />} />
        <Route path="/place-geolocation/:id" element={<PlaceLocatePage />} />
        <Route path="/desk-init/:id" element={<DeskInitPage />} />
        <Route path="/success" element={<SuccessPage />} />

        {/* Setting */}
        <Route path="/settings" element={<SettingPage />} />
      </Routes>
    </>
  )
}

export default App;
