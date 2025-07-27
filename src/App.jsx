import { Route, Routes } from "react-router";
import ActivitiesPage from "./activities/ActivitiesPage";
import ActivityDetails from "./activities/ActivityDetails.jsx";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Error404 from "./Error404.jsx";
import Layout from "./layout/Layout.jsx";
import { activitiesUrl, routinesUrl } from "./urls/urls.jsx";
import RoutineDetails from "./routines/RoutineDetails.jsx";
import RoutinesPage from "./routines/RoutinesPage.jsx";

/**
 * Fitness Trackr is a platform where fitness enthusiasts can share their workouts and
 * discover new routines. Anyone can browse the site and make an account, and users with an
 * account will be able to upload and manage their own activities.
 */
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<ActivitiesPage />} />
        <Route path={activitiesUrl}>
          <Route index element={<ActivitiesPage />} />
          <Route path=":id" element={<ActivityDetails />} />
        </Route>
        <Route path={"/account"}>
          <Route path={"register"} element={<Register />} />
          <Route path={"login"} element={<Login />} />
        </Route>
        <Route path={routinesUrl}>
          <Route index element={<RoutinesPage />} />
          <Route path=":id" element={<RoutineDetails />} />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Route>
    </Routes>
  );
}
