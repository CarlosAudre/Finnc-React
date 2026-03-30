import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Toaster } from "sonner";
import { Home } from "./pages/Home";
import { MainLayout } from "./layout/MainLayout";
import { Period } from "./pages/Period";
import { DashboardPage } from "./pages/DashboardPage";
import { Profile } from "./pages/Profile";
import { ProtectedRoute } from "./infra/ProtectedRoute";
import { RedirectToCurrentPeriod } from "./components/RedirectToCurrentPeriod";
import { ContainerPage } from "./pages/ContainerPage";
import {FincAi} from "./pages/FincAi";
import { RedirectToCurrentYear } from "./components/RedirectToCurrentYear";

function App() {
  return (
    <>
      <Toaster position="top-center" richColors />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="/period" element={<RedirectToCurrentPeriod />} />
            <Route path="/period/:year/:month" element={<Period/>} /> 
            <Route path="/period/:year/:month/containers/:id" element={<ContainerPage/>}/> 
            <Route path="/dashboard" element={<RedirectToCurrentYear/>} />
            <Route path="/dashboard/:year" element={<DashboardPage/>} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/ficAi" element={<FincAi/>}/>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
