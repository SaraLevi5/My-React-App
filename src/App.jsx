import { useEffect, useState } from "react";
import LayoutComponent from "./layout/LayoutComponent";
import Router from "./routes/Router";
import LoginContext from "./store/loginContext";
import { ToastContainer } from "react-toastify";

function App() {
  const [login, setLogin] = useState(null);

  return (
    <LoginContext.Provider value={{ login, setLogin }}>
      <ToastContainer />
      <LayoutComponent>
        <Router />
      </LayoutComponent>
    </LoginContext.Provider>
  );
}

export default App;
