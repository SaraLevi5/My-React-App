import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useContext, useEffect, useState } from "react";
import LoginContext from "../store/loginContext";

// const useAutoLogin = () => {
//   const { setLogin } = useContext(LoginContext);
//   const [finishAutoLogin, setFinishAutoLogin] = useState(false);

//   useEffect(() => {
//     let token = localStorage.getItem("token");
//     if (!token) {
//       setFinishAutoLogin(true);
//       return;
//     }
//     let userData = jwtDecode(token);
//     if (!userData || !userData._id) {
//       console.log("no user data");
//       setFinishAutoLogin(true);
//       return;
//     }
//     axios
//       .get("/users/" + userData._id)
//       .then(({ data }) => {
//         setLogin(userData);
//         setFinishAutoLogin(true);
//       })
//       .catch((err) => {
//         setFinishAutoLogin(true);
//       });
//   }, []);

//   return finishAutoLogin;
// };

const useAutoLogin = () => {
  const { setLogin } = useContext(LoginContext);
  const [finishAutoLogin, setFinishAutoLogin] = useState(false);

  useEffect(() => {
    const autoLogin = async () => {
      let token = localStorage.getItem("token");
      let tokenFromSession = sessionStorage.getItem("tokenFromSession");

      if (!token || !tokenFromSession) {
        setFinishAutoLogin(true);
        return;
      }

      try {
        let userData = jwtDecode(token) || jwtDecode(tokenFromSession);
        if (!userData || !userData._id) {
          setFinishAutoLogin(true);
          return;
        }

        const { data } = await axios.get(`/users/${userData._id}`);
        setLogin(userData);
        setFinishAutoLogin(true);
      } catch (error) {
        setFinishAutoLogin(true);
      }
    };

    autoLogin();
  }, [setLogin]);

  return finishAutoLogin;
};

export default useAutoLogin;
