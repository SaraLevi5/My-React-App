import { Routes, Route } from "react-router-dom";
import ROUTES from "./ROUTES";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import NotFoundPage from "../pages/404/NotFoundPage";
import AboutUsPage from "../pages/About/AboutUsPage";

import CreatCardPage from "../pages/CreatCard/CreatCard";
import EditCardPage from "../pages/EditCardPage/EditCardPage";
import MyCards from "../pages/MyCards/MyCards";
import AuthGuard from "../guard/AuthGuard";
import BizGuard from "../guard/BizGuard";
import Favorite from "../pages/Favorite/Favorite";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.ABOUT} element={<AboutUsPage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.FAVORITE} element={<Favorite />} />
      <Route
        path={ROUTES.CREATECARD}
        element={
          <BizGuard>
            <CreatCardPage />
          </BizGuard>
        }
      />
      <Route
        path={ROUTES.MYCARDS}
        element={
          <BizGuard>
            <MyCards />
          </BizGuard>
        }
      />
      <Route
        path={`${ROUTES.EDITCARD}/:id`}
        element={
          <BizGuard>
            <EditCardPage />
          </BizGuard>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
export default Router;