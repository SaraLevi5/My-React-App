import axios from "axios";
import { useContext, useEffect, useNavigate } from "react";
import LoginContext from "../store/loginContext";
import ROUTES from "../routes/ROUTES";
import { toast } from "react-toastify";

const useEditPermission = (id) => {
  const { login } = useContext(LoginContext);
  const cardById = axios.get("/cards/" + id).then(({ cardById }) => cardById);
  const navigate = useNavigate();

  if (!id || !login) {
    return;
  }
  if (cardById.user_id === login._id) {
    navigate(`${ROUTES.EDITCARD}/${id}`);
  } else {
    navigate(ROUTES.HOME);
    toast.error("🦄 You are not the owner of this card", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    cardById.catch((err) => {
      console.log(err);
    });
  }
};

export default useEditPermission;
