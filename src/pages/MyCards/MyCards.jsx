import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardComponent from "../../components/CardComponent";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import LoginContext from "../../store/loginContext.js";
import { toast } from "react-toastify";
import normalizeCard from "../HomePage/normalizeCard.js";

const MyCards = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const navigate = useNavigate();
  const { login } = useContext(LoginContext);

  useEffect(() => {
    axios
      .get("/cards/my-cards")
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
  let dataFromServerFiltered = normalizeCard(
    dataFromServer,
    login ? login._id : undefined
  );
  if (!dataFromServerFiltered || !dataFromServerFiltered.length) {
    return <Typography>Could not find any items</Typography>;
  }

  const handleDeleteCard = async (id) => {
    try {
      await axios.delete("/cards/" + id);
      setDataFromServer((currentDataFromServer) => {
        return currentDataFromServer.filter((card) => card._id !== id);
      });
    } catch (err) {
      console.log(err);
    }
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
  const handleLikeCard = async (id) => {
    try {
      let { data } = await axios.patch("/cards/" + id);
      setDataFromServer((cDataFromServer) => {
        let cardIndex = cDataFromServer.findIndex((card) => card._id === id);
        if (cardIndex) {
          cDataFromServer[cardIndex] = data;
        }
        return [...cDataFromServer];
      });
    } catch (error) {
      toast.error("🦄 Please Login", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  return (
    <Grid container spacing={2}>
      {dataFromServerFiltered.map((item, index) => (
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
            liked={item.liked}
            onDelete={handleDeleteCard}
            onEdit={handleEditCard}
            onLike={handleLikeCard}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default MyCards;
