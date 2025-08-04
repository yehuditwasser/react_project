import { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import UserContext from "../components/User/UserContext";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Store from "../pages/Store/Store";
import PageNotExist from "../pages/PageNotExist/PageNotExist";
import AddToStore from "../pages/Store/AddToStore";
import Edit from "../pages/Store/Edit";
import Maneger from "../pages/Store/Maneger";
import Cart from "../pages/Store/Cart";

const AppRoutes = () => {
  const authorizedRoutes = [{ path: "/store", Component: Store }];

  const { user } = useContext(UserContext);

  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/store" element={<Store />}></Route>
      <Route path="/addToStore" element={<AddToStore />}></Route>
      <Route path="/edit" element={<Edit />}></Route>
      <Route path="/maneger" element={<Maneger />}></Route>
      <Route path="/cart" element={<Cart />}></Route>
      
      {authorizedRoutes.map((route) => {
        const userLoggedIn = !!user?.userToken;
        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              userLoggedIn ? (
                <route.Component></route.Component>
              ) : (
                <Login></Login>
              )
            }
          />
        );
      })}
      <Route path="*" element={<PageNotExist />}></Route>
    </Routes>
  );
};

export default AppRoutes;
