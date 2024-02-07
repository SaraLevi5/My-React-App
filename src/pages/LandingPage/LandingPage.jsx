import {
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Divider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import EmbeddedMap from "../../components/EmbeddedMap";

const LandingPage = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  let { id } = useParams();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    axios
      .get("/cards/" + id)
      .then(({ data }) => {
        console.log(data);
        setDataFromServer(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return <Typography>Loading...</Typography>;
  }
  return (
    <Grid container spacing={2}>
      <Grid item lg={6} md={6} xs={12}>
        <Card height={200}>
          <CardMedia
            component="img"
            height="200"
            image={dataFromServer.image.url}
            alt={dataFromServer.image.alt}
          />
          <CardContent>
            <Typography variant="body2">
              <Typography fontWeight={700}>
                more details about that business:
                <br />
              </Typography>
              {` ${dataFromServer.description}`}
            </Typography>
          </CardContent>
          <Divider />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              <Typography fontWeight={700}>
                Address:
                <br />
              </Typography>
              {`${dataFromServer.address.country}, ${dataFromServer.address.city}, ${dataFromServer.address.street} ${dataFromServer.address.houseNumber} `}{" "}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <Typography fontWeight={700}>
                Email: <br />
              </Typography>
              {`${dataFromServer.email}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <Typography fontWeight={700}>
                Phone: <br />
              </Typography>
              {`${dataFromServer.phone}`}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item lg={6} md={6} xs={12}>
        <EmbeddedMap city={dataFromServer.address.city} />
      </Grid>

      {/* <Grid item lg={3} md={12} xs={12}>
        <Card></Card>
      </Grid> */}
    </Grid>
  );
};

export default LandingPage;
