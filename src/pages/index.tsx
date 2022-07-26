import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./auth/Login";
import Register from "./auth/Register";

import Home from "./Home";
import Athlete from "./athlete";
import Company from "./company";
import useAuth from "./auth/useAuth";

export default function () {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="athletes" element={<Athlete.List />}>
          <Route path=":id" element={<Athlete.Details />} />
          <Route
            path="add"
            element={
              <RequiredAuth>
                <Athlete.Add />
              </RequiredAuth>
            }
          />
          <Route
            path="edit/:id"
            element={
              <RequiredAuth>
                <Athlete.Edit />
              </RequiredAuth>
            }
          />
        </Route>
        <Route path="companies" element={<Company.List />}>
          <Route path=":id" element={<Company.Details />} />
          <Route
            path="add"
            element={
              <RequiredAuth>
                <Company.Add />
              </RequiredAuth>
            }
          />
          <Route
            path="edit/:id"
            element={
              <RequiredAuth>
                <Company.Edit />
              </RequiredAuth>
            }
          />
        </Route>

        {/* Auth Routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

interface AuthProps {
  children: JSX.Element;
}

const RequiredAuth = (props: AuthProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return props.children;
};
