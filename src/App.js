import { BrowserRouter} from "react-router-dom";
import UserProvider from "./components/User/UserProvider";
import AppRoutes from "./components/AppRoutes";
import Store from "./pages/Store/Store";

function App() {
  
  return (  
    <UserProvider>
      <BrowserRouter>
        <AppRoutes></AppRoutes>
      </BrowserRouter>
    </UserProvider>
    

  );
}

export default App;
