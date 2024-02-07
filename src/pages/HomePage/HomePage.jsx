import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardComponent from "../../components/CardComponent";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import LoginContext from "../../store/loginContext.js";
import { toast } from "react-toastify";
import normalizeCard from "./normalizeCard.js";
import searchContext from "../../store/searchContext";

const HomePage = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const navigate = useNavigate();
  const { login } = useContext(LoginContext);
  const { search } = useContext(searchContext);

  useEffect(() => {
    axios
      .get("/cards")
      .then(({ data }) => {
        setDataFromServer(data);
        if (search) {
          setDataFromServer((currentDataFromServer) =>
            currentDataFromServer.filter((card) =>
              card.title.toLowerCase().includes(search.toLowerCase())
            )
          );
        }
      })
      .catch((err) => {
        console.log("axios err", err);
      });
  }, [search]);

  if (!dataFromServer || !dataFromServer.length) {
    return <Typography>Could not find any items...</Typography>;
  }
  let dataFromServerFiltered = normalizeCard(
    dataFromServer,
    login ? login._id : undefined
  );
  if (!dataFromServerFiltered || !dataFromServerFiltered.length) {
    return <Typography>Could not find any items</Typography>;
  }

  const handleCard = (id) => {
    navigate(`${ROUTES.LANDINGPAGE}/${id}`);
  };
  const handleDeleteCard = async (id) => {
    try {
      await axios.delete("/cards/" + id);
      setDataFromServer((currentDataFromServer) =>
        currentDataFromServer.filter((card) => card._id !== id)
      );
    } catch (error) {
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
            onCard={handleCard}
            onDelete={handleDeleteCard}
            onEdit={handleEditCard}
            onLike={handleLikeCard}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default HomePage;
