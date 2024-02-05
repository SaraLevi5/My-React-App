import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardComponent from "../../components/CardComponent";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import LoginContext from "../../store/loginContext.js";
import { toast } from "react-toastify";

const HomePage = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const navigate = useNavigate();
  const { login } = useContext(LoginContext);

  useEffect(() => {
    axios
      .get("/cards")
      .then(({ data }) => {
        console.log(data);
        setDataFromServer(data);
      })
      .catch((err) => {
        console.log("error from axios", err);
      });
  }, []);
  if (!dataFromServer || !dataFromServer.length) {
    return <Typography>Could not find any items</Typography>;
  }

  const handleDeleteCard = (id) => {
    console.log("father: card to delete", id);
    setDataFromServer((currentDataFromServer) =>
      currentDataFromServer.filter((card) => card._id !== id)
    );
  };

  const handleEditCard = (id) => {
    axios
      .get("/cards/" + id)
      .then(({ data }) => {
        if (data.user_id == login._id) {
          navigate(`${ROUTES.EDITCARD}/${id}`);
        } else {
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
          navigate(ROUTES.HOME);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Grid container spacing={2}>
      {dataFromServer.map((item, index) => (
        <Grid item lg={3} md={6} xs={12} key={"Card" + index}>
          <CardComponent
            id={item._id}
            title={item.title}
            subtitle={item.subtitle}
            img={item.image.url}
            alt={item.image.alt}
            phone={item.phone}
            address={item.address}
            cardNumber={item.bizNumber}
            onDelete={handleDeleteCard}
            onEdit={handleEditCard}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default HomePage;
